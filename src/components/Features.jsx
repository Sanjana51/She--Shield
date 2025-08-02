// ✅ Features.jsx

import React from "react";
import { motion } from "framer-motion";

export default function Features() {
  return (
    <section className="bg-rose-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-rose-800 mb-10">🌟 Our Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-lg border">
            <h3 className="text-xl font-bold text-rose-600 mb-2">📍 Live Location Sharing</h3>
            <p className="text-gray-600">Easily share your live location with emergency contacts during distress.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-lg border">
            <h3 className="text-xl font-bold text-rose-600 mb-2">🗣️ Voice Safety Bot</h3>
            <p className="text-gray-600">Get quick safety advice using voice commands via our AI bot.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-lg border">
            <h3 className="text-xl font-bold text-rose-600 mb-2">💼 Opportunities Hub</h3>
            <p className="text-gray-600">Discover jobs, internships, and resources focused on women’s empowerment.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-lg border">
            <h3 className="text-xl font-bold text-rose-600 mb-2">📝 Community Blog</h3>
            <p className="text-gray-600">Write, comment, and read stories that uplift and inform our community.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-lg border">
            <h3 className="text-xl font-bold text-rose-600 mb-2">📊 Feedback Form</h3>
            <p className="text-gray-600">Share your opinion through our feedback form to help improve SHE Shield.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-lg border">
            <h3 className="text-xl font-bold text-rose-600 mb-2">💬 AI Chat Support</h3>
            <p className="text-gray-600">24/7 chatbot that offers safety tips and emotional support when needed.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

