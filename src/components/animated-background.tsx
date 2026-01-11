'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate floating bubbles with different sizes, positions, and animation delays
  const bubbles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 250 + 150, // 150-400px
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 15 + 20, // 20-35s
  }));

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.left,
            bottom: `-${bubble.size}px`,
            background: `radial-gradient(circle at 30% 30%, rgba(var(--primary-rgb, 99, 102, 241), 0.2), rgba(var(--accent-rgb, 168, 85, 247), 0.15))`,
            filter: 'blur(40px)',
          }}
          animate={{
            y: [`0px`, `-${typeof window !== 'undefined' ? window.innerHeight + bubble.size : 1200}px`],
            x: [
              '0px',
              `${Math.sin(bubble.id) * 150}px`,
              `${Math.cos(bubble.id) * 150}px`,
              '0px',
            ],
            scale: [1, 1.3, 0.9, 1],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Static gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 dark:bg-primary/3"
        style={{ filter: 'blur(80px)' }}
      />
      
      <div
        className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-accent/4 dark:bg-accent/2"
        style={{ filter: 'blur(80px)' }}
      />
      
      <div
        className="absolute bottom-1/4 left-1/2 w-96 h-96 rounded-full bg-secondary/6 dark:bg-secondary/3"
        style={{ filter: 'blur(80px)' }}
      />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
}
