"use client";

import { useEffect, useRef, useState, memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from 'framer-motion';

// Orbital particle system for medical theme visualization
const OrbitalParticles = memo(() => {
  const [time, setTime] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const particleCount = isMobile ? 10 : 20;
  
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setTime(t => t + 0.008);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const layer = Math.floor(i / 5); // 2 layers max on mobile, 4 on desktop
      const indexInLayer = i % 5;
      const baseRadius = 180 + layer * 100; // Good spacing between layers
      const angle = (indexInLayer / 5) * Math.PI * 2;
      const speed = 0.3 + layer * 0.12 + (i % 3) * 0.05;
      const color = ['#4ECDC4', '#FF6B6B', '#00843D', '#FFCC00', '#FF0000'][i % 5];
      const size = 5 + (layer % 2) * 3;
      const pulsePhase = i * 0.3;
      const orbitTilt = layer * 15; // Different tilt for each layer
      
      return { baseRadius, angle, speed, color, size, pulsePhase, orbitTilt, layer };
    });
  }, [particleCount]);
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative" style={{ transform: 'rotateX(20deg)' }}>
        {particles.map((particle, i) => {
          const currentAngle = particle.angle + time * particle.speed;
          const x = Math.cos(currentAngle) * particle.baseRadius;
          const y = Math.sin(currentAngle) * particle.baseRadius * 0.3;
          const z = Math.sin(currentAngle * 2) * 30;
          
          const scale = 1 + Math.sin(time * 2 + particle.pulsePhase) * 0.3;
          const opacity = 0.35 + Math.sin(time * 3 + particle.pulsePhase) * 0.2 + (particle.layer * 0.08);
          
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`,
                opacity,
                boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
                willChange: 'transform, opacity',
                transformStyle: 'preserve-3d',
              }}
            />
          );
        })}
        
        {/* Center medical cross */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div 
            className="relative"
            style={{
              transform: `rotate(${time * 20}deg) scale(${1 + Math.sin(time * 2) * 0.15})`,
              opacity: 0.8,
            }}
          >
            <div className="absolute w-16 h-4 bg-red-500 rounded-sm" style={{ top: '-2px', left: '-32px' }} />
            <div className="absolute w-4 h-16 bg-red-500 rounded-sm" style={{ top: '-32px', left: '-2px' }} />
          </div>
        </div>
      </div>
    </div>
  );
});

OrbitalParticles.displayName = 'OrbitalParticles';

// DNA Helix Component
const DNAHelix = memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute w-full h-full opacity-10" viewBox="0 0 1920 1080">
        <defs>
          <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.3"/>
            <stop offset="50%" stopColor="#00843D" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0.3"/>
          </linearGradient>
        </defs>
        <motion.g fill="url(#dnaGradient)">
          {[...Array(20)].map((_, i) => {
            const y = i * 100;
            const phase = i * 0.3;
            return (
              <motion.g key={i}>
                <motion.circle
                  cx="300"
                  cy={y}
                  r="8"
                  animate={{
                    cx: [300, 350, 400, 350, 300],
                    opacity: [0.3, 0.5, 0.8, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    delay: phase,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.circle
                  cx="400"
                  cy={y}
                  r="8"
                  animate={{
                    cx: [400, 350, 300, 350, 400],
                    opacity: [0.8, 0.5, 0.3, 0.5, 0.8]
                  }}
                  transition={{
                    duration: 4,
                    delay: phase,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.line
                  x1="300"
                  y1={y}
                  x2="400"
                  y2={y}
                  stroke="url(#dnaGradient)"
                  strokeWidth="2"
                  animate={{
                    x1: [300, 350, 400, 350, 300],
                    x2: [400, 350, 300, 350, 400]
                  }}
                  transition={{
                    duration: 4,
                    delay: phase,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.g>
            );
          })}
        </motion.g>
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
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    initial={{ scale: 0, opacity: 0.8 }}
    animate={{ 
      scale: [0, 1.5, 2],
      opacity: [0.8, 0.3, 0]
    }}
    transition={{
      duration: 1.2,
      delay,
      ease: "easeOut"
    }}
  >
    <div className="w-12 h-12 rounded-full border border-hospital-mint" />
  </motion.div>
));

PulseRing.displayName = 'PulseRing';

// Sound Wave Bars
const SoundWaveBars = memo(({ isActive }: { isActive: boolean }) => (
  <div className="absolute bottom-10 right-10 flex items-end gap-1">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="w-1 bg-hospital-mint"
        animate={{
          height: isActive ? [10, 30, 10] : 10,
          opacity: isActive ? [0.3, 1, 0.3] : 0.3
        }}
        transition={{
          duration: 0.5 + i * 0.1,
          repeat: Infinity,
          delay: i * 0.1
        }}
      />
    ))}
  </div>
));

SoundWaveBars.displayName = 'SoundWaveBars';

// Memoized eucalyptus leaf component with CSS animation fallback for mobile
const EucalyptusLeaf = memo(({ delay = 0, x = 0, index = 0 }: { delay?: number; x?: number; index?: number }) => {
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
  
  // Use stable values based on index instead of Math.random()
  const xDrift = ((index * 137) % 300) - 150; // Deterministic pseudo-random
  const rotation = 360 + ((index * 213) % 360);
  const duration = 20 + ((index * 97) % 10);
  
  if (isMobile) {
    return (
      <div 
        className="absolute pointer-events-none floating-leaf"
        style={{
          left: `${x}px`,
          top: '-100px',
          animationDelay: `${delay}s`,
          '--x-drift': `${xDrift}px`,
          '--rotation': `${rotation}deg`,
          '--duration': `${duration}s`,
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          contain: 'layout style paint'
        } as React.CSSProperties}
      >
        <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
          <defs>
            <linearGradient id={`leaf-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7FB069" stopOpacity="0.6"/>
              <stop offset="50%" stopColor="#5A8A4C" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#4A7A3C" stopOpacity="0.6"/>
            </linearGradient>
          </defs>
          <path d={leafPath} fill={`url(#leaf-${index})`}/>
          {veinPaths.map((path, i) => (
            <path key={i} d={path} stroke="#4A7A3C" strokeWidth="0.5" opacity="0.5"/>
          ))}
        </svg>
      </div>
    );
  }
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ 
        y: -100, 
        x: x,
        rotate: 0,
        opacity: 0 
      }}
      animate={{ 
        y: window.innerHeight + 100,
        x: x + xDrift,
        rotate: rotation - 360,
        opacity: [0, 0.8, 0.8, 0]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
        <defs>
          <linearGradient id={`leaf-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7FB069" stopOpacity="0.6"/>
            <stop offset="50%" stopColor="#5A8A4C" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#4A7A3C" stopOpacity="0.6"/>
          </linearGradient>
        </defs>
        <path d={leafPath} fill={`url(#leaf-${index})`}/>
        {veinPaths.map((path, i) => (
          <path key={i} d={path} stroke="#4A7A3C" strokeWidth="0.5" opacity="0.5"/>
        ))}
      </svg>
    </motion.div>
  );
});

EucalyptusLeaf.displayName = 'EucalyptusLeaf';

// Optimized particle field using CSS animations
const ParticleField = memo(() => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const particleCount = isMobile ? 20 : 50; // Reduce particles on mobile
  
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <style jsx>{`
        @keyframes particle-float {
          0% {
            transform: translate3d(0, 0, 0) scale(0);
            opacity: 0;
          }
          25% {
            transform: translate3d(var(--x-mid), -15px, 0) scale(0.8);
            opacity: 0.8;
          }
          50% {
            transform: translate3d(var(--x-offset), -30px, 0) scale(1);
            opacity: 1;
          }
          75% {
            transform: translate3d(var(--x-mid), -15px, 0) scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: translate3d(0, 0, 0) scale(0);
            opacity: 0;
          }
        }
        
        .particle {
          will-change: transform;
          transform: translate3d(0, 0, 0);
        }
        
      `}</style>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-hospital-mint rounded-full particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            animation: `particle-float ${particle.duration}s ${particle.delay}s infinite cubic-bezier(0.4, 0, 0.6, 1)`,
            '--x-offset': `${(Math.random() - 0.5) * 40}px`,
            '--x-mid': `${(Math.random() - 0.5) * 20}px`
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
});

