import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, BookOpen, Award } from 'lucide-react';
import { useAuth } from '../../lib/auth.tsx';
import { localDB } from '../../lib/database';
import toast from 'react-hot-toast';
import MyCoursesPage from './MyCoursesPage';
import CertificatesPage from './CertificatesPage';

const AccountPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
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
              <ul className="hidden lg:block space-y-2">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => setActiveTab(item.key)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                        activeTab === item.key
                          ? 'bg-purple-50 text-purple-600'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="glass-card-dark rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">Profile Information</h2>
                
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

                <div className="mt-6 sm:mt-8">
                  <button className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:shadow-lg transition-all duration-300 text-base">
                    Edit Profile
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'courses' && <MyCoursesPage />}
            {activeTab === 'certificates' && <CertificatesPage />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;