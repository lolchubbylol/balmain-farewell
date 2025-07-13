"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star } from 'lucide-react';

// Sydney Opera House component
const OperaHouse = () => (
  <svg width="800" height="400" viewBox="0 0 800 400" className="w-full h-full">
    <defs>
      <linearGradient id="operaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#FFA500" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    {/* Opera House shells */}
    <g transform="translate(400, 300)">
      <path d="M -200 0 Q -150 -150, -100 0" fill="url(#operaGradient)" stroke="#FFF" strokeWidth="2" />
      <path d="M -100 0 Q -50 -180, 0 0" fill="url(#operaGradient)" stroke="#FFF" strokeWidth="2" />
      <path d="M 0 0 Q 50 -200, 100 0" fill="url(#operaGradient)" stroke="#FFF" strokeWidth="2" />
      <path d="M 100 0 Q 150 -150, 200 0" fill="url(#operaGradient)" stroke="#FFF" strokeWidth="2" />
      
      {/* Smaller background shells */}
      <path d="M -150 0 Q -125 -100, -100 0" fill="url(#operaGradient)" opacity="0.5" />
      <path d="M 100 0 Q 125 -100, 150 0" fill="url(#operaGradient)" opacity="0.5" />
    </g>
  </svg>
);

// Floating eucalyptus leaf
const FloatingLeaf = ({ delay = 0, startX = 0, duration = 15 }) => (
  <motion.div
    className="absolute pointer-events-none"
    initial={{ 
      x: startX,
      y: -100,
      rotate: 0,
      opacity: 0 
    }}
    animate={{ 
      x: startX + (Math.random() - 0.5) * 200,
      y: window.innerHeight + 100,
      rotate: 360,
      opacity: [0, 0.8, 0.8, 0]
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    <svg width="50" height="70" viewBox="0 0 40 60" fill="none">
      <path
        d="M20 5C12 8 5 18 5 30C5 42 12 52 20 55C28 52 35 42 35 30C35 18 28 8 20 5Z"
        fill="#7FB069"
        fillOpacity="0.9"
      />
      <path
        d="M20 5V55"
        stroke="#5A8A4C"
        strokeWidth="2"
      />
    </svg>
  </motion.div>
);

// Southern Cross constellation
const SouthernCross = () => {
  const stars = [
    { x: 50, y: 50, size: 12, delay: 0 },
    { x: 80, y: 80, size: 16, delay: 0.2 },
    { x: 100, y: 60, size: 12, delay: 0.4 },
    { x: 90, y: 110, size: 12, delay: 0.6 },
    { x: 30, y: 80, size: 10, delay: 0.8 },
  ];

  return (
    <svg width="150" height="150" viewBox="0 0 150 150" className="absolute top-10 right-10">
      {stars.map((star, i) => (
        <motion.circle
          key={i}
          cx={star.x}
          cy={star.y}
          r={star.size / 2}
          fill="white"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0.8, 1],
            scale: 1
          }}
          transition={{ 
            delay: star.delay,
            duration: 2,
            opacity: { repeat: Infinity, duration: 3 }
          }}
        />
      ))}
      {/* Connect the stars */}
      <motion.path
        d="M 50 50 L 80 80 L 100 60 M 80 80 L 90 110 M 50 50 L 30 80"
        stroke="white"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 2 }}
      />
    </svg>
  );
};

export default function VisualFinale() {
  const [showContent, setShowContent] = useState(false);
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 500);
    setTimeout(() => setShowHearts(true), 2000);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#001a33] via-[#002244] to-[#003366] overflow-hidden">
      {/* Sydney Opera House silhouette */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-20">
        <OperaHouse />
      </div>

      {/* Southern Cross */}
      <SouthernCross />

      {/* Floating eucalyptus leaves */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <FloatingLeaf 
            key={i} 
            delay={i * 1.5} 
            startX={Math.random() * window.innerWidth}
            duration={15 + Math.random() * 10}
          />
        ))}
      </div>

      {/* Main content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-10 flex items-center justify-center min-h-screen px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <div className="text-center max-w-4xl">
              {/* Thank you message */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-6 sm:mb-8 px-4"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring",
                  damping: 10,
                  stiffness: 100,
                  duration: 1.5
                }}
                style={{
                  textShadow: '0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 215, 0, 0.3)'
                }}
              >
                THANK YOU
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-2xl md:text-3xl text-yellow-300 mb-12"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                From all of us at USYD
              </motion.p>

              {/* Visual elements instead of text */}
              <motion.div
                className="flex justify-center items-center gap-8 mb-12"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <div className="text-4xl sm:text-5xl md:text-6xl">🏥</div>
                <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 fill-red-500 animate-pulse" />
                <div className="text-4xl sm:text-5xl md:text-6xl">🎓</div>
              </motion.div>

              {/* Names */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, stagger: 0.1 }}
              >
                {['Nathan', 'Jolia', 'Sonny', 'Gabrielle'].map((name, i) => (
                  <motion.div
                    key={name}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5 + i * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <p className="text-white text-lg font-semibold">{name}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Final message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="relative"
              >
                <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-base sm:text-xl rounded-full shadow-2xl">
                  <Star className="w-6 h-6 fill-yellow-300 text-yellow-300" />
                  <span>Balmain Hospital 2025</span>
                  <Star className="w-6 h-6 fill-yellow-300 text-yellow-300" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated hearts */}
      <AnimatePresence>
        {showHearts && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                className="absolute"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50,
                  scale: 0
                }}
                animate={{ 
                  y: -100,
                  scale: [0, 1, 1, 0],
                  x: `+=${(Math.random() - 0.5) * 200}`
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  delay: Math.random() * 5,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              >
                <Heart 
                  className="text-red-500 fill-red-500" 
                  size={20 + Math.random() * 20}
                  style={{ opacity: 0.7 }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Sparkle effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Easter Egg - Nathan Xu credit */}
      <motion.div
        className="absolute bottom-4 right-4 text-xs text-gray-700 cursor-pointer select-none z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setEasterEggClicks(prev => prev + 1);
          if (easterEggClicks >= 2) {
            setShowEasterEgg(true);
          }
        }}
      >
        <span className="opacity-30 hover:opacity-50 transition-opacity">
          {easterEggClicks < 3 ? '🐨' : '💻'}
        </span>
      </motion.div>

      {/* Easter Egg Modal */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEasterEgg(false)}
          >
            <motion.div
              className="bg-gray-900 p-8 rounded-2xl border border-hospital-mint text-center max-w-md"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", damping: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl sm:text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h3 className="text-2xl font-bold text-hospital-mint mb-2">
                Easter Egg Found!
              </h3>
              <p className="text-white mb-4">
                This farewell site was lovingly coded by
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-hospital-mint to-hospital-coral mb-4">
                Nathan Xu
              </p>
              <p className="text-gray-400 text-sm mb-4">
                USYD Medicine Class of 2025
              </p>
              <motion.button
                className="px-4 py-2 bg-hospital-mint text-black rounded-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowEasterEgg(false)}
              >
                Nice work mate! 🐨
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}