'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { 
  fadeInUpVariants, 
  staggerContainerVariants 
} from '@/lib/animations';
import { useScrollAnimation } from '@/hooks/use-animation';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

const roles = [
  'Backend Engineer',
  'Full-Stack Developer',
  'Problem Solver',
  'System Architect',
];

const handleDownloadResume = () => {
  try {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Anurag_Singh_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    // Fallback: open in new tab
    window.open('/resume.pdf', '_blank');
  }
};

const AnimatedRole = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[index];
      
      if (isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
      } else {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
      }

      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % roles.length);
      }
    };

    const typingSpeed = isDeleting ? 50 : 100;
    const timeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, index]);

  return (
    <span className="font-bold min-h-[1.2em] inline-block min-w-[300px]" aria-live="polite" role="status">
      {displayText}<span className="ml-1 text-primary">|</span>
    </span>
  );
};

// Static background - no particles for performance
const BackgroundParticles = () => null;

// Static gradient orb
const GradientOrb = () => null;

export function HeroSection() {
  const { ref, inView } = useScrollAnimation(0.2);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 animated-gradient-bg" />
      
      {/* Floating dots background */}
      <div className="floating-dots">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="floating-dot" />
        ))}
      </div>

      {/* Content */}
      <motion.div 
        className="container-custom relative z-10"
        style={prefersReducedMotion ? {} : { y, opacity }}
      >
        <motion.div
          variants={prefersReducedMotion ? {} : staggerContainerVariants}
          initial={prefersReducedMotion ? {} : "hidden"}
          animate={prefersReducedMotion ? {} : (inView ? 'visible' : 'hidden')}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Intro text */}
          <motion.div
            variants={prefersReducedMotion ? {} : fadeInUpVariants}
            className="mb-6"
          >
            <span className="text-primary font-semibold text-lg tracking-wider uppercase">
              Computer Engineering Student
            </span>
          </motion.div>

          {/* Name with letter animation */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
            variants={prefersReducedMotion ? {} : fadeInUpVariants}
          >
            <motion.span className="block mb-2">
              Hi, I'm{' '}
              <span className="gradient-text-animated inline-block">
                Anurag Singh
              </span>
            </motion.span>
          </motion.h1>

          {/* Animated role */}
          <motion.div
            variants={prefersReducedMotion ? {} : fadeInUpVariants}
            className="text-2xl md:text-4xl lg:text-5xl mb-8 h-16 flex items-center justify-center"
          >
            <AnimatedRole />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={prefersReducedMotion ? {} : fadeInUpVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Crafting robust backend systems with <span className="text-primary font-semibold">Java & Spring Boot</span>,
            building elegant full-stack applications, and solving complex problems.
            <span className="block mt-2 font-semibold text-foreground">
              650+ competitive programming problems conquered
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={prefersReducedMotion ? {} : fadeInUpVariants}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            >
              <Button
                size="lg"
                className="relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl glow-hover"
                onClick={scrollToProjects}
              >
                <span className="flex items-center gap-2">
                  View My Work
                  <span>→</span>
                </span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg rounded-xl border-2 glass-heavy"
                onClick={handleDownloadResume}
              >
                <FileText className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={prefersReducedMotion ? {} : fadeInUpVariants}
            className="flex items-center justify-center gap-6"
          >
            {[
              { icon: Github, href: 'https://github.com/anuragsGit24', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/anurag-singh-b62327314/', label: 'LinkedIn' },
              { icon: Mail, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=anuragsinghm08@gmail.com', label: 'Email' },
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-4 rounded-full border-2 border-primary/20 bg-background/50 hover:border-primary/50 transition-colors"
                whileHover={prefersReducedMotion ? {} : { y: -5 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <social.icon className="h-6 w-6 text-foreground" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={scrollToProjects}
        >
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
