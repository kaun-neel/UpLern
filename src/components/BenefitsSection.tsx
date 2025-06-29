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
            <br />
            <span className="gradient-text">Benefits & Features</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-sm sm:text-base px-4">
            In order to create an engaging learning experience, the role of 
            instructor is optional, but the role of learner is essential.
          </p>
        </div>
        
        {/* Benefits Cards with Proper Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-purple-200/50 hover:border-purple-300 hover:shadow-xl hover:transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center min-h-[300px] group"
            >
              {/* Outer decorative border */}
              <div className="absolute inset-2 border border-purple-100 rounded-2xl opacity-50"></div>
              
              {/* Icon Container - Outside the text box */}
              <div className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-50 border-2 border-purple-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-100 transition-all duration-300 shadow-md">
                {benefit.icon}
              </div>
              
              {/* Text Content Box */}
              <div className="relative z-10 flex-1 flex flex-col justify-center bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-100 shadow-sm w-full">
                {/* Title */}
                <h3 className="font-bold text-sm sm:text-base mb-3 sm:mb-4 text-gray-800 leading-tight">
                  {benefit.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              {/* Bottom decorative accent */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;