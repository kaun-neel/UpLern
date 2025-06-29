import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: 'Basic Plans',
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
      price: '₹599',
      features: [
        'Subscription to unlimited access to all our courses',
        '5,000+ hours of learning',
        'ISO certified',
        'Access to 100+ upcoming courses in 2025',
        'E-books worth ₹9,999'
      ],
      buttonStyle: 'border-2 border-black text-black hover:bg-black hover:text-white',
      link: '/premium-pass'
    },
    {
      name: 'Premium Plans',
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
      price: '₹999',
      features: [
        'One-time Subscription 12+ Courses',
        'Best Video Quality',
        'Subscription to unlimited access to all our courses',
        '5,000+ hours of learning',
        'ISO certified',
        'Access to 100+ upcoming courses in 2025',
        'E-books worth ₹9,999'
      ],
      buttonStyle: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:shadow-lg',
      link: '/premium-pass'
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-16 yellow-gradient-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Pricing Plans <span className="gradient-text">For You</span>
          </h2>
          <p className="text-gray-700 text-sm sm:text-base">Precision pricing, powerful results.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="glass-card-dark rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-shadow flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-3">
                  {plan.icon}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">{plan.name}</h3>
                </div>
                <span className="text-xs sm:text-sm bg-gray-100/80 backdrop-blur-sm px-3 sm:px-4 py-1 rounded-full border border-gray-200/50">
                  Started from {plan.price}
                </span>
              </div>

              <div className="flex-1 flex flex-col">
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700 text-sm sm:text-base leading-relaxed">{feature}</span>
                    </li>
                  ))}
                  {/* Add extra spacing for Basic plan to align buttons */}
                  {index === 0 && (
                    <>
                      <li className="flex items-center gap-2 opacity-0 pointer-events-none">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                        <span className="text-gray-700 text-sm">Spacer item</span>
                      </li>
                      <li className="flex items-center gap-2 opacity-0 pointer-events-none">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                        <span className="text-gray-700 text-sm">Spacer item</span>
                      </li>
                    </>
                  )}
                </ul>

                <div className="text-center mt-auto">
                  <Link
                    to={plan.link}
                    onClick={() => window.scrollTo(0, 0)}
                    className={`w-full py-3 px-6 rounded-full font-medium transition-all duration-300 block text-center text-sm sm:text-base ${plan.buttonStyle}`}
                  >
                    Enroll now
                  </Link>
                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">Zyntiq Lifetime Membership</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;