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

  const profileDropdownItems = [
    { 
      icon: <Settings size={18} />, 
      label: 'Account Settings', 
      action: () => setActiveTab('profile'),
      description: 'Manage your account preferences'
    },
    { 
      icon: <Edit size={18} />, 
      label: 'Edit Profile', 
      action: () => toast.info('Edit profile feature coming soon!'),
      description: 'Update your personal information'
    },
    { 
      icon: <Bell size={18} />, 
      label: 'Notifications', 
      action: () => toast.info('Notification settings coming soon!'),
      description: 'Manage your notification preferences'
    },
    { 
      icon: <Shield size={18} />, 
      label: 'Privacy & Security', 
      action: () => toast.info('Privacy settings coming soon!'),
      description: 'Control your privacy settings'
    },
    { 
      icon: <Crown size={18} />, 
      label: 'Upgrade to Premium', 
      action: () => navigate('/premium-pass'),
      description: 'Get unlimited access to all courses',
      highlight: true
    },
    { 
      icon: <LogOut size={18} />, 
      label: 'Sign Out', 
      action: handleLogout, 
      danger: true,
      description: 'Sign out of your account'
    }
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
            <div className="glass-card-dark rounded-2xl p-4 sm:p-6">
              {/* Mobile Tab Selector */}
              <div className="lg:hidden mb-4">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/90 backdrop-blur-sm text-base"
                >
                  {menuItems.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Desktop Menu */}
              <ul className="hidden lg:block space-y-3">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    {/* Enhanced Profile Tab with Attractive Dropdown */}
                    {item.key === 'profile' ? (
                      <div className="relative">
                        <button
                          onClick={() => {
                            setActiveTab(item.key);
                            setShowProfileDropdown(!showProfileDropdown);
                          }}
                          className={`w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 text-left group relative overflow-hidden ${
                            activeTab === item.key
                              ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 text-white shadow-xl transform scale-[1.02] border-2 border-purple-300'
                              : 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 text-gray-700 hover:text-purple-700 hover:shadow-lg hover:scale-[1.01] border-2 border-transparent hover:border-purple-200'
                          }`}
                        >
                          {/* Animated Background Gradient */}
                          <div className={`absolute inset-0 bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
                            activeTab === item.key ? 'opacity-20' : ''
                          }`}></div>
                          
                          {/* Sparkle Effect */}
                          <div className={`absolute top-2 right-2 w-2 h-2 bg-white rounded-full opacity-0 transition-opacity duration-300 ${
                            activeTab === item.key ? 'opacity-60 animate-pulse' : 'group-hover:opacity-40'
                          }`}></div>
                          
                          <div className="flex items-center gap-4 relative z-10">
                            <div className={`p-2 rounded-xl transition-all duration-300 ${
                              activeTab === item.key 
                                ? 'bg-white/20 shadow-lg' 
                                : 'group-hover:bg-purple-100 group-hover:shadow-md'
                            }`}>
                              {item.icon}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-base">{item.label}</span>
                              <span className={`text-xs transition-colors duration-300 ${
                                activeTab === item.key 
                                  ? 'text-white/80' 
                                  : 'text-gray-500 group-hover:text-purple-600'
                              }`}>
                                Click to see options
                              </span>
                            </div>
                          </div>
                          
                          <div className="relative z-10">
                            <ChevronDown 
                              className={`w-5 h-5 transition-all duration-300 ${
                                showProfileDropdown ? 'rotate-180 scale-110' : ''
                              } ${
                                activeTab === item.key ? 'text-white' : 'text-gray-400 group-hover:text-purple-600'
                              }`} 
                            />
                          </div>

                          {/* Dropdown Indicator */}
                          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 transition-all duration-300 ${
                            showProfileDropdown ? 'opacity-100' : 'opacity-0'
                          }`}></div>
                        </button>

                        {/* Enhanced Profile Dropdown Menu */}
                        {showProfileDropdown && (
                          <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-200 z-30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
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

                            {/* Dropdown Items */}
                            <div className="py-2">
                              {profileDropdownItems.map((dropdownItem, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    dropdownItem.action();
                                    setShowProfileDropdown(false);
                                  }}
                                  className={`w-full flex items-start gap-4 px-5 py-3 text-left hover:bg-gray-50 transition-all duration-200 group ${
                                    dropdownItem.danger 
                                      ? 'hover:bg-red-50 border-t border-gray-100' 
                                      : dropdownItem.highlight 
                                      ? 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50' 
                                      : ''
                                  }`}
                                >
                                  <div className={`p-2 rounded-lg transition-all duration-200 group-hover:scale-110 ${
                                    dropdownItem.danger 
                                      ? 'text-red-500 bg-red-50 group-hover:bg-red-100' 
                                      : dropdownItem.highlight 
                                      ? 'text-purple-600 bg-purple-50 group-hover:bg-purple-100' 
                                      : 'text-gray-500 bg-gray-50 group-hover:bg-gray-100'
                                  }`}>
                                    {dropdownItem.icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className={`font-semibold text-sm transition-colors duration-200 ${
                                      dropdownItem.danger 
                                        ? 'text-red-700 group-hover:text-red-800' 
                                        : dropdownItem.highlight 
                                        ? 'text-purple-700 group-hover:text-purple-800' 
                                        : 'text-gray-700 group-hover:text-gray-900'
                                    }`}>
                                      {dropdownItem.label}
                                    </div>
                                    <div className={`text-xs mt-0.5 transition-colors duration-200 ${
                                      dropdownItem.danger 
                                        ? 'text-red-500' 
                                        : dropdownItem.highlight 
                                        ? 'text-purple-500' 
                                        : 'text-gray-500'
                                    }`}>
                                      {dropdownItem.description}
                                    </div>
                                  </div>
                                  {dropdownItem.highlight && (
                                    <div className="flex items-center">
                                      <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs rounded-full font-medium">
                                        New
                                      </span>
                                    </div>
                                  )}
                                </button>
                              ))}
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

          {/* Main Content */}
          <div className="lg:col-span-3">
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

      {/* Overlay to close dropdown */}
      {showProfileDropdown && (
        <div 
          className="fixed inset-0 z-20" 
          onClick={() => setShowProfileDropdown(false)}
        />
      )}
    </div>
  );
};

export default AccountPage;