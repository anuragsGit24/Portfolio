'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  size: number;
  duration: number;
  delay: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  opacity: number[];
}

const generateParticles = (count: number): Particle[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 2, // 2-5px (reduced max size)
    duration: Math.random() * 15 + 20, // 20-35s (longer duration)
    delay: Math.random() * 3,
    startX: Math.random() * 100,
    startY: Math.random() * 100,
    endX: Math.random() * 100,
    endY: Math.random() * 100,
    opacity: [0.05, Math.random() * 0.3 + 0.1, 0.05], // Reduced opacity range
  }));
};

export function AnimatedBackground() {
  const [particles] = React.useState(() => generateParticles(30)); // Reduced from 50 to 30

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/60 dark:bg-primary/40"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.startX}%`,
            top: `${particle.startY}%`,
            willChange: 'transform, opacity',
          }}
          animate={{
            x: [`0%`, `${particle.endX - particle.startX}vw`, `0%`],
            y: [`0%`, `${particle.endY - particle.startY}vh`, `0%`],
            opacity: particle.opacity,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/8 dark:bg-primary/4 blur-3xl"
        style={{ willChange: 'transform, opacity' }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 60, 0],
          y: [0, -30, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-accent/6 dark:bg-accent/3 blur-3xl"
        style={{ willChange: 'transform, opacity' }}
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, -50, 0],
          y: [0, 50, 0],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-1/2 w-80 h-80 rounded-full bg-secondary/15 dark:bg-secondary/8 blur-3xl"
        style={{ willChange: 'transform, opacity' }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 40, 0],
          y: [0, -60, 0],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial Gradient Overlay for Depth */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/50"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, transparent 50%, rgba(var(--background), 0.3) 100%)',
        }}
      />
    </div>
  );
}
