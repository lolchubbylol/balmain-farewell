"use client";

import React, { useState, memo, useMemo } from 'react';
import { motion } from 'framer-motion';

// Memoized bubble tea koala component
const BubbleTeaKoala = memo(({ opacity = 0.1 }: { opacity?: number }) => (
  <svg width="80" height="80" viewBox="0 0 200 200" style={{ opacity }}>
    <g transform="translate(100, 100)">
      {/* Koala body */}
      <ellipse cx="0" cy="20" rx="40" ry="50" fill="#9CA3AF" stroke="#000" strokeWidth="3"/>
      {/* Koala head */}
      <circle cx="0" cy="-20" r="35" fill="#9CA3AF" stroke="#000" strokeWidth="3"/>
      {/* Ears */}
      <circle cx="-25" cy="-35" r="20" fill="#9CA3AF" stroke="#000" strokeWidth="3"/>
      <circle cx="25" cy="-35" r="20" fill="#9CA3AF" stroke="#000" strokeWidth="3"/>
      <circle cx="-25" cy="-35" r="10" fill="#E5E7EB"/>
      <circle cx="25" cy="-35" r="10" fill="#E5E7EB"/>
      {/* Eyes */}
      <circle cx="-10" cy="-20" r="3" fill="#000"/>
      <circle cx="10" cy="-20" r="3" fill="#000"/>
      {/* Nose */}
      <ellipse cx="0" cy="-10" rx="8" ry="6" fill="#374151"/>
      {/* Bubble tea */}
      <rect x="-15" y="0" width="30" height="40" rx="5" fill="#D2691E" stroke="#000" strokeWidth="2"/>
      <rect x="-15" y="0" width="30" height="10" fill="#F5DEB3"/>
      {/* Straw */}
      <rect x="-2" y="-15" width="4" height="25" fill="#4B5563"/>
      {/* Bubbles */}
      <circle cx="-8" cy="30" r="3" fill="#000"/>
      <circle cx="0" cy="32" r="3" fill="#000"/>
      <circle cx="8" cy="30" r="3" fill="#000"/>
      <circle cx="-5" cy="25" r="3" fill="#000"/>
      <circle cx="5" cy="25" r="3" fill="#000"/>
    </g>
  </svg>
));

BubbleTeaKoala.displayName = 'BubbleTeaKoala';

