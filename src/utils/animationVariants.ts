
// Animation variants for consistent animations throughout the application

// For elements that should appear when entering viewport
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    }
  }
};

// For staggered children animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2
    }
  }
};

// For CTA buttons
export const ctaButton = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    } 
  },
  hover: { 
    scale: 1.05, 
    boxShadow: "0px 5px 15px rgba(234, 56, 76, 0.4)",
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    } 
  },
  tap: { 
    scale: 0.95, 
    boxShadow: "0px 2px 8px rgba(234, 56, 76, 0.3)" 
  }
};

// For secondary buttons
export const secondaryButton = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    } 
  },
  hover: { 
    scale: 1.05, 
    boxShadow: "0px 5px 15px rgba(255, 255, 255, 0.15)",
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    } 
  },
  tap: { scale: 0.95 }
};

// For service cards
export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 20 
    } 
  },
  hover: { 
    y: -10, 
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 20 
    } 
  }
};

// For icons
export const iconVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: "spring", 
      stiffness: 500, 
      damping: 15 
    } 
  },
  hover: { 
    rotate: [0, -10, 10, -5, 5, 0], 
    scale: 1.1, 
    transition: { 
      duration: 0.5, 
      ease: "easeInOut" 
    } 
  }
};

// For background elements
export const backgroundElements = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 1.5 
    } 
  }
};

// For text elements with character by character animation
export const textVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.04 * i }
  })
};

export const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  }
};
