import React, { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { localDB } from '../lib/database';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await localDB.insertContactMessage(formData);

      if (error) {
        toast.error(error);
        return;
      }

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          Get in <span className="gradient-text">Touch</span>
        </h1>
        <p className="text-xl mb-12">with me today</p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <Mail className="w-8 h-8 text-violet-500 mb-4" />
              <h3 className="font-semibold mb-2">Email us</h3>
              <p className="text-sm text-gray-600 mb-4">
=======
    <div className="min-h-screen yellow-gradient-bg py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">
          Get in <span className="gradient-text">Touch</span>
        </h1>
        <p className="text-xl mb-12 text-gray-700">with me today</p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="glass-card-dark rounded-2xl p-6">
              <Mail className="w-8 h-8 text-violet-500 mb-4" />
              <h3 className="font-semibold mb-2 text-gray-800">Email us</h3>
              <p className="text-sm text-gray-700 mb-4">
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
                Our email platform is designed to provide quick and efficient communication at every need.
              </p>
              <a href="mailto:info@uplern.com" className="text-violet-600">info@uplern.com</a>
            </div>

<<<<<<< HEAD
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <Phone className="w-8 h-8 text-violet-500 mb-4" />
              <h3 className="font-semibold mb-2">Call us</h3>
              <p className="text-sm text-gray-600 mb-4">
=======
            <div className="glass-card-dark rounded-2xl p-6">
              <Phone className="w-8 h-8 text-violet-500 mb-4" />
              <h3 className="font-semibold mb-2 text-gray-800">Call us</h3>
              <p className="text-sm text-gray-700 mb-4">
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
                Professional assistance, tailored to your needs.
              </p>
              <a href="tel:+916397xxx198" className="text-violet-600">+91 6397xxx198</a>
            </div>
          </div>

<<<<<<< HEAD
          <form onSubmit={handleSubmit} className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm">
=======
          <form onSubmit={handleSubmit} className="md:col-span-2 glass-card-dark rounded-2xl p-8">
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
<<<<<<< HEAD
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
=======
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone no</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
<<<<<<< HEAD
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
=======
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
<<<<<<< HEAD
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
=======
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
                required
                disabled={loading}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
<<<<<<< HEAD
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
=======
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
                rows={4}
                required
                disabled={loading}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;