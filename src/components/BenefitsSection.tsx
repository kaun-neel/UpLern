import React, { useState, useEffect } from 'react';
import { Clock, Infinity, DollarSign, Award, Zap, Shield, Users, BookOpen } from 'lucide-react';

const BenefitsSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  const benefits = [
    {
      title: 'LEARN AT YOUR PACE',
      description: 'Flexible courses designed to fit your schedule anytime, anywhere.',
      icon: <Clock className="text-purple-600" size={32} />,
      gradient: 'from-purple-500 to-indigo-500',
      bgPattern: 'bg-purple-50'
    },
    {
      title: 'LIFETIME ACCESS',
      description: 'Revisit your courses anytime because learning never stops.',
      icon: <Infinity className="text-blue-600" size={32} />,
      gradient: 'from-blue-500 to-cyan-500',
      bgPattern: 'bg-blue-50'
    },
    {
      title: 'AFFORDABLE PRICING',
      description: "High quality education that is accessible to everyone.",
      icon: <DollarSign className="text-green-600" size={32} />,
      gradient: 'from-green-500 to-emerald-500',
      bgPattern: 'bg-green-50'
    },
    {
      title: 'INDUSTRY CERTIFICATION',
      description: 'Earn credible certificates to boost your resume and career.',
      icon: <Award className="text-yellow-600" size={32} />,
      gradient: 'from-yellow-500 to-orange-500',
      bgPattern: 'bg-yellow-50'
    },
    {
      title: 'EXPERT INSTRUCTORS',
      description: 'Learn from industry professionals with years of experience.',
      icon: <Users className="text-pink-600" size={32} />,
      gradient: 'from-pink-500 to-rose-500',
      bgPattern: 'bg-pink-50'
    },
    {
      title: 'HANDS-ON PROJECTS',
      description: 'Build real-world projects to strengthen your portfolio.',
      icon: <BookOpen className="text-indigo-600" size={32} />,
      gradient: 'from-indigo-500 to-purple-500',
      bgPattern: 'bg-indigo-50'
    },
    {
      title: 'INSTANT SUPPORT',
      description: '24/7 community support and mentorship when you need it.',
      icon: <Zap className="text-orange-600" size={32} />,
      gradient: 'from-orange-500 to-red-500',
      bgPattern: 'bg-orange-50'
    },
    {
      title: 'SECURE LEARNING',
      description: 'Safe and secure platform with encrypted data protection.',
      icon: <Shield className="text-teal-600" size={32} />,
      gradient: 'from-teal-500 to-cyan-500',
      bgPattern: 'bg-teal-50'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.benefit-card-observer');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-24 px-6 md:px-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
            <Zap className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Why Choose upLern</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Discover Our upLern's
            <span className="block gradient-text">Benefits & Features</span>
          </h2>
          
          <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            Experience the future of learning with our comprehensive platform designed to accelerate your career growth and skill development.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className={`benefit-card-observer group relative overflow-hidden rounded-3xl p-8 bg-white border border-gray-100 hover:border-purple-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                visibleCards.includes(index) ? 'animate-in fade-in slide-in-from-bottom duration-700' : 'opacity-0'
              }`}
              data-index={index}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Pattern */}
              <div className={`absolute inset-0 ${benefit.bgPattern} opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              {/* Icon Container */}
              <div className="relative z-10 mb-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <div className="text-white">
                    {benefit.icon}
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-4 text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {benefit.description}
                </p>
              </div>

              {/* Hover Effect Elements */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${benefit.gradient} animate-pulse`}></div>
              </div>
              
              {/* Bottom Accent */}
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${benefit.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                  {i}K+
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900">Join 10,000+ Happy Students</div>
              <div className="text-sm text-gray-600">Start your learning journey today</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;