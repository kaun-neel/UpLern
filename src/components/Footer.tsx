import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' }
  ];

  const courseCategories = [
    { name: 'Web Development', path: '/courses/web-development' },
    { name: 'UI/UX Design', path: '/courses/ui-ux-design' },
    { name: 'Marketing', path: '/courses/marketing' },
    { name: 'HR Management', path: '/courses/hr-management' },
    { name: 'Data Science', path: '/courses/data-science' },
    { name: 'Business', path: '/courses/business' }
  ];

  return (
    <footer className="bg-gray-50 pt-16 pb-8 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <GraduationCap className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
                uplern
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Uplern is an online education platform dedicated to helping professionals acquire new skills and advance their careers.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-violet-100 transition-colors">
                <Facebook size={16} className="text-gray-700" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-violet-100 transition-colors">
                <Twitter size={16} className="text-gray-700" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-violet-100 transition-colors">
                <Instagram size={16} className="text-gray-700" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-violet-100 transition-colors">
                <Linkedin size={16} className="text-gray-700" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 hover:text-violet-600 transition-colors"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Course Categories</h3>
            <ul className="space-y-2">
              {courseCategories.map((category) => (
                <li key={category.name}>
                  <Link 
                    to={category.path}
                    className="text-gray-600 hover:text-violet-600 transition-colors"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-violet-500 mt-1" size={18} />
                <span className="text-gray-600">123 Education Ave, Learning City, ED 54321</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-violet-500" size={18} />
                <a href="mailto:info@uplern.com" className="text-gray-600 hover:text-violet-600 transition-colors">
                  info@uplern.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-violet-500" size={18} />
                <a href="tel:+11234567890" className="text-gray-600 hover:text-violet-600 transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Uplern. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;