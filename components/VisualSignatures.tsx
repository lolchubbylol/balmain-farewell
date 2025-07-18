"use client";

import React, { useEffect, useState, memo, useMemo, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion';

// Memoized signature path component with enhanced effects
const SignaturePath = memo(({ path, color, delay, animationStarted }: { 
  path: string; 
  color: string; 
  delay: number;
  animationStarted: boolean;
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  
  return (
    <svg width="150" height="80" className="w-full h-16 sm:h-20 relative">
      {/* Paper texture effect */}
      <defs>
        <filter id="paperTexture">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" seed="2" />
          <feDisplacementMap in="SourceGraphic" scale="1" />
        </filter>
        <linearGradient id={`inkGradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.9" />
        </linearGradient>
      </defs>
      
      {/* Main signature path with varying stroke width */}
      <motion.path
        d={path}
        stroke={`url(#inkGradient-${color})`}
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animationStarted ? { 
          pathLength: 1, 
          opacity: 1,
          strokeWidth: [2, 3, 2.5, 3.5, 2, 3]
        } : {}}
        transition={{ 
          pathLength: { duration: 1.5, delay, ease: "easeInOut" },
          opacity: { duration: 0.5, delay },
          strokeWidth: { duration: 1.5, delay, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }
        }}
        onAnimationStart={() => setIsDrawing(true)}
        onAnimationComplete={() => setIsDrawing(false)}
        style={{
          willChange: 'transform, opacity',
          transform: 'translate3d(0, 0, 0)',
          filter: 'url(#paperTexture)'
        }}
      />
      
      {/* Pen cursor that follows the path */}
      {isDrawing && (
        <motion.circle
          r="3"
          fill={color}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5]
          }}
          transition={{ duration: 1.5, delay }}
          style={{
            offsetPath: `path('${path}')`,
            offsetDistance: '100%',
            animationDuration: '1.5s',
            animationDelay: `${delay}s`
          }}
        />
      )}
      
      {/* Enhanced ink splatter with particles */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={animationStarted ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: delay + 1.5 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            cx={140 + (Math.random() - 0.5) * 10}
            cy={45 + (Math.random() - 0.5) * 10}
            r={Math.random() * 2 + 0.5}
            fill={color}
            initial={{ scale: 0 }}
            animate={{ 
              scale: [0, 1.5, 1],
              opacity: [0, 1, 0.8]
            }}
            transition={{ 
              delay: delay + 1.5 + i * 0.05,
              duration: 0.3
            }}
          />
        ))}
      </motion.g>
    </svg>
  );
});

SignaturePath.displayName = 'SignaturePath';

