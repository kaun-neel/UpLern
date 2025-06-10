import React, { useEffect } from 'react';
import { Clock, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const courses = [
  {
    id: 'web-development',
    title: 'Web Development',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/web-development-5977974-4995252.png',
    lectures: '100+ Lectures',
    hours: '4+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/digital-marketing-5706074-4755623.png',
    lectures: '12+ Lectures',
    hours: '2+ Hours',
    description: 'Transform Your Business: Digital Marketing Strategies That Work',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'chat-gpt',
    title: 'Chat GPT (AI)',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/ai-robot-8571862-6809009.png',
    lectures: '5+ Lectures',
    hours: '1+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'motion-design',
    title: 'Motion Design',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/motion-graphics-5977947-4995225.png',
    lectures: '10+ Lectures',
    hours: '4+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'excel-fundamental',
    title: 'Excel Fundamental',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/excel-5977890-4995168.png',
    lectures: '20+ Lectures',
    hours: '2+ Hours',
    description: 'Transform Your Business: Digital Marketing Strategies That Work',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/ui-ux-design-5977973-4995251.png',
    lectures: '10+ Lectures',
    hours: '2+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'javascript',
    title: 'Java Script Programing',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/javascript-5977895-4995173.png',
    lectures: '20+ Lectures',
    hours: '4+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'angular',
    title: 'Angular Framework',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/angular-5977872-4995150.png',
    lectures: '12+ Lectures',
    hours: '2+ Hours',
    description: 'Transform Your Business: Digital Marketing Strategies That Work',
    price: 599,
    originalPrice: 2450
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/cyber-security-5977884-4995162.png',
    lectures: '5+ Lectures',
    hours: '1+ Hours',
    description: 'Build the web, Shape the future - Learn to Code Like a Pro',
    price: 599,
    originalPrice: 2450
  }
];

const CoursesPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCourseClick = (courseId: string) => {
    window.scrollTo(0, 0);
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>Home</Link>
            <span>•</span>
            <span>All Courses</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">All Courses</h1>
          <p className="text-gray-600">
            Courses that help beginner candidate become true unicorns.
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl shadow-sm p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleCourseClick(course.id)}
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <BookOpen size={16} />
                  <span>{course.lectures}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{course.hours}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {course.description}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold">₹{course.price}</span>
                  <span className="text-sm text-gray-400 line-through ml-2">₹{course.originalPrice}</span>
                </div>
                <button className="px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium hover:bg-violet-200 transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Pass Banner */}
        <div className="mt-16 bg-[#2D1B69] text-white rounded-3xl p-8 relative overflow-hidden">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold">uplern</span>
              <span className="bg-violet-500 text-xs px-2 py-1 rounded-full">Premium</span>
            </div>
            <h2 className="text-3xl font-bold mb-6">Premium Pass</h2>
            <ul className="space-y-2 mb-8">
              <li>• Access to 13+ In-Depth Courses</li>
              <li>• Lifetime Access</li>
              <li>• Free access to all future courses</li>
              <li>• Exclusive eBook</li>
              <li>• And lot more</li>
            </ul>
            <Link 
              to="/premium-pass"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-block px-6 py-2 bg-violet-500 rounded-full hover:bg-violet-600 transition-colors"
            >
              Explore
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 w-1/3">
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/rocket-launch-5856337-4892699.png"
              alt="Premium"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="bg-black text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold">
              Embrace Education,<br />
              Reach <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">New</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Elevation</span>
            </h2>
            <Link 
              to="/courses"
              onClick={() => window.scrollTo(0, 0)}
              className="px-6 py-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
            >
              Start Learning →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;