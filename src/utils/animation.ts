// Animation utilities for the website

// Animate on scroll setup
export const setupScrollAnimations = () => {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('animate-visible');
      }
    });
  };

  // Set up event listener
  window.addEventListener('scroll', animateOnScroll);
  
  // Initial check
  animateOnScroll();
  
  return () => {
    window.removeEventListener('scroll', animateOnScroll);
  };
};

// Stagger children animations
export const staggerChildren = (parentSelector: string, childSelector: string, delay = 0.1) => {
  const parent = document.querySelector(parentSelector);
  if (!parent) return;
  
  const children = parent.querySelectorAll(childSelector);
  
  children.forEach((child, index) => {
    (child as HTMLElement).style.animationDelay = `${index * delay}s`;
  });
};