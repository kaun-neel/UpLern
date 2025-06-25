import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
=======
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' },
    { name: 'Refund Policy', path: '/refund-policy' },
    { name: 'Support', path: '/support' }
  ];

  return (
<<<<<<< HEAD
    <footer className="bg-gray-50 pt-16 pb-8 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                <GraduationCap className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
                uplern
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Uplern is an online education platform dedicated to helping professionals acquire new skills and advance their careers.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-purple-100 transition-colors">
                <Facebook size={16} className="text-gray-700" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-purple-100 transition-colors">
=======
    <footer className="yellow-gradient-medium pt-16 pb-8 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo.png" 
                alt="upLern Logo" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-gray-700 mb-4">
              Uplern is an online education platform dedicated to helping professionals acquire new skills and advance their careers.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors enhanced-shadow">
                <Facebook size={16} className="text-gray-700" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors enhanced-shadow">
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
                <Twitter size={16} className="text-gray-700" />
              </a>
              <a 
                href="https://www.instagram.com/zyntiq_official?utm_source=qr&igsh=a3d3cGFtb3hudWpi" 
                target="_blank" 
                rel="noopener noreferrer"
<<<<<<< HEAD
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-purple-100 transition-colors"
=======
                className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors enhanced-shadow"
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
              >
                <Instagram size={16} className="text-gray-700" />
              </a>
              <a 
                href="https://www.linkedin.com/company/zyntiq/" 
                target="_blank" 
                rel="noopener noreferrer"
<<<<<<< HEAD
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-purple-100 transition-colors"
=======
                className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors enhanced-shadow"
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
              >
                <Linkedin size={16} className="text-gray-700" />
              </a>
            </div>
          </div>
          
          <div>
<<<<<<< HEAD
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
=======
            <h3 className="text-lg font-bold mb-4 text-gray-800">Quick Links</h3>
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
<<<<<<< HEAD
                    className="text-gray-600 hover:text-purple-600 transition-colors"
=======
                    className="text-gray-700 hover:text-purple-600 transition-colors"
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
<<<<<<< HEAD
            <h3 className="text-lg font-bold mb-4">Legal & Support</h3>
=======
            <h3 className="text-lg font-bold mb-4 text-gray-800">Legal & Support</h3>
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
<<<<<<< HEAD
                    className="text-gray-600 hover:text-purple-600 transition-colors"
=======
                    className="text-gray-700 hover:text-purple-600 transition-colors"
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
<<<<<<< HEAD
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-purple-500 mt-1" size={18} />
                <span className="text-gray-600">123 Education Ave, Learning City, ED 54321</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-purple-500" size={18} />
                <a href="mailto:info@uplern.com" className="text-gray-600 hover:text-purple-600 transition-colors">
=======
            <h3 className="text-lg font-bold mb-4 text-gray-800">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-purple-500 mt-1" size={18} />
                <span className="text-gray-700">123 Education Ave, Learning City, ED 54321</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-purple-500" size={18} />
                <a href="mailto:info@uplern.com" className="text-gray-700 hover:text-purple-600 transition-colors">
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
                  info@uplern.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-purple-500" size={18} />
<<<<<<< HEAD
                <a href="tel:+11234567890" className="text-gray-600 hover:text-purple-600 transition-colors">
=======
                <a href="tel:+11234567890" className="text-gray-700 hover:text-purple-600 transition-colors">
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
                  +1 (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>
        
<<<<<<< HEAD
        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-gray-500 text-sm">
=======
        <div className="border-t border-yellow-400/30 pt-8">
          <p className="text-center text-gray-600 text-sm">
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
            © {new Date().getFullYear()} Uplern. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;