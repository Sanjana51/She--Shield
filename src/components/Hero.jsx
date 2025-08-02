// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/hero-image.png";
import flower from "../assets/flower.png";
import Features from "./Features";
import Inspiration from "./Inspiration";

export default function Hero() {
  const handleExploreClick = () => {
    const aboutSection = document.getElementById("about-us");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 🎯 HERO SECTION */}
      <section className="relative overflow-hidden bg-[#fff0f5] py-24 px-6 md:px-16">

        {/* 🎨 Blurred Background Bubbles */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-fuchsia-400 opacity-20 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-rose-400 opacity-20 rounded-full blur-3xl z-0" />

        {/* 🌸 Floating Flowers at Custom Positions */}
        <motion.img
          src={flower}
          alt="Flower Top Left"
          className="absolute z-0 opacity-80"
          style={{ width: "60px", height: "60px", top: "5%", left: "5%" }}
          animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
        <motion.img
          src={flower}
          alt="Flower Top Right"
          className="absolute z-0 opacity-80"
          style={{ width: "60px", height: "60px", top: "10%", right: "10%" }}
          animate={{ y: [0, -25, 0], rotate: [0, 20, -20, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        />
        <motion.img
          src={flower}
          alt="Flower Center"
          className="absolute z-0 opacity-80"
          style={{ width: "70px", height: "70px", top: "45%", left: "45%" }}
          animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.img
          src={flower}
          alt="Flower Bottom Left"
          className="absolute z-0 opacity-80"
          style={{ width: "60px", height: "60px", bottom: "8%", left: "12%" }}
          animate={{ y: [0, -18, 0], rotate: [0, 18, -18, 0] }}
          transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut" }}
        />
        <motion.img
          src={flower}
          alt="Flower Bottom Right"
          className="absolute z-0 opacity-80"
          style={{ width: "65px", height: "65px", bottom: "5%", right: "8%" }}
          animate={{ y: [0, -22, 0], rotate: [0, 25, -25, 0] }}
          transition={{ repeat: Infinity, duration: 7.5, ease: "easeInOut" }}
        />

        {/* 🔥 Main Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 text-center md:text-left mb-10 md:mb-0"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-rose-900 leading-tight mb-6 drop-shadow-xl">
              Empowering Women <br />
              Through <span className="text-fuchsia-600">Safety & Awareness</span>
            </h1>
            <p className="text-lg text-rose-700 font-medium mb-8 leading-relaxed">
              <span className="font-bold text-rose-900">She Shield</span> is your digital shield for protection, emotional wellness,
              community support, and real opportunities — built for every woman.
            </p>
            <button
              onClick={handleExploreClick}
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600 hover:scale-105 hover:shadow-xl text-white px-10 py-4 rounded-full text-lg font-semibold shadow-md transition-all duration-300"
            >
              ✨ Explore Now
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 flex justify-center"
          >
            <img
              src={heroImage}
              alt="Empowered Women"
              className="w-96 max-w-full rounded-3xl shadow-2xl hover:scale-105 transition duration-300"
            />
          </motion.div>
        </div>
      </section>

      {/* ✅ ABOUT US SECTION */}
      <section id="about-us" className="bg-[#fff0f5] py-24 px-6 md:px-16 scroll-mt-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-rose-800 mb-6 drop-shadow-md">
            ✨ About She Shield ✨
          </h2>
          <p className="text-lg md:text-xl text-gray-800 font-medium leading-relaxed">
            She Shield  is more than a platform — it’s a movement to uplift, protect, and inspire women from all walks of life. <br /><br />
            Whether you're seeking tools for safety, emotional support, or a community that truly understands, EmpowerHer is here to walk with you on your journey. 💖
          </p>
        </div>
      </section>

      {/* ✅ FEATURES SECTION */}
      <Features />

      {/* ✅ INSPIRATION SECTION */}
      <Inspiration />

      {/* ✅ FOOTER SECTION */}
<footer className="bg-pink-100 text-center py-6 text-rose-700 mt-20 border-t border-rose-200">
  <div className="flex justify-center gap-6 mb-3">
    <a
      href="https://instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-pink-600 transition"
      aria-label="Instagram"
    >
      <i className="fab fa-instagram text-2xl"></i>
    </a>
    <a
      href="https://twitter.com"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-500 transition"
      aria-label="Twitter"
    >
      <i className="fab fa-twitter text-2xl"></i>
    </a>
    <a
      href="https://github.com"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gray-800 transition"
      aria-label="GitHub"
    >
      <i className="fab fa-github text-2xl"></i>
    </a>
  </div>
  <p className="text-sm">&copy; {new Date().getFullYear()} She Shield. All rights reserved.</p>
</footer>

    </>
  );
}
