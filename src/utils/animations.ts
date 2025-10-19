// Framer Motion Variants for animations

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.3 }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

export const slideInFromLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.3 }
};

export const slideInFromRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
  transition: { duration: 0.3 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.3 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const listItemAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

// Tailwind CSS Animation Classes
export const animationClasses = {
  // Fade animations
  fadeIn: 'animate-in fade-in duration-300',
  fadeOut: 'animate-out fade-out duration-300',
  
  // Slide animations
  slideInFromTop: 'animate-in slide-in-from-top duration-300',
  slideInFromBottom: 'animate-in slide-in-from-bottom duration-300',
  slideInFromLeft: 'animate-in slide-in-from-left duration-300',
  slideInFromRight: 'animate-in slide-in-from-right duration-300',
  
  // Zoom animations
  zoomIn: 'animate-in zoom-in duration-300',
  zoomOut: 'animate-out zoom-out duration-300',
  
  // Spin animation
  spin: 'animate-spin',
  
  // Pulse animation
  pulse: 'animate-pulse',
  
  // Bounce animation
  bounce: 'animate-bounce',
  
  // Transition classes
  transitionAll: 'transition-all duration-300 ease-in-out',
  transitionColors: 'transition-colors duration-200',
  transitionOpacity: 'transition-opacity duration-300',
  transitionTransform: 'transition-transform duration-300',
  
  // Hover effects
  hoverScale: 'hover:scale-105 transition-transform duration-200',
  hoverLift: 'hover:-translate-y-1 hover:shadow-lg transition-all duration-200',
  hoverGlow: 'hover:shadow-glow transition-shadow duration-300',
};

// CSS-in-JS Animation Keyframes
export const keyframes = {
  shimmer: `
    @keyframes shimmer {
      0% {
        background-position: -1000px 0;
      }
      100% {
        background-position: 1000px 0;
      }
    }
  `,
  
  slideUp: `
    @keyframes slideUp {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `,
  
  fadeInScale: `
    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `,
};

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.3, ease: 'easeInOut' }
};

// Modal/Dialog variants
export const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.15 }
  }
};

// Backdrop variants
export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

// Card hover animation
export const cardHoverVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};

// Button tap animation
export const buttonTapVariants = {
  tap: { scale: 0.95 }
};
