"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface NavigationProps {
  sections: string[];
  currentSection: number;
  onSectionChange: (index: number) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function Navigation({ 
  sections, 
  currentSection, 
  onSectionChange,
  isMenuOpen,
  setIsMenuOpen 
}: NavigationProps) {
  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        className="fixed top-4 left-4 z-50 p-3 bg-hospital-dark/90 backdrop-blur-sm rounded-lg border border-hospital-mint/30 md:top-6 md:left-6"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <motion.span 
            className="w-full h-0.5 bg-hospital-mint"
            animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 8 : 0 }}
          />
          <motion.span 
            className="w-full h-0.5 bg-hospital-mint"
            animate={{ opacity: isMenuOpen ? 0 : 1 }}
          />
          <motion.span 
            className="w-full h-0.5 bg-hospital-mint"
            animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -8 : 0 }}
          />
        </div>
      </motion.button>

      {/* Full Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-40"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 20 }}
              className="absolute left-0 top-0 h-full w-full sm:w-80 bg-hospital-dark/95 p-6 pt-20 sm:p-8 sm:pt-24"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-hospital-mint mb-8">Navigation</h2>
              
              <nav className="space-y-4">
                {sections.map((section, index) => (
                  <motion.button
                    key={section}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      currentSection === index 
                        ? 'bg-hospital-mint/20 text-hospital-mint border-l-4 border-hospital-mint' 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => {
                      onSectionChange(index);
                      setIsMenuOpen(false);
                    }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-hospital-coral mr-3">{index + 1}.</span>
                    {section}
                  </motion.button>
                ))}
              </nav>

              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white/50 text-sm">
                  <span className="hidden sm:inline">Use arrow keys or scroll to navigate</span>
                  <span className="sm:hidden">Swipe to navigate</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-hospital-dark/50 z-30">
        <motion.div
          className="h-full bg-gradient-to-r from-hospital-mint to-hospital-coral"
          style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
          transition={{ type: "spring", damping: 20 }}
        />
      </div>

      {/* Section Indicator - Hidden on mobile */}
      <motion.div
        className="hidden md:block fixed top-6 right-6 bg-hospital-dark/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-hospital-mint/30 z-30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-hospital-mint text-sm">
          {currentSection + 1} / {sections.length}
        </p>
        <p className="text-white text-xs mt-1">
          {sections[currentSection]}
        </p>
      </motion.div>

      {/* Bottom Navigation Dots */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30 bg-hospital-dark/80 backdrop-blur-sm px-6 py-3 rounded-full">
        {sections.map((section, index) => (
          <div key={index} className="relative group">
            <button
              onClick={() => onSectionChange(index)}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-hospital-mint w-8' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to ${section}`}
            />
            
            {/* Tooltip - Desktop only */}
            <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 bg-hospital-dark/90 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {section}
            </div>
          </div>
        ))}
      </div>

      {/* Keyboard Instructions - Desktop only */}
      <motion.div
        className="hidden lg:block fixed bottom-8 right-8 bg-hospital-dark/80 backdrop-blur-sm px-4 py-2 rounded-lg text-white/70 text-sm z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-hospital-mint">↑↓</span> Navigate • <span className="text-hospital-mint">Space</span> Auto-play
      </motion.div>
    </>
  );
}