ParticleField.displayName = 'ParticleField';

// Memoized Southern Cross component
const SouthernCross = memo(() => (
  <div className="absolute inset-0">
    <svg className="absolute top-0 right-0 w-1/3 h-1/2" viewBox="0 0 300 300">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Constellation lines */}
      <motion.path
        d="M150 60 L160 75 L180 66 L165 90 L144 72"
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: 1 }}
      />
      
      {/* Stars */}
      {[
        { x: 150, y: 60, size: 3 },
        { x: 160, y: 75, size: 4 },
        { x: 180, y: 66, size: 3 },
        { x: 165, y: 90, size: 3 },
        { x: 144, y: 72, size: 2.5 },
      ].map((star, i) => (
        <motion.circle
          key={i}
          cx={star.x}
          cy={star.y}
          r={star.size}
          fill="white"
          filter="url(#glow)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.5, 1, 0.7, 1, 0.5],
            scale: [0.8, 1, 0.95, 1, 0.8]
          }}
          transition={{ 
            delay: i * 0.2,
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </svg>
  </div>
));

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
  
  // Clean up pulse positions after animation
  useEffect(() => {
    const cleanup = setInterval(() => {
      setPulsePositions(prev => prev.filter(p => Date.now() - p.id < 2000));
    }, 1000);
    
    return () => clearInterval(cleanup);
  }, []);

  // Create control points for smooth EKG curve
  const createEKGPath = useCallback((progress: number, width: number, height: number, time: number) => {
    const points = [];
    const centerY = height / 2;
    
    // Generate smooth EKG curve with proper continuity
    for (let i = 0; i <= progress * 1000; i++) {
      const x = (i / 1000) * width;
      let y = centerY;
      
      const t = i / 1000;
      
      // Create realistic EKG pattern with smooth transitions
      if (isMorphing && t > 0.7) {
        // Morph into heart shape
        const heartT = (t - 0.7) / 0.3;
        const heartScale = 50;
        const angle = heartT * Math.PI * 2;
        const heartX = 16 * Math.pow(Math.sin(angle), 3);
        const heartY = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
        y = centerY + heartY * heartScale * (1 - Math.abs(heartT - 0.5) * 2);
      } else if (t < 0.3) {
        // Baseline with subtle variation
        y = centerY + Math.sin(t * 20) * 2 + Math.cos(t * 30) * 1;
      } else if (t >= 0.3 && t < 0.38) {
        // P wave (smooth bump) - widened from 0.05 to 0.08
        const localT = (t - 0.3) / 0.08;
        y = centerY - Math.sin(localT * Math.PI) * 30;
      } else if (t >= 0.38 && t < 0.42) {
        // PR segment - widened
        y = centerY + Math.sin(t * 40) * 2;
      } else if (t >= 0.42 && t < 0.48) {
        // QRS complex as a continuous wave
        const localT = (t - 0.42) / 0.06; // Entire QRS duration
        
        if (localT < 0.15) {
          // Q wave - small dip
          const qT = localT / 0.15;
          y = centerY + Math.sin(qT * Math.PI) * 15;
        } else if (localT < 0.5) {
          // R wave - sharp rise to peak
          const rT = (localT - 0.15) / 0.35;
          y = centerY + 15 - (15 + 150) * rT; // From +15 (Q end) to -150 (R peak)
          
          // Trigger pulse visualization at R wave peak
          if (rT > 0.8 && !isMorphing) {
            const currentX = x;
            const currentY = y;
            if (Math.random() > 0.85) { // More frequent but not too much
              setPulsePositions(prev => {
                // Limit to max 4 rings at a time
                const filtered = prev.slice(-3);
                return [...filtered, { x: currentX, y: currentY, id: Date.now() }];
              });
              setShowPulse(true);
              setTimeout(() => setShowPulse(false), 500);
            }
          }
        } else {
          // S wave - descent from peak to trough
          const sT = (localT - 0.5) / 0.5;
          y = centerY - 150 + (150 + 120) * sT; // From -150 (R peak) to +120 (S trough)
        }
      } else if (t >= 0.48 && t < 0.52) {
        // Return to baseline - smooth curve from S-wave - widened
        const localT = (t - 0.48) / 0.04;
        const sWaveEndY = centerY + 120; // Match new S wave amplitude
        // Use cubic easing for smooth transition
        const easedT = localT * localT * (3.0 - 2.0 * localT);
        y = sWaveEndY * (1 - easedT) + centerY * easedT;
      } else if (t >= 0.52 && t < 0.62) {
        // ST segment - widened
        y = centerY + Math.sin(t * 25) * 3 + Math.cos(t * 35) * 2;
      } else if (t >= 0.62 && t < 0.70) {
        // T wave (smooth bump) - widened from 0.05 to 0.08
        const localT = (t - 0.62) / 0.08;
        const timeVariation = isMorphing ? 1 : (1 + Math.sin(time * 0.005) * 0.1);
        y = centerY - Math.sin(localT * Math.PI) * 35 * timeVariation;
      } else {
        // Return to baseline with smooth transition
        if (isMorphing) {
          // When morphing, stay at baseline
          y = centerY;
        } else {
          const baselineT = (t - 0.70) / (1 - 0.70);
          // Use cubic easing for smooth transition
          const easedT = baselineT * baselineT * (3.0 - 2.0 * baselineT);
          // Start from centerY and add variation that fades in
          y = centerY + Math.sin(t * 20) * 2 * easedT;
        }
      }
      
      points.push({ x, y });
    }
    
    return points;
  }, [isMorphing]);

  // Optimized EKG animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false }); // Disable alpha for better performance
    if (!ctx) return;

    const isMobileCanvas = windowWidth <= 768;
    canvas.width = isMobileCanvas ? windowWidth * 0.9 : windowWidth;
    canvas.height = isMobileCanvas ? 250 : 400;

    let progress = 0;
    let time = 0;
    const animationDuration = 5000;
    let startTime = Date.now();
    let beatCount = 0;
    
    // Heart rate variation
    const heartRateInterval = setInterval(() => {
      setHeartRate(prev => 68 + Math.floor(Math.random() * 8));
    }, 2000);

    const drawEKG = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Complex gradient with multiple color stops
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, 'rgba(78, 205, 196, 0)');
      gradient.addColorStop(0.2, 'rgba(78, 205, 196, 0.3)');
      gradient.addColorStop(0.35, 'rgba(78, 205, 196, 0.6)');
      gradient.addColorStop(0.48, 'rgba(255, 204, 0, 0.9)');
      gradient.addColorStop(0.52, 'rgba(0, 132, 61, 0.8)');
      gradient.addColorStop(0.65, 'rgba(78, 205, 196, 0.6)');
      gradient.addColorStop(0.8, 'rgba(78, 205, 196, 0.3)');
      gradient.addColorStop(1, 'rgba(78, 205, 196, 0)');
      
      const currentTime = Date.now() - startTime;
      progress = Math.min(currentTime / animationDuration, 1);
      time = currentTime;

      const points = createEKGPath(progress, canvas.width, canvas.height, time);
      
      // Draw fewer layers on mobile
      const isMobile = windowWidth <= 768;
      const layers = isMobile ? 1 : 3;
      
      for (let layer = 0; layer < layers; layer++) {
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 4 - layer;
        ctx.globalAlpha = 1 - layer * 0.3;
        ctx.shadowBlur = isMobile ? 20 : 40 - layer * 10;
        ctx.shadowColor = '#4ECDC4';
        
        ctx.beginPath();
        
        // Use quadratic curves for ultra-smooth lines
        if (points.length > 0) {
          ctx.moveTo(points[0].x, points[0].y);
          
          for (let i = 1; i < points.length - 1; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
          }
          
          // Last point
          if (points.length > 1) {
            const lastPoint = points[points.length - 1];
            ctx.lineTo(lastPoint.x, lastPoint.y);
          }
        }

        ctx.stroke();
      }
      
      ctx.globalAlpha = 1;

      // Add glowing endpoint (skip on mobile for performance)
      if (!isMobile && progress < 1 && points.length > 0) {
        const lastPoint = points[points.length - 1];
        const glowGradient = ctx.createRadialGradient(lastPoint.x, lastPoint.y, 0, lastPoint.x, lastPoint.y, 20);
        glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        glowGradient.addColorStop(0.5, 'rgba(78, 205, 196, 0.4)');
        glowGradient.addColorStop(1, 'rgba(78, 205, 196, 0)');
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, 20, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pulsing effect when complete
      if (progress === 1) {
        const pulseAlpha = 0.3 * (1 + Math.sin(Date.now() * 0.003));
        ctx.globalAlpha = pulseAlpha;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(drawEKG);
      } else {
        // Start morphing animation
        setIsMorphing(true);
        setTimeout(() => {
          setShowThankYou(true);
        }, 1500);
        
        // Don't loop - let it stay at the end
      }
    };

    drawEKG();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearInterval(heartRateInterval);
    };
  }, [createEKGPath, windowWidth, isMorphing]);

  const isMobile = windowWidth <= 768;
  const leafCount = isMobile ? 5 : 20; // Further reduce leaves on mobile for performance
  
  // Get current date/time
  const currentDate = new Date();
  const dateStr = currentDate.toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = currentDate.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-b from-hospital-dark via-[#0A1A1A] to-[#001525]">
      <style jsx global>{`
        @keyframes floating-leaf {
          0% {
            transform: translate3d(0, -100px, 0) rotate(0deg) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translate3d(var(--x-drift, 50px), calc(100vh + 200px), 0) rotate(var(--rotation, 360deg)) scale(0.8);
            opacity: 0;
          }
        }
        
        .floating-leaf {
          animation: floating-leaf var(--duration, 20s) cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-fill-mode: both;
          backface-visibility: hidden;
          perspective: 1000px;
          transform-style: preserve-3d;
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
        {useMemo(() => 
          [...Array(leafCount)].map((_, i) => {
            const x = (i * 137 * windowWidth / leafCount) % windowWidth; // Stable positioning
            return (
              <EucalyptusLeaf 
                key={i} 
                index={i}
                delay={i * 1.5} 
                x={x}
              />
            );
          }), [leafCount, windowWidth]
        )}
      </div>
      
      {/* Orbital Medical Particle System */}
      <OrbitalParticles />

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
            
            {/* Pulse Rings */}
            {pulsePositions.map(pos => (
              <PulseRing key={pos.id} x={pos.x} y={pos.y} delay={0} />
            ))}
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
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 1.5,
                  type: "spring",
                  damping: 12,
                  stiffness: 100
                }}
                style={{
                  textShadow: `
                    0 0 30px rgba(78, 205, 196, 0.5),
                    0 0 60px rgba(78, 205, 196, 0.3),
                    0 0 90px rgba(78, 205, 196, 0.2),
                    0 0 120px rgba(78, 205, 196, 0.1)
                  `,
                  willChange: 'transform',
                  transform: 'translate3d(0, 0, 0)'
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