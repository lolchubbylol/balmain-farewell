"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function HeroEKG() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = 300;

    let progress = 0;
    const animationDuration = 3000; // 3 seconds
    const startTime = Date.now();

    const drawEKG = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#4ECDC4';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#4ECDC4';

      const currentTime = Date.now() - startTime;
      progress = Math.min(currentTime / animationDuration, 1);

      ctx.beginPath();
      
      // Draw EKG line
      const segments = 100;
      const segmentWidth = canvas.width / segments;
      
      for (let i = 0; i < segments * progress; i++) {
        const x = i * segmentWidth;
        let y = canvas.height / 2;

        // Create EKG pattern
        const position = i / segments;
        if (position > 0.45 && position < 0.47) {
          y -= 100; // P wave
        } else if (position > 0.48 && position < 0.52) {
          y += 150; // QRS complex
        } else if (position > 0.52 && position < 0.54) {
          y -= 120;
        } else if (position > 0.58 && position < 0.62) {
          y -= 30; // T wave
        }

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      if (progress < 1) {
        requestAnimationFrame(drawEKG);
      }
    };

    drawEKG();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      drawEKG();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-1/2 -translate-y-1/2 opacity-30"
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="relative z-10"
      >
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-hospital-mint neon-glow"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: 3.5, 
            duration: 1.5,
            type: "spring",
            damping: 10,
            stiffness: 100
          }}
        >
          THANK YOU
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-hospital-coral text-center mt-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 5, duration: 1 }}
        >
          Balmain Hospital Geriatric Ward
        </motion.p>
      </motion.div>

      {/* Particle burst effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.5 }}
      >
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-hospital-mint rounded-full"
            style={{
              left: '50%',
              top: '50%',
            }}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{
              scale: [0, 1, 0],
              x: (Math.random() - 0.5) * window.innerWidth,
              y: (Math.random() - 0.5) * window.innerHeight,
            }}
            transition={{
              delay: 5.5 + Math.random() * 0.5,
              duration: 2,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}