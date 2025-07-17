"use client";

import React, { useEffect, useState, memo, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';

// Firework particle component
const FireworkParticle = memo(({ x, y, color, delay = 0 }: {
  x: number;
  y: number;
  color: string;
  delay?: number;
}) => {
  const angle = Math.random() * Math.PI * 2;
  const velocity = 100 + Math.random() * 200;
  const lifetime = 1 + Math.random() * 1;
  
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{
        left: x,
        top: y,
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}`,
      }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity + (lifetime * 50), // gravity effect
        scale: [0, 1.5, 0],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: lifetime,
        delay: delay,
        ease: "easeOut",
      }}
    />
  );
});

FireworkParticle.displayName = 'FireworkParticle';

// Firework explosion component
const Firework = memo(({ x, y, onComplete }: {
  x: number;
  y: number;
  onComplete?: () => void;
}) => {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#DDA0DD', '#FF69B4'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const particleCount = 30 + Math.floor(Math.random() * 20);
  
  useEffect(() => {
    if (onComplete) {
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [onComplete]);
  
  return (
    <>
      {/* Trail */}
      <motion.div
        className="absolute w-1 h-20"
        style={{
          left: x,
          bottom: 0,
          background: `linear-gradient(to top, transparent, ${color})`,
        }}
        initial={{ scaleY: 0, originY: 1 }}
        animate={{ scaleY: 1, y: -y }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      {/* Explosion */}
      <div className="absolute" style={{ left: x, top: y }}>
        {Array.from({ length: particleCount }).map((_, i) => (
          <FireworkParticle
            key={i}
            x={0}
            y={0}
            color={color}
            delay={0.8 + Math.random() * 0.1}
          />
        ))}
        
        {/* Center flash */}
        <motion.div
          className="absolute w-20 h-20 rounded-full"
          style={{
            left: -40,
            top: -40,
            background: `radial-gradient(circle, ${color}, transparent)`,
            filter: 'blur(2px)',
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [0, 3, 0], opacity: [1, 0.5, 0] }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
      </div>
    </>
  );
});

Firework.displayName = 'Firework';

// 3D Opera House with animations
const AnimatedOperaHouse = memo(() => {
  const [isHovered, setIsHovered] = useState(false);
  const [spotlightIntensity, setSpotlightIntensity] = useState(0.3);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotlightIntensity(0.3 + Math.random() * 0.4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div 
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <svg width="800" height="400" viewBox="0 0 800 400" className="w-full h-full">
        <defs>
          {/* Gradients for 3D effect */}
          <linearGradient id="shell1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity={spotlightIntensity} />
            <stop offset="50%" stopColor="#FFA500" stopOpacity={spotlightIntensity * 0.8} />
            <stop offset="100%" stopColor="#FF6347" stopOpacity={spotlightIntensity * 0.5} />
          </linearGradient>
          
          <linearGradient id="shell2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" stopOpacity={spotlightIntensity} />
            <stop offset="50%" stopColor="#4682B4" stopOpacity={spotlightIntensity * 0.8} />
            <stop offset="100%" stopColor="#191970" stopOpacity={spotlightIntensity * 0.5} />
          </linearGradient>
          
          {/* Water reflection filter */}
          <filter id="water">
            <feTurbulence baseFrequency="0.02" numOctaves="3" result="turbulence" />
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="10" />
          </filter>
          
          {/* Spotlight effect */}
          <radialGradient id="spotlight" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={spotlightIntensity} />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Water/Harbor */}
        <rect x="0" y="350" width="800" height="50" fill="#001a33" opacity="0.8" />
        <rect x="0" y="350" width="800" height="50" fill="url(#spotlight)" opacity="0.3" filter="url(#water)" />
        
        {/* Opera House shells with 3D layers */}
        <g transform="translate(400, 300)">
          {/* Back layer shells */}
          <motion.g
            animate={{ 
              scaleY: isHovered ? 1.1 : 1,
              y: isHovered ? -10 : 0
            }}
            transition={{ duration: 0.5 }}
          >
            <path d="M -250 0 Q -200 -120, -150 0" fill="url(#shell1)" opacity="0.4" />
            <path d="M 150 0 Q 200 -120, 250 0" fill="url(#shell2)" opacity="0.4" />
          </motion.g>
          
          {/* Middle layer shells */}
          <motion.g
            animate={{ 
              scaleY: isHovered ? 1.15 : 1,
              y: isHovered ? -15 : 0
            }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <path d="M -200 0 Q -150 -150, -100 0" fill="url(#shell1)" stroke="#FFF" strokeWidth="2" />
            <path d="M 100 0 Q 150 -150, 200 0" fill="url(#shell2)" stroke="#FFF" strokeWidth="2" />
          </motion.g>
          
          {/* Front layer shells */}
          <motion.g
            animate={{ 
              scaleY: isHovered ? 1.2 : 1,
              y: isHovered ? -20 : 0
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <path d="M -100 0 Q -50 -180, 0 0" fill="url(#shell1)" stroke="#FFF" strokeWidth="3" />
            <path d="M 0 0 Q 50 -200, 100 0" fill="url(#shell2)" stroke="#FFF" strokeWidth="3" />
          </motion.g>
          
          {/* Animated spotlights */}
          {[...Array(6)].map((_, i) => (
            <motion.circle
              key={i}
              cx={-150 + i * 60}
              cy={0}
              r="40"
              fill="url(#spotlight)"
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>
        
        {/* Reflection in water */}
        <g transform="translate(400, 300) scale(1, -0.5)" opacity="0.3" filter="url(#water)">
          <path d="M -200 0 Q -150 -150, -100 0" fill="url(#shell1)" />
          <path d="M -100 0 Q -50 -180, 0 0" fill="url(#shell1)" />
          <path d="M 0 0 Q 50 -200, 100 0" fill="url(#shell2)" />
          <path d="M 100 0 Q 150 -150, 200 0" fill="url(#shell2)" />
        </g>
      </svg>
    </motion.div>
  );
});

AnimatedOperaHouse.displayName = 'AnimatedOperaHouse';

// Aurora Australis effect
const AuroraAustralis = memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <linearGradient id="aurora1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FF00" stopOpacity="0" />
            <stop offset="50%" stopColor="#00FF7F" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00CED1" stopOpacity="0" />
          </linearGradient>
          
          <linearGradient id="aurora2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF1493" stopOpacity="0" />
            <stop offset="50%" stopColor="#FF69B4" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#DDA0DD" stopOpacity="0" />
          </linearGradient>
          
          <filter id="auroraBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
          </filter>
        </defs>
        
        {/* Aurora waves */}
        <motion.path
          d="M 0 100 Q 200 50, 400 100 T 800 100 L 800 300 L 0 300 Z"
          fill="url(#aurora1)"
          filter="url(#auroraBlur)"
          animate={{
            d: [
              "M 0 100 Q 200 50, 400 100 T 800 100 L 800 300 L 0 300 Z",
              "M 0 150 Q 200 100, 400 150 T 800 150 L 800 300 L 0 300 Z",
              "M 0 100 Q 200 50, 400 100 T 800 100 L 800 300 L 0 300 Z",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.path
          d="M 0 150 Q 300 100, 600 150 T 1200 150 L 1200 350 L 0 350 Z"
          fill="url(#aurora2)"
          filter="url(#auroraBlur)"
          animate={{
            d: [
              "M 0 150 Q 300 100, 600 150 T 1200 150 L 1200 350 L 0 350 Z",
              "M 0 200 Q 300 150, 600 200 T 1200 200 L 1200 350 L 0 350 Z",
              "M 0 150 Q 300 100, 600 150 T 1200 150 L 1200 350 L 0 350 Z",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </svg>
    </div>
  );
});

AuroraAustralis.displayName = 'AuroraAustralis';

// 3D Confetti component
const Confetti3D = memo(({ x, delay, color }: { x: number; delay: number; color: string }) => {
  const y = useMotionValue(-50);
  const rotateX = useTransform(y, [-50, window.innerHeight + 100], [0, 720]);
  const rotateY = useTransform(y, [-50, window.innerHeight + 100], [0, 360]);
  
  const shapes = ['rect', 'circle', 'star'];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const size = 10 + Math.random() * 15;
  
  return (
    <motion.div
      className="absolute"
      style={{
        left: x,
        y,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ y: -50 }}
      animate={{
        y: window.innerHeight + 100,
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        ease: [0.4, 0, 0.2, 1],
        repeat: Infinity,
      }}
    >
      {shape === 'rect' && (
        <div
          style={{
            width: size,
            height: size * 0.6,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}40`,
          }}
        />
      )}
      {shape === 'circle' && (
        <div
          className="rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}40`,
          }}
        />
      )}
      {shape === 'star' && (
        <Star
          size={size}
          fill={color}
          color={color}
          style={{ filter: `drop-shadow(0 0 5px ${color}40)` }}
        />
      )}
    </motion.div>
  );
});

