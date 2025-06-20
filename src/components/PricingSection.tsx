import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: 'Basic Plans',
      icon: <Shield className="w-8 h-8" />,
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
      icon: <Zap className="w-8 h-8" />,
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
    <section className="py-16 md:py-24 px-6 md:px-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pricing Plans <span className="gradient-text">For You</span>
          </h2>
          <p className="text-gray-600">Precision pricing, powerful results.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {plan.icon}
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                </div>
                <span className="text-sm bg-gray-100 px-4 py-1 rounded-full">
                  Started from {plan.price}
                </span>
              </div>

              <div className="flex-1 flex flex-col">
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {/* Add extra spacing for Basic plan to align buttons */}
                  {index === 0 && (
                    <li className="flex items-center gap-2 opacity-0 pointer-events-none">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      <span className="text-gray-700">Spacer item</span>
                    </li>
                  )}
                  {index === 0 && (
                    <li className="flex items-center gap-2 opacity-0 pointer-events-none">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      <span className="text-gray-700">Spacer item</span>
                    </li>
                  )}
                </ul>

                <div className="text-center mt-auto">
                  <Link
                    to={plan.link}
                    onClick={() => window.scrollTo(0, 0)}
                    className={`w-full py-3 px-6 rounded-full font-medium transition-all duration-300 block text-center ${plan.buttonStyle}`}
                  >
                    Enroll now
                  </Link>
                  <p className="mt-4 text-sm text-gray-500">upLern Lifetime Membership</p>
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