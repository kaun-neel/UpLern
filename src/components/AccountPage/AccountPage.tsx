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
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          My <span className="gradient-text">Account</span>
        </h1>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => setActiveTab(item.key)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
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
          <div className="md:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={profile.first_name}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <span className="px-3 py-2 bg-gray-100 rounded-lg">+91</span>
                      <input
                        type="tel"
                        value={profile.phone}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      readOnly
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <button className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:shadow-lg transition-all duration-300">
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