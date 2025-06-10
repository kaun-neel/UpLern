import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, Play, Award, Calendar } from 'lucide-react';

const MyCoursesPage = () => {
  // Mock enrolled courses data
  const enrolledCourses = [
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Courses</h2>
        <Link
          to="/courses"
          className="px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium hover:bg-violet-200 transition-colors"
        >
          Browse More Courses
        </Link>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Courses Yet</h3>
          <p className="text-gray-500 mb-6">Start your learning journey by enrolling in a course</p>
          <Link
            to="/courses"
            className="inline-block px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
          >
            Explore Courses
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="grid md:grid-cols-4 gap-6 items-center">
                {/* Course Image and Basic Info */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-20 h-20 object-contain rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">Instructor: {course.instructor}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
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

                {/* Progress and Status */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-gray-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                      {course.status}
                    </span>
                    {course.status === 'Completed' && (
                      <Award className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                </div>

                {/* Actions and Dates */}
                <div className="space-y-3">
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center gap-1 mb-1">
                      <Calendar size={14} />
                      <span>Enrolled: {formatDate(course.enrolledDate)}</span>
                    </div>
                    <div>Last accessed: {formatDate(course.lastAccessed)}</div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/courses/${course.id}`}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-1"
                    >
                      <Play size={14} />
                      {course.status === 'Completed' ? 'Review' : 'Continue'}
                    </Link>
                    {course.status === 'Completed' && (
                      <button className="px-4 py-2 border border-violet-300 text-violet-600 rounded-lg text-sm font-medium hover:bg-violet-50 transition-colors">
                        Certificate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Learning Stats */}
      {enrolledCourses.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Learning Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-violet-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-violet-600">{enrolledCourses.length}</div>
              <div className="text-sm text-gray-600">Total Courses</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {enrolledCourses.filter(c => c.status === 'Completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {enrolledCourses.filter(c => c.status === 'In Progress').length}
              </div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length)}%
              </div>
              <div className="text-sm text-gray-600">Avg Progress</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;