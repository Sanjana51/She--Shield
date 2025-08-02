import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LiveLocation from './components/LiveLocation';
import ChatBot from './components/ChatBot';
import Opportunities from './components/Opportunities';
import UploadPost from './components/UploadPost';
import PostFeed from './components/PostFeed';
import LoginSignup from './components/LoginSignup';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';

import { useAuth } from './context/AuthContext';

function App() {
  const { currentUser, login, logout } = useAuth();

  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/auth" element={<LoginSignup onLogin={login} />} />
        <Route path="/live-location" element={<LiveLocation />} />
        <Route path="/chat" element={<ChatBot />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/community" element={<PostFeed />} />

        {/* Protected routes */}
        <Route path="/profile" element={<ProtectedRoute user={currentUser} element={<Profile />} />} />
        <Route path="/upload-post"  element={<UploadPost />} /> 
      </Routes>
    </div>
  );
}

export default App;

