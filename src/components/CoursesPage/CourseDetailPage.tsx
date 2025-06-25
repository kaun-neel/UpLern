import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Clock, BookOpen, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import PaymentModal from '../Payment/PaymentModal';
import CourseContent from './CourseContent';
import { usePayment } from '../../hooks/usePayment';
import { useEnrollment } from '../../hooks/useEnrollment';
import { useAuth } from '../../lib/auth';

const CourseDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollment, setEnrollment] = useState<any>(null);
  
  // Payment integration
  const {
    isPaymentModalOpen,
    currentPaymentData,
    initiateCoursePayment,
    closePaymentModal,
    handlePaymentSuccess
  } = usePayment();

  // Enrollment integration
  const {
    enrollments,
    loading: enrollmentLoading,
    hasPremiumPass,
    isEnrolledInCourseSync,
    getCourseEnrollment,
    updateProgress,
    refreshEnrollments
  } = useEnrollment();

  const courseDetails = {
    title: 'Web Development Course',
    description: 'The Web Development course from upLern is designed to provide students with comprehensive training in building dynamic and responsive websites. Covering both front-end and back-end development, this course equips students with the skills and knowledge needed to create modern web applications that meet industry standards and user expectations. Through a combination of theoretical lectures, hands-on coding exercises, and practical projects, students will learn essential web technologies, frameworks, and best practices to design, develop, and deploy fully functional websites.',
<<<<<<< HEAD
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/web-development-5977974-4995252.png',
=======
    image: '/WebD.png',
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
    lectures: '80+ Lecture',
    price: 599,
    originalPrice: 2450,
    language: 'English',
    enrolled: '100+ Enrolled',
    features: [
      'Introduction to Web Development',
      'HTML and CSS Fundamentals',
      'JavaScript Programming',
      'Front-End Frameworks and Libraries',
      'Responsive Web Design',
      'Back-End Development',
      'Database Management',
      'Web Application Development',
      'Version Control and Deployment',
      'Web Performance Optimization'
    ]
  };

  const testimonials = [
    {
      quote: "Transformed my web design skills completely",
      text: "The online courses on this platform have been a game-changer for me. The content is engaging, the instructors are knowledgeable",
      name: "James",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "Incredible course, highly recommend to anyone!",
      text: "I've always wanted to explore a new skill, but never had the time or resources. This online learning platform has made it possible for me",
      name: "Will",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "The best investment I've made for my career.",
      text: "As a busy professional, the online courses on this platform have allowed me to upskill and stay ahead of the curve",
      name: "Jenny",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];

  // Listen for enrollment updates
  useEffect(() => {
    const handleEnrollmentUpdate = () => {
      console.log('Enrollment update event received in course detail, refreshing...');
      refreshEnrollments();
    };

    window.addEventListener('enrollmentUpdated', handleEnrollmentUpdate);
    return () => window.removeEventListener('enrollmentUpdated', handleEnrollmentUpdate);
  }, [refreshEnrollments]);

  // Check enrollment status
  useEffect(() => {
    if (user && courseId && !enrollmentLoading) {
      const enrolled = isEnrolledInCourseSync(courseId);
      const courseEnrollment = getCourseEnrollment(courseId);
      
      console.log(`Course ${courseId} enrollment status:`, { enrolled, courseEnrollment, hasPremiumPass });
      
      setIsEnrolled(enrolled);
      setEnrollment(courseEnrollment);
    } else {
      setIsEnrolled(false);
      setEnrollment(null);
    }
  }, [user, courseId, enrollments, hasPremiumPass, enrollmentLoading, isEnrolledInCourseSync, getCourseEnrollment]);

  const handleEnrollClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    initiateCoursePayment(courseId || 'web-development', courseDetails.title);
  };

  const handleProgressUpdate = async (progress: number) => {
    if (enrollment?.id) {
      await updateProgress(enrollment.id, progress);
      setEnrollment(prev => ({ ...prev, progress }));
    }
  };

  if (enrollmentLoading) {
    return (
<<<<<<< HEAD
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
=======
      <div className="min-h-screen yellow-gradient-bg flex items-center justify-center">
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 py-8">
=======
    <div className="min-h-screen yellow-gradient-bg">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-100/80 to-purple-100/80 backdrop-blur-sm py-8">
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
        <div className="max-w-6xl mx-auto px-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ChevronLeft size={20} />
            Back
          </button>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-bold">{courseDetails.title}</h1>
                {isEnrolled && (
                  <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    <CheckCircle size={16} />
                    Enrolled
                  </div>
                )}
              </div>
              <p className="text-gray-600 mb-6">{courseDetails.description}</p>
              
              <div className="flex flex-wrap gap-4">
<<<<<<< HEAD
                <div className="bg-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
                  <BookOpen size={16} />
                  {courseDetails.lectures}
                </div>
                <div className="bg-white px-4 py-2 rounded-full text-sm">
                  {courseDetails.language}
                </div>
                <div className="bg-white px-4 py-2 rounded-full text-sm">
=======
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center gap-2 border border-white/30">
                  <BookOpen size={16} />
                  {courseDetails.lectures}
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-white/30">
                  {courseDetails.language}
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-white/30">
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
                  {courseDetails.enrolled}
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={courseDetails.image}
                alt={courseDetails.title}
                className="w-full max-w-md mx-auto"
              />
              
              {!isEnrolled && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
<<<<<<< HEAD
                  <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
=======
                  <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors enhanced-shadow">
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
                    <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {isEnrolled ? (
          // Show course content for enrolled users
          <CourseContent
            courseId={courseId || 'web-development'}
            courseName={courseDetails.title}
            enrollment={enrollment}
            onProgressUpdate={handleProgressUpdate}
          />
        ) : (
          // Show course preview for non-enrolled users
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6">What you'll learn</h2>
              <div className="grid grid-cols-2 gap-4">
                {courseDetails.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
<<<<<<< HEAD
              <div className="bg-white rounded-3xl shadow-sm p-6 sticky top-6">
=======
              <div className="glass-card-dark rounded-3xl p-6 sticky top-6">
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
                <div className="aspect-video bg-gray-100 rounded-xl mb-6">
                  <img
                    src={courseDetails.image}
                    alt={courseDetails.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-2xl font-bold">₹{courseDetails.price}</span>
                    <span className="text-gray-400 line-through ml-2">₹{courseDetails.originalPrice}</span>
                  </div>
                  <span className="text-green-500 font-medium">75% OFF</span>
                </div>

                <button 
                  onClick={handleEnrollClick}
                  className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 mb-4"
                >
                  {user ? 'Enroll Now' : 'Login to Enroll'}
                </button>

                <p className="text-center text-sm text-gray-500">30-Day Money-Back Guarantee</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Certificate Section - Only show if not enrolled */}
      {!isEnrolled && (
        <div className="max-w-6xl mx-auto px-6 py-12">
<<<<<<< HEAD
          <div className="grid md:grid-cols-2 gap-8 items-center bg-gray-50 rounded-3xl p-8">
=======
          <div className="grid md:grid-cols-2 gap-8 items-center glass-card rounded-3xl p-8">
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/certificate-5856337-4892699.png"
              alt="Certificate"
              className="w-full max-w-md mx-auto"
            />
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Earn a carrier <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-500">certificate</span>
              </h2>
              <p className="text-gray-600">
                You are encouraged to add this credential to your LinkedIn profile, résumé, or CV, and
                share it on professional networks or during performance evaluations
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials - Only show if not enrolled */}
      {!isEnrolled && (
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-8">Featured review</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
<<<<<<< HEAD
              <div key={index} className="bg-white rounded-3xl p-6 shadow-sm">
=======
              <div key={index} className="glass-card rounded-3xl p-6">
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
                <h3 className="text-lg font-bold mb-4">"{testimonial.quote}"</h3>
                <p className="text-gray-600 mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="text-gray-700">-{testimonial.name}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-8">
<<<<<<< HEAD
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
              <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
=======
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-white/80 backdrop-blur-sm">
              <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-white/80 backdrop-blur-sm">
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Footer Banner */}
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

export default CourseDetailPage;