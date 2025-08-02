import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:5000/login", {
          email: form.email,
          password: form.password,
        });
        login(res.data.user);
        setMsg("Successfully logged in");
        setTimeout(() => navigate("/"), 1000);
      } else {
        const res = await axios.post("http://localhost:5000/signup", {
          name: form.name,
          email: form.email,
          password: form.password,
        });
        setMsg(res.data.message);
        setIsLogin(true);
      }
    } catch (err) {
      setMsg(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-pink-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-8">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login to Account" : "Create Account"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full py-2 rounded text-white bg-pink-600 hover:bg-pink-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className={`mt-3 ${msg.includes("Success") ? "text-green-600" : "text-red-600"}`}>
          {msg}
        </p>
        <p className="mt-3">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-pink-600 hover:underline cursor-pointer ml-1"
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
