import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, Play, Award, Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '../../lib/auth';

const MyCoursesPage = () => {
  const { user } = useAuth();

  // Demo courses data - only shown for demo account
  const demoCoursesData = [
    {
      id: 'web-development',
      title: 'Web Development',
      image: 'https://cdn3d.iconscout.com/3d/premium/thumb/web-development-5977974-4995252.png',
      progress: 75,
      totalLessons: 100,
      completedLessons: 75,
      duration: '4+ Hours',
      enrolledDate: '2024-01-15',
      lastAccessed: '2024-01-20',
      status: 'In Progress',
      instructor: 'John Smith'
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      image: 'https://cdn3d.iconscout.com/3d/premium/thumb/ui-ux-design-5977973-4995251.png',
      progress: 100,
      totalLessons: 50,
      completedLessons: 50,
      duration: '3+ Hours',
      enrolledDate: '2024-01-10',
      lastAccessed: '2024-01-18',
      status: 'Completed',
      instructor: 'Sarah Johnson'
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      image: 'https://cdn3d.iconscout.com/3d/premium/thumb/digital-marketing-5706074-4755623.png',
      progress: 30,
      totalLessons: 60,
      completedLessons: 18,
      duration: '2+ Hours',
      enrolledDate: '2024-01-22',
      lastAccessed: '2024-01-23',
      status: 'In Progress',
      instructor: 'Mike Davis'
    }
  ];

  // Check if current user is demo account
  const isDemoAccount = user?.email === 'demo@uplern.com';
  
  // For demo account, show demo data. For other users, show empty array (no enrolled courses)
  const enrolledCourses = isDemoAccount ? demoCoursesData : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">My Courses</h2>
          <p className="text-gray-600 mt-1">Track your learning progress and continue your journey</p>
        </div>
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
        >
          <BookOpen size={16} />
          Browse Courses
        </Link>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-12 h-12 text-violet-500" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Start Your Learning Journey</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            You haven't enrolled in any courses yet. Explore our wide range of courses and start building new skills today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
            >
              <Play size={16} />
              Explore Courses
            </Link>
            <Link
              to="/premium-pass"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-violet-300 text-violet-600 rounded-full font-medium hover:bg-violet-50 transition-colors"
            >
              <Award size={16} />
              Premium Pass
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Learning Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl p-6 border border-violet-200">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-8 h-8 text-violet-600" />
                <TrendingUp className="w-5 h-5 text-violet-500" />
              </div>
              <div className="text-2xl font-bold text-violet-900">{enrolledCourses.length}</div>
              <div className="text-sm text-violet-700 font-medium">Total Courses</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-8 h-8 text-green-600" />
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-2xl font-bold text-green-900">
                {enrolledCourses.filter(c => c.status === 'Completed').length}
              </div>
              <div className="text-sm text-green-700 font-medium">Completed</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <Play className="w-8 h-8 text-blue-600" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-2xl font-bold text-blue-900">
                {enrolledCourses.filter(c => c.status === 'In Progress').length}
              </div>
              <div className="text-sm text-blue-700 font-medium">In Progress</div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-orange-600" />
                <div className="text-xs text-orange-600 font-semibold">AVG</div>
              </div>
              <div className="text-2xl font-bold text-orange-900">
                {Math.round(enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length)}%
              </div>
              <div className="text-sm text-orange-700 font-medium">Progress</div>
            </div>
          </div>

          {/* Courses List */}
          <div className="space-y-6">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-violet-200 transition-all duration-300 bg-gradient-to-r from-white to-gray-50">
                <div className="grid lg:grid-cols-12 gap-6 items-center">
                  {/* Course Image and Basic Info */}
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-20 h-20 object-contain rounded-xl bg-white p-2 shadow-sm"
                        />
                        {course.status === 'Completed' && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Award className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1 truncate">{course.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">by {course.instructor}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <BookOpen size={14} />
                            <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{course.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="lg:col-span-3">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-bold text-gray-900">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-3 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(course.status)}`}>
                          {course.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dates and Actions */}
                  <div className="lg:col-span-4">
                    <div className="space-y-4">
                      <div className="text-sm text-gray-500 space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          <span>Enrolled: {formatDate(course.enrolledDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          <span>Last accessed: {formatDate(course.lastAccessed)}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Link
                          to={`/courses/${course.id}`}
                          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Play size={14} />
                          {course.status === 'Completed' ? 'Review' : 'Continue'}
                        </Link>
                        {course.status === 'Completed' && (
                          <button className="px-4 py-2.5 border-2 border-violet-300 text-violet-600 rounded-lg text-sm font-medium hover:bg-violet-50 transition-colors flex items-center gap-2">
                            <Award size={14} />
                            Certificate
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyCoursesPage;