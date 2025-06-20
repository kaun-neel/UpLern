import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const testimonials = [
    {
      quote: "Transformed my web design skills completely",
      text: "The online courses on this platform have been a game changer for me. The content is engaging, the instructors are knowledgeable, and the practical projects helped me build a strong portfolio.",
      name: "James",
      role: "Frontend Developer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "Incredible course, highly recommend to anyone!",
      text: "I've always wanted to explore a new skill, but never had the time or resources. This online learning platform has made it possible for me to learn at my own pace and achieve my goals.",
      name: "Will",
      role: "UI/UX Designer",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "The best investment I've made for my career.",
      text: "As a busy professional, the online courses on this platform have allowed me to upskill and stay ahead of the curve. The flexibility and quality of content is unmatched.",
      name: "Jenny",
      role: "Digital Marketer",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    {
      quote: "Outstanding learning experience with real results",
      text: "The structured curriculum and hands-on projects gave me the confidence to switch careers. Within 6 months, I landed my dream job in tech. Highly recommended!",
      name: "Sarah",
      role: "Software Engineer",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      quote: "Perfect blend of theory and practical application",
      text: "What sets this platform apart is the practical approach to learning. Every concept is backed by real-world examples and projects that you can add to your portfolio.",
      name: "Michael",
      role: "Full Stack Developer",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      quote: "Exceeded all my expectations",
      text: "The quality of instruction and the support from the community made learning enjoyable and effective. I've completed 3 courses and each one has added tremendous value to my skill set.",
      name: "Emma",
      role: "Product Manager",
      avatar: "https://randomuser.me/api/portraits/women/25.jpg"
    },
    {
      quote: "Life-changing educational experience",
      text: "From a complete beginner to landing my first tech job in 8 months. The step-by-step approach and mentor support made all the difference in my learning journey.",
      name: "David",
      role: "Data Analyst",
      avatar: "https://randomuser.me/api/portraits/men/28.jpg"
    },
    {
      quote: "Professional growth accelerated",
      text: "The advanced courses helped me transition from junior to senior developer. The industry-relevant curriculum and expert instructors provided exactly what I needed.",
      name: "Lisa",
      role: "Senior Developer",
      avatar: "https://randomuser.me/api/portraits/women/35.jpg"
    },
    {
      quote: "Flexible learning that fits my schedule",
      text: "As a working parent, I needed flexibility. This platform allowed me to learn during my free time and progress at my own pace without compromising on quality.",
      name: "Robert",
      role: "DevOps Engineer",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg"
    }
  ];

  // Calculate total number of slides (showing 3 at a time)
  const totalSlides = testimonials.length - 2; // 9 testimonials, showing 3 at a time = 7 possible positions

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextTestimonial();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // When we reach the last possible position (showing testimonials 7,8,9), go back to start
    setActiveIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= totalSlides ? 0 : nextIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setActiveIndex((prevIndex) => {
      return prevIndex === 0 ? totalSlides - 1 : prevIndex - 1;
    });
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex || index >= totalSlides) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Get exactly 3 testimonials starting from activeIndex
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = activeIndex + i;
      if (index < testimonials.length) {
        visible.push(testimonials[index]);
      }
    }
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section className="py-16 md:py-24 px-6 md:px-16 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What are Students saying<br /> 
            about <span className="gradient-text">our Courses</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful learners who have transformed their careers with our comprehensive courses.
          </p>
        </div>
        
        {/* Testimonials Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-500 ease-in-out ${
                isAnimating ? 'transform scale-95 opacity-80' : 'transform scale-100 opacity-100'
              }`}
            >
              {visibleTestimonials.map((testimonial, index) => (
                <div 
                  key={`${activeIndex}-${index}`} 
                  className={`testimonial-card group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ${
                    isAnimating ? 'animate-pulse' : 'animate-in fade-in slide-in-from-bottom duration-500'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg className="w-12 h-12 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-center mb-4 text-gray-900 group-hover:text-purple-600 transition-colors">
                      "{testimonial.quote}"
                    </h3>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center mt-auto">
                      <div className="relative">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-12 h-12 rounded-full mr-4 border-2 border-white shadow-lg group-hover:border-purple-300 transition-colors"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">-{testimonial.name}</p>
                        <p className="text-xs text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-12">
          {/* Pagination Dots */}
          <div className="flex-grow flex justify-center gap-3">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? 'w-12 h-3 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                } disabled:opacity-50`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Arrow Navigation */}
          <div className="flex gap-3 ml-8">
            <button 
              onClick={prevTestimonial}
              disabled={isAnimating}
              className="group w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous testimonials"
            >
              <ChevronLeft 
                size={20} 
                className="text-gray-600 group-hover:text-purple-600 transition-colors" 
              />
            </button>
            <button 
              onClick={nextTestimonial}
              disabled={isAnimating}
              className="group w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next testimonials"
            >
              <ChevronRight 
                size={20} 
                className="text-gray-600 group-hover:text-purple-600 transition-colors" 
              />
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 text-center">
          <span className="text-sm text-gray-500">
            Showing {activeIndex + 1}-{Math.min(activeIndex + 3, testimonials.length)} of {testimonials.length} testimonials
          </span>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;