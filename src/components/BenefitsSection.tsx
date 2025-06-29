import React from 'react';
import { Clock, Infinity, DollarSign, Award } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      title: 'LEARN AT YOUR PACE',
      description: 'Flexible courses designed to fit your schedule anytime, anywhere.',
      icon: <Clock className="text-purple-600" size={32} />
    },
    {
      title: 'LIFETIME ACCESS',
      description: 'Revisit your courses anytime because learning never stop.',
      icon: <Infinity className="text-purple-600" size={32} />
    },
    {
      title: 'AFFORDABLE',
      description: "High quality education that is accessible anytime.",
      icon: <DollarSign className="text-purple-600" size={32} />
    },
    {
      title: 'CERTIFICATION',
      description: 'Earn credible certificates to boost your resume and career.',
      icon: <Award className="text-purple-600" size={32} />
    }
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Discover Our upLern's
            <span className="block gradient-text">Benefits & Features</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            In order to create an engaging learning experience, the role of 
            instructor is optional, but the role of learner is essential.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mb-4 z-10 relative">
                {benefit.icon}
              </div>
              <h3 className="font-bold text-lg mb-3 z-10 relative text-center">{benefit.title}</h3>
              <p className="text-gray-600 text-sm text-center z-10 relative">
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