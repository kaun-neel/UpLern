import React from 'react';
import { Target, BookOpen, GraduationCap } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen yellow-gradient-bg">
      {/* Hero Section */}
      <div className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-12 -left-12">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/80 to-pink-500/80 rounded-2xl transform rotate-45"></div>
              </div>
              <div className="w-96 h-96 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-500/80 to-pink-500/80 rounded-3xl transform rotate-12"></div>
                <div className="absolute bottom-0 right-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/80 to-pink-500/80 rounded-2xl transform -rotate-12"></div>
                </div>
              </div>
              <div className="absolute -bottom-8 left-1/4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/80 to-pink-500/80 rounded-2xl transform rotate-45"></div>
              </div>
            </div>
            
            <div>
              <span className="inline-block px-4 py-2 bg-blue-50/80 backdrop-blur-sm text-sm rounded-full mb-6 border border-blue-200/50">
                About upLern
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Welcome to upLern for your skills with best Online Courses.
              </h1>
              <div className="space-y-4 text-gray-700">
                <p>
                  At Uplern, we believe the next generation deserves more than yesterday's ideas.
                </p>
                <p>
                  We exist to energize, empower, and equip forward-thinkers to thrive in a rapidly changing world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Innovation Section */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            <span className="text-purple-600">Innovation</span>
          </h2>
          <p className="text-gray-700 max-w-2xl">
            is no longer optional — it's essential. That's why we design learning experiences, tools, and opportunities that are dynamic, adaptive, and built for real-world impact.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="glass-card-dark rounded-3xl p-8">
              <h3 className="text-xl font-bold text-purple-600 mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To inspire individuals and organizations to grow beyond boundaries, challenge convention, and drive meaningful progress.
              </p>
            </div>
            <div className="glass-card-dark rounded-3xl p-8">
              <h3 className="text-xl font-bold text-purple-600 mb-4">Our Vision</h3>
              <p className="text-gray-700">
                Is Simple With a commitment to innovation, community, and continuous improvement, we're building more than just a learning platform—we're shaping a global learning experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certification Section */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">We are Certified</h2>
          <p className="text-gray-700 max-w-4xl mx-auto mb-12">
            Uplern is an ISO-certified organization, dedicated to upholding the highest standards of quality, reliability, and continuous improvement. Our certification reflects our commitment to delivering services that meet global benchmarks for excellence and operational efficiency. At Uplern, we follow structured processes and best practices to ensure our clients receive consistent, secure, and value-driven solutions. This recognition not only reinforces our credibility but also demonstrates our dedication to fostering trust and long-term partnerships.
          </p>
          <div className="flex justify-center gap-8">
            <img src="images\certification.png" alt="ISO" className="h-16" />
          </div>
        </div>
      </div>

      {/* What we Stand for */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">What we Stand for</h2>
          
          <h3 className="text-xl font-bold mb-12 text-gray-700">
            Our expertise allows us to offer the finest carrier
          </h3>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-12">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100/80 backdrop-blur-sm flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-gray-800">Partnered with Top Institutions</h4>
                  <p className="text-gray-700">
                    Learn from collaborations with leading universities and companies.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100/80 backdrop-blur-sm flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-gray-800">Real-World Use Cases</h4>
                  <p className="text-gray-700">
                    Case studies and scenario-based training to prepare you for actual challenges.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100/80 backdrop-blur-sm flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-gray-800">Inclusive & Diverse Learning</h4>
                  <p className="text-gray-700">
                    A learning environment that welcomes every background and perspective.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <img 
                src="https://cdn3d.iconscout.com/3d/premium/thumb/woman-working-on-laptop-5706070-4755619.png" 
                alt="Working Professional" 
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Educational Philosophy */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-purple-600 font-medium mb-2 block">Our Educational Philosophy</span>
          <h2 className="text-3xl font-bold mb-12 text-gray-800">How does upLern Works?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-12 h-12 text-purple-600" />,
                title: 'Discover Your Path',
                description: 'Explore personalized course recommendations tailored to your goals and interests.',
                quote: '"Every big journey begins with a spark of curiosity."'
              },
              {
                icon: <Target className="w-12 h-12 text-purple-600" />,
                title: 'Enroll & Engage',
                description: 'Join live sessions, access resources, and interact with mentors in real-time.',
                quote: '"Learning thrives in active participation."'
              },
              {
                icon: <GraduationCap className="w-12 h-12 text-purple-600" />,
                title: 'Apply & Achieve',
                description: 'Use your new skills in real-world projects and earn certifications that matter.',
                quote: '"Turn knowledge into action and watch your future unfold."'
              }
            ].map((step, index) => (
              <div key={index} className="glass-card-dark rounded-3xl p-8">
                <div className="flex justify-center mb-6">{step.icon}</div>
                <h4 className="text-xl font-bold mb-4 text-gray-800">{step.title}</h4>
                <p className="text-gray-700 mb-6">{step.description}</p>
                <p className="text-sm text-gray-600 italic">{step.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-black text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold">
              Embrace Education,<br />
              Reach <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">New</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Elevation</span>
            </h2>
            <button className="px-6 py-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
              Start Learning →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;