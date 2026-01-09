'use client';

import React from 'react';

// Static background pattern - no animations for performance
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
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
