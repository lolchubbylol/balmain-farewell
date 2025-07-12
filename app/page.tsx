"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import HeroEKG from '@/components/HeroEKG';
import StudentSignatures from '@/components/StudentSignatures';
import GrandFinale from '@/components/GrandFinale';

// Dynamic import for Three.js component to avoid SSR issues
const Staff3DCards = dynamic(() => import('@/components/Staff3DCards'), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="text-hospital-mint text-2xl animate-pulse">Loading 3D Experience...</div>
    </div>
  )
});

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => setIsLoading(false), 1000);

    // Auto-progress through sections
    const timer = setInterval(() => {
      setCurrentSection((prev) => {
        if (prev < 3) return prev + 1;
        return prev;
      });
    }, 8000); // 8 seconds per section

    return () => clearInterval(timer);
  }, []);

  const sections = [
    { component: <HeroEKG />, duration: 8000 },
    { component: <Staff3DCards />, duration: 8000 },
    { component: <StudentSignatures />, duration: 8000 },
    { component: <GrandFinale />, duration: 8000 }
  ];

  const handleSectionChange = (index: number) => {
    setCurrentSection(index);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-hospital-mint text-6xl mb-4 animate-pulse">❤️</div>
          <div className="text-white text-xl">Preparing your experience...</div>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative bg-black min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {sections[currentSection].component}
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-50">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSectionChange(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index 
                ? 'bg-hospital-mint w-8' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Skip intro button */}
      {currentSection === 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={() => setCurrentSection(3)}
          className="fixed top-8 right-8 text-white/50 hover:text-white transition-colors z-50"
        >
          Skip to finale →
        </motion.button>
      )}

      {/* Background particles effect */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-hospital-mint/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>
    </main>
  );
}