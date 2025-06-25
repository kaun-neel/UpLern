import React from 'react';

const characterImages = {
  reading: "https://cdn3d.iconscout.com/3d/premium/thumb/man-reading-book-5706068-4755617.png?f=webp",
  speaking: "https://cdn3d.iconscout.com/3d/premium/thumb/man-talking-with-megaphone-5706085-4755634.png?f=webp",
  announcing: "https://cdn3d.iconscout.com/3d/premium/thumb/businessman-announcing-with-megaphone-5706084-4755633.png?f=webp",
  working: "https://cdn3d.iconscout.com/3d/premium/thumb/businessman-working-on-laptop-5706067-4755616.png?f=webp"
};

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
    <section className="py-16 md:py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
<<<<<<< HEAD
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-left ml-8">
          What we Offer <span className="gradient-text">Here!</span>
        </h2>
        
        <div className="relative">
          <div className="absolute inset-0 z-0 mt-40 md:mt-32">
            <div className="w-full h-48 bg-teal-50 rounded-[100px]"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {offerings.map((offering, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative h-64 w-64 flex items-center justify-center mb-6">
                  <img 
                    src={offering.image} 
                    alt={offering.title}
                    className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="bg-white px-6 py-3 rounded-full shadow-md text-center w-full max-w-[200px]">
                  <h3 className="font-semibold text-sm md:text-base">{offering.title}</h3>
                </div>
              </div>
            ))}
          </div>
=======
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-left ml-8 text-gray-800">
          What we Offer <span className="gradient-text">Here!</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {offerings.map((offering, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative h-64 w-64 flex items-center justify-center mb-6">
                <img 
                  src={offering.image} 
                  alt={offering.title}
                  className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="glass-card-dark px-6 py-3 rounded-full text-center w-full max-w-[200px]">
                <h3 className="font-semibold text-sm md:text-base text-gray-800">{offering.title}</h3>
              </div>
            </div>
          ))}
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;