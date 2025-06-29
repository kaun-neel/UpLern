import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const icons = [
    {
      src: "images/mic.png",
      alt: "Microphone",
      className: "absolute w-16 h-16 sm:w-20 sm:h-20 top-10 right-10 floating-delay-1"
    },
    {
      src: "images/coin.png",
      alt: "Dollar",
      className: "absolute w-16 h-16 sm:w-20 sm:h-20 top-1/3 right-1/4 floating-delay-2"
    },
    {
      src: "images/bulb.png",
      alt: "Idea",
      className: "absolute w-16 h-16 sm:w-20 sm:h-20 bottom-1/3 left-1/4 floating-delay-3"
    },
    {
      src: "images/camera.png",
      alt: "Camera",
      className: "absolute w-16 h-16 sm:w-20 sm:h-20 bottom-20 right-20 floating"
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
        
        {/* Floating Icons - Hidden on mobile for performance */}
        <div className="relative hidden md:block min-h-[300px] lg:min-h-[400px]">
          {icons.map((icon, index) => (
            <img
              key={index}
              src={icon.src}
              alt={icon.alt}
              className={icon.className}
              loading="lazy"
            />
          ))}
        </div>

        {/* Mobile Hero Image */}
        <div className="md:hidden flex justify-center">
          <div className="w-64 h-64 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-4xl">🚀</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;