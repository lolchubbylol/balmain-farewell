"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const VisualSignatures: React.FC = () => {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationStarted(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const students = [
    {
      name: "Nathan",
      subtitle: "The One Who Asked Too Many Questions",
      color: "#4A90E2",
      signature: "M20,50 Q40,30 60,50 T100,50 Q120,35 140,50",
      funFact: "Survival rate: 100% (barely)"
    },
    {
      name: "Jolia", 
      subtitle: "Master of Looking Busy",
      color: "#FF6B6B",
      signature: "M20,45 Q35,25 50,45 Q65,65 80,45 Q95,25 110,45 L130,40",
      funFact: "Coffee consumed: ∞"
    },
    {
      name: "Sonny",
      subtitle: "Professional Note-Taker",
      color: "#4ECDC4", 
      signature: "M15,50 Q30,30 45,50 Q60,70 75,50 Q90,30 105,50 Q120,50 135,45",
      funFact: "Pens lost: 47"
    },
    {
      name: "Gabrielle",
      subtitle: "Somehow Always On Time",
      color: "#FFD93D",
      signature: "M25,50 Q40,35 55,50 Q70,65 85,50 Q100,35 115,50 L125,45",
      funFact: "Alarms set: 12 daily"
    }
  ];

  // Draw animated signature
  const SignaturePath = ({ path, color, delay }: { path: string; color: string; delay: number }) => (
    <svg width="150" height="80" className="w-full h-20">
      <motion.path
        d={path}
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animationStarted ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ 
          pathLength: { duration: 1.5, delay, ease: "easeInOut" },
          opacity: { duration: 0.5, delay }
        }}
      />
      {/* Ink splatter effect */}
      <motion.circle
        cx="140"
        cy="45"
        r="2"
        fill={color}
        initial={{ scale: 0 }}
        animate={animationStarted ? { scale: [0, 1.5, 1] } : {}}
        transition={{ delay: delay + 1.5, duration: 0.3 }}
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-hospital-dark to-black relative overflow-hidden">
      {/* Subtle ambient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-hospital-mint/5 rounded-full filter blur-3xl" />
      </div>
      {/* Floating medical equipment background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(2)].map(() => ['💊', '🩹', '📋', '✏️', '☕', '🌡️', '🩺', '💉', '📊', '🔬']).flat().map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{ opacity: 0.15 + Math.random() * 0.2 }}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: -50,
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: window.innerHeight + 50,
              rotate: 360 + Math.random() * 360,
              x: `+=${Math.random() * 100 - 50}`
            }}
            transition={{ 
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: (i % 10) * 2.5,
              ease: "linear"
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.div 
        className="text-center pt-20 pb-10 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          The Survivors
        </h1>
        <p className="text-lg sm:text-xl text-hospital-mint mb-2">
          University of Sydney • Class of 2025
        </p>
        <p className="text-sm text-gray-500">
          *Placement completion certificate pending
        </p>
      </motion.div>

      {/* Student Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {students.map((student, index) => (
            <motion.div
              key={student.name}
              className="relative"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-800"
                whileHover={{ scale: 1.02, rotate: [-1, 1, -1] }}
                transition={{ rotate: { duration: 0.5 } }}
              >
                {/* Student info */}
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{student.name}</h3>
                  <p className="text-sm text-gray-400">{student.subtitle}</p>
                </div>

                {/* Signature area */}
                <div className="bg-white/5 rounded-lg p-4 mb-4 relative overflow-hidden">
                  {/* Paper texture lines */}
                  <div className="absolute inset-0 opacity-10">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="h-px bg-gray-600"
                        style={{ marginTop: `${i * 10}px` }}
                      />
                    ))}
                  </div>
                  
                  <SignaturePath 
                    path={student.signature} 
                    color={student.color}
                    delay={index * 0.3}
                  />
                </div>

                {/* Fun fact */}
                <motion.div
                  className="flex items-center justify-between text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.3 + 1 }}
                >
                  <span className="text-gray-500">Fun fact:</span>
                  <span className="text-gray-400">{student.funFact}</span>
                </motion.div>

                {/* Achievement badges */}
                <motion.div
                  className="mt-4 flex gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3 + 1.5 }}
                >
                  {index === 0 && (
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                      Most Curious
                    </span>
                  )}
                  {index === 1 && (
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">
                      Caffeine Champion
                    </span>
                  )}
                  {index === 2 && (
                    <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">
                      Note Ninja
                    </span>
                  )}
                  {index === 3 && (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                      Punctuality Pro
                    </span>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Group message */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-base sm:text-lg text-white mb-2">
            Thanks for putting up with us
          </p>
          <p className="text-sm text-gray-500">
            We promise we were taking notes, not doodling
          </p>
          <p className="text-xs text-gray-600 mt-4">
            (Okay, maybe a little doodling)
          </p>
        </motion.div>
      </div>

      {/* Bottom kangaroo animation */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
        <motion.div
          className="absolute bottom-0"
          initial={{ x: -100 }}
          animate={{ x: window.innerWidth + 100 }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="relative">
            {/* Hopping kangaroo */}
            <motion.div
              animate={{ 
                y: [0, -30, 0],
                rotate: [0, -10, 0]
              }}
              transition={{ 
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-4xl"
              style={{ opacity: 0.8 }}
            >
              🦘
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Southern Cross pattern */}
      <div className="absolute top-20 right-20 opacity-20">
        <svg width="150" height="150" viewBox="0 0 150 150">
          <circle cx="30" cy="30" r="3" fill="#4ECDC4" />
          <circle cx="50" cy="50" r="4" fill="#4ECDC4" />
          <circle cx="40" cy="80" r="3" fill="#4ECDC4" />
          <circle cx="70" cy="70" r="3" fill="#4ECDC4" />
          <circle cx="80" cy="40" r="2" fill="#4ECDC4" />
        </svg>
      </div>
    </div>
  );
};

export default VisualSignatures;