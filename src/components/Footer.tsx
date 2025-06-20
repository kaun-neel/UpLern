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
    <footer className="bg-gray-50 pt-16 pb-8 px-6 md:px-16">
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
            <p className="text-gray-600 mb-4">
              Uplern is an online education platform dedicated to helping professionals acquire new skills and advance their careers.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-purple-100 transition-colors">
                <Facebook size={16} className="text-gray-700" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-purple-100 transition-colors">
                <Twitter size={16} className="text-gray-700" />
              </a>
              <a 
                href="https://www.instagram.com/zyntiq_official?utm_source=qr&igsh=a3d3cGFtb3hudWpi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-purple-100 transition-colors"
              >
                <Instagram size={16} className="text-gray-700" />
              </a>
              <a 
                href="https://www.linkedin.com/company/zyntiq/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-purple-100 transition-colors"
              >
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
                    className="text-gray-600 hover:text-purple-600 transition-colors"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Legal & Support</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 hover:text-purple-600 transition-colors"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-purple-500 mt-1" size={18} />
                <span className="text-gray-600">123 Education Ave, Learning City, ED 54321</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-purple-500" size={18} />
                <a href="mailto:info@uplern.com" className="text-gray-600 hover:text-purple-600 transition-colors">
                  info@uplern.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-purple-500" size={18} />
                <a href="tel:+11234567890" className="text-gray-600 hover:text-purple-600 transition-colors">
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