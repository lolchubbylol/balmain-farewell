"use client";

import { useEffect, useRef, useState, memo, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from 'framer-motion';

// Medical symbol component with 3D rotation
const MedicalSymbol = memo(({ type, delay = 0, x = 0, y = 0 }: { type: 'stethoscope' | 'pill' | 'syringe' | 'thermometer' | 'cross'; delay?: number; x?: number; y?: number }) => {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { 
    stiffness: 50, 
    damping: 20,
    mass: 0.5
  });
  const rotateY = useTransform(springValue, [0, 1], [0, 360]);
  
  // Generate smooth motion path
  const pathVariants = {
    initial: { 
      x,
      y,
      scale: 0,
      opacity: 0,
      rotateY: 0
    },
    animate: {
      x: [
        x,
        x + Math.sin(delay) * 30,
        x - Math.sin(delay + 1) * 20,
        x + Math.sin(delay + 2) * 25,
        x
      ],
      y: [
        y,
        y - 80,
        y - 120,
        y - 80,
        y + 40,
        y
      ],
      scale: [0, 1.2, 1, 1, 1, 0],
      opacity: [0, 1, 1, 1, 0.5, 0],
      rotateY: [0, 90, 180, 270, 360],
      transition: {
        duration: 12 + Math.random() * 6,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3,
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.6, 0.8, 1]
      }
    }
  };
  
  const symbols = {
    stethoscope: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 35C25 35 29 31 29 26V15C29 10 25 6 20 6C15 6 11 10 11 15V26C11 31 15 35 20 35Z" stroke="#4ECDC4" strokeWidth="2"/>
        <path d="M11 15H8C7 15 6 14 6 13C6 12 7 11 8 11H11" stroke="#4ECDC4" strokeWidth="2"/>
        <path d="M29 15H32C33 15 34 14 34 13C34 12 33 11 32 11H29" stroke="#4ECDC4" strokeWidth="2"/>
        <circle cx="20" cy="26" r="3" fill="#4ECDC4"/>
      </svg>
    ),
    pill: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="10" y="15" width="20" height="10" rx="5" stroke="#FF6B6B" strokeWidth="2"/>
        <line x1="20" y1="15" x2="20" y2="25" stroke="#FF6B6B" strokeWidth="2"/>
      </svg>
    ),
    syringe: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="15" y="10" width="10" height="20" stroke="#00843D" strokeWidth="2"/>
        <path d="M15 10L25 10L20 5L15 10Z" fill="#00843D"/>
        <line x1="20" y1="30" x2="20" y2="35" stroke="#00843D" strokeWidth="2"/>
      </svg>
    ),
    thermometer: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="18" y="5" width="4" height="25" rx="2" stroke="#FFCC00" strokeWidth="2"/>
        <circle cx="20" cy="32" r="4" stroke="#FFCC00" strokeWidth="2"/>
        <line x1="20" y1="28" x2="20" y2="32" stroke="#FF6B6B" strokeWidth="2"/>
      </svg>
    ),
    cross: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="15" y="5" width="10" height="30" fill="#FF0000"/>
        <rect x="5" y="15" width="30" height="10" fill="#FF0000"/>
      </svg>
    )
  };
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      variants={pathVariants}
      initial="initial"
      animate="animate"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
        transform: 'translateZ(0)'
      }}
    >
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        className="transform-gpu"
        style={{
          willChange: 'transform'
        }}
      >
        {symbols[type]}
      </motion.div>
    </motion.div>
  );
});

MedicalSymbol.displayName = 'MedicalSymbol';

