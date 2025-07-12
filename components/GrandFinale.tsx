"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

export default function GrandFinale() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create heart geometry
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.5, y + 0.5);
    heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
    heartShape.bezierCurveTo(x + 1.3, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1, y);
    heartShape.bezierCurveTo(x + 0.6, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

    const extrudeSettings = {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.1,
      bevelThickness: 0.1
    };

    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0xFF6B6B,
      emissive: 0xFF6B6B,
      emissiveIntensity: 0.3,
      shininess: 100
    });
    
    const heart = new THREE.Mesh(geometry, material);
    heart.position.set(-0.8, -1, 0);
    scene.add(heart);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xFF6B6B, 1, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01,
      color: 0x4ECDC4,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Rotate heart
      heart.rotation.y = Math.sin(time) * 0.5;
      
      // Pulsing effect
      const scale = 1 + Math.sin(time * 2) * 0.1;
      heart.scale.set(scale, scale, scale);

      // Rotate particles
      particlesMesh.rotation.y = time * 0.1;
      particlesMesh.rotation.x = time * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative h-screen bg-gradient-to-b from-black to-hospital-dark overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" />
      
      <motion.div
        className="absolute inset-0 flex items-end justify-center pb-32 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
      >
        <div className="text-center">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            With Gratitude
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-hospital-mint"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
          >
            Balmain Hospital Geriatric Ward
          </motion.p>

          <motion.p
            className="text-lg text-hospital-coral mt-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: 3.5, 
              type: "spring",
              damping: 10
            }}
          >
            Thank you for shaping us into better healthcare professionals
          </motion.p>
        </div>
      </motion.div>

      {/* Vortex effect overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{
          duration: 3,
          times: [0, 0.5, 1],
          repeat: Infinity,
          repeatDelay: 2
        }}
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(78, 205, 196, 0.1) 50%, transparent 100%)',
          transform: 'scale(2)',
        }}
      />
    </div>
  );
}