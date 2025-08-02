import React, { useState } from 'react';

export default function UploadPost() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!caption || !image) return alert("Both caption and image are required.");
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("photo", image);         // ✅ matches Flask
    formData.append("username", "anonymous"); // optional

    try {
      const res = await fetch("http://localhost:5000/upload-post", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setMessage(data.message || "Upload successful!");
      setCaption("");
      setImage(null);
    } catch (err) {
      setMessage("Error uploading post.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold text-pink-700 mb-4">📸 Upload Post</h2>
      <input
        type="text"
        placeholder="Enter caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="border w-full px-4 py-2 mb-4"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-pink-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
}