// Memoized staff card component
const StaffCard = memo(({ member, index, isHovered, onHover, onLeave, onTap }: {
  member: any;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onTap: () => void;
}) => (
  <motion.div
    className="relative group"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.15 }}
    onHoverStart={onHover}
    onHoverEnd={onLeave}
    onTap={onTap}
    style={{
      willChange: 'transform',
      transform: 'translate3d(0, 0, 0)'
    }}
  >
    <motion.div
      className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-800 overflow-hidden"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={isHovered ? member.animation : {}}
    >
      {/* Technical grid pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            ${member.color}22,
            ${member.color}22 1px,
            transparent 1px,
            transparent 20px
          ),
          repeating-linear-gradient(
            90deg,
            ${member.color}22,
            ${member.color}22 1px,
            transparent 1px,
            transparent 20px
          )`
        }} />
      </div>

      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-full h-1"
          style={{ backgroundColor: member.color }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute top-0 left-0 h-full w-1"
          style={{ backgroundColor: member.color }}
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
        <motion.div
          className="absolute bottom-0 right-0 w-full h-1"
          style={{ backgroundColor: member.color }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-full w-1"
          style={{ backgroundColor: member.color }}
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <motion.div 
            className="text-4xl sm:text-5xl md:text-6xl"
            animate={{ 
              scale: isHovered ? [1, 1.2, 1] : 1,
              rotate: isHovered ? [0, 10, -10, 0] : 0
            }}
            transition={{ duration: 0.5 }}
          >
            {member.icon}
          </motion.div>
          
          {/* Technical hexagon badge */}
          <div className="relative">
            <svg width="40" height="40" viewBox="0 0 60 60" className="sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]">
              <polygon
                points="30,5 50,17.5 50,42.5 30,55 10,42.5 10,17.5"
                fill="none"
                stroke={member.color}
                strokeWidth="2"
                opacity={isHovered ? 1 : 0.3}
              />
              {isHovered && (
                <motion.polygon
                  points="30,5 50,17.5 50,42.5 30,55 10,42.5 10,17.5"
                  fill="none"
                  stroke={member.color}
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </svg>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">
          {member.title}
        </h3>
        <p className="text-xs sm:text-sm font-medium mb-3 sm:mb-4" style={{ color: member.color }}>
          {member.subtitle}
        </p>
        
        {/* 5-star rating joke for Ma Lu */}
        {member.showStars && (
          <motion.div 
            className="flex gap-1 mb-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                className="text-yellow-400 text-lg"
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                ⭐
              </motion.span>
            ))}
          </motion.div>
        )}
        
        <motion.p 
          className="text-sm sm:text-base text-gray-400"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
        >
          {member.description}
        </motion.p>

        {/* Technical circuit lines */}
        {isHovered && (
          <motion.div
            className="absolute -bottom-2 -right-2 w-32 h-32 opacity-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
          >
            <svg viewBox="0 0 100 100">
              <path
                d="M10,50 L30,50 L35,45 L40,55 L45,50 L90,50"
                stroke={member.color}
                strokeWidth="2"
                fill="none"
              />
              <circle cx="10" cy="50" r="3" fill={member.color} />
              <circle cx="90" cy="50" r="3" fill={member.color} />
              <path
                d="M50,10 L50,30 L55,35 L45,40 L50,45 L50,90"
                stroke={member.color}
                strokeWidth="2"
                fill="none"
              />
              <circle cx="50" cy="10" r="3" fill={member.color} />
              <circle cx="50" cy="90" r="3" fill={member.color} />
            </svg>
          </motion.div>
        )}
      </div>
    </motion.div>
  </motion.div>
));

StaffCard.displayName = 'StaffCard';

