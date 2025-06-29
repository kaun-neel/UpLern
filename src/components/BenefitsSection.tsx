import React from 'react';
import { Clock, Infinity, DollarSign, Award } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      title: 'LEARN AT YOUR PACE',
      description: 'Flexible courses designed to fit your schedule anytime, anywhere.',
      icon: <Clock className="text-purple-600" size={28} />
    },
    {
      title: 'LIFETIME ACCESS',
      description: 'Revisit your courses anytime because learning never stops.',
      icon: <Infinity className="text-purple-600" size={28} />
    },
    {
      title: 'AFFORDABLE',
      description: "High quality education that is accessible anytime.",
      icon: <DollarSign className="text-purple-600" size={28} />
    },
    {
      title: 'CERTIFICATION',
      description: 'Earn credible certificates to boost your resume and career.',
      icon: <Award className="text-purple-600" size={28} />
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Discover Our Zyntiq's
            <span className="block gradient-text mt-2">Benefits & Features</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-sm sm:text-base px-4">
            In order to create an engaging learning experience, the role of 
            instructor is optional, but the role of learner is essential.
          </p>
        </div>
        
        {/* Fixed Grid Layout with Proper Alignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="benefit-card group w-full max-w-sm mx-auto flex flex-col items-center justify-start text-center h-full"
            >
              {/* Icon Container - Fixed Size and Centered */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-50 flex items-center justify-center mb-4 sm:mb-6 z-10 relative group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                {benefit.icon}
              </div>
              
              {/* Title - Consistent Height and Alignment */}
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 z-10 relative text-center px-2 leading-tight min-h-[3rem] flex items-center justify-center">
                {benefit.title}
              </h3>
              
              {/* Description - Flexible Height */}
              <p className="text-gray-600 text-xs sm:text-sm text-center z-10 relative px-2 leading-relaxed flex-grow">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;