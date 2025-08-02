from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import os
import requests
import re

# Load environment variables
load_dotenv()

# Flask App Setup
app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///contacts.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["UPLOAD_FOLDER"] = "uploads"
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

db = SQLAlchemy(app)

# ------------------ MODELS ------------------ #

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20), nullable=False)

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100))
    experience = db.Column(db.String(50))
    skills = db.Column(db.String(200))
    apply_link = db.Column(db.String(300))

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    caption = db.Column(db.String(500))
    image_filename = db.Column(db.String(100))
    comments = db.relationship('Comment', backref='post', lazy=True)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    content = db.Column(db.String(500), nullable=False)
    username = db.Column(db.String(100), default='Anonymous')


# ------------------ AUTH ROUTES ------------------ #

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    if not all([data.get("name"), data.get("email"), data.get("password")]):
        return jsonify({"message": "All fields are required"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "Email already registered"}), 409

    hashed_pw = generate_password_hash(data["password"])
    user = User(name=data["name"], email=data["email"], password=hashed_pw)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}), 201


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(email=data.get("email")).first()
    if not user or not check_password_hash(user.password, data.get("password")):
        return jsonify({"message": "Invalid email or password"}), 401

    return jsonify({
        "token": "fake-jwt-token",  # You can replace with real JWT later
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    })


# ------------------ CONTACT ROUTES ------------------ #

@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    return jsonify([{"id": c.id, "name": c.name, "phone": c.phone} for c in contacts])

@app.route("/contacts", methods=["POST"])
def add_contact():
    data = request.json
    new_contact = Contact(name=data["name"], phone=data["phone"])
    db.session.add(new_contact)
    db.session.commit()
    return jsonify({"message": "Contact added"}), 201


# ------------------ JOB ROUTES ------------------ #

@app.route("/jobs", methods=["GET"])
def get_jobs():
    jobs = Job.query.all()
    return jsonify([{
        "id": j.id,
        "title": j.title,
        "location": j.location,
        "experience": j.experience,
        "skills": j.skills,
        "apply_link": j.apply_link
    } for j in jobs])

@app.route("/jobs", methods=["POST"])
def add_job():
    data = request.json
    job = Job(
        title=data["title"],
        location=data["location"],
        experience=data["experience"],
        skills=data["skills"],
        apply_link=data["apply_link"]
    )
    db.session.add(job)
    db.session.commit()
    return jsonify({"message": "Job added"}), 201


# ------------------ CHATBOT ROUTE ------------------ #

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_input = data.get("user_input", "")
    history = data.get("history", [])
    groq_api_key = os.getenv("GROQ_API_KEY")

    if not groq_api_key:
        return jsonify({"bot_reply": "Groq API key is missing."}), 500

    headers = {
        "Authorization": f"Bearer {groq_api_key}",
        "Content-Type": "application/json"
    }

    messages = [
        {
            "role": "system",
            "content": "You are a women’s safety assistant. Respond with short, direct, practical tips only."
        }
    ] + history + [{"role": "user", "content": user_input}]

    payload = {
        "model": "llama3-70b-8192",
        "messages": messages,
        "temperature": 0.7
    }

    try:
        response = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=payload)
        result = response.json()

        if "error" in result:
            return jsonify({"bot_reply": result["error"].get("message", "Unknown error")}), 500

        raw_reply = result.get("choices", [{}])[0].get("message", {}).get("content", "")
        clean_reply = re.sub(r"[*_`]+", "", raw_reply)
        return jsonify({"bot_reply":clean_reply or "No response from assistant."})

    except Exception as e:
        return jsonify({"bot_reply": f"Error: {str(e)}"}), 500


# ------------------ POST ROUTES ------------------ #

@app.route('/upload-post', methods=['POST'])
def upload_post():
    if 'photo' not in request.files:
        return jsonify({'error': 'No photo uploaded'}), 400

    photo = request.files['photo']
    if photo.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(photo.filename)
    photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    post = Post(
        username=request.form.get('username', 'anonymous'),
        caption=request.form.get('caption', ''),
        image_filename=filename
    )
    db.session.add(post)
    db.session.commit()
    return jsonify({'message': 'Post uploaded successfully'}), 201

@app.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.order_by(Post.id.desc()).all()
    return jsonify([
        {
            'id': p.id,
            'username': p.username,
            'caption': p.caption,
            'image_url': f'/uploads/{p.image_filename}'
        } for p in posts
    ])

@app.route('/uploads/<filename>')
def serve_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


# ------------------ COMMENTS ------------------ #

@app.route("/comments/<int:post_id>", methods=["GET"])
def get_comments(post_id):
    comments = Comment.query.filter_by(post_id=post_id).all()
    return jsonify([
        {
            "id": c.id,
            "username": c.username,
            "content": c.content
        } for c in comments
    ])

@app.route("/comments", methods=["POST"])
def add_comment():
    data = request.json
    comment = Comment(
        post_id=data["post_id"],
        content=data["content"],
        username=data.get("username", "Anonymous")
    )
    db.session.add(comment)
    db.session.commit()
    return jsonify({"message": "Comment added"}), 201


# ------------------ MAIN ------------------ #

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
