import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const icons = [
    {
      src: "images/mic.png",
      alt: "Microphone",
      className: "absolute w-20 h-20 top-10 right-10 floating-delay-1"
    },
    {
      src: "images/coin.png",
      alt: "Dollar",
      className: "absolute w-20 h-20 top-1/3 right-1/4 floating-delay-2"
    },
    {
      src: "images/bulb.png",
      alt: "Idea",
      className: "absolute w-20 h-20 bottom-1/3 left-1/4 floating-delay-3"
    },
    {
      src: "images/camera.png",
      alt: "Camera",
      className: "absolute w-20 h-20 bottom-20 right-20 floating"
    }
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Learn from the<br /> Experts Elevate<br />
            <span className="gradient-text">Your Skills</span>
          </h1>
          <p className="text-gray-700 mb-8 max-w-lg">
            Unlock your full potential with our comprehensive online courses. 
            Dive into a world of knowledge and transform your career with our 
            expertly-designed learning.
          </p>
          <Link 
            to="/courses"
            className="gradient-button px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
          >
            Start Learning
          </Link>
        </div>
        
        <div className="relative hidden md:block min-h-[400px]">
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
      </div>
    </section>
  );
};

export default HeroSection;