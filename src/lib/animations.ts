import { Variants } from 'framer-motion';

// Core animation variants for consistent motion
export const fadeInUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    filter: 'blur(10px)'
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const fadeInDownVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -40,
    filter: 'blur(10px)'
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const fadeInLeftVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -60,
    filter: 'blur(10px)'
  },
  visible: { 
    opacity: 1, 
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const fadeInRightVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: 60,
    filter: 'blur(10px)'
  },
  visible: { 
    opacity: 1, 
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const scaleInVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    filter: 'blur(10px)'
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Stagger container variants
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerFastContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

// Card hover variants with 3D tilt
export const cardHoverVariants = {
  initial: { 
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    z: 0
  },
  hover: {
    scale: 1.02,
    z: 50,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Magnetic button effect
export const magneticVariants = {
  initial: { x: 0, y: 0 },
  hover: (custom: { x: number; y: number }) => ({
    x: custom.x,
    y: custom.y,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 15
    }
  })
};

// Text reveal animations
export const textRevealVariants: Variants = {
  hidden: {
    y: '100%',
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const letterRevealVariants: Variants = {
  hidden: {
    y: 50,
    opacity: 0,
    rotateX: -90
  },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Gradient animation variants
export const gradientShiftVariants: Variants = {
  initial: {
    backgroundPosition: '0% 50%'
  },
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 5,
      ease: 'linear',
      repeat: Infinity
    }
  }
};

// Page transition variants
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(10px)'
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(10px)',
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Skill bar animation
export const skillBarVariants: Variants = {
  hidden: { 
    width: 0,
    opacity: 0
  },
  visible: (level: number) => ({
    width: `${level}%`,
    opacity: 1,
    transition: {
      width: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1]
      },
      opacity: {
        duration: 0.3
      }
    }
  })
};

// Counter animation config
export const counterTransition = {
  duration: 2,
  ease: 'easeOut'
};

// Parallax scroll factors
export const parallaxLayers = {
  background: 0.5,
  midground: 0.75,
  foreground: 1
};

// Easing functions
export const easings = {
  smooth: [0.22, 1, 0.36, 1],
  snappy: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.175, 0.885, 0.32, 1.275]
};

// Floating animation
export const floatingVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Glow pulse animation
export const glowPulseVariants: Variants = {
  initial: {
    boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)'
  },
  animate: {
    boxShadow: [
      '0 0 20px rgba(147, 51, 234, 0.3)',
      '0 0 40px rgba(147, 51, 234, 0.6)',
      '0 0 20px rgba(147, 51, 234, 0.3)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Modal/Dialog animations
export const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

export const modalContentVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Navbar scroll animation
export const navbarVariants: Variants = {
  top: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    backdropFilter: 'blur(0px)',
    boxShadow: '0 0 0 rgba(0, 0, 0, 0)'
  },
  scrolled: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Mobile menu variants
export const mobileMenuVariants: Variants = {
  closed: {
    x: '100%',
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  open: {
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const mobileMenuItemVariants: Variants = {
  closed: {
    x: 20,
    opacity: 0
  },
  open: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};
