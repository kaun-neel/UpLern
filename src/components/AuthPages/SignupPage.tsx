import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth.tsx';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();
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
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        middle_name: formData.middleName,
        last_name: formData.lastName,
        phone: formData.phone
      });

      if (error) {
        toast.error(error);
        return;
      }

      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
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
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
              uplern
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 text-transparent bg-clip-text mb-2">
                  Create your account
                </h2>
                <p className="text-gray-600">Join thousands of learners worldwide</p>
              </div>

              <form onSubmit={handleSignup} className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="col-span-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                    required
                    disabled={loading}
                  />
                  <input
                    type="text"
                    placeholder="Middle Name"
                    value={formData.middleName}
                    onChange={(e) => setFormData({...formData, middleName: e.target.value})}
                    className="col-span-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="col-span-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="flex gap-4">
                  <span className="px-4 py-3 bg-gradient-to-r from-violet-100 to-pink-100 rounded-xl text-violet-700 font-medium">+91</span>
                  <input
                    type="tel"
                    placeholder="9636xxx744"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                    required
                    disabled={loading}
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                  required
                  disabled={loading}
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                    required
                    disabled={loading}
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                    required
                    disabled={loading}
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

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Link to="/login" className="text-violet-600 hover:text-violet-700 font-semibold text-lg">
                    Log in
                  </Link>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleGoogleSignup}
                  disabled={googleLoading}
                  className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 py-3 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 disabled:opacity-50 bg-white/70 backdrop-blur-sm"
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                  <span className="font-medium text-gray-700">
                    {googleLoading ? 'Signing up...' : 'Continue With Google'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Background decorative elements */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full opacity-70 blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-70 blur-xl"></div>
              <div className="absolute top-1/2 -left-12 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-60 blur-lg"></div>
              
              {/* Main illustration */}
              <div className="relative z-10 max-w-lg">
                <img
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/sign-up-5706095-4755644.png"
                  alt="Create Account Illustration"
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
              
              {/* Additional floating elements */}
              <div className="absolute top-16 right-8 w-16 h-16 bg-gradient-to-br from-pink-300 to-purple-400 rounded-2xl opacity-80 animate-float"></div>
              <div className="absolute bottom-24 left-4 w-12 h-12 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-xl opacity-70 animate-float" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;