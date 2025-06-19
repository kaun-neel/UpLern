import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, BookOpen, Users, Award, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { number: "10K+", label: "Students Enrolled", icon: <Users className="w-5 h-5" /> },
    { number: "50+", label: "Expert Instructors", icon: <Award className="w-5 h-5" /> },
    { number: "95%", label: "Success Rate", icon: <TrendingUp className="w-5 h-5" /> },
    { number: "24/7", label: "Support Available", icon: <BookOpen className="w-5 h-5" /> }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Rotate stats every 3 seconds
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const floatingElements = [
    {
      icon: <BookOpen className="w-8 h-8 text-purple-500" />,
      className: "absolute top-20 left-10 animate-float",
      delay: "0s"
    },
    {
      icon: <Award className="w-6 h-6 text-indigo-500" />,
      className: "absolute top-32 right-20 animate-float",
      delay: "1s"
    },
    {
      icon: <Users className="w-7 h-7 text-pink-500" />,
      className: "absolute bottom-40 left-20 animate-float",
      delay: "2s"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
      className: "absolute bottom-20 right-32 animate-float",
      delay: "0.5s"
    },
    {
      icon: <Sparkles className="w-5 h-5 text-yellow-500" />,
      className: "absolute top-1/2 left-1/4 animate-float",
      delay: "1.5s"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Background Shapes */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-indigo-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 right-1/4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl transform rotate-45 animate-float opacity-60"></div>
        <div className="absolute bottom-32 left-1/3 w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full animate-float opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-20 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg animate-float opacity-70" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating EdTech Icons */}
      {floatingElements.map((element, index) => (
        <div 
          key={index} 
          className={element.className}
          style={{ animationDelay: element.delay }}
        >
          <div className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
            {element.icon}
          </div>
        </div>
      ))}

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-in fade-in slide-in-from-bottom duration-1000' : 'opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-purple-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-700">#1 EdTech Platform in India</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-gray-900">Transform Your</span>
                <span className="block gradient-text">Future with</span>
                <span className="block text-gray-900">Expert Learning</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Join thousands of learners who are advancing their careers with our industry-leading courses. 
                Learn from experts, build real projects, and get certified.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/courses"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Start Learning Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-purple-300 text-purple-700 rounded-2xl font-semibold text-lg hover:bg-purple-50 hover:border-purple-400 transition-all duration-300"
              >
                <BookOpen className="w-5 h-5" />
                Learn More
              </Link>
            </div>

            {/* Dynamic Stats */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200">
                <div className="text-purple-500">
                  {stats[currentStat].icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats[currentStat].number}</div>
                  <div className="text-sm text-gray-600">{stats[currentStat].label}</div>
                </div>
              </div>
              
              {/* Progress Dots */}
              <div className="flex gap-2">
                {stats.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentStat ? 'bg-purple-500 w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Learning Dashboard */}
          <div className={`relative ${isVisible ? 'animate-in fade-in slide-in-from-bottom duration-1000' : 'opacity-0'} lg:block hidden`} style={{ animationDelay: '0.3s' }}>
            {/* Main Dashboard Card */}
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 transform hover:scale-105 transition-all duration-500">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Learning Dashboard</h3>
                    <p className="text-sm text-gray-600">Track your progress</p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4 mb-6">
                {[
                  { course: "Web Development", progress: 85, color: "from-purple-500 to-indigo-500" },
                  { course: "UI/UX Design", progress: 92, color: "from-pink-500 to-purple-500" },
                  { course: "Digital Marketing", progress: 78, color: "from-blue-500 to-cyan-500" }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{item.course}</span>
                      <span className="text-sm font-bold text-gray-900">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-2 bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: `${item.progress}%`,
                          animationDelay: `${index * 0.2}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Achievement Badges */}
              <div className="flex gap-3 mb-6">
                {[
                  { icon: <Award className="w-4 h-4" />, label: "Certified", color: "bg-yellow-100 text-yellow-700" },
                  { icon: <TrendingUp className="w-4 h-4" />, label: "Top 10%", color: "bg-green-100 text-green-700" },
                  { icon: <Users className="w-4 h-4" />, label: "Mentor", color: "bg-blue-100 text-blue-700" }
                ].map((badge, index) => (
                  <div key={index} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium ${badge.color}`}>
                    {badge.icon}
                    {badge.label}
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <Play className="w-4 h-4" />
                  Continue Learning
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-purple-300 text-purple-600 rounded-xl text-sm font-medium hover:bg-purple-50 transition-all duration-300">
                  <BookOpen className="w-4 h-4" />
                  Browse Courses
                </button>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Certificate Earned!</div>
                  <div className="text-xs text-gray-600">Web Development</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-4 animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">5 New Students</div>
                  <div className="text-xs text-gray-600">Joined today</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={`mt-16 ${isVisible ? 'animate-in fade-in slide-in-from-bottom duration-1000' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 font-medium">Trusted by students from top companies</p>
          </div>
          <div className="flex justify-center items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {[
              "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
              "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
              "https://upload.wikimedia.org/wikipedia/commons/4/4e/Intel_logo_%282006%29.svg"
            ].map((logo, index) => (
              <img 
                key={index} 
                src={logo} 
                alt="Company logo" 
                className="h-8 hover:scale-110 transition-transform duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;