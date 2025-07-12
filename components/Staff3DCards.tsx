"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box, Float } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { useState } from 'react';
import * as THREE from 'three';

interface CardProps {
  position: [number, number, number];
  rotation: [number, number, number];
  name: string;
  role: string;
  icon: string;
  color: string;
  onClick: () => void;
}

function Card3D({ position, rotation, name, role, icon, color, onClick }: CardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <motion.group
        position={position}
        rotation={rotation}
        whileHover={{ scale: 1.1 }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <Box args={[3, 4, 0.3]} castShadow receiveShadow>
          <meshStandardMaterial 
            color={hovered ? color : '#1a1a1a'}
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={hovered ? 0.5 : 0.1}
          />
        </Box>
        
        <Text
          position={[0, 1, 0.2]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {icon}
        </Text>
        
        <Text
          position={[0, -0.5, 0.2]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter.woff"
        >
          {name}
        </Text>
        
        <Text
          position={[0, -1, 0.2]}
          fontSize={0.2}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {role}
        </Text>
      </motion.group>
    </Float>
  );
}

export default function Staff3DCards() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const cards = [
    {
      name: "Facilitator",
      role: "Clinical Educator",
      icon: "🩺",
      color: "#4A90E2",
      message: "Thank you for your exceptional guidance and teaching throughout our placement."
    },
    {
      name: "Kim",
      role: "Nurse 🇰🇷",
      icon: "💉",
      color: "#FF6B6B",
      message: "감사합니다! Your patience and kindness made our learning experience wonderful."
    },
    {
      name: "Simone",
      role: "Buddy Nurse",
      icon: "🤝",
      color: "#4ECDC4",
      message: "Thank you for being an amazing mentor and showing us the ropes with such care."
    }
  ];

  return (
    <div className="h-screen relative">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        shadows
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4A90E2" />
        
        {cards.map((card, index) => (
          <Card3D
            key={card.name}
            position={[(index - 1) * 4, 0, 0]}
            rotation={[0, Math.sin(index) * 0.3, 0]}
            name={card.name}
            role={card.role}
            icon={card.icon}
            color={card.color}
            onClick={() => setSelectedCard(card.name)}
          />
        ))}
        
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>

      {/* Message overlay */}
      {selectedCard && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedCard(null)}
        >
          <div className="bg-hospital-dark p-8 rounded-lg max-w-md border border-hospital-blue/50">
            <h3 className="text-2xl font-bold text-hospital-coral mb-4">
              {cards.find(c => c.name === selectedCard)?.name}
            </h3>
            <p className="text-white">
              {cards.find(c => c.name === selectedCard)?.message}
            </p>
            <button 
              className="mt-6 text-hospital-mint hover:text-white transition-colors"
              onClick={() => setSelectedCard(null)}
            >
              Click to close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}