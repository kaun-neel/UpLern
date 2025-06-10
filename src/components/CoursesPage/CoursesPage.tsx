import React, { useEffect, useState } from 'react';
import { Clock, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const topCourses = [
  {
    id: 'web-development',
    title: 'Web Development',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop&crop=center',
    lectures: '100+ Lectures',
    hours: '4+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450,
    badge: 'EXCLUSIVE LECTURES',
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 'javascript',
    title: 'Java Script Programming',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop&crop=center',
    lectures: '20+ Lectures',
    hours: '4+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450,
    badge: 'DEVELOP YOUR TECHNICAL DISTINCT',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'angular',
    title: 'Angular Framework',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&crop=center',
    lectures: '12+ Lectures',
    hours: '2+ Hours',
    description: 'Transform Your Business: Digital Marketing Strategies That Work',
    price: 599,
    originalPrice: 2450,
    badge: 'CREATIVE COURSE',
    color: 'from-red-500 to-red-700'
  },
  {
    id: 'chat-gpt',
    title: 'Chat GPT',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center',
    lectures: '5+ Lectures',
    hours: '1+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450,
    badge: 'ARTIFICIAL INTELLIGENCE COURSE',
    color: 'from-gray-600 to-gray-800'
  }
];

const allCourses = [
  {
    id: 'web-development',
    title: 'Web Development',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/web-development-5977974-4995252.png',
    lectures: '100+ Lectures',
    hours: '4+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/digital-marketing-5706074-4755623.png',
    lectures: '12+ Lectures',
    hours: '2+ Hours',
    description: 'Transform Your Business: Digital Marketing Strategies That Work',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'chat-gpt',
    title: 'Chat GPT (AI)',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/ai-robot-8571862-6809009.png',
    lectures: '5+ Lectures',
    hours: '1+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'motion-design',
    title: 'Motion Design',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/motion-graphics-5977947-4995225.png',
    lectures: '10+ Lectures',
    hours: '4+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'excel-fundamental',
    title: 'Excel Fundamental',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/excel-5977890-4995168.png',
    lectures: '20+ Lectures',
    hours: '2+ Hours',
    description: 'Transform Your Business: Digital Marketing Strategies That Work',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/ui-ux-design-5977973-4995251.png',
    lectures: '10+ Lectures',
    hours: '2+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'javascript',
    title: 'Java Script Programing',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/javascript-5977895-4995173.png',
    lectures: '20+ Lectures',
    hours: '4+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'angular',
    title: 'Angular Framework',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/angular-5977872-4995150.png',
    lectures: '12+ Lectures',
    hours: '2+ Hours',
    description: 'Transform Your Business: Digital Marketing Strategies That Work',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/cyber-security-5977884-4995162.png',
    lectures: '5+ Lectures',
    hours: '1+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450
  }
];

const CoursesPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % topCourses.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleCourseClick = (courseId: string) => {
    window.scrollTo(0, 0);
    navigate(`/courses/${courseId}`);
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % topCourses.length);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + topCourses.length) % topCourses.length);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section with Welcome Background */}
      <div className="relative overflow-hidden">
        {/* Welcome Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-[15rem] lg:text-[20rem] font-bold text-purple-100/20 select-none whitespace-nowrap">
            Welcome
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 right-20 w-16 h-16 bg-pink-200 rounded-2xl opacity-60"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-blue-200 rounded-full opacity-40"></div>
        <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-green-200 rounded-xl opacity-50"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="hover:text-violet-600 transition-colors">Home</Link>
            <span>•</span>
            <span>All Courses</span>
          </div>

          {/* Popular Courses Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Popular Courses</h2>
            
            <div className="relative max-w-5xl mx-auto">
              {/* Slider Container - Made smaller */}
              <div className="overflow-hidden rounded-3xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {topCourses.map((course, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <div 
                        className={`relative bg-gradient-to-r ${course.color} rounded-3xl p-8 cursor-pointer hover:scale-[1.02] transition-all duration-300 shadow-2xl`}
                        onClick={() => handleCourseClick(course.id)}
                      >
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                          {/* Left Content */}
                          <div className="text-white">
                            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
                              {course.badge}
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h3>
                            <p className="text-white/90 mb-6 text-lg">{course.description}</p>
                            
                            <div className="flex items-center gap-6 mb-6">
                              <div className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5" />
                                <span>{course.lectures}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span>{course.hours}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <span className="text-3xl font-bold">₹{course.price}</span>
                              <span className="text-white/70 line-through text-xl">₹{course.originalPrice}</span>
                              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                75% OFF
                              </span>
                            </div>
                          </div>

                          {/* Right Image */}
                          <div className="relative">
                            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                              <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {/* Play button overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                <div className="w-0 h-0 border-t-6 border-t-transparent border-l-10 border-l-gray-800 border-b-6 border-b-transparent ml-1"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows - Now outside the rounded container */}
              <button
                onClick={prevSlide}
                className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all z-10"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all z-10"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-3 mt-6">
                {topCourses.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-violet-600 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400 w-3'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Courses Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">All Courses</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCourses.map((course, index) => (
              <div 
                key={index} 
                className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:border-violet-200 transition-all duration-300 cursor-pointer group"
                onClick={() => handleCourseClick(course.id)}
              >
                <div className="aspect-video bg-gray-50 rounded-2xl mb-4 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-violet-600 transition-colors">{course.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <BookOpen size={16} />
                    <span>{course.lectures}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{course.hours}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-6 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">₹{course.price}</span>
                    <span className="text-sm text-gray-400 line-through ml-2">₹{course.originalPrice}</span>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Premium Pass Banner */}
          <div className="mt-16 bg-gradient-to-r from-purple-900 via-violet-900 to-purple-900 text-white rounded-3xl p-8 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-32 h-32 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-24 h-24 border border-white/20 rounded-full"></div>
              <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white/20 rounded-full"></div>
            </div>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold">uplern</span>
                  <span className="bg-violet-500 text-xs px-3 py-1 rounded-full font-medium">Premium</span>
                </div>
                <h2 className="text-3xl font-bold mb-6">Premium Pass</h2>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                    <span>Access to 13+ In-Depth Courses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                    <span>Lifetime Access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                    <span>Free access to all future courses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                    <span>Exclusive eBook</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                    <span>And lot more</span>
                  </li>
                </ul>
                <Link 
                  to="/premium-pass"
                  onClick={() => window.scrollTo(0, 0)}
                  className="inline-block px-8 py-3 bg-violet-500 rounded-full hover:bg-violet-600 transition-colors font-medium"
                >
                  Explore Premium
                </Link>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/rocket-launch-5856337-4892699.png"
                  alt="Premium"
                  className="w-64 h-64 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="bg-black text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left">
              Embrace Education,<br />
              Reach <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">New</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Elevation</span>
            </h2>
            <Link 
              to="/courses"
              onClick={() => window.scrollTo(0, 0)}
              className="px-8 py-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors font-medium flex items-center gap-2"
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

export default CoursesPage;