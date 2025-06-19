import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Award, Briefcase, Zap, Target } from 'lucide-react';

const OfferingsSection = () => {
  const [activeOffering, setActiveOffering] = useState(0);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  const offerings = [
    {
      title: 'Exclusive Masterclasses',
      description: 'Learn from industry experts through our exclusive masterclass series with hands-on workshops',
      icon: <BookOpen className="w-8 h-8" />,
      image: "https://cdn3d.iconscout.com/3d/premium/thumb/online-learning-5706072-4755621.png",
      gradient: 'from-purple-500 to-indigo-500',
      stats: '50+ Expert Sessions'
    },
    {
      title: 'One-Time Subscription',
      description: 'Get lifetime access with a single subscription payment - no recurring fees ever',
      icon: <Target className="w-8 h-8" />,
      image: "https://cdn3d.iconscout.com/3d/premium/thumb/subscription-5706076-4755625.png",
      gradient: 'from-blue-500 to-cyan-500',
      stats: 'Lifetime Access'
    },
    {
      title: 'Premium Features',
      description: 'Access to premium learning tools, resources, and advanced course materials',
      icon: <Zap className="w-8 h-8" />,
      image: "https://cdn3d.iconscout.com/3d/premium/thumb/premium-features-5706077-4755626.png",
      gradient: 'from-green-500 to-emerald-500',
      stats: '100+ Tools & Resources'
    },
    {
      title: 'Career Opportunities',
      description: 'Connect with top companies for internship and job opportunities through our network',
      icon: <Briefcase className="w-8 h-8" />,
      image: "https://cdn3d.iconscout.com/3d/premium/thumb/career-growth-5706078-4755627.png",
      gradient: 'from-orange-500 to-red-500',
      stats: '500+ Partner Companies'
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

    const cards = document.querySelectorAll('.offering-card-observer');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOffering((prev) => (prev + 1) % offerings.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24 px-6 md:px-16 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-purple-200 mb-6">
            <Award className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">What We Offer</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            What we Offer <span className="gradient-text">Here!</span>
          </h2>
          
          <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            Discover our comprehensive learning ecosystem designed to accelerate your professional growth and unlock new opportunities.
          </p>
        </div>

        {/* Main Offerings Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - Interactive Cards */}
          <div className="space-y-6">
            {offerings.map((offering, index) => (
              <div
                key={index}
                className={`offering-card-observer group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-500 ${
                  activeOffering === index
                    ? 'bg-white border-purple-300 shadow-2xl scale-105'
                    : 'bg-white/60 backdrop-blur-sm border-gray-200 hover:border-purple-200 hover:shadow-lg'
                } ${visibleCards.includes(index) ? 'animate-in fade-in slide-in-from-bottom duration-700' : 'opacity-0'}`}
                data-index={index}
                onClick={() => setActiveOffering(index)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${offering.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {offering.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                        {offering.title}
                      </h3>
                      <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                        {offering.stats}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {offering.description}
                    </p>
                  </div>
                </div>

                {/* Active Indicator */}
                {activeOffering === index && (
                  <div className={`mt-4 h-1 bg-gradient-to-r ${offering.gradient} rounded-full animate-pulse`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side - Dynamic Illustration */}
          <div className="relative">
            <div className="relative w-full h-96 bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-2xl overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-blue-100/50"></div>
              
              {/* Main Image */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <img
                  src={offerings[activeOffering].image}
                  alt={offerings[activeOffering].title}
                  className="w-full h-full object-contain transition-all duration-500 hover:scale-110"
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center animate-float">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              
              <div className="absolute bottom-6 left-6 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                <Award className="w-6 h-6 text-blue-500" />
              </div>

              {/* Progress Indicator */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                {offerings.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeOffering ? 'bg-purple-500 w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl animate-float opacity-80"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-400 rounded-xl animate-float opacity-70" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>

        {/* Bottom Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "10K+", label: "Active Students", icon: <Users className="w-5 h-5" /> },
            { number: "50+", label: "Expert Instructors", icon: <Award className="w-5 h-5" /> },
            { number: "100+", label: "Course Hours", icon: <BookOpen className="w-5 h-5" /> },
            { number: "95%", label: "Success Rate", icon: <Target className="w-5 h-5" /> }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-3">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;