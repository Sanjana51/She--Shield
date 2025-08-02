import React, { useState } from 'react';
import ContactCards from './ContactCards';
import { motion } from 'framer-motion';
import flower from '../assets/flower.png'; // Optional: for animated floating flower

export default function LiveLocation() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [locationFetched, setLocationFetched] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      setLocationFetched(true);

      try {
        const res = await fetch('http://localhost:5000/get-address', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ latitude, longitude }),
        });

        const data = await res.json();
        setAddress(data.address || "Address not found");
      } catch (error) {
        console.error("Error fetching address:", error);
        setAddress("Error fetching address");
      }
    });
  };

  const openInGoogleMaps = () => {
    if (location) {
      const mapsLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
      window.open(mapsLink, '_blank');
    }
  };

  const shareLocation = (phone) => {
    if (!location || !address) {
      alert("Please fetch location first!");
      return;
    }

    const mapsLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    const message = ` I need help!\nI'm at: \n ${mapsLink}`;
    const whatsappURL = `https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const handleAddContact = async () => {
    if (!newContact.name || !newContact.phone) return;

    await fetch('http://localhost:5000/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContact),
    });

    setNewContact({ name: '', phone: '' });
    setLocationFetched(false);
    setTimeout(() => setLocationFetched(true), 100); // refresh contacts
  };

  return (
    <div className="relative px-8 py-20 min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-pink-50 via-[#fff0f5] to-white overflow-hidden text-center">
      
      {/* 🌸 Floating Decorations */}
      <div className="absolute top-[-80px] left-[-80px] w-[250px] h-[250px] bg-pink-200 opacity-30 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-rose-300 opacity-20 rounded-full blur-3xl z-0" />
      <div className="absolute top-[45%] left-[65%] w-[120px] h-[120px] bg-fuchsia-200 opacity-10 rounded-full blur-2xl z-0" />
      
      {/* Optional Animated Flower */}
      <motion.img
        src={flower}
        alt="Floating flower"
        className="absolute top-[20%] left-[10%] w-[60px] h-[60px] opacity-70 z-0"
        animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      {/* Main Content */}
      <h2 className="text-3xl md:text-4xl font-bold text-pink-800 mb-6 z-10">
        📍 Share Your Live Location
      </h2>

      <button
        onClick={getLocation}
        className="z-10 bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 text-white px-6 py-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
      >
        Get My Location
      </button>

      {locationFetched && (
        <div className="z-10 mt-10 flex flex-col md:flex-row gap-6 justify-center items-start w-full max-w-6xl">
          
          {/* 📌 Address Box */}
          <div className="bg-white bg-opacity-80 backdrop-blur-lg shadow-lg p-6 rounded-lg w-full md:w-1/2 text-left border border-pink-100">
            <p className="text-pink-800 font-semibold">📌 Your Current Address:</p>
            <p className="text-gray-700 mt-2">{address || "Address not found"}</p>
            <button
              onClick={openInGoogleMaps}
              className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-5 py-2 rounded-full"
            >
              🌍 Open in Google Maps
            </button>
          </div>

          {/* ➕ Add Contact */}
          <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-lg shadow-lg w-full md:w-1/2 text-left border border-pink-100">
            <h3 className="text-lg font-bold text-pink-800 mb-4">➕ Add Trusted Contact</h3>
            <input
              type="text"
              placeholder="Name"
              className="border border-pink-300 px-3 py-2 mb-2 rounded w-full"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone (+91...)"
              className="border border-pink-300 px-3 py-2 mb-2 rounded w-full"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            />
            <button
              onClick={handleAddContact}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full w-full"
            >
              Add Contact
            </button>
          </div>
        </div>
      )}

      {/* 🧾 Contact Cards */}
      {locationFetched && (
        <div className="z-10 mt-12 w-full max-w-4xl">
          <h3 className="text-2xl font-bold text-pink-700 mb-4">📇 Trusted Contacts</h3>
          <ContactCards onSelectContact={shareLocation} />
        </div>
      )}
    </div>
  );
}


