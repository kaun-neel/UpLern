import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

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
    <footer className="yellow-gradient-medium pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/Frame 3.png" 
                alt="Zyntiq Logo" 
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </div>
            <p className="text-gray-700 mb-4 text-sm sm:text-base leading-relaxed">
              Zyntiq is an online education platform dedicated to helping professionals acquire new skills and advance their careers.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors enhanced-shadow">
                <Facebook size={16} className="text-gray-700" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors enhanced-shadow">
                <Twitter size={16} className="text-gray-700" />
              </a>
              <a 
                href="https://www.instagram.com/zyntiq_official?utm_source=qr&igsh=a3d3cGFtb3hudWpi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors enhanced-shadow"
              >
                <Instagram size={16} className="text-gray-700" />
              </a>
              <a 
                href="https://www.linkedin.com/company/zyntiq/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors enhanced-shadow"
              >
                <Linkedin size={16} className="text-gray-700" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-700 hover:text-purple-600 transition-colors text-sm sm:text-base"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal & Support */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Legal & Support</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-700 hover:text-purple-600 transition-colors text-sm sm:text-base"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Contact Info</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-purple-500 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-700 text-sm sm:text-base">123 Education Ave, Learning City, ED 54321</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-purple-500 flex-shrink-0" size={18} />
                <a href="mailto:info@zyntiq.in" className="text-gray-700 hover:text-purple-600 transition-colors text-sm sm:text-base">
                  info@zyntiq.in
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-purple-500 flex-shrink-0" size={18} />
                <a href="tel:+11234567890" className="text-gray-700 hover:text-purple-600 transition-colors text-sm sm:text-base">
                  +1 (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-yellow-400/30 pt-6 sm:pt-8">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} Zyntiq. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;