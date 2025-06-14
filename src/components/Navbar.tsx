import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, User, LogOut } from 'lucide-react';
import { useAuth } from '../lib/auth';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, signOut } = useAuth();
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
      <Link to="/" className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
          <GraduationCap className="text-white" size={24} />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
          uplern
        </span>
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
                className="text-gray-800 hover:text-violet-600 transition-colors duration-300"
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
            <Link
              to="/account"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-violet-300 text-gray-700 hover:bg-gray-50 transition-colors duration-300"
            >
              <User size={20} />
            </Link>
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
              className="px-5 py-2 rounded-full border border-violet-300 text-gray-700 hover:bg-gray-50 transition-colors duration-300"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 text-white hover:shadow-md transition-all duration-300"
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