"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';

// Dynamic imports with performance-optimized loading screens
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
  const [isMobile, setIsMobile] = useState(false);

  // Memoize sections array
  const sections = useMemo(() => [
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
  ], []);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
  }, [currentSection, sections.length, handleSectionChange]);

  // Optimized touch handling for mobile
  const handleTouchStartEvent = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMoveEvent = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEndEvent = useCallback(() => {
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
  }, [touchStart, touchEnd, currentSection, sections.length, handleSectionChange]);

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

  // Initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setAutoPlay(false); // Explicitly set to false on load
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Optimized scroll/swipe handling
  useEffect(() => {
    if (isMenuOpen) return;

    let touchStartY = 0;
    let touchStartX = 0;
    const threshold = 50;
    let wheelTimeout: NodeJS.Timeout;
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      if (isMenuOpen || isMobile || isScrolling) return;
      
      e.preventDefault();
      isScrolling = true;
      
      if (e.deltaY > threshold) {
        handleSectionChange((currentSection + 1) % sections.length);
      } else if (e.deltaY < -threshold) {
        handleSectionChange((currentSection - 1 + sections.length) % sections.length);
      }
      
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        isScrolling = false;
      }, 500); // Increased debounce time
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

      // Only respond to horizontal swipes on mobile
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          // Swipe left - next section
          handleSectionChange((currentSection + 1) % sections.length);
        } else {
          // Swipe right - previous section
          handleSectionChange((currentSection - 1 + sections.length) % sections.length);
        }
      }
    };

    // Only add wheel listener on desktop
    if (!isMobile) {
      window.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(wheelTimeout);
    };
  }, [currentSection, isMenuOpen, isMobile, sections.length, handleSectionChange]);

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
    <main 
      className="relative bg-black min-h-screen overflow-hidden"
      onTouchStart={handleTouchStartEvent}
      onTouchMove={handleTouchMoveEvent}
      onTouchEnd={handleTouchEndEvent}
    >
      {/* Navigation */}
      <Navigation
        sections={sections.map(s => s.name)}
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Main Content with hardware acceleration */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
          style={{
            willChange: 'transform, opacity',
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          {sections[currentSection].component}
        </motion.div>
      </AnimatePresence>

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
              {isMobile ? 'Swipe to navigate' : 'Use arrow keys or scroll to navigate'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}