// src/components/Inspiration.jsx
import React from "react";
import { motion } from "framer-motion";

import kalpana from "../assets/kalpana.png";
import vineeta from "../assets/vineeta.png";
import pvsindhu from "../assets/pvsindhu.png";
import pilot from "../assets/pilot.png";

const inspirations = [
  {
    image: kalpana,
    name: "Kalpana Chawla",
    description:
      "The first Indian woman in space. Her journey inspires generations of women in science and exploration.",
  },
  {
    image: vineeta,
    name: "Vineeta Singh",
    description:
      "CEO of Sugar Cosmetics, empowering women entrepreneurs and redefining beauty with boldness.",
  },
  {
    image: pvsindhu,
    name: "P. V. Sindhu",
    description:
      "Olympic medalist and world badminton champion, symbolizing grit and excellence in sports.",
  },
  {
    image: pilot,
    name: "Sufia Kujur",
    description:
      "Colonel Sufia Kujur led Operation Sindoor, a daring counter-insurgency mission launched in response to the Pahalgam terror attack.",
  },
];

export default function Inspiration() {
  return (
    <section className="bg-gradient-to-br from-pink-50 via-rose-100 to-rose-200 py-20 px-6">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold text-rose-700 mb-4">
          🌟 Inspirational Women
        </h2>
        <p className="text-rose-600 max-w-2xl mx-auto text-lg">
          These women have broken barriers, shattered stereotypes, and inspired
          generations. Their stories remind us of the power, strength, and
          potential every woman holds.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-6xl mx-auto px-2">
        {inspirations.map((inspo, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.035 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-white rounded-2xl shadow-xl flex items-center gap-6 p-6 border-l-[6px] border-pink-400 hover:shadow-pink-300"
          >
            <div className="relative">
              <div className="w-28 h-28 rounded-full border-4 border-white shadow-inner shadow-pink-100 bg-gradient-to-tr from-rose-200 to-pink-100 p-1">
                <img
                  src={inspo.image}
                  alt={inspo.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-rose-800 mb-1">
                {inspo.name}
              </h3>
              <p className="text-rose-600 text-sm leading-relaxed">
                {inspo.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
