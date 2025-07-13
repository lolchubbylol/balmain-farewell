"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';

// Dynamic imports
const VisualHero = dynamic(() => import('@/components/VisualHero'), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="text-hospital-mint text-4xl mb-4">❤️</div>
        <div className="text-white text-xl">Loading Experience...</div>
      </motion.div>
    </div>
  )
});

const VisualStaff = dynamic(() => import('@/components/VisualStaff'), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="text-hospital-mint text-2xl animate-pulse">Preparing Staff Cards...</div>
    </div>
  )
});

const VisualSignatures = dynamic(() => import('@/components/VisualSignatures'), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="text-hospital-mint text-2xl animate-pulse">Loading Signatures...</div>
    </div>
  )
});

const VisualFinale = dynamic(() => import('@/components/VisualFinale'), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="text-hospital-mint text-2xl animate-pulse">Preparing Finale...</div>
    </div>
  )
});

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    { 
      component: <VisualHero />, 
      name: "Welcome",
      duration: 8000 
    },
    { 
      component: <VisualStaff />, 
      name: "Our Mentors",
      duration: 15000 
    },
    { 
      component: <VisualSignatures />, 
      name: "Signatures",
      duration: 10000 
    },
    { 
      component: <VisualFinale />, 
      name: "Thank You",
      duration: 10000 
    }
  ];

  // Handle section change
  const handleSectionChange = useCallback((index: number) => {
    if (index >= 0 && index < sections.length) {
      setCurrentSection(index);
      setAutoPlay(false); // Stop auto-play when manually navigating
    }
  }, [sections.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          handleSectionChange((currentSection + 1) % sections.length);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          handleSectionChange((currentSection - 1 + sections.length) % sections.length);
          break;
        case ' ':
          e.preventDefault();
          // Remove auto-play toggle functionality
          // setAutoPlay(!autoPlay);
          break;
        case 'Escape':
          setIsMenuOpen(false);
          break;
        case '1':
        case '2':
        case '3':
        case '4':
          const num = parseInt(e.key) - 1;
          if (num < sections.length) {
            handleSectionChange(num);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSection, autoPlay, sections.length, handleSectionChange]);

  // Touch/swipe navigation for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleSectionChange((currentSection + 1) % sections.length);
    }
    if (isRightSwipe) {
      handleSectionChange((currentSection - 1 + sections.length) % sections.length);
    }
  };

  // Auto-progression
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentSection((prev) => {
        const next = prev + 1;
        if (next >= sections.length) {
          setAutoPlay(false); // Stop at the end
          return prev;
        }
        return next;
      });
    }, sections[currentSection].duration);

    return () => clearInterval(timer);
  }, [autoPlay, currentSection, sections]);

  // Initial loading (no auto-start)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setAutoPlay(false); // Explicitly set to false on load
    }, 1500);
  }, []);

  // Scroll/swipe handling
  useEffect(() => {
    let touchStartY = 0;
    let touchStartX = 0;
    const threshold = 50;

    const handleWheel = (e: WheelEvent) => {
      if (isMenuOpen) return;
      
      if (e.deltaY > threshold) {
        handleSectionChange((currentSection + 1) % sections.length);
      } else if (e.deltaY < -threshold) {
        handleSectionChange((currentSection - 1 + sections.length) % sections.length);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isMenuOpen) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY - touchEndY;
      const deltaX = touchStartX - touchEndX;

      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        if (deltaY > threshold) {
          handleSectionChange((currentSection + 1) % sections.length);
        } else if (deltaY < -threshold) {
          handleSectionChange((currentSection - 1 + sections.length) % sections.length);
        }
      }
    };

    // Debounced wheel handler
    let wheelTimeout: NodeJS.Timeout;
    const debouncedWheel = (e: WheelEvent) => {
      e.preventDefault();
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => handleWheel(e), 100);
    };

    window.addEventListener('wheel', debouncedWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', debouncedWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, isMenuOpen, sections.length, handleSectionChange]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div 
            className="text-hospital-mint text-6xl mb-4"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 360, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ❤️
          </motion.div>
          <div className="text-white text-xl">Welcome to our farewell</div>
          <div className="text-hospital-mint text-sm mt-2">Balmain Hospital Lever Ward</div>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative bg-black min-h-screen overflow-hidden">
      {/* Navigation */}
      <Navigation
        sections={sections.map(s => s.name)}
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {sections[currentSection].component}
        </motion.div>
      </AnimatePresence>

      {/* Auto-play removed - no indicator needed */}

      {/* Navigation hint (shows briefly at start) */}
      <AnimatePresence>
        {currentSection === 0 && (
          <motion.div
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 3, duration: 1 }}
          >
            <p className="text-white/50 text-sm">
              Use arrow keys or swipe to navigate
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}