// DNA Helix Component with smooth sine wave motion
const DNAHelix = memo(() => {
  const helixVariants = {
    animate: (i: number) => ({
      cx: [
        350 + Math.sin(i * 0.5) * 50,
        350 + Math.sin(i * 0.5 + Math.PI) * 50,
        350 + Math.sin(i * 0.5) * 50
      ],
      transition: {
        duration: 4,
        delay: i * 0.2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }
    })
  };
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute w-full h-full opacity-10" viewBox="0 0 1920 1080">
        <defs>
          <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.3"/>
            <stop offset="50%" stopColor="#00843D" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0.3"/>
          </linearGradient>
          <filter id="dnaGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <g fill="url(#dnaGradient)" filter="url(#dnaGlow)">
          {[...Array(15)].map((_, i) => {
            const y = i * 80 + 50;
            const offset = Math.sin(i * 0.5) * 50;
            
            return (
              <g key={i}>
                <motion.circle
                  cx={350 - offset}
                  cy={y}
                  r="6"
                  custom={i}
                  variants={helixVariants}
                  animate="animate"
                  style={{ opacity: 0.6 + Math.sin(i * 0.3) * 0.2 }}
                />
                <motion.circle
                  cx={350 + offset}
                  cy={y}
                  r="6"
                  custom={i}
                  variants={{
                    animate: {
                      cx: [
                        350 + offset,
                        350 - offset,
                        350 + offset
                      ],
                      transition: {
                        duration: 4,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }
                  }}
                  animate="animate"
                  style={{ opacity: 0.6 + Math.cos(i * 0.3) * 0.2 }}
                />
                <motion.line
                  x1={350 - offset}
                  y1={y}
                  x2={350 + offset}
                  y2={y}
                  stroke="url(#dnaGradient)"
                  strokeWidth="1.5"
                  opacity={0.4}
                  animate={{
                    x1: [350 - offset, 350 + offset, 350 - offset],
                    x2: [350 + offset, 350 - offset, 350 + offset],
                    opacity: [0.4, 0.7, 0.4]
                  }}
                  transition={{
                    duration: 4,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
});

DNAHelix.displayName = 'DNAHelix';

// Medical Equipment Silhouettes
const MedicalEquipmentBg = memo(() => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-0 w-64 h-64 opacity-5 blur-sm">
      <svg viewBox="0 0 200 200" fill="currentColor" className="text-hospital-mint">
        <path d="M100 20C60 20 30 50 30 90C30 130 60 160 100 180C140 160 170 130 170 90C170 50 140 20 100 20ZM90 60H110V90H140V110H110V140H90V110H60V90H90V60Z"/>
      </svg>
    </div>
    <div className="absolute bottom-0 right-0 w-96 h-96 opacity-5 blur-md transform rotate-45">
      <svg viewBox="0 0 200 200" fill="currentColor" className="text-hospital-coral">
        <rect x="80" y="20" width="40" height="120" rx="20"/>
        <circle cx="100" cy="160" r="30"/>
        <rect x="95" y="140" width="10" height="20"/>
      </svg>
    </div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-5 blur-lg">
      <svg viewBox="0 0 200 200" fill="currentColor" className="text-yellow-400">
        <path d="M100 40L120 80H80L100 40Z"/>
        <rect x="90" y="80" width="20" height="60"/>
        <circle cx="100" cy="150" r="20"/>
      </svg>
    </div>
  </div>
));

MedicalEquipmentBg.displayName = 'MedicalEquipmentBg';

// Pulse Ring Component for heartbeat visualization
const PulseRing = memo(({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) => (
  <AnimatePresence>
    <motion.div
      className="absolute pointer-events-none"
      style={{ 
        left: x - 40, // Center the ring
        top: y - 40,
        willChange: 'transform, opacity'
      }}
      initial={{ scale: 0.2, opacity: 0 }}
      animate={{ 
        scale: [0.2, 1.5, 2.5],
        opacity: [0, 0.8, 0]
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1.5,
        delay,
        ease: [0.4, 0, 0.2, 1],
        times: [0, 0.4, 1]
      }}
    >
      <div className="w-20 h-20 rounded-full border-2 border-hospital-mint transform-gpu" />
    </motion.div>
  </AnimatePresence>
));

PulseRing.displayName = 'PulseRing';

// Sound Wave Bars with smooth spring animations
const SoundWaveBars = memo(({ isActive }: { isActive: boolean }) => (
  <div className="absolute bottom-10 right-10 flex items-end gap-1">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="w-1 bg-hospital-mint transform-gpu"
        animate={{
          height: isActive ? [10, 25 + i * 3, 10] : 10,
          opacity: isActive ? [0.3, 1, 0.3] : 0.3,
          scaleY: isActive ? [1, 1.2, 1] : 1
        }}
        transition={{
          duration: 0.6 + i * 0.05,
          repeat: Infinity,
          delay: i * 0.1,
          ease: [0.4, 0, 0.6, 1],
          times: [0, 0.5, 1]
        }}
        style={{
          transformOrigin: 'bottom',
          willChange: 'transform, opacity, height'
        }}
      />
    ))}
  </div>
));

SoundWaveBars.displayName = 'SoundWaveBars';

// Memoized eucalyptus leaf component with CSS animation fallback for mobile
const EucalyptusLeaf = memo(({ delay = 0, x = 0 }: { delay?: number; x?: number }) => {
  const leafPath = "M20 5C12 8 5 18 5 30C5 42 12 52 20 55C28 52 35 42 35 30C35 18 28 8 20 5Z";
  const veinPaths = [
    "M20 10L20 50",
    "M20 20L12 28",
    "M20 20L28 28",
    "M20 35L14 40",
    "M20 35L26 40"
  ];
  
  // Use CSS animation on mobile for better performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  
  if (isMobile) {
    return (
      <div 
        className="absolute pointer-events-none floating-leaf"
        style={{
          left: `${x}px`,
          top: '-100px',
          animationDelay: `${delay}s`,
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)'
        }}
      >
        <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
          <defs>
            <linearGradient id={`leaf-${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7FB069" stopOpacity="0.6"/>
              <stop offset="50%" stopColor="#5A8A4C" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#4A7A3C" stopOpacity="0.6"/>
            </linearGradient>
          </defs>
          <path d={leafPath} fill={`url(#leaf-${delay})`}/>
          {veinPaths.map((path, i) => (
            <path key={i} d={path} stroke="#4A7A3C" strokeWidth="0.5" opacity="0.5"/>
          ))}
        </svg>
      </div>
    );
  }
  
  // Smooth floating path for desktop
  const floatPath = {
    x: [
      x,
      x + Math.sin(delay * 0.5) * 100,
      x - Math.sin(delay * 0.7) * 80,
      x + Math.sin(delay * 0.3) * 60,
      x
    ],
    y: [-100, 200, 400, 600, window.innerHeight + 100],
    rotate: [
      0,
      45 * (Math.random() > 0.5 ? 1 : -1),
      90 * (Math.random() > 0.5 ? 1 : -1),
      180 * (Math.random() > 0.5 ? 1 : -1),
      360 * (Math.random() > 0.5 ? 1 : -1)
    ],
    opacity: [0, 0.8, 0.8, 0.8, 0]
  };
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ 
        y: -100, 
        x: x,
        rotate: 0,
        opacity: 0 
      }}
      animate={floatPath}
      transition={{
        duration: 18 + Math.random() * 8,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.25, 0.5, 0.75, 1]
      }}
      style={{
        willChange: 'transform, opacity',
        transform: 'translateZ(0)'
      }}
    >
      <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
        <defs>
          <linearGradient id={`leaf-${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7FB069" stopOpacity="0.6"/>
            <stop offset="50%" stopColor="#5A8A4C" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#4A7A3C" stopOpacity="0.6"/>
          </linearGradient>
        </defs>
        <path d={leafPath} fill={`url(#leaf-${delay})`}/>
        {veinPaths.map((path, i) => (
          <path key={i} d={path} stroke="#4A7A3C" strokeWidth="0.5" opacity="0.5"/>
        ))}
      </svg>
    </motion.div>
  );
});

EucalyptusLeaf.displayName = 'EucalyptusLeaf';

// Optimized particle field using Framer Motion for smooth animations
const ParticleField = memo(() => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const particleCount = isMobile ? 15 : 30; // Reduce particles on mobile
  
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    xOffset: (Math.random() - 0.5) * 40
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-hospital-mint rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            willChange: 'transform, opacity'
          }}
          animate={{
            scale: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0],
            x: [0, particle.xOffset, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1]
          }}
        />
      ))}
    </div>
  );
});

