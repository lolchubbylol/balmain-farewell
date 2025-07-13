"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Complex eucalyptus leaf with veins
const EucalyptusLeaf = ({ delay = 0, x = 0 }) => {
  const leafPath = "M20 5C12 8 5 18 5 30C5 42 12 52 20 55C28 52 35 42 35 30C35 18 28 8 20 5Z";
  const veinPaths = [
    "M20 10L20 50",
    "M20 20L12 28",
    "M20 20L28 28",
    "M20 35L14 40",
    "M20 35L26 40"
  ];
  
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
        x: x + (Math.random() - 0.5) * 200,
        rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
        opacity: [0, 0.8, 0.8, 0]
      }}
      transition={{
        duration: 15 + Math.random() * 10,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
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
};

// Complex particle system
const ParticleField = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
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
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default function VisualHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = 400;

    let progress = 0;
    let time = 0;
    const animationDuration = 5000;
    const startTime = Date.now();

    // Create control points for smooth EKG curve
    const createEKGPath = (progress: number) => {
      const points = [];
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;
      
      // Generate smooth EKG curve with proper continuity
      for (let i = 0; i <= progress * 1000; i++) {
        const x = (i / 1000) * width;
        let y = centerY;
        
        const t = i / 1000;
        
        // Create realistic EKG pattern with smooth transitions
        if (t < 0.4) {
          // Baseline with subtle variation
          y = centerY + Math.sin(t * 20) * 2 + Math.cos(t * 30) * 1;
        } else if (t >= 0.4 && t < 0.45) {
          // P wave (smooth bump)
          const localT = (t - 0.4) / 0.05;
          y = centerY - Math.sin(localT * Math.PI) * 30;
        } else if (t >= 0.45 && t < 0.47) {
          // PR segment
          y = centerY + Math.sin(t * 40) * 2;
        } else if (t >= 0.47 && t < 0.48) {
          // Q wave (small dip)
          const localT = (t - 0.47) / 0.01;
          y = centerY + Math.sin(localT * Math.PI) * 15;
        } else if (t >= 0.48 && t < 0.49) {
          // R wave (sharp peak)
          const localT = (t - 0.48) / 0.01;
          y = centerY - Math.sin(localT * Math.PI) * 150 * Math.pow(1 - localT, 0.3);
        } else if (t >= 0.49 && t < 0.5) {
          // S wave (sharp dip)
          const localT = (t - 0.49) / 0.01;
          y = centerY + Math.sin(localT * Math.PI) * 180 * Math.pow(localT, 0.3);
        } else if (t >= 0.5 && t < 0.52) {
          // Return to baseline
          const localT = (t - 0.5) / 0.02;
          const baselineY = centerY + Math.sin(t * 20) * 2;
          const sWaveEndY = centerY + 180;
          y = sWaveEndY + (baselineY - sWaveEndY) * Math.pow(localT, 2);
        } else if (t >= 0.52 && t < 0.58) {
          // ST segment
          y = centerY + Math.sin(t * 25) * 3 + Math.cos(t * 35) * 2;
        } else if (t >= 0.58 && t < 0.63) {
          // T wave (smooth bump)
          const localT = (t - 0.58) / 0.05;
          y = centerY - Math.sin(localT * Math.PI) * 35 * (1 + Math.sin(time * 0.005) * 0.1);
        } else {
          // Return to baseline with variation
          y = centerY + Math.sin(t * 20) * 2 + Math.cos(t * 30) * 1;
        }
        
        points.push({ x, y });
      }
      
      return points;
    };

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

      const points = createEKGPath(progress);
      
      // Draw multiple layers for depth
      for (let layer = 0; layer < 3; layer++) {
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 4 - layer;
        ctx.globalAlpha = 1 - layer * 0.3;
        ctx.shadowBlur = 40 - layer * 10;
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

      // Add glowing endpoint
      if (progress < 1 && points.length > 0) {
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
        setTimeout(() => setShowThankYou(true), 500);
      }
    };

    drawEKG();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      drawEKG();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-b from-hospital-dark via-[#0A1A1A] to-[#001525]">
      {/* Complex background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(78, 205, 196, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 204, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(0, 132, 61, 0.1) 0%, transparent 50%)
          `
        }} />
      </div>

      {/* Southern Cross Constellation with connecting lines */}
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
                opacity: [0, 1, 0.7, 1],
                scale: 1 
              }}
              transition={{ 
                delay: i * 0.2,
                duration: 2,
                opacity: { repeat: Infinity, duration: 3 + i * 0.5 }
              }}
            />
          ))}
        </svg>
      </div>

      {/* Particle field */}
      <ParticleField />

      {/* Floating Eucalyptus Leaves */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <EucalyptusLeaf 
            key={i} 
            delay={i * 1.5} 
            x={Math.random() * window.innerWidth}
          />
        ))}
      </div>

      {/* EKG Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-1/2 -translate-y-1/2 opacity-90 z-10"
      />
      
      {/* Thank You Text */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-20 flex items-center justify-center h-full"
          >
            <div className="text-center">
              <motion.h1
                className="text-6xl md:text-8xl font-bold text-hospital-mint mb-8"
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
                  `
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
                <p className="text-2xl md:text-3xl text-hospital-coral">
                  Balmain Hospital Lever Ward
                </p>
                <p className="text-xl text-hospital-mint/80">
                  UNIVERSITY OF SYDNEY • Class of 2025
                </p>
              </motion.div>

              {/* Complex geometric pattern instead of simple koala */}
              <motion.div
                className="absolute -bottom-20 right-10"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}