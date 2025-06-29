import React from 'react';

const OfferingsSection = () => {
  const offerings = [
    {
      title: 'Exclusive Masterclasses',
      image: "images/table.png",
      description: 'Learn from industry experts through our exclusive masterclass series'
    },
    {
      title: 'One-Time Subscription',
      image: "images/sitting.png",
      description: 'Get lifetime access with a single subscription payment'
    },
    {
      title: 'Key Features',
      image: "images/running.png",
      description: 'Access to premium learning tools and resources'
    },
    {
      title: 'Internship & Opportunities',
      image: "images/standing.png",
      description: 'Connect with top companies for internship opportunities'
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 sm:mb-16 text-center md:text-left md:ml-8 text-gray-800">
          What we Offer <span className="gradient-text">Here!</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {offerings.map((offering, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="relative h-48 sm:h-56 md:h-64 w-full max-w-[200px] sm:max-w-[240px] md:max-w-[264px] flex items-center justify-center mb-4 sm:mb-6">
                <img 
                  src={offering.image} 
                  alt={offering.title}
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="glass-card-dark px-4 sm:px-6 py-2 sm:py-3 rounded-full text-center w-full max-w-[180px] sm:max-w-[200px]">
                <h3 className="font-semibold text-xs sm:text-sm md:text-base text-gray-800 leading-tight">{offering.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;