const VisualStaff: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const staff = useMemo(() => [
    {
      title: "Ma Lu",
      subtitle: "Clinical Facilitator",
      color: "#4A90E2",
      icon: "🩺",
      description: "Navigated us through the complexities of care",
      animation: { rotate: [0, 5, -5, 0], transition: { duration: 2, repeat: Infinity } },
      showStars: true
    },
    {
      title: "Jae Kim",
      subtitle: "Korean Excellence 🇰🇷",
      color: "#FF6B6B", 
      icon: "💉",
      description: "Precision and patience in perfect harmony",
      animation: { y: [0, -10, 0], transition: { duration: 1.5, repeat: Infinity } }
    },
    {
      title: "Simone Stakes",
      subtitle: "High Stakes in My Heart",
      color: "#4ECDC4",
      icon: "💗",
      description: "Every patient matters, every moment counts",
      animation: { scale: [1, 1.05, 1], transition: { duration: 2, repeat: Infinity } }
    },
    {
      title: "Mercia Healey",
      subtitle: "Old School & Sweet",
      color: "#FFD93D",
      icon: "🍫",
      description: "Vigorous old-school nursing with a chocolate-coated touch",
      animation: { x: [-2, 2, -2], transition: { duration: 0.5, repeat: Infinity } }
    },
    {
      title: "Deepa Gurung",
      subtitle: "The Star ⭐",
      color: "#9B59B6",
      icon: "✨",
      description: "Living up to her name - shining bright every shift",
      animation: { rotate: [0, 360], transition: { duration: 3, repeat: Infinity, ease: "linear" } }
    },
    {
      title: "Paris Bhandar",
      subtitle: "The Quiet One",
      color: "#1ABC9C",
      icon: "🤫",
      description: "Actions speak louder than words",
      animation: { opacity: [0.7, 1, 0.7], transition: { duration: 2, repeat: Infinity } }
    },
    {
      title: "Cinthia Viana Guanaif",
      subtitle: "A Enfermeira Misteriosa",
      color: "#E74C3C",
      icon: "💎",
      description: "Quem paga as contas do carro novo? 🤔 Pergunta pra Mercia...",
      animation: { scale: [1, 1.1, 1], x: [-5, 5, -5], transition: { duration: 2.5, repeat: Infinity } }
    },
    {
      title: "Mia Yan",
      subtitle: "The Nice One",
      color: "#FF6EC7",
      icon: "😊",
      description: "Mia, I hate to break it to you but meal replacement powder IS the future",
      animation: { y: [0, -5, 0], rotate: [0, 5, -5, 0], transition: { duration: 2, repeat: Infinity } }
    }
  ], []);

  // Reduce floating koalas on mobile
  const floatingKoalaCount = isMobile ? 5 : 15;

  return (
    <div className="h-screen bg-gradient-to-b from-hospital-dark to-black relative overflow-hidden flex flex-col">
      <style jsx global>{`
        @keyframes koala-float {
          0% {
            transform: translate3d(0, 100vh, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate3d(var(--x-drift, 0px), -200px, 0) rotate(360deg);
            opacity: 0;
          }
        }
        
        .floating-koala {
          animation: koala-float var(--duration, 20s) linear infinite;
          animation-delay: var(--delay, 0s);
          animation-fill-mode: both;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          opacity: 0;
        }
      `}</style>

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-hospital-mint/10 rounded-full filter blur-3xl" style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }} />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-hospital-coral/10 rounded-full filter blur-3xl" style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }} />
      </div>

      {/* Floating bubble tea koalas using CSS animation on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(floatingKoalaCount)].map((_, i) => {
          const startX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920);
          const xDrift = Math.random() * 200 - 100;
          const duration = 20 + Math.random() * 10;
          const delay = i * 1.2;

          if (isMobile) {
            return (
              <div
                key={i}
                className="absolute floating-koala"
                style={{
                  left: `${startX}px`,
                  bottom: '-100px',
                  '--x-drift': `${xDrift}px`,
                  '--duration': `${duration}s`,
                  '--delay': `${delay}s`
                } as React.CSSProperties}
              >
                <BubbleTeaKoala opacity={0.15 + Math.random() * 0.25} />
              </div>
            );
          }

          return (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: startX,
                y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1180,
                rotate: Math.random() * 360
              }}
              animate={{ 
                y: -200,
                rotate: 360 + Math.random() * 360,
                x: startX + xDrift
              }}
              transition={{ 
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: delay
              }}
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)'
              }}
            >
              <BubbleTeaKoala opacity={0.15 + Math.random() * 0.25} />
            </motion.div>
          );
        })}
      </div>

      {/* Header */}
      <motion.div 
        className="text-center pt-16 pb-4 sm:pt-20 sm:pb-10 relative z-10 flex-shrink-0"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2 sm:mb-4">
          Lever Ward Legends
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-hospital-mint">
          The people who made our placement unforgettable
        </p>
      </motion.div>

      {/* Staff Cards - Scrollable container */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {staff.map((member, index) => (
              <StaffCard
                key={index}
                member={member}
                index={index}
                isHovered={hoveredCard === index}
                onHover={() => setHoveredCard(index)}
                onLeave={() => setHoveredCard(null)}
                onTap={() => setHoveredCard(hoveredCard === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom decoration - hidden on mobile */}
      {!isMobile && (
        <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden hidden md:block pointer-events-none">
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <div className="relative">
              {/* Sydney Opera House silhouette */}
              <svg width="300" height="100" viewBox="0 0 300 100" className="opacity-20">
                <path
                  d="M50,100 Q80,40 100,100 M90,100 Q120,30 140,100 M130,100 Q160,20 180,100 M170,100 Q200,30 220,100 M210,100 Q240,40 260,100"
                  stroke="#4ECDC4"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default VisualStaff;