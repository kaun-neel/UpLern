import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      quote: "Transformed my web design skills completely",
      text: "The online courses on this platform have been a game changer for me. The content is engaging, the instructors are knowledgeable",
      name: "James",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "Incredible course, highly recommend to anyone!",
      text: "I've always wanted to explore a new skill, but never had the time or resources. This online learning platform has made it possible for me",
      name: "Will",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "The best investment I've made for my career.",
      text: "As a busy professional, the online courses on this platform have allowed me to upskill and stay ahead of the curve",
      name: "Jenny",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 md:py-24 px-6 md:px-16 bg-blue-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">
          What are Student saying<br /> 
          about <span className="gradient-text">our Courses</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <h3 className="text-lg font-bold text-center mb-4">
                "{testimonial.quote}"
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                "{testimonial.text}"
              </p>
              <div className="flex items-center mt-auto">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-3"
                />
                <p className="text-sm text-gray-700">-{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-12">
          <div className="flex-grow flex justify-center gap-2">
            <div className="w-12 h-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;