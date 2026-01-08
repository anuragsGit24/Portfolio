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

const roles = [
  'Backend Engineer',
  'Full-Stack Developer',
  'Problem Solver',
  'System Architect',
];

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
    <span className="gradient-text-animated font-bold min-h-[1.2em] inline-block min-w-[300px]">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  );
};

const BackgroundParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary dark:bg-primary/80"
          style={{
            width: Math.random() * 3 + 2 + 'px',
            height: Math.random() * 3 + 2 + 'px',
          }}
          initial={{
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
          }}
          animate={{
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
            scale: [1, 1.8, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

const GradientOrb = ({ delay = 0 }: { delay?: number }) => {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl opacity-30 dark:opacity-20"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.25, 0.4, 0.25],
        x: [0, 100, 0],
        y: [0, -50, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
      style={{
        background: 'radial-gradient(circle, rgba(147,51,234,0.4) 0%, transparent 70%)',
        width: '500px',
        height: '500px',
      }}
    />
  );
};

export function HeroSection() {
  const { ref, inView } = useScrollAnimation(0.2);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

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
      
      {/* Gradient orbs */}
      <div className="absolute inset-0">
        <GradientOrb delay={0} />
        <div className="absolute top-1/4 right-1/4">
          <GradientOrb delay={2} />
        </div>
        <div className="absolute bottom-1/4 left-1/3">
          <GradientOrb delay={4} />
        </div>
      </div>

      {/* Particles */}
      <BackgroundParticles />

      {/* Content */}
      <motion.div 
        className="container-custom relative z-10"
        style={{ y, opacity }}
      >
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Intro text */}
          <motion.div
            variants={fadeInUpVariants}
            className="mb-6"
          >
            <span className="text-primary font-semibold text-lg tracking-wider uppercase">
              Computer Engineering Student
            </span>
          </motion.div>

          {/* Name with letter animation */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
            variants={fadeInUpVariants}
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
            variants={fadeInUpVariants}
            className="text-2xl md:text-4xl lg:text-5xl mb-8 h-16 flex items-center justify-center"
          >
            <AnimatedRole />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeInUpVariants}
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
            variants={fadeInUpVariants}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl glow-hover"
                onClick={scrollToProjects}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg rounded-xl border-2 glass-heavy"
              >
                <FileText className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={fadeInUpVariants}
            className="flex items-center justify-center gap-6"
          >
            {[
              { icon: Github, href: 'https://github.com/anuragsGit24', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/anurag-singh-b62327314/', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:contact@anurag.tech', label: 'Email' },
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group relative"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative glass-heavy p-4 rounded-full border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                  <social.icon className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
          onClick={scrollToProjects}
        >
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
