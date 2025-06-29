import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Crown } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { useEnrollment } from '../hooks/useEnrollment';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { hasPremiumPass } = useEnrollment();
  const navigate = useNavigate();

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

  return (
    <header className="py-4 px-6 md:px-12 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-3">
        <img 
          src="/Frame 3.png" 
          alt="Zyntiq Logo" 
          className="h-10 w-auto object-contain"
        />
      </Link>
      
      <nav className="hidden md:block">
        <ul className="flex gap-8">
          {[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Courses', path: '/courses' },
            { name: 'Careers', path: '/careers' },
            { name: 'Contact', path: '/contact' }
          ].map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="text-gray-800 hover:text-purple-600 transition-colors duration-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="flex items-center gap-2">
              <Link
                to="/account"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-purple-300 text-gray-700 hover:bg-gray-50 transition-colors duration-300 relative"
              >
                <User size={20} />
                {hasPremiumPass && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                )}
              </Link>
              {hasPremiumPass && (
                <div className="hidden sm:flex items-center gap-1 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium border border-yellow-300">
                  <Crown className="w-3 h-3" />
                  <span>Premium</span>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-red-400 to-pink-500 text-white hover:shadow-md transition-all duration-300"
            >
              <LogOut size={20} />
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login"
              className="px-5 py-2 rounded-full border border-purple-300 text-gray-700 hover:bg-gray-50 transition-colors duration-300"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 text-white hover:shadow-md transition-all duration-300"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;