// Memoized student card component with 3D effects
const StudentCard = memo(({ student, index, animationStarted }: {
  student: any;
  index: number;
  animationStarted: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  
  // Mouse tracking for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smooth animations
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  
  // Shine effect
  const shineX = useTransform(mouseX, [-0.5, 0.5], [-100, 100]);
  const shineY = useTransform(mouseY, [-0.5, 0.5], [-100, 100]);
  
  useEffect(() => {
    if (inView) {
      setIsInView(true);
    }
  }, [inView]);
  
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return; // Skip expensive calculations on mobile
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [isMobile, mouseX, mouseY]);
  
  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    mouseX.set(0);
    mouseY.set(0);
  }, [isMobile, mouseX, mouseY]);
  
  // Staggered entrance with 3D rotation
  const entranceVariants = {
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -100 : 100,
      y: 50,
      rotateX: -45,
      rotateY: index % 2 === 0 ? -45 : 45,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.15
      }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      className="relative perspective-1000"
      variants={entranceVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        willChange: 'transform',
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-800 overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          transformPerspective: 1000
        }}
        whileHover={{ 
          scale: 1.05,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Floating shadow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"
          style={{
            translateZ: -20,
            opacity: 0.5,
            scale: 1.1
          }}
        />
        
        {/* Shine/gloss effect */}
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
            transform: 'translateZ(10px)'
          }}
        />
        
        {/* Ripple effect container */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <motion.div
            className="absolute w-32 h-32 bg-white/10 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%'
            }}
          />
        </div>
        {/* Student info with parallax */}
        <motion.div 
          className="mb-3 sm:mb-4 relative z-10"
          style={{ transform: 'translateZ(20px)' }}
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{student.name}</h3>
          <p className="text-xs sm:text-sm text-gray-400">{student.subtitle}</p>
        </motion.div>

        {/* Signature area with enhanced effects */}
        <motion.div 
          className="bg-white/5 rounded-lg p-2 sm:p-3 md:p-4 mb-3 sm:mb-4 relative overflow-hidden"
          style={{ transform: 'translateZ(15px)' }}
        >
          {/* Enhanced paper texture lines with animation */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            {[...Array(isMobile ? 4 : 8)].map((_, i) => (
              <motion.div
                key={i}
                className="h-px bg-gray-600"
                style={{ marginTop: `${i * 10}px` }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: index * 0.3 + i * 0.05, duration: 0.5 }}
              />
            ))}
          </div>
          
          <SignaturePath 
            path={student.signature} 
            color={student.color}
            delay={index * 0.3}
            animationStarted={animationStarted && isInView}
          />
        </motion.div>

        {/* Fun fact with slide-in effect */}
        <motion.div
          className="flex items-center justify-between text-xs sm:text-sm relative z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.3 + 1, type: "spring" }}
          style={{ transform: 'translateZ(10px)' }}
        >
          <span className="text-gray-500">Fun fact:</span>
          <span className="text-gray-400">{student.funFact}</span>
        </motion.div>

        {/* Enhanced achievement badges with bounce */}
        <motion.div
          className="mt-3 sm:mt-4 flex gap-1 sm:gap-2 relative z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.3 + 1.5 }}
          style={{ transform: 'translateZ(25px)' }}
        >
          {index === 0 && (
            <motion.span 
              className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-500/20 text-blue-400 text-[10px] sm:text-xs rounded cursor-pointer relative overflow-hidden"
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <motion.span
                className="absolute inset-0 bg-blue-400/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative">Question Champion</span>
            </motion.span>
          )}
          {index === 1 && (
            <motion.span 
              className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-red-500/20 text-red-400 text-[10px] sm:text-xs rounded cursor-pointer relative overflow-hidden"
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 20px rgba(239, 68, 68, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <motion.span
                className="absolute inset-0 bg-red-400/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative">Solo Female Warrior</span>
            </motion.span>
          )}
          {index === 2 && (
            <motion.span 
              className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-cyan-500/20 text-cyan-400 text-[10px] sm:text-xs rounded cursor-pointer relative overflow-hidden"
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <motion.span
                className="absolute inset-0 bg-cyan-400/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative">Policy Expert</span>
            </motion.span>
          )}
          {index === 3 && (
            <motion.span 
              className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-yellow-500/20 text-yellow-400 text-[10px] sm:text-xs rounded cursor-pointer relative overflow-hidden"
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 20px rgba(234, 179, 8, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <motion.span
                className="absolute inset-0 bg-yellow-400/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative">Mr. Nice Guy™</span>
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

StudentCard.displayName = 'StudentCard';

const VisualSignatures: React.FC = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  useEffect(() => {
    const timer = setTimeout(() => setAnimationStarted(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll for dynamic gradient
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const students = useMemo(() => [
    {
      name: "Nathan",
      subtitle: "The One Who Asked Too Many Questions",
      color: "#4A90E2",
      signature: "M20,50 Q40,30 60,50 T100,50 Q120,35 140,50",
      funFact: "Diet: 90% powder, 10% Mercia's chocolate"
    },
    {
      name: "Jolia", 
      subtitle: "The Only Female Student Nurse",
      color: "#FF6B6B",
      signature: "M20,45 Q35,25 50,45 Q65,65 80,45 Q95,25 110,45 L130,40",
      funFact: "The only female USYD nursing student Class of 2025 doing PM shifts at Lever Ward, Balmain Hospital 33.8568°S, 151.1784°E. Keeps us boys in check 💪"
    },
    {
      name: "Sonny",
      subtitle: "The Rule Follower",
      color: "#4ECDC4", 
      signature: "M15,50 Q30,30 45,50 Q60,70 75,50 Q90,30 105,50 Q120,50 135,45",
      funFact: "Thinks deeply about things that matter"
    },
    {
      name: "Gabrielle",
      subtitle: "The Nice Guy™",
      color: "#FFD93D",
      signature: "M25,50 Q40,35 55,50 Q70,65 85,50 Q100,35 115,50 L125,45",
      funFact: "The chill one™ (patent pending)"
    }
  ], []);

  // Reduce floating items on mobile
  const floatingItemCount = isMobile ? 10 : 20;

  return (
    <div 
      className="h-screen relative overflow-hidden flex flex-col"
      style={{
        background: `linear-gradient(${180 + scrollY * 0.1}deg, 
          hsl(${200 + scrollY * 0.05}, 20%, 5%) 0%, 
          hsl(${240 + scrollY * 0.03}, 15%, 2%) 100%)`
      }}
    >
      <style jsx global>{`
        @keyframes medical-float {
          0% {
            transform: translate3d(0, -100px, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate3d(var(--x-drift, 0px), calc(100vh + 100px), 0) rotate(360deg);
            opacity: 0;
          }
        }
        
        .floating-medical {
          animation: medical-float var(--duration, 20s) linear infinite;
          animation-delay: var(--delay, 0s);
          animation-fill-mode: both;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
          opacity: 0;
        }
        
        @keyframes kangaroo-hop {
          0% {
            transform: translate3d(-100px, 0, 0);
          }
          100% {
            transform: translate3d(calc(100vw + 100px), 0, 0);
          }
        }
        
        @keyframes kangaroo-bounce {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(-10deg);
          }
        }
        
        .kangaroo-container {
          animation: kangaroo-hop 20s linear infinite;
          animation-fill-mode: both;
          will-change: transform;
          transform: translate3d(0, 0, 0);
        }
        
        .kangaroo-bounce {
          animation: kangaroo-bounce 0.8s ease-in-out infinite;
          animation-fill-mode: both;
          will-change: transform;
          transform: translate3d(0, 0, 0);
        }
        
        @keyframes ecg-pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }
        
        @keyframes grid-fade {
          0%, 100% {
            opacity: 0.02;
          }
          50% {
            opacity: 0.05;
          }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>

      {/* Enhanced background layers */}
      {/* Layer 1: Animated grid pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(78, 205, 196, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(78, 205, 196, 0.03) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'grid-fade 4s ease-in-out infinite',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
      </div>

      {/* Layer 2: ECG lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <motion.path
            d="M0,50 L100,50 L150,20 L200,80 L250,50 L300,50 L350,30 L400,70 L450,50 L500,50"
            stroke="#4ECDC4"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{
              filter: 'drop-shadow(0 0 10px rgba(78, 205, 196, 0.5))'
            }}
          />
        </svg>
      </div>

      {/* Layer 3: Subtle ambient effects with parallax */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{
          y: scrollY * 0.3
        }}
      >
        <motion.div 
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-hospital-mint/5 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Enhanced floating medical equipment with 3D effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(floatingItemCount)].map((_, i) => {
          const emojis = ['💊', '🩹', '📋', '✏️', '☕', '🌡️', '🩺', '💉', '📊', '🔬'];
          const emoji = emojis[i % emojis.length];
          const startX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920);
          const xDrift = Math.random() * 200 - 100;
          const duration = 15 + Math.random() * 10;
          const delay = (i % 10) * 2.5;
          const opacity = 0.15 + Math.random() * 0.2;
          const shouldGlow = i % 3 === 0;
          const swirleAmplitude = 30 + Math.random() * 50;

          if (isMobile) {
            return (
              <div
                key={i}
                className="absolute text-4xl floating-medical"
                style={{
                  left: `${startX}px`,
                  top: '-100px',
                  opacity,
                  '--x-drift': `${xDrift}px`,
                  '--duration': `${duration}s`,
                  '--delay': `${delay}s`,
                  filter: shouldGlow ? 'drop-shadow(0 0 15px rgba(78, 205, 196, 0.6))' : 'none'
                } as React.CSSProperties}
              >
                {emoji}
              </div>
            );
          }

          return (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{ 
                opacity,
                filter: shouldGlow ? 'drop-shadow(0 0 15px rgba(78, 205, 196, 0.6))' : 'none',
                transformStyle: 'preserve-3d'
              }}
              initial={{ 
                x: startX,
                y: -50,
                rotateX: Math.random() * 360,
                rotateY: Math.random() * 360,
                rotateZ: Math.random() * 360,
                scale: 0.8
              }}
              animate={{ 
                y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1130,
                rotateX: 360 + Math.random() * 360,
                rotateY: 360 + Math.random() * 360,
                rotateZ: 360 + Math.random() * 360,
                x: [
                  startX,
                  startX + swirleAmplitude,
                  startX - swirleAmplitude,
                  startX + xDrift
                ],
                scale: [0.8, 1.2, 0.9, 1]
              }}
              transition={{ 
                duration: duration,
                repeat: Infinity,
                delay: delay,
                x: {
                  times: [0, 0.33, 0.66, 1],
                  type: "spring",
                  stiffness: 50,
                  damping: 20
                },
                scale: {
                  times: [0, 0.3, 0.7, 1],
                  type: "spring",
                  stiffness: 100
                },
                default: {
                  ease: "linear"
                }
              }}
            >
              {emoji}
            </motion.div>
          );
        })}
      </div>

      {/* Enhanced Header with 3D text effects */}
      <motion.div 
        className="text-center pt-16 pb-4 sm:pt-20 sm:pb-10 relative z-10 flex-shrink-0"
        initial={{ opacity: 0, y: -30, rotateX: -45 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: 1000
        }}
      >
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2 sm:mb-4"
          animate={{
            textShadow: [
              "0 0 20px rgba(78, 205, 196, 0.5)",
              "0 0 40px rgba(78, 205, 196, 0.8)",
              "0 0 20px rgba(78, 205, 196, 0.5)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          The Survivors
        </motion.h1>
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-hospital-mint mb-1 sm:mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          University of Sydney • Class of 2025
        </motion.p>
        <motion.p 
          className="text-xs sm:text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          *Placement completion certificate pending
        </motion.p>
      </motion.div>

      {/* Student Cards - Scrollable container */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {students.map((student, index) => (
              <StudentCard
                key={student.name}
                student={student}
                index={index}
                animationStarted={animationStarted}
              />
            ))}
          </div>

          {/* Group message */}
          <motion.div
            className="mt-8 sm:mt-12 text-center pb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-sm sm:text-base md:text-lg text-white mb-1 sm:mb-2">
              Thanks for tolerating our endless questions
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Professional note-takers & occasional dawdlers
            </p>
            <p className="text-xs text-gray-600 mt-2 sm:mt-4">
              Making memories one question at a time
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom kangaroo animation - CSS animation on mobile */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden pointer-events-none">
        
        {isMobile ? (
          <div className="absolute bottom-0 kangaroo-container">
            <div className="relative kangaroo-bounce text-4xl" style={{ opacity: 0.8 }}>
              🦘
            </div>
          </div>
        ) : (
          <motion.div
            className="absolute bottom-0"
            initial={{ x: -100 }}
            animate={{ x: typeof window !== 'undefined' ? window.innerWidth + 100 : 2020 }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)'
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
        )}
      </div>

      {/* Enhanced Southern Cross pattern with twinkling stars */}
      <motion.div 
        className="absolute top-20 right-20 opacity-20 pointer-events-none"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 200,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg width="150" height="150" viewBox="0 0 150 150">
          {[
            { cx: 30, cy: 30, r: 3 },
            { cx: 50, cy: 50, r: 4 },
            { cx: 40, cy: 80, r: 3 },
            { cx: 70, cy: 70, r: 3 },
            { cx: 80, cy: 40, r: 2 }
          ].map((star, i) => (
            <motion.circle
              key={i}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="#4ECDC4"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
              style={{
                filter: 'drop-shadow(0 0 10px rgba(78, 205, 196, 0.8))'
              }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
};

export default VisualSignatures;