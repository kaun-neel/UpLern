import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Monitor, Shield } from 'lucide-react';

const CareersPage = () => {
  const internships = [
    {
      title: 'HR/Marketing',
      icon: <Users className="w-6 h-6" />,
      description: 'Fuel your ambition: Take charge of your career with our 2-month HR/Marketing internship.',
      image: 'https://cdn3d.iconscout.com/3d/premium/thumb/business-meeting-5706083-4755632.png'
    },
    {
      title: 'Web Development',
      icon: <Monitor className="w-6 h-6" />,
      description: 'Fuel your ambition: Take charge of your career with our 2-month Web Development internship.',
      image: 'https://cdn3d.iconscout.com/3d/premium/thumb/business-meeting-5706083-4755632.png'
    },
    {
      title: 'Cybersecurity',
      icon: <Shield className="w-6 h-6" />,
      description: 'Fuel your ambition: Take charge of your career with our 2-month Cybersecurity internship.',
      image: 'https://cdn3d.iconscout.com/3d/premium/thumb/business-meeting-5706083-4755632.png'
    }
  ];

  const benefits = [
    {
      title: 'Interactive Online Learning',
      description: 'Gain access to high-quality content and live session led by expert instructors for a smooth and engaging learning experience.',
      icon: '🎯'
    },
    {
      title: 'Flexible Study Schedule',
      description: 'Learn at your own pace with a customizable schedule that fits your lifestyle and personal commitments.',
      icon: '📅'
    },
    {
      title: 'Industry-Focused Training',
      description: 'Work on real-world projects and earn certifications that are internationally recognized, ensuring and relevant skills.',
      icon: '🏢'
    },
    {
      title: 'Hand-On Projects & Global Certification',
      description: 'Build experience through live projects and receive certifications acknowledged by organizations around the world.',
      icon: '📜'
    }
  ];

  const companies = [
    'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
    'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
    'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/4e/Yahoo%21_logo_%282013-2019%29.svg',
    'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
    'https://upload.wikimedia.org/wikipedia/commons/c/c3/Skype_logo_%282019%E2%80%93present%29.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/4e/Intel_logo_%282006%29.svg'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-100 to-indigo-50 overflow-hidden min-h-[600px]">
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-48 relative z-10">
          <h1 className="text-5xl font-bold text-purple-900 mb-4">
            upLern<br />
            INTERNSHIP<br />
            PROGRAM
          </h1>
          <h2 className="text-7xl font-bold text-purple-900">2025</h2>
        </div>
        
        <img
          src="https://cdn3d.iconscout.com/3d/premium/thumb/business-building-5851875-4870584.png"
          alt="City Buildings"
          className="absolute right-0 top-0 h-full object-contain z-0"
        />
        
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L1440,192L1440,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Internship Cards */}
      <div className="max-w-6xl mx-auto px-6 -mt-32 relative z-20">
        <div className="grid md:grid-cols-3 gap-8">
          {internships.map((internship, index) => (
            <div key={index} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  {internship.icon}
                </div>
                <h3 className="text-xl font-bold mt-2">{internship.title}</h3>
              </div>
              <img 
                src={internship.image} 
                alt={internship.title} 
                className="w-full h-32 object-contain mb-4"
              />
              <p className="text-gray-600 mb-6 text-sm">{internship.description}</p>
              <button className="w-full bg-purple-600 text-white py-2.5 rounded-full hover:bg-purple-700 transition-colors text-sm">
                Apply now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Program Overview */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-12">Program Overview</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="h-64 bg-purple-100 rounded-3xl flex items-end justify-center">
              <div className="flex gap-4 mb-8">
                {[20, 40, 60, 80].map((height, index) => (
                  <div
                    key={index}
                    className="w-12 h-24 bg-purple-600 rounded-t-lg"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <p className="text-gray-600">
              Unlock access to over 30 internship-related resources, attend interactive live sessions, and become part of an encouraging learning community. Choose between a 1-month or 2-month access plan, learn at your own pace, and download materials to keep forever.
            </p>
            
            <ul className="space-y-4">
              {[
                'Get unlimited access to more than 30 high quality learning modules.',
                'Join live weekend sessions led by experienced instructors.',
                'Use exclusive resources and join Q&A discussion.',
                'Select either 1 or 2 months of flexible access to internship materials.',
                'Study from anywhere, anytime-it fits into your schedule.'
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Certification Section */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8">
              Internationally Recognized & Government Approved Internship Certification
            </h2>
            
            <ul className="space-y-4">
              {[
                'Certified to ISO 9001:2015 standards by QFS Management System LLP, ensuring excellence in quality management.',
                'Accredited by the Standards Council of Canada.',
                'Compliant with globally recognized quality standards.'
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/certificate-5856337-4892699.png"
              alt="Certificate"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-2">Internship Benefits</h2>
        
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div className="space-y-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-4">
                <span className="text-2xl">{benefit.icon}</span>
                <div>
                  <h3 className="font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center">
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/woman-working-from-home-5706071-4755620.png"
              alt="Working from home"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>

      {/* Training Structure */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-purple-900">
            How will your training be structured?
          </h2>
          <p className="text-purple-600">
            it's as simple as it sounds- and even more rewarding!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: 'Join the Program',
              items: [
                'Sign up for the internship program directly through the upLern platform.',
                'You\'ll be assigned a dedicated instructor.',
                'Learn at your own pace with flexible scheduling.'
              ]
            },
            {
              title: 'Watch video lessons & Attend Weekend Mentorships',
              items: [
                'Get access to a wide range of recorded video lessons covering different areas of the internship syllabus.',
                'Join live mentor-led weekend sessions to receive expert advice and clarify doubts.',
                'Concentrate on mastering key concepts during the first 15 days.'
              ]
            },
            {
              title: 'Work on Projects',
              items: [
                'Take part in hands-on project sessions to put your knowledge into action.',
                'Apply what you\'ve learned through practical assignments designed to solidify your understanding.',
                'Work on projects throughout the internship to deepen your skills.',
                'Receive expert feedback and answers to your questions within 24 hours.'
              ]
            },
            {
              title: 'Earn Your Certificate',
              items: [
                'Go over all you\'ve learned to get ready for the final evaluation.',
                'Make sure to complete and submit all required assignments and coursework.',
                'After passing the final exam and meeting all criteria, you\'ll receive an internship certificate recognizing your expertise and accomplishments.'
              ]
            }
          ].map((section, index) => (
            <div key={index} className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">{index + 1}</span>
                </div>
                <h3 className="font-bold">{section.title}</h3>
              </div>
              <ul className="space-y-3">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2"></span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Companies Section */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our internship graduates are currently working at
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-12">
          {companies.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="Company logo"
              className="h-8 opacity-50 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>

      {/* Footer Banner */}
      <div className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold">
              Embrace Education,<br />
              Reach <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">New</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Elevation</span>
            </h2>
            <Link 
              to="/courses"
              className="px-6 py-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              Start Learning
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;