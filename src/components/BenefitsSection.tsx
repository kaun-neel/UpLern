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
        
        {/* Completely Fixed Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 place-items-center">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="w-full max-w-xs bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-lg border border-white/30 hover:shadow-xl hover:transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center min-h-[280px] justify-between"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-50 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                {benefit.icon}
              </div>
              
              {/* Content Container */}
              <div className="flex-1 flex flex-col justify-center">
                {/* Title */}
                <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-gray-800 leading-tight">
                  {benefit.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              {/* Bottom Decorative Element */}
              <div className="w-full h-12 sm:h-16 bg-gradient-to-r from-purple-100/80 to-indigo-100/80 rounded-b-3xl -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 mt-4 sm:mt-6 flex items-center justify-center">
                <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;