import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, BookOpen, Award, ChevronDown, Settings, LogOut, Crown, Edit, Shield, Bell } from 'lucide-react';
import { useAuth } from '../../lib/auth.tsx';
import { localDB } from '../../lib/database';
import toast from 'react-hot-toast';
import MyCoursesPage from './MyCoursesPage';
import CertificatesPage from './CertificatesPage';

const AccountPage = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [profile, setProfile] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const getProfile = async () => {
      try {
        const { data, error } = await localDB.getProfile(user.id);

        if (error) {
          console.error('Error fetching profile:', error);
          toast.error('Error loading profile. Please try again later.');
          return;
        }

        if (data) {
          setProfile({
            first_name: data.first_name || '',
            middle_name: data.middle_name || '',
            last_name: data.last_name || '',
            email: data.email || '',
            phone: data.phone || ''
          });
        }
      } catch (error) {
        console.error('Error in getProfile:', error);
        toast.error('Error loading profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        toast.error(error);
        return;
      }
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const menuItems = [
    { icon: <User size={20} />, label: 'Profile', key: 'profile' },
    { icon: <BookOpen size={20} />, label: 'My Courses', key: 'courses' },
    { icon: <Award size={20} />, label: 'Certificates', key: 'certificates' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen yellow-gradient-bg py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/4 mb-4 sm:mb-6"></div>
            <div className="h-48 sm:h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen yellow-gradient-bg py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 text-center sm:text-left">
          My <span className="gradient-text">Account</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card-dark rounded-2xl p-4 sm:p-6 relative">
              {/* Mobile Tab Selector with Purple Gradient and Arrow */}
              <div className="lg:hidden mb-4">
                <div className="relative">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium text-base flex items-center justify-between hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    <span>{menuItems.find(item => item.key === activeTab)?.label || 'Profile'}</span>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform duration-300 ${
                        showProfileDropdown ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {/* FIXED: Mobile Dropdown Menu with MAXIMUM Z-INDEX */}
                  {showProfileDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300" style={{ zIndex: 9999 }}>
                      {/* Main Navigation Options */}
                      <div className="py-2">
                        {menuItems.map((item) => (
                          <button
                            key={item.key}
                            onClick={() => {
                              setActiveTab(item.key);
                              setShowProfileDropdown(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-purple-50 transition-colors ${
                              activeTab === item.key ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                            }`}
                          >
                            <div className={`p-2 rounded-lg ${
                              activeTab === item.key ? 'bg-purple-200' : 'bg-gray-100'
                            }`}>
                              {item.icon}
                            </div>
                            <span className="font-medium">{item.label}</span>
                            {activeTab === item.key && (
                              <div className="ml-auto w-2 h-2 bg-purple-500 rounded-full"></div>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-200"></div>

                      {/* Additional Quick Actions */}
                      <div className="py-2">
                        <button
                          onClick={() => {
                            navigate('/premium-pass');
                            setShowProfileDropdown(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-colors"
                        >
                          <div className="p-2 rounded-lg bg-purple-100">
                            <Crown className="w-5 h-5 text-purple-600" />
                          </div>
                          <span className="font-medium text-purple-700">Upgrade to Premium</span>
                          <div className="ml-auto">
                            <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs rounded-full font-medium">
                              New
                            </span>
                          </div>
                        </button>

                        <button
                          onClick={() => {
                            toast.info('Account settings coming soon!');
                            setShowProfileDropdown(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                        >
                          <div className="p-2 rounded-lg bg-gray-100">
                            <Settings className="w-5 h-5 text-gray-600" />
                          </div>
                          <span className="font-medium text-gray-700">Account Settings</span>
                        </button>

                        <button
                          onClick={() => {
                            handleLogout();
                            setShowProfileDropdown(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 transition-colors border-t border-gray-100"
                        >
                          <div className="p-2 rounded-lg bg-red-100">
                            <LogOut className="w-5 h-5 text-red-600" />
                          </div>
                          <span className="font-medium text-red-700">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop Menu */}
              <ul className="hidden lg:block space-y-3">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    {/* Enhanced Profile Tab with Purple Gradient and Dropdown Arrow */}
                    {item.key === 'profile' ? (
                      <div className="relative">
                        <button
                          onClick={() => {
                            setActiveTab(item.key);
                            setShowProfileDropdown(!showProfileDropdown);
                          }}
                          className={`w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 text-left group relative overflow-hidden ${
                            activeTab === item.key
                              ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 text-white shadow-xl transform scale-[1.02]'
                              : 'hover:bg-gradient-to-r hover:from-purple-100 hover:to-indigo-100 text-gray-700 hover:text-purple-700 hover:shadow-lg hover:scale-[1.01] border-2 border-transparent hover:border-purple-200'
                          }`}
                        >
                          <div className="flex items-center gap-4 relative z-10">
                            <div className={`p-2 rounded-xl transition-all duration-300 ${
                              activeTab === item.key 
                                ? 'bg-white/20 shadow-lg' 
                                : 'group-hover:bg-purple-200 group-hover:shadow-md'
                            }`}>
                              {item.icon}
                            </div>
                            <span className="font-semibold text-base">{item.label}</span>
                          </div>
                          
                          {/* Dropdown Arrow - Always Visible */}
                          <div className="relative z-10">
                            <ChevronDown 
                              className={`w-5 h-5 transition-all duration-300 ${
                                showProfileDropdown ? 'rotate-180 scale-110' : ''
                              } ${
                                activeTab === item.key ? 'text-white' : 'text-gray-400 group-hover:text-purple-600'
                              }`} 
                            />
                          </div>
                        </button>

                        {/* FIXED: Desktop Profile Dropdown Menu with MAXIMUM Z-INDEX */}
                        {showProfileDropdown && (
                          <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300" style={{ zIndex: 9999 }}>
                            {/* User Info Header */}
                            <div className="px-5 py-4 bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 border-b border-gray-100">
                              <div className="flex items-center gap-4">
                                <div className="relative">
                                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                                    <User className="w-6 h-6 text-white" />
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-bold text-gray-900 text-base truncate">
                                    {profile.first_name} {profile.last_name}
                                  </p>
                                  <p className="text-sm text-gray-600 truncate">
                                    {profile.email}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-xs text-green-600 font-medium">Online</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Main Navigation Options */}
                            <div className="py-2">
                              {/* My Courses */}
                              <button
                                onClick={() => {
                                  setActiveTab('courses');
                                  setShowProfileDropdown(false);
                                }}
                                className="w-full flex items-start gap-4 px-5 py-3 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors group"
                              >
                                <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-all duration-200 group-hover:scale-110">
                                  <BookOpen className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-sm text-blue-700 group-hover:text-blue-800 transition-colors duration-200">
                                    My Courses
                                  </div>
                                  <div className="text-xs mt-0.5 text-blue-500 transition-colors duration-200">
                                    View your enrolled courses and progress
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full font-medium">
                                    Go
                                  </span>
                                </div>
                              </button>

                              {/* My Certificates */}
                              <button
                                onClick={() => {
                                  setActiveTab('certificates');
                                  setShowProfileDropdown(false);
                                }}
                                className="w-full flex items-start gap-4 px-5 py-3 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors group"
                              >
                                <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-all duration-200 group-hover:scale-110">
                                  <Award className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-sm text-blue-700 group-hover:text-blue-800 transition-colors duration-200">
                                    My Certificates
                                  </div>
                                  <div className="text-xs mt-0.5 text-blue-500 transition-colors duration-200">
                                    Download and share your certificates
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full font-medium">
                                    Go
                                  </span>
                                </div>
                              </button>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-200"></div>

                            {/* Additional Options */}
                            <div className="py-2">
                              <button
                                onClick={() => {
                                  toast.info('Edit profile feature coming soon!');
                                  setShowProfileDropdown(false);
                                }}
                                className="w-full flex items-start gap-4 px-5 py-3 text-left hover:bg-gray-50 transition-colors group"
                              >
                                <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-all duration-200 group-hover:scale-110">
                                  <Edit className="w-5 h-5 text-gray-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                                    Edit Profile
                                  </div>
                                  <div className="text-xs mt-0.5 text-gray-500 transition-colors duration-200">
                                    Update your personal information
                                  </div>
                                </div>
                              </button>

                              <button
                                onClick={() => {
                                  navigate('/premium-pass');
                                  setShowProfileDropdown(false);
                                }}
                                className="w-full flex items-start gap-4 px-5 py-3 text-left hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-colors group"
                              >
                                <div className="p-2 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-all duration-200 group-hover:scale-110">
                                  <Crown className="w-5 h-5 text-purple-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-sm text-purple-700 group-hover:text-purple-800 transition-colors duration-200">
                                    Upgrade to Premium
                                  </div>
                                  <div className="text-xs mt-0.5 text-purple-500 transition-colors duration-200">
                                    Get unlimited access to all courses
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs rounded-full font-medium">
                                    New
                                  </span>
                                </div>
                              </button>

                              <button
                                onClick={() => {
                                  toast.info('Account settings coming soon!');
                                  setShowProfileDropdown(false);
                                }}
                                className="w-full flex items-start gap-4 px-5 py-3 text-left hover:bg-gray-50 transition-colors group"
                              >
                                <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-all duration-200 group-hover:scale-110">
                                  <Settings className="w-5 h-5 text-gray-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                                    Account Settings
                                  </div>
                                  <div className="text-xs mt-0.5 text-gray-500 transition-colors duration-200">
                                    Manage your account preferences
                                  </div>
                                </div>
                              </button>

                              <button
                                onClick={() => {
                                  handleLogout();
                                  setShowProfileDropdown(false);
                                }}
                                className="w-full flex items-start gap-4 px-5 py-3 text-left hover:bg-red-50 transition-colors group border-t border-gray-100"
                              >
                                <div className="p-2 rounded-lg bg-red-50 group-hover:bg-red-100 transition-all duration-200 group-hover:scale-110">
                                  <LogOut className="w-5 h-5 text-red-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-sm text-red-700 group-hover:text-red-800 transition-colors duration-200">
                                    Sign Out
                                  </div>
                                  <div className="text-xs mt-0.5 text-red-500 transition-colors duration-200">
                                    Sign out of your account
                                  </div>
                                </div>
                              </button>
                            </div>

                            {/* Footer */}
                            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>Account ID: {user?.id.slice(0, 8)}...</span>
                                <span>Member since 2024</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Regular Menu Items */
                      <button
                        onClick={() => {
                          setActiveTab(item.key);
                          setShowProfileDropdown(false);
                        }}
                        className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 text-left group ${
                          activeTab === item.key
                            ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg transform scale-[1.02]'
                            : 'hover:bg-purple-50 text-gray-700 hover:text-purple-600 hover:shadow-md hover:scale-[1.01]'
                        }`}
                      >
                        <div className={`p-2 rounded-lg transition-colors ${
                          activeTab === item.key ? 'bg-white/20' : 'group-hover:bg-purple-100'
                        }`}>
                          {item.icon}
                        </div>
                        <span className="font-semibold">{item.label}</span>
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              {/* Quick Stats */}
              <div className="hidden lg:block mt-8 pt-6 border-t border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Account Status</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Member Since</span>
                    <span className="text-gray-800 font-semibold">2024</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Profile Views</span>
                    <span className="text-purple-600 font-semibold">127</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - REDUCED Z-INDEX */}
          <div className="lg:col-span-3" style={{ zIndex: 1 }}>
            {activeTab === 'profile' && (
              <div className="glass-card-dark rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Profile Information</h2>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300">
                    Edit Profile
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={profile.first_name}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/90 backdrop-blur-sm text-base"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      value={profile.middle_name}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/90 backdrop-blur-sm text-base"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={profile.last_name}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/90 backdrop-blur-sm text-base"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <span className="px-3 py-3 bg-gray-100/80 backdrop-blur-sm rounded-lg text-base">+91</span>
                      <input
                        type="tel"
                        value={profile.phone}
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/90 backdrop-blur-sm text-base"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/90 backdrop-blur-sm text-base"
                      readOnly
                    />
                  </div>
                </div>

                {/* Profile Actions */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                      Update Profile
                    </button>
                    <button className="flex-1 px-6 py-3 border-2 border-purple-300 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courses' && <MyCoursesPage />}
            {activeTab === 'certificates' && <CertificatesPage />}
          </div>
        </div>
      </div>

      {/* CRITICAL: Overlay to close dropdown with MAXIMUM Z-INDEX */}
      {showProfileDropdown && (
        <div 
          className="fixed inset-0 bg-transparent" 
          style={{ zIndex: 9998 }}
          onClick={() => setShowProfileDropdown(false)}
        />
      )}
    </div>
  );
};

export default AccountPage;