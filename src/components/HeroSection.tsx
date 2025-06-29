import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const icons = [
    {
      src: "images/mic.png",
      alt: "Microphone",
      // Centered positioning for mobile and desktop
      className: "absolute w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 floating-delay-1",
      style: { top: '15%', left: '15%' }
    },
    {
      src: "images/coin.png",
      alt: "Dollar",
      className: "absolute w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 floating-delay-2",
      style: { top: '20%', right: '15%' }
    },
    {
      src: "images/bulb.png",
      alt: "Idea",
      className: "absolute w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 floating-delay-3",
      style: { bottom: '25%', left: '20%' }
    },
    {
      src: "images/camera.png",
      alt: "Camera",
      className: "absolute w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 floating",
      style: { bottom: '15%', right: '20%' }
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Content */}
        <div className="z-10 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Learn from the<br className="hidden sm:block" /> 
            <span className="block sm:inline"> Experts Elevate</span><br className="hidden sm:block" />
            <span className="gradient-text">Your Skills</span>
          </h1>
          <p className="text-gray-700 mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0 text-base sm:text-lg leading-relaxed">
            Unlock your full potential with our comprehensive online courses. 
            Dive into a world of knowledge and transform your career with our 
            expertly-designed learning.
          </p>
          <Link 
            to="/courses"
            className="inline-block gradient-button px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:shadow-lg transition-all duration-300 text-base sm:text-lg"
            onClick={() => window.scrollTo(0, 0)}
          >
            Start Learning
          </Link>
        </div>
        
        {/* Centered Floating Icons Container */}
        <div className="relative min-h-[280px] sm:min-h-[320px] md:min-h-[400px] flex items-center justify-center">
          {/* Central container for icons - properly centered */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto">
            {/* Floating Icons - All positioned relative to the centered container */}
            {icons.map((icon, index) => (
              <img
                key={index}
                src={icon.src}
                alt={icon.alt}
                className={`${icon.className} z-10`}
                style={icon.style}
                loading="lazy"
              />
            ))}
            
            {/* Central visual anchor (invisible) */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;