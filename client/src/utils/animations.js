// animation variants
export const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };
  
  export const aboutVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };
  
  export const snippetsVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  };
  
  export const howItWorksVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1 }
  };
  
  // animation transition
  export const transition = {
    duration: 0.8,
    ease: 'easeInOut'
  };
  