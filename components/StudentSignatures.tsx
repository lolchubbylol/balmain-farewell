"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function StudentSignatures() {
  const signaturesRef = useRef<HTMLDivElement>(null);

  const students = [
    { name: "Nathan", delay: 0 },
    { name: "Jolia", delay: 0.5 },
    { name: "Sonny", delay: 1 },
    { name: "Gabrielle", delay: 1.5 }
  ];

  useEffect(() => {
    if (!signaturesRef.current) return;

    const signatures = signaturesRef.current.querySelectorAll('.signature-path');
    
    signatures.forEach((signature, index) => {
      const path = signature as SVGPathElement;
      const length = path.getTotalLength();
      
      // Set up the path for animation
      path.style.strokeDasharray = length.toString();
      path.style.strokeDashoffset = length.toString();

      // Animate the signature being drawn
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        delay: students[index].delay + 1,
        ease: "power2.inOut"
      });
    });
  }, []);

  const generateSignaturePath = (name: string) => {
    // Generate unique signature paths based on name
    const paths: { [key: string]: string } = {
      Nathan: "M10,50 Q30,20 50,40 T90,45 T130,50 L140,35",
      Jolia: "M10,40 C20,20 30,60 45,35 S70,30 85,40 Q100,50 115,35 L120,25",
      Sonny: "M15,45 Q25,25 35,40 C45,55 55,25 70,40 T95,45 L105,30",
      Gabrielle: "M10,40 C15,25 25,55 35,35 Q45,30 55,40 T75,35 Q95,40 110,30 T135,40 L145,25"
    };
    return paths[name] || paths.Nathan;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-hospital-dark to-black">
      <div ref={signaturesRef} className="grid grid-cols-2 gap-16 p-8">
        {students.map((student, index) => (
          <motion.div
            key={student.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: student.delay, duration: 0.8 }}
            className="relative"
          >
            <svg
              width="200"
              height="80"
              viewBox="0 0 200 80"
              className="overflow-visible"
            >
              <defs>
                <filter id={`glow-${index}`}>
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <path
                className="signature-path"
                d={generateSignaturePath(student.name)}
                fill="none"
                stroke="#4ECDC4"
                strokeWidth="3"
                strokeLinecap="round"
                filter={`url(#glow-${index})`}
              />
            </svg>
            
            <motion.p
              className="text-hospital-coral text-lg mt-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: student.delay + 2.5 }}
            >
              {student.name}
            </motion.p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          delay: 3.5,
          type: "spring",
          damping: 8,
          stiffness: 100
        }}
      >
        <div className="text-3xl font-bold text-hospital-blue border-4 border-hospital-blue px-6 py-3 transform">
          USyd Medicine 2025
        </div>
      </motion.div>

      {/* Ink splatter effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                ['#4ECDC4', '#FF6B6B', '#4A90E2'][i % 3]
              } 0%, transparent 70%)`,
              width: Math.random() * 40 + 10,
              height: Math.random() * 40 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 4 + Math.random() * 0.5,
              duration: 0.3,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}