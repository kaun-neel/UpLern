import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, GraduationCap, Clock, BookOpen, Award, Crown, CheckCircle } from 'lucide-react';
import CountUp from 'react-countup';
import PaymentModal from '../Payment/PaymentModal';
import { usePayment } from '../../hooks/usePayment';
import { useEnrollment } from '../../hooks/useEnrollment';
import { useAuth } from '../../lib/auth';

const PremiumPassPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { hasPremiumPass, enrollments } = useEnrollment();
  
  // Payment integration
  const {
    isPaymentModalOpen,
    currentPaymentData,
    initiatePremiumPassPayment,
    closePaymentModal,
    handlePaymentSuccess
  } = usePayment();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePurchaseClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    initiatePremiumPassPayment();
  };

  const handleExploreCourses = () => {
    window.scrollTo(0, 0);
    navigate('/courses');
  };

  // Get premium pass enrollment details
  const premiumEnrollment = enrollments.find(e => e.enrollment_type === 'premium_pass');

  return (
    <div className="min-h-screen yellow-gradient-bg text-gray-800">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors mb-12">
          <ChevronLeft size={20} />
          Back
        </Link>

        {/* Logo and Title */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <img 
              src="/logo.png" 
              alt="upLern Logo" 
              className="h-12 w-auto object-contain"
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-3xl font-bold text-gray-800">Premium Pass</h2>
            <Crown className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        {/* Premium Status Banner */}
        {hasPremiumPass && (
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 text-center enhanced-shadow-lg">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Crown className="w-12 h-12 text-white" />
                <h3 className="text-3xl font-bold text-white">Premium Member</h3>
              </div>
              <p className="text-white/90 text-lg mb-6">
                🎉 Congratulations! You have unlimited access to all courses and premium benefits.
              </p>
              {premiumEnrollment && (
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6">
                  <p className="text-white font-medium">
                    Member since: {new Date(premiumEnrollment.enrolled_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
              <button 
                onClick={handleExploreCourses}
                className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Your Courses
              </button>
            </div>
          </div>
        )}

        {/* Introduction */}
        {!hasPremiumPass && (
          <div className="max-w-3xl mx-auto text-center mb-24 glass-card-dark rounded-3xl p-8">
            <p className="text-lg text-gray-700">
              We're excited to introduce our newest course bundle, created to elevate your learning experience! Unlock a world of knowledge with our all-in-one package, thoughtfully designed to equip you with the expertise and confidence you need to thrive. More details coming soon on how you can take advantage of this exceptional opportunity!
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-24">
          <div className="glass-card-dark rounded-2xl p-6 text-center">
            <h3 className="text-4xl font-bold mb-2 text-gray-800">
              <CountUp end={100} suffix="+" duration={2.5} />
            </h3>
            <p className="text-sm text-gray-600">Members</p>
            <p className="text-xs text-gray-500 mt-2">Join the community with 1000+ students and excel!</p>
          </div>
          <div className="glass-card-dark rounded-2xl p-6 text-center">
            <h3 className="text-4xl font-bold mb-2 text-gray-800">
              <CountUp end={1} prefix="0" suffix="+" duration={2.5} />
            </h3>
            <p className="text-sm text-gray-600">Hours</p>
            <p className="text-xs text-gray-500 mt-2">Get access to every bit of our content</p>
          </div>
          <div className="glass-card-dark rounded-2xl p-6 text-center">
            <h3 className="text-4xl font-bold mb-2 text-gray-800">
              <CountUp end={10} suffix="+" duration={2.5} />
            </h3>
            <p className="text-sm text-gray-600">Lectures</p>
            <p className="text-xs text-gray-500 mt-2">Watch 100+ well-paced lecture at your comfort</p>
          </div>
        </div>

        {/* Premium Benefits for Existing Members */}
        {hasPremiumPass && (
          <div className="max-w-4xl mx-auto mb-24">
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Your Premium Benefits</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card-dark rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">Unlimited Course Access</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-700">Access to all 13+ current courses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-700">Free access to all future courses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-700">Lifetime access guarantee</span>
                  </li>
                </ul>
              </div>

              <div className="glass-card-dark rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">Premium Features</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-700">Priority customer support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-700">Exclusive eBooks and resources</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-700">Early access to new courses</span>
                  </li>
                </ul>
              </div>

              <div className="glass-card-dark rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">Certification Benefits</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-700">Verified certificates for all courses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-700">LinkedIn integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-700">Industry recognition</span>
                  </li>
                </ul>
              </div>

              <div className="glass-card-dark rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">Exclusive Access</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-700">upLern Academy membership</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-700">Premium community access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-700">Monthly live sessions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Features for Non-Premium Users */}
        {!hasPremiumPass && (
          <div className="max-w-4xl mx-auto glass-card-dark rounded-3xl p-12 mb-24">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Column - Pricing */}
              <div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Join</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-800">₹999</span>
                    <span className="text-lg text-gray-500 line-through">₹4999</span>
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">80% OFF</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full"></span>
                    <span className="text-gray-700">Lifetime Access To Verified Certificates.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full"></span>
                    <span className="text-gray-700">100+ New Courses Coming in 2025.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full"></span>
                    <span className="text-gray-700">Enjoy Unlimited Learning with Full course Access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full"></span>
                    <span className="text-gray-700">Complimentary Entry to upLern Academy.</span>
                  </li>
                </ul>

                <div className="space-y-4">
                  <div className="w-full py-2 rounded-full bg-green-500 text-center font-medium text-white">
                    Save 80% - Limited Time Offer!
                  </div>
                  <button 
                    onClick={handlePurchaseClick}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:shadow-lg transition-all duration-300 font-semibold"
                  >
                    {user ? 'Get Premium Pass' : 'Login to Purchase'}
                  </button>
                </div>
              </div>

              {/* Right Column - Features */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <BookOpen className="w-8 h-8 mb-4 text-purple-600" />
                  <h4 className="font-semibold mb-2 text-gray-800">14+ Courses</h4>
                  <p className="text-sm text-gray-600">Access a diverse selection of professionally developed, live and recorded courses designed to enhance your skill set and career prospects.</p>
                </div>
                <div>
                  <Clock className="w-8 h-8 mb-4 text-purple-600" />
                  <h4 className="font-semibold mb-2 text-gray-800">Lifetime Access</h4>
                  <p className="text-sm text-gray-600">Benefit from unlimited, lifetime access to over 14 practical courses, available anytime at your convenience.</p>
                </div>
                <div>
                  <Award className="w-8 h-8 mb-4 text-purple-600" />
                  <h4 className="font-semibold mb-2 text-gray-800">Certified Programs</h4>
                  <p className="text-sm text-gray-600">All upLern courses include certification, providing you with recognized credentials to strengthen your professional profile.</p>
                </div>
                <div>
                  <GraduationCap className="w-8 h-8 mb-4 text-purple-600" />
                  <h4 className="font-semibold mb-2 text-gray-800">upLern Academy</h4>
                  <p className="text-sm text-gray-600">A meticulously curated academic platform aimed at supporting students in their career preparation with comprehensive study materials.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Certificate Section */}
        <div className="max-w-4xl mx-auto mb-24">
          <h3 className="text-2xl font-bold text-center mb-12 text-gray-800">Why Invest in Professional Certificate?</h3>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <img 
                src="images/certificate.png" 
                alt="Sample Certificate" 
                className="w-full rounded-2xl enhanced-shadow"
              />
              <p className="text-center mt-4 text-gray-600">Sample certificate</p>
            </div>
            
            <div className="space-y-8">
              <div className="glass-card rounded-2xl p-6">
                <h4 className="font-semibold mb-2 text-gray-800">Hike</h4>
                <p className="text-sm text-gray-600">The dedication invested in obtaining this increased compensation over time.</p>
              </div>
              
              <div className="glass-card rounded-2xl p-6">
                <h4 className="font-semibold mb-2 text-gray-800">Advantage</h4>
                <p className="text-sm text-gray-600">Acquiring credentials that distinguish you from your peers provides a notable competitive edge in the job market.</p>
              </div>
              
              <div className="glass-card rounded-2xl p-6">
                <h4 className="font-semibold mb-2 text-gray-800">Productivity</h4>
                <p className="text-sm text-gray-600">Entering the workforce with industry-recognized certifications positions you for early success and long-term growth.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embrace Education Strip */}
      <div className="w-full bg-black py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold text-white">
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

export default PremiumPassPage;