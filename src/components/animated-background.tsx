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
    size: Math.random() * 4 + 2, // 2-6px
    duration: Math.random() * 20 + 15, // 15-35s
    delay: Math.random() * 5,
    startX: Math.random() * 100,
    startY: Math.random() * 100,
    endX: Math.random() * 100,
    endY: Math.random() * 100,
    opacity: [0.1, Math.random() * 0.4 + 0.3, 0.1], // 0.1 -> 0.3-0.7 -> 0.1
  }));
};

export function AnimatedBackground() {
  const [particles] = React.useState(() => generateParticles(50));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.startX}%`,
            top: `${particle.startY}%`,
          }}
          animate={{
            x: [`0%`, `${particle.endX - particle.startX}vw`, `0%`],
            y: [`0%`, `${particle.endY - particle.startY}vh`, `0%`],
            opacity: particle.opacity,
            scale: [1, 1.5, 1],
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
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 dark:bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 100, 0],
          y: [0, -50, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-accent/10 dark:bg-accent/5 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -80, 0],
          y: [0, 80, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-1/2 w-96 h-96 rounded-full bg-secondary/20 dark:bg-secondary/10 blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          x: [0, 60, 0],
          y: [0, -100, 0],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 22,
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