ParticleField.displayName = 'ParticleField';

// Memoized Southern Cross component with twinkling effect
const SouthernCross = memo(() => {
  const starVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: (i: number) => ({
      opacity: [0, 1, 0.6 + Math.random() * 0.4, 1],
      scale: [0, 1.2, 1, 1],
      transition: {
        delay: i * 0.2,
        duration: 2,
        opacity: {
          repeat: Infinity,
          duration: 2 + Math.random() * 2,
          repeatType: "reverse" as const,
          ease: "easeInOut"
        },
        scale: {
          duration: 1,
          ease: [0.4, 0, 0.2, 1]
        }
      }
    })
  };
  
  return (
    <div className="absolute inset-0">
      <svg className="absolute top-0 right-0 w-1/3 h-1/2" viewBox="0 0 300 300">
        <defs>
          <filter id="starGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <radialGradient id="starGradient">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1"/>
            <stop offset="50%" stopColor="#e0f2ff" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#b3d9ff" stopOpacity="0.6"/>
          </radialGradient>
        </defs>
        
        {/* Constellation lines with smooth draw */}
        <motion.path
          d="M150 60 L160 75 L180 66 L165 90 L144 72"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ 
            duration: 3, 
            delay: 1,
            ease: "easeInOut"
          }}
        />
        
        {/* Stars with enhanced glow */}
        {[
          { x: 150, y: 60, size: 3 },
          { x: 160, y: 75, size: 4 },
          { x: 180, y: 66, size: 3 },
          { x: 165, y: 90, size: 3 },
          { x: 144, y: 72, size: 2.5 },
        ].map((star, i) => (
          <motion.g key={i}>
            {/* Star glow */}
            <motion.circle
              cx={star.x}
              cy={star.y}
              r={star.size * 3}
              fill="url(#starGradient)"
              opacity={0.3}
              custom={i}
              variants={starVariants}
              initial="initial"
              animate="animate"
            />
            {/* Star core */}
            <motion.circle
              cx={star.x}
              cy={star.y}
              r={star.size}
              fill="white"
              filter="url(#starGlow)"
              custom={i}
              variants={starVariants}
              initial="initial"
              animate="animate"
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
});

SouthernCross.displayName = 'SouthernCross';

export default function VisualHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const monitorFrameRef = useRef<HTMLDivElement>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [heartRate, setHeartRate] = useState(72);
  const [isMorphing, setIsMorphing] = useState(false);
  const animationRef = useRef<number>();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 1080);
  const [pulsePositions, setPulsePositions] = useState<Array<{x: number, y: number, id: number}>>([]);

  // Optimized resize handler with debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);
  
  // Clean up pulse positions after animation with smooth removal
  useEffect(() => {
    const cleanup = setInterval(() => {
      setPulsePositions(prev => {
        const now = Date.now();
        return prev.filter(p => {
          // Keep pulses for 1.5 seconds (duration of animation)
          const age = now - Math.floor(p.id);
          return age < 1500;
        });
      });
    }, 100); // Check more frequently for smoother cleanup
    
    return () => clearInterval(cleanup);
  }, []);

  // Create control points for smooth EKG curve with interpolation
  const createEKGPath = useCallback((progress: number, width: number, height: number, time: number) => {
    const points = [];
    const centerY = height / 2;
    const samplesPerPixel = 2; // Higher sampling for smoother curves
    const totalSamples = Math.floor(progress * width * samplesPerPixel);
    
    // Helper function for smooth interpolation
    const smoothStep = (edge0: number, edge1: number, x: number) => {
      const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
      return t * t * (3 - 2 * t);
    };
    
    // Generate smooth EKG curve with proper continuity
    for (let i = 0; i <= totalSamples; i++) {
      const x = (i / totalSamples) * progress * width;
      let y = centerY;
      
      const t = i / totalSamples;
      
      // Create realistic EKG pattern with smooth transitions
      if (isMorphing && t > 0.7) {
        // Smooth morph into heart shape
        const morphProgress = smoothStep(0.7, 1, t);
        const heartT = (t - 0.7) / 0.3;
        const heartScale = 50 * morphProgress;
        const angle = heartT * Math.PI * 2;
        const heartX = 16 * Math.pow(Math.sin(angle), 3);
        const heartY = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
        
        // Blend between EKG and heart shape
        const baselineY = centerY + Math.sin(t * 20) * 2;
        y = baselineY + heartY * heartScale * smoothStep(0, 1, 1 - Math.abs(heartT - 0.5) * 2);
      } else {
        // Normal EKG pattern with smooth transitions
        const baselineVariation = Math.sin(t * 20 + time * 0.001) * 2 + Math.cos(t * 30 + time * 0.002) * 1;
        
        if (t < 0.4) {
          // Baseline
          y = centerY + baselineVariation;
        } else if (t < 0.45) {
          // P wave with smooth blending
          const localT = smoothStep(0.4, 0.45, t);
          const pWave = -Math.sin(localT * Math.PI) * 30;
          y = centerY + baselineVariation * (1 - localT) + pWave;
        } else if (t < 0.47) {
          // PR segment
          y = centerY + baselineVariation;
        } else if (t < 0.48) {
          // Q wave
          const localT = smoothStep(0.47, 0.48, t);
          const qWave = Math.sin(localT * Math.PI) * 15;
          y = centerY + baselineVariation * (1 - localT) + qWave;
        } else if (t < 0.49) {
          // R wave with smooth peak
          const localT = smoothStep(0.48, 0.49, t);
          const rWave = -Math.sin(localT * Math.PI) * 150 * Math.pow(1 - localT * 0.3, 2);
          y = centerY + rWave;
          
          // Trigger pulse at peak
          if (localT > 0.45 && localT < 0.55 && !isMorphing && Math.random() > 0.85) {
            requestAnimationFrame(() => {
              setPulsePositions(prev => [...prev, { x, y, id: Date.now() + Math.random() * 1000 }]);
            });
          }
        } else if (t < 0.5) {
          // S wave
          const localT = smoothStep(0.49, 0.5, t);
          const sWave = Math.sin(localT * Math.PI) * 180 * Math.pow(localT, 0.5);
          y = centerY + sWave;
        } else if (t < 0.52) {
          // Smooth return to baseline
          const localT = smoothStep(0.5, 0.52, t);
          const sWaveEnd = 180;
          y = centerY + sWaveEnd * (1 - Math.pow(localT, 2)) + baselineVariation * Math.pow(localT, 2);
        } else if (t < 0.58) {
          // ST segment
          y = centerY + baselineVariation * 1.5;
        } else if (t < 0.63) {
          // T wave
          const localT = smoothStep(0.58, 0.63, t);
          const tWave = -Math.sin(localT * Math.PI) * 35;
          y = centerY + baselineVariation * (1 - localT * 0.5) + tWave;
        } else {
          // Return to baseline
          y = centerY + baselineVariation;
        }
      }
      
      points.push({ x, y });
    }
    
    return points;
  }, [isMorphing]);

  // Optimized EKG animation with double buffering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
      alpha: false,
      desynchronized: true // Better performance
    });
    if (!ctx) return;

    // Set canvas size with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    const width = windowWidth;
    const height = 400;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    let progress = 0;
    let time = 0;
    const animationDuration = 5000;
    const startTime = performance.now();
    let lastFrameTime = startTime;
    let frameCount = 0;
    
    // Heart rate variation with smooth transitions
    let targetHeartRate = 72;
    let currentHeartRate = 72;
    const heartRateInterval = setInterval(() => {
      targetHeartRate = 68 + Math.floor(Math.random() * 8);
    }, 2000);

    const drawEKG = (currentTime: number) => {
      // Calculate smooth frame timing
      const deltaTime = currentTime - lastFrameTime;
      lastFrameTime = currentTime;
      frameCount++;
      
      // Smooth heart rate transition
      currentHeartRate += (targetHeartRate - currentHeartRate) * 0.05;
      if (frameCount % 10 === 0) {
        setHeartRate(Math.round(currentHeartRate));
      }
      
      // Clear with a subtle fade effect for trail
      ctx.fillStyle = 'rgba(1, 16, 18, 0.1)';
      ctx.fillRect(0, 0, width, height);
      
      // Complex gradient with smooth transitions
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      const gradientProgress = Math.sin(currentTime * 0.0005) * 0.1 + 0.5;
      
      gradient.addColorStop(0, 'rgba(78, 205, 196, 0)');
      gradient.addColorStop(0.2, `rgba(78, 205, 196, ${0.3 + gradientProgress * 0.1})`);
      gradient.addColorStop(0.35, `rgba(78, 205, 196, ${0.6 + gradientProgress * 0.2})`);
      gradient.addColorStop(0.48, `rgba(255, 204, 0, ${0.9 + gradientProgress * 0.1})`);
      gradient.addColorStop(0.52, `rgba(0, 132, 61, ${0.8 + gradientProgress * 0.2})`);
      gradient.addColorStop(0.65, `rgba(78, 205, 196, ${0.6 + gradientProgress * 0.1})`);
      gradient.addColorStop(0.8, 'rgba(78, 205, 196, 0.3)');
      gradient.addColorStop(1, 'rgba(78, 205, 196, 0)');
      
      const elapsedTime = currentTime - startTime;
      progress = Math.min(elapsedTime / animationDuration, 1);
      time = elapsedTime;

      const points = createEKGPath(progress, width, height, time);
      
      // Adaptive quality based on performance
      const isMobile = windowWidth <= 768;
      const targetFPS = 60;
      const currentFPS = deltaTime > 0 ? 1000 / deltaTime : targetFPS;
      const layers = isMobile || currentFPS < 30 ? 1 : (currentFPS < 50 ? 2 : 3);
      
      // Save context state
      ctx.save();
      
      for (let layer = 0; layer < layers; layer++) {
        ctx.strokeStyle = gradient;
        ctx.lineWidth = (4 - layer) * (1 + Math.sin(currentTime * 0.002) * 0.1);
        ctx.globalAlpha = (1 - layer * 0.3) * 0.9;
        ctx.shadowBlur = isMobile ? 15 : 30 - layer * 8;
        ctx.shadowColor = '#4ECDC4';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        
        // Use cubic Bezier curves for ultra-smooth lines
        if (points.length > 2) {
          ctx.moveTo(points[0].x, points[0].y);
          
          // Calculate control points for smooth curve
          for (let i = 1; i < points.length - 2; i++) {
            const cp1x = (points[i].x + points[i + 1].x) / 2;
            const cp1y = (points[i].y + points[i + 1].y) / 2;
            const cp2x = cp1x;
            const cp2y = cp1y;
            
            ctx.bezierCurveTo(
              points[i].x, points[i].y,
              cp1x, cp1y,
              points[i + 1].x, points[i + 1].y
            );
          }
          
          // Last segment
          if (points.length > 1) {
            const lastPoint = points[points.length - 1];
            const secondLastPoint = points[points.length - 2];
            ctx.quadraticCurveTo(
              secondLastPoint.x, secondLastPoint.y,
              lastPoint.x, lastPoint.y
            );
          }
        }

        ctx.stroke();
      }
      
      // Restore context state
      ctx.restore();

      // Add glowing endpoint with smooth animation
      if (!isMobile && progress < 1 && points.length > 0) {
        const lastPoint = points[points.length - 1];
        const glowSize = 15 + Math.sin(currentTime * 0.01) * 5;
        const glowGradient = ctx.createRadialGradient(
          lastPoint.x, lastPoint.y, 0,
          lastPoint.x, lastPoint.y, glowSize
        );
        glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        glowGradient.addColorStop(0.3, 'rgba(78, 205, 196, 0.6)');
        glowGradient.addColorStop(0.6, 'rgba(78, 205, 196, 0.3)');
        glowGradient.addColorStop(1, 'rgba(78, 205, 196, 0)');
        
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Smooth pulsing effect when complete
      if (progress === 1) {
        const pulseAlpha = 0.2 + 0.1 * Math.sin(currentTime * 0.003);
        ctx.save();
        ctx.globalAlpha = pulseAlpha;
        ctx.globalCompositeOperation = 'lighter';
        
        // Redraw the last frame with glow
        const glowPoints = createEKGPath(1, width, height, time);
        ctx.strokeStyle = '#4ECDC4';
        ctx.lineWidth = 8;
        ctx.shadowBlur = 40;
        ctx.shadowColor = '#4ECDC4';
        
        ctx.beginPath();
        if (glowPoints.length > 0) {
          ctx.moveTo(glowPoints[0].x, glowPoints[0].y);
          for (let i = 1; i < glowPoints.length; i++) {
            ctx.lineTo(glowPoints[i].x, glowPoints[i].y);
          }
        }
        ctx.stroke();
        ctx.restore();
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(drawEKG);
      } else {
        // Smooth transition to morphing
        if (!isMorphing) {
          setTimeout(() => {
            setIsMorphing(true);
            setTimeout(() => {
              setShowThankYou(true);
              clearInterval(heartRateInterval);
            }, 1000);
          }, 500);
        }
      }
    };

    // Start animation
    animationRef.current = requestAnimationFrame(drawEKG);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearInterval(heartRateInterval);
    };
  }, [createEKGPath, windowWidth, isMorphing]);

  const isMobile = windowWidth <= 768;
  const leafCount = isMobile ? 8 : 20; // Reduce leaves on mobile
  const medicalSymbolCount = isMobile ? 5 : 12;
  
  // Get current date/time
  const currentDate = new Date();
  const dateStr = currentDate.toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = currentDate.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-b from-hospital-dark via-[#0A1A1A] to-[#001525]">
      <style jsx global>{`
        @keyframes floating-leaf {
          0% {
            transform: translate3d(0, -100px, 0) rotate(0deg) scale(0);
            opacity: 0;
          }
          10% {
            transform: translate3d(10px, 0, 0) rotate(45deg) scale(1);
            opacity: 0.8;
          }
          90% {
            transform: translate3d(var(--x-drift, 50px), calc(100vh), 0) rotate(360deg) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate3d(var(--x-drift, 50px), calc(100vh + 200px), 0) rotate(360deg) scale(0);
            opacity: 0;
          }
        }
        
        .floating-leaf {
          animation: floating-leaf 20s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-fill-mode: both;
          --x-drift: ${Math.random() * 200 - 100}px;
          will-change: transform, opacity;
        }
        
        @media (max-width: 768px) {
          .monitor-frame {
            margin: 0 auto;
            padding: 0 1rem;
          }
        }
      `}</style>

      {/* Complex background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(78, 205, 196, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 204, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(0, 132, 61, 0.1) 0%, transparent 50%)
          `,
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)'
        }} />
      </div>

      {/* Medical Equipment Background */}
      <MedicalEquipmentBg />
      
      {/* DNA Helix Background */}
      <DNAHelix />
      
      {/* Southern Cross Constellation */}
      <SouthernCross />

      {/* Particle field */}
      <ParticleField />

      {/* Floating Eucalyptus Leaves */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(leafCount)].map((_, i) => (
          <EucalyptusLeaf 
            key={i} 
            delay={i * 1.5} 
            x={Math.random() * windowWidth}
          />
        ))}
      </div>
      
      {/* Floating Medical Symbols */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(medicalSymbolCount)].map((_, i) => {
          const types: Array<'stethoscope' | 'pill' | 'syringe' | 'thermometer' | 'cross'> = ['stethoscope', 'pill', 'syringe', 'thermometer', 'cross'];
          return (
            <MedicalSymbol
              key={`med-${i}`}
              type={types[i % types.length]}
              delay={i * 2}
              x={Math.random() * windowWidth}
              y={Math.random() * windowHeight}
            />
          );
        })}
      </div>

      {/* Medical Monitor Frame */}
      <div 
        ref={monitorFrameRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          width: isMobile ? '90%' : '80%',
          maxWidth: '1200px'
        }}
      >
        {/* Monitor Frame */}
        <div className="relative bg-gray-900 rounded-lg p-4 shadow-2xl border-2 border-gray-700">
          {/* Monitor Header */}
          <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-center text-xs text-green-400 font-mono">
            <div className="flex gap-4">
              <span>PATIENT: J.SMITH</span>
              <span>ID: 12345</span>
            </div>
            <div className="flex gap-4">
              <span>{timeStr}</span>
              <span>{dateStr}</span>
            </div>
          </div>
          
          {/* Monitor Indicators */}
          <div className="absolute top-2 right-2 flex gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            <div className="w-2 h-2 bg-gray-600 rounded-full" />
          </div>
          
          {/* EKG Canvas Container */}
          <div className="relative mt-8 mb-20">
            <canvas
              ref={canvasRef}
              className="w-full opacity-90"
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)'
              }}
            />
            
            {/* Heart Rate Display */}
            <div className="absolute top-2 left-2 bg-black/50 rounded px-3 py-1">
              <div className="text-hospital-mint font-mono">
                <span className="text-2xl font-bold">{heartRate}</span>
                <span className="text-sm ml-1">BPM</span>
              </div>
            </div>
            
            {/* Pulse Rings with AnimatePresence */}
            <AnimatePresence mode="popLayout">
              {pulsePositions.map(pos => (
                <PulseRing key={pos.id} x={pos.x} y={pos.y} delay={0} />
              ))}
            </AnimatePresence>
          </div>
          
          {/* Vital Signs Display */}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/30 rounded-b-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="text-center">
                <div className="text-gray-400">BP</div>
                <div className="text-green-400 font-bold">120/80</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">SpO2</div>
                <div className="text-cyan-400 font-bold">98%</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Temp</div>
                <div className="text-yellow-400 font-bold">36.5°C</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Resp</div>
                <div className="text-purple-400 font-bold">16/min</div>
              </div>
            </div>
          </div>
          
          {/* Monitor Buttons */}
          <div className="absolute bottom-2 right-2 flex gap-1">
            {['MENU', 'ALARM', 'FREEZE'].map(label => (
              <button key={label} className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded hover:bg-gray-700 transition-colors">
                {label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Sound Wave Visualization */}
        <SoundWaveBars isActive={showPulse} />
      </div>
      
      {/* Thank You Text */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-20 flex items-center justify-center h-full"
          >
            <div className="text-center px-4">
              <motion.h1
                className="text-5xl sm:text-6xl md:text-8xl font-bold text-hospital-mint mb-6 sm:mb-8 px-4"
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ 
                  duration: 1.2,
                  type: "spring",
                  damping: 15,
                  stiffness: 80,
                  opacity: { duration: 0.6 }
                }}
                style={{
                  textShadow: `
                    0 0 30px rgba(78, 205, 196, 0.5),
                    0 0 60px rgba(78, 205, 196, 0.3),
                    0 0 90px rgba(78, 205, 196, 0.2),
                    0 0 120px rgba(78, 205, 196, 0.1)
                  `,
                  willChange: 'transform, opacity',
                  transform: 'translateZ(0)'
                }}
              >
                THANK YOU
              </motion.h1>
              
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="space-y-4"
              >
                <p className="text-xl sm:text-2xl md:text-3xl text-hospital-coral">
                  Balmain Hospital Lever Ward
                </p>
                <p className="text-lg sm:text-xl text-hospital-mint/80">
                  UNIVERSITY OF SYDNEY • Class of 2025
                </p>
              </motion.div>

              {/* Complex geometric pattern - hidden on mobile */}
              {!isMobile && (
                <motion.div
                  className="absolute -bottom-20 right-10 hidden sm:block"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.5, duration: 2, type: "spring" }}
                >
                  <svg width="150" height="150" viewBox="0 0 150 150" className="opacity-20">
                    <defs>
                      <linearGradient id="geoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.5"/>
                        <stop offset="100%" stopColor="#00843D" stopOpacity="0.5"/>
                      </linearGradient>
                    </defs>
                    <g fill="url(#geoGrad)">
                      <circle cx="75" cy="75" r="70" strokeWidth="2" stroke="#4ECDC4" fill="none"/>
                      <polygon points="75,25 105,60 105,110 75,125 45,110 45,60" strokeWidth="1" stroke="#4ECDC4"/>
                      <circle cx="75" cy="75" r="40" strokeWidth="1" stroke="#4ECDC4"/>
                      <polygon points="75,55 90,75 75,95 60,75" />
                    </g>
                  </svg>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}