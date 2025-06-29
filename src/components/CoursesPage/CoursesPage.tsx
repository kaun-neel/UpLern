import React, { useEffect, useState } from 'react';
import { Clock, BookOpen, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PaymentModal from '../Payment/PaymentModal';
import { usePayment } from '../../hooks/usePayment';
import { useEnrollment } from '../../hooks/useEnrollment';
import { useAuth } from '../../lib/auth';

const topCourses = [
  {
    id: 'web-development',
    title: 'Web Development',
    image: '/WebD.png',
    lectures: '100+ Lectures',
    hours: '4+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450,
    badge: 'EXCLUSIVE LECTURES',
    color: 'from-purple-500 to-indigo-700'
  },
  {
    id: 'javascript',
    title: 'Java Script Programming',
    image: '/JS.png',
    lectures: '20+ Lectures',
    hours: '4+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450,
    badge: 'DEVELOP YOUR TECHNICAL DISTINCT',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'angular',
    title: 'Angular Framework',
    image: '/Angular.png',
    lectures: '12+ Lectures',
    hours: '2+ Hours',
    description: 'Transform Your Business: Digital Marketing Strategies That Work',
    price: 599,
    originalPrice: 2450,
    badge: 'CREATIVE COURSE',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'chat-gpt',
    title: 'Chat GPT',
    image: '/AI.png',
    lectures: '5+ Lectures',
    hours: '1+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450,
    badge: 'ARTIFICIAL INTELLIGENCE COURSE',
    color: 'from-indigo-600 to-purple-800'
  }
];

const allCourses = [
  {
    id: 'web-development',
    title: 'Web Development',
    image: '/WebD.png',
    lectures: '100+ Lectures',
    hours: '4+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    image: '/DigitalM.png',
    lectures: '12+ Lectures',
    hours: '2+ Hours',
    description: 'Transform Your Business: Digital Marketing Strategies That Work',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'chat-gpt',
    title: 'Chat GPT (AI)',
    image: '/AI.png',
    lectures: '5+ Lectures',
    hours: '1+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'motion-design',
    title: 'Motion Design',
    image: '/MotionD.png',
    lectures: '10+ Lectures',
    hours: '4+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'excel-fundamental',
    title: 'Excel Fundamental',
    image: '/Excel.png',
    lectures: '20+ Lectures',
    hours: '2+ Hours',
    description: 'Transform Your Business: Digital Marketing Strategies That Work',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    image: '/UIUX.png',
    lectures: '10+ Lectures',
    hours: '2+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'javascript',
    title: 'Java Script Programing',
    image: 'JS.png',
    lectures: '20+ Lectures',
    hours: '4+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'angular',
    title: 'Angular Framework',
    image: '/Angular.png',
    lectures: '12+ Lectures',
    hours: '2+ Hours',
    description: 'Transform Your Business: Digital Marketing Strategies That Work',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    image: '/Cyber.png',
    lectures: '5+ Lectures',
    hours: '1+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450
  }
];

const CoursesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Payment integration
  const {
    isPaymentModalOpen,
    currentPaymentData,
    initiateCoursePayment,
    initiatePremiumPassPayment,
    closePaymentModal,
    handlePaymentSuccess
  } = usePayment();

  // Enrollment integration
  const {
    enrollments,
    loading: enrollmentLoading,
    hasPremiumPass,
    isEnrolledInCourseSync,
    refreshEnrollments
  } = useEnrollment();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Listen for enrollment updates
  useEffect(() => {
    const handleEnrollmentUpdate = () => {
      console.log('Enrollment update event received, refreshing...');
      refreshEnrollments();
    };

    window.addEventListener('enrollmentUpdated', handleEnrollmentUpdate);
    return () => window.removeEventListener('enrollmentUpdated', handleEnrollmentUpdate);
  }, [refreshEnrollments]);

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

  const handleEnrollClick = (e: React.MouseEvent, courseId: string, courseName: string) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    initiateCoursePayment(courseId, courseName);
  };

  const isEnrolledInCourse = (courseId: string): boolean => {
    if (enrollmentLoading) return false;
    return isEnrolledInCourseSync(courseId);
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

  const handlePremiumPassExplore = () => {
    window.scrollTo(0, 0);
    navigate('/premium-pass');
  };

  return (
    <div className="min-h-screen yellow-gradient-bg">
      {/* Hero Section with Welcome Background */}
      <div className="relative overflow-hidden">
        {/* Welcome Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-[15rem] lg:text-[20rem] font-bold text-yellow-200/20 select-none whitespace-nowrap">
            Welcome
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-300/60 rounded-2xl opacity-60"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-yellow-400/50 rounded-full opacity-40"></div>
        <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-yellow-500/60 rounded-xl opacity-50"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-700 mb-8">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="hover:text-purple-600 transition-colors">Home</Link>
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
                        className={`relative bg-gradient-to-r ${course.color} rounded-3xl p-8 cursor-pointer hover:scale-[1.02] transition-all duration-300 enhanced-shadow-lg`}
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
                            <div className="aspect-video rounded-2xl overflow-hidden enhanced-shadow">
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
                className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center enhanced-shadow hover:bg-white hover:scale-110 transition-all z-10"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center enhanced-shadow hover:bg-white hover:scale-110 transition-all z-10"
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
                        ? 'bg-purple-600 w-8' 
                        : 'bg-gray-400 hover:bg-gray-500 w-3'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Courses Section */}
      <div className="bg-white/30 backdrop-blur-sm py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">All Courses</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCourses.map((course, index) => {
              const enrolled = isEnrolledInCourse(course.id);
              
              return (
                <div 
                  key={index} 
                  className="glass-card rounded-3xl p-6 hover:shadow-xl hover:border-purple-200 transition-all duration-300 cursor-pointer group relative"
                  onClick={() => handleCourseClick(course.id)}
                >
                  {enrolled && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        <CheckCircle size={12} />
                        Enrolled
                      </div>
                    </div>
                  )}
                  
                  <div className="aspect-video bg-gray-50 rounded-2xl mb-4 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-600 transition-colors">{course.title}</h3>
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
                    {enrolled ? (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCourseClick(course.id);
                        }}
                        className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition-colors"
                      >
                        Continue Learning
                      </button>
                    ) : (
                      <button 
                        onClick={(e) => handleEnrollClick(e, course.id, course.title)}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        Enroll Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Premium Pass Banner - Updated Design */}
          <div className="mt-16 relative overflow-hidden rounded-3xl">
            {/* Purple gradient background */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative">
              {/* Organic shapes background */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Large organic shapes */}
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-600/30 rounded-full"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full"></div>
                <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-purple-500/25 rounded-full"></div>
                
                {/* Smaller decorative shapes */}
                <div className="absolute top-20 left-1/4 w-16 h-16 bg-purple-400/30 rounded-2xl transform rotate-45"></div>
                <div className="absolute bottom-20 right-1/3 w-12 h-12 bg-purple-300/40 rounded-full"></div>
                <div className="absolute top-1/3 left-1/6 w-8 h-8 bg-purple-200/50 rounded-lg"></div>
                
                {/* Curved organic elements */}
                <div className="absolute top-0 right-0 w-64 h-64">
                  <svg viewBox="0 0 200 200" className="w-full h-full text-purple-500/20 fill-current">
                    <path d="M50,100 Q100,50 150,100 Q100,150 50,100 Z" />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 w-48 h-48">
                  <svg viewBox="0 0 200 200" className="w-full h-full text-purple-400/15 fill-current">
                    <path d="M20,100 Q100,20 180,100 Q100,180 20,100 Z" />
                  </svg>
                </div>
              </div>
              
              <div className="relative z-10 p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Left Content */}
                  <div className="text-white">
                    <div className="flex items-center gap-3 mb-6">
                      <img 
                        src="/logo.png" 
                        alt="upLern Logo" 
                        className="h-8 w-auto object-contain"
                      />
                      <div className="flex items-center gap-2 bg-purple-600/50 backdrop-blur-sm px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span className="text-sm font-medium">Premium Pass</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-8 text-lg">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                        <span>Access to 13+ In-Depth Courses</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                        <span>Lifetime Access</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                        <span>free access to all future course</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                        <span>Exclusive eBook</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                        <span>and lot <span className="font-semibold">more</span></span>
                      </li>
                    </ul>
                    
                    <button 
                      onClick={handlePremiumPassExplore}
                      className="inline-flex items-center gap-2 px-8 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full hover:bg-white/30 transition-all duration-300 font-medium"
                    >
                      <span>Explore</span>
                      <div className="w-5 h-5 bg-white/30 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </button>
                  </div>
                  
                  {/* Right Illustration */}
                  <div className="flex justify-center relative">
                    {/* Circular background for illustration */}
                    <div className="w-80 h-80 bg-gradient-to-br from-purple-300/20 to-indigo-300/20 rounded-full flex items-center justify-center relative">
                      {/* Graduation cap illustration */}
                      <div className="relative">
                        <img
                          src="https://cdn3d.iconscout.com/3d/premium/thumb/graduation-cap-5856337-4892699.png"
                          alt="Graduation Cap"
                          className="w-48 h-48 object-contain"
                        />
                        {/* Additional decorative elements around the cap */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-80"></div>
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-orange-400 rounded-full opacity-70"></div>
                        <div className="absolute top-1/2 -right-8 w-4 h-4 bg-red-400 rounded-full opacity-60"></div>
                      </div>
                    </div>
                  </div>
                </div>
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
              Reach <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">New</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Elevation</span>
            </h2>
            <Link 
              to="/courses"
              onClick={() => window.scrollTo(0, 0)}
              className="px-8 py-3 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors font-medium flex items-center gap-2"
            >
              Start Learning
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {currentPaymentData && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={closePaymentModal}
          paymentData={currentPaymentData}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default CoursesPage;