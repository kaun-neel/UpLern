import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth.tsx';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, isGoogleAuthAvailable } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.firstName.trim()) {
      toast.error('First name is required');
      return;
    }
    
    if (!formData.lastName.trim()) {
      toast.error('Last name is required');
      return;
    }
    
    if (!formData.phone.trim()) {
      toast.error('Phone number is required');
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return;
    }
    
    if (!formData.password) {
      toast.error('Password is required');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp({
        email: formData.email.trim(),
        password: formData.password,
        first_name: formData.firstName.trim(),
        middle_name: formData.middleName.trim(),
        last_name: formData.lastName.trim(),
        phone: formData.phone.trim()
      });

      if (error) {
        toast.error(error);
        return;
      }

      toast.success('Account created successfully! Please log in with your credentials.');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (!isGoogleAuthAvailable) {
      toast.error('Google Sign-In is not available in this environment');
      return;
    }

    setGoogleLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast.error(error);
        return;
      }
      toast.success('Account created successfully with Google!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign up with Google.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Form */}
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 text-transparent bg-clip-text mb-2">
                    Create your account
                  </h2>
                  <p className="text-gray-600">Join thousands of learners worldwide</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-5">
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="First Name*"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="col-span-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-sm"
                      required
                      disabled={loading}
                    />
                    <input
                      type="text"
                      placeholder="Middle Name"
                      value={formData.middleName}
                      onChange={(e) => setFormData({...formData, middleName: e.target.value})}
                      className="col-span-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-sm"
                      disabled={loading}
                    />
                    <input
                      type="text"
                      placeholder="Last Name*"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="col-span-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-sm"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="flex gap-3">
                    <span className="px-4 py-3 bg-gradient-to-r from-violet-100 to-pink-100 rounded-xl text-violet-700 font-medium text-sm">+91</span>
                    <input
                      type="tel"
                      placeholder="Phone Number*"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-sm"
                      required
                      disabled={loading}
                    />
                  </div>

                  <input
                    type="email"
                    placeholder="Email address*"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-sm"
                    required
                    disabled={loading}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="password"
                      placeholder="Password*"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-sm"
                      required
                      disabled={loading}
                      minLength={6}
                    />
                    <input
                      type="password"
                      placeholder="Confirm Password*"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-sm"
                      required
                      disabled={loading}
                      minLength={6}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                      className="mt-1 w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                      required
                      disabled={loading}
                    />
                    <span className="text-sm text-gray-600 leading-relaxed">
                      By creating an account, I agree to this website's{' '}
                      <span className="text-violet-600 hover:text-violet-700 cursor-pointer">privacy policy</span>{' '}
                      and{' '}
                      <span className="text-violet-600 hover:text-violet-700 cursor-pointer">terms of service</span>.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-violet-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:transform-none"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <span className="text-gray-500 text-sm">Already have an account?</span>
                  <br />
                  <Link to="/login" className="text-violet-600 hover:text-violet-700 font-semibold text-lg">
                    Log in
                  </Link>
                </div>
              </div>

              {/* Google Sign-in Button - Outside the main form card */}
              {isGoogleAuthAvailable && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleGoogleSignup}
                    disabled={googleLoading}
                    className="flex items-center justify-center gap-3 bg-white border-2 border-gray-200 py-3 px-8 rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg transition-all duration-300 disabled:opacity-50 shadow-lg group"
                  >
                    <div className="relative">
                      <img 
                        src="https://www.google.com/favicon.ico" 
                        alt="Google" 
                        className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
                      />
                      {googleLoading && (
                        <div className="absolute inset-0 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      )}
                    </div>
                    <span className="font-medium text-gray-700">
                      {googleLoading ? 'Connecting to Google...' : 'Continue With Google'}
                    </span>
                  </button>
                </div>
              )}

              {!isGoogleAuthAvailable && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-800 text-center">
                    Google Sign-In is not available in this environment. Please use email/password authentication.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Background decorative elements */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full opacity-70 blur-xl animate-float"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-70 blur-xl animate-float" style={{animationDelay: '2s'}}></div>
              <div className="absolute top-1/2 -left-12 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-60 blur-lg animate-float" style={{animationDelay: '1s'}}></div>
              
              {/* Main illustration */}
              <div className="relative z-10 max-w-lg">
                <img
                  src="/create-account.png"
                  alt="Create Account Illustration"
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
              
              {/* Additional floating elements */}
              <div className="absolute top-16 right-8 w-16 h-16 bg-gradient-to-br from-pink-300 to-purple-400 rounded-2xl opacity-80 animate-float" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-24 left-4 w-12 h-12 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-xl opacity-70 animate-float" style={{animationDelay: '1.5s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;