Confetti3D.displayName = 'Confetti3D';

// Animated text component
const AnimatedLetter = memo(({ letter, index, totalLetters }: {
  letter: string;
  index: number;
  totalLetters: number;
}) => {
  const delay = index * 0.05;
  const middleIndex = Math.floor(totalLetters / 2);
  const distanceFromMiddle = Math.abs(index - middleIndex);
  
  return (
    <motion.span
      className="inline-block"
      initial={{
        opacity: 0,
        y: 50,
        rotateX: -90,
        z: -100,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
      }}
      transition={{
        duration: 0.8,
        delay: delay,
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
      whileHover={{
        scale: 1.2,
        rotateY: 180,
        color: '#FFD700',
      }}
      style={{
        display: 'inline-block',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        textShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
      }}
    >
      {letter === ' ' ? '\u00A0' : letter}
    </motion.span>
  );
});

AnimatedLetter.displayName = 'AnimatedLetter';

// Southern Cross constellation with enhanced effects
const EnhancedSouthernCross = memo(() => {
  const stars = [
    { x: 50, y: 50, size: 12, delay: 0, name: 'Acrux' },
    { x: 80, y: 80, size: 16, delay: 0.2, name: 'Gacrux' },
    { x: 100, y: 60, size: 12, delay: 0.4, name: 'Imai' },
    { x: 90, y: 110, size: 12, delay: 0.6, name: 'Delta' },
    { x: 30, y: 80, size: 10, delay: 0.8, name: 'Epsilon' },
  ];

  return (
    <svg width="150" height="150" viewBox="0 0 150 150" className="absolute top-10 right-10">
      <defs>
        <radialGradient id="starGlow">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="50%" stopColor="#FFD700" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {stars.map((star, i) => (
        <g key={i}>
          {/* Star glow */}
          <motion.circle
            cx={star.x}
            cy={star.y}
            r={star.size * 3}
            fill="url(#starGlow)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.5, 0.3, 0.5],
              scale: [0, 1.5, 1, 1.5]
            }}
            transition={{ 
              delay: star.delay,
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Star core */}
          <motion.circle
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
          
          {/* Star spikes */}
          <motion.path
            d={`M ${star.x} ${star.y - star.size} L ${star.x} ${star.y + star.size} M ${star.x - star.size} ${star.y} L ${star.x + star.size} ${star.y}`}
            stroke="white"
            strokeWidth="1"
            opacity="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0.8, 1] }}
            transition={{ 
              delay: star.delay + 0.5,
              duration: 2,
              repeat: Infinity,
              repeatDelay: 2
            }}
          />
        </g>
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
});

EnhancedSouthernCross.displayName = 'EnhancedSouthernCross';

// Main component
export default function VisualFinale() {
  const [showContent, setShowContent] = useState(false);
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [fireworks, setFireworks] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [clickFireworks, setClickFireworks] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [finaleStarted, setFinaleStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Parallax transforms
  const parallaxX = useTransform(mouseX, [0, window.innerWidth], [-50, 50]);
  const parallaxY = useTransform(mouseY, [0, window.innerHeight], [-30, 30]);
  
  // Handle mouse move for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  // Initialize content
  useEffect(() => {
    setTimeout(() => setShowContent(true), 500);
    
    // Start finale sequence after 3 seconds
    setTimeout(() => setFinaleStarted(true), 3000);
  }, []);
  
  // Orchestrated fireworks
  useEffect(() => {
    if (!finaleStarted) return;
    
    const launchFirework = () => {
      const x = Math.random() * window.innerWidth;
      const y = 100 + Math.random() * 200;
      const id = Date.now() + Math.random();
      
      setFireworks(prev => [...prev, { id, x, y }]);
    };
    
    // Initial burst
    for (let i = 0; i < 5; i++) {
      setTimeout(() => launchFirework(), i * 200);
    }
    
    // Continuous fireworks
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        launchFirework();
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [finaleStarted]);
  
  // Handle click fireworks
  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    
    setClickFireworks(prev => [...prev, { id, x, y }]);
  }, []);
  
  // Remove completed fireworks
  const removeFirework = useCallback((id: number) => {
    setFireworks(prev => prev.filter(f => f.id !== id));
  }, []);
  
  const removeClickFirework = useCallback((id: number) => {
    setClickFireworks(prev => prev.filter(f => f.id !== id));
  }, []);
  
  // Generate confetti
  const confettiColors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#DDA0DD'];
  const confettiPieces = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      delay: Math.random() * 5,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    })), [confettiColors]
  );
  
  const titleText = "Journey Well Travelled";
  const titleLetters = titleText.split('');

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-[#000428] via-[#004e92] to-[#001a33] overflow-hidden cursor-crosshair"
      onClick={handleContainerClick}
    >
      {/* Aurora Australis Background */}
      <AuroraAustralis />
      
      {/* Parallax layer 1 - Far background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ x: parallaxX, y: parallaxY }}
      >
        {/* Sydney Opera House */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-30">
          <AnimatedOperaHouse />
        </div>
      </motion.div>
      
      {/* Enhanced Southern Cross */}
      <EnhancedSouthernCross />
      
      {/* Fireworks layer */}
      <div className="absolute inset-0 pointer-events-none">
        {fireworks.map(fw => (
          <Firework
            key={fw.id}
            x={fw.x}
            y={fw.y}
            onComplete={() => removeFirework(fw.id)}
          />
        ))}
        {clickFireworks.map(fw => (
          <Firework
            key={fw.id}
            x={fw.x}
            y={fw.y}
            onComplete={() => removeClickFirework(fw.id)}
          />
        ))}
      </div>
      
      {/* 3D Confetti rain */}
      <div className="absolute inset-0 pointer-events-none">
        {confettiPieces.map(piece => (
          <Confetti3D
            key={piece.id}
            x={piece.x}
            delay={piece.delay}
            color={piece.color}
          />
        ))}
      </div>
      
      {/* Main content with parallax */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-10 flex items-center justify-center min-h-screen px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            style={{ x: parallaxX, y: parallaxY, scale: 0.95 }}
          >
            <div className="text-center max-w-4xl">
              {/* Animated title */}
              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 mb-8"
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              >
                {titleLetters.map((letter, i) => (
                  <AnimatedLetter
                    key={i}
                    letter={letter}
                    index={i}
                    totalLetters={titleLetters.length}
                  />
                ))}
              </motion.h1>
              
              {/* Typewriter subtitle */}
              <motion.p
                className="text-2xl md:text-3xl text-white mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    delay: 2,
                    staggerChildren: 0.05,
                  }}
                >
                  {"A Balmain Hospital Farewell".split('').map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 + i * 0.05 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              </motion.p>
              
              {/* Thank you section with 3D effect */}
              <motion.div
                className="mb-12"
                initial={{ rotateX: -90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.h2
                  className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(255, 255, 255, 0.5)',
                      '0 0 40px rgba(255, 215, 0, 0.8)',
                      '0 0 20px rgba(255, 255, 255, 0.5)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  THANK YOU
                </motion.h2>
                
                <motion.p
                  className="text-xl md:text-2xl text-yellow-300"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 3.5 }}
                >
                  From all of us at USYD Medicine
                </motion.p>
              </motion.div>
              
              {/* Visual elements with hover effects */}
              <motion.div
                className="flex justify-center items-center gap-8 mb-12"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 4, type: "spring" }}
              >
                <motion.div 
                  className="text-5xl md:text-6xl"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  🏥
                </motion.div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart className="w-16 h-16 text-red-500 fill-red-500" />
                </motion.div>
                <motion.div 
                  className="text-5xl md:text-6xl"
                  whileHover={{ scale: 1.2, rotate: -360 }}
                  transition={{ duration: 0.5 }}
                >
                  🎓
                </motion.div>
              </motion.div>
              
              {/* Names with 3D cards */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.5 }}
              >
                {['Nathan', 'Jolia', 'Sonny', 'Gabrielle'].map((name, i) => (
                  <motion.div
                    key={name}
                    className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
                    initial={{ rotateY: -180, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ delay: 4.5 + i * 0.1 }}
                    whileHover={{ 
                      scale: 1.1,
                      rotateY: 10,
                      boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <p className="text-white text-lg font-semibold">{name}</p>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Final message with pulsing glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 5, type: "spring" }}
              >
                <motion.div 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-xl rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(34, 197, 94, 0.5)',
                      '0 0 40px rgba(59, 130, 246, 0.8)',
                      '0 0 20px rgba(34, 197, 94, 0.5)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-6 h-6" />
                  <span>Balmain Hospital 2025</span>
                  <Sparkles className="w-6 h-6" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Easter Egg - Enhanced koala */}
      <motion.div
        className="absolute bottom-4 right-4 text-xs text-gray-700 cursor-pointer select-none z-40"
        whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
        whileTap={{ scale: 0.8 }}
        onClick={(e) => {
          e.stopPropagation();
          setEasterEggClicks(prev => prev + 1);
          if (easterEggClicks >= 2) {
            setShowEasterEgg(true);
          }
        }}
      >
        <motion.span 
          className="text-2xl"
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {easterEggClicks < 3 ? '🐨' : '💻'}
        </motion.span>
      </motion.div>
      
      {/* Easter Egg Modal - Enhanced */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEasterEgg(false)}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-yellow-400/50 text-center max-w-md relative overflow-hidden"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", damping: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated background */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      delay: Math.random() * 2,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>
              
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4 relative z-10"
              >
                🎉
              </motion.div>
              
              <h3 className="text-2xl font-bold text-yellow-400 mb-2 relative z-10">
                Easter Egg Found!
              </h3>
              
              <p className="text-white mb-4 relative z-10">
                This farewell site was lovingly coded by
              </p>
              
              <motion.p 
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-4 relative z-10"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Nathan Xu
              </motion.p>
              
              <p className="text-gray-400 text-sm mb-4 relative z-10">
                USYD Medicine Class of 2025
              </p>
              
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-lg font-semibold relative z-10"
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