import React, { useState } from 'react';
import { Play, CheckCircle, Clock, BookOpen, Award, Download, Users } from 'lucide-react';

interface CourseContentProps {
  courseId: string;
  courseName: string;
  enrollment: any;
  onProgressUpdate: (progress: number) => void;
}

const CourseContent: React.FC<CourseContentProps> = ({ 
  courseId, 
  courseName, 
  enrollment, 
  onProgressUpdate 
}) => {
  const [activeLesson, setActiveLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  // Course curriculum data
  const curriculum = {
    'web-development': {
      modules: [
        {
          title: 'Introduction to Web Development',
          lessons: [
            { title: 'What is Web Development?', duration: '15 min', type: 'video' },
            { title: 'Setting up Development Environment', duration: '20 min', type: 'video' },
            { title: 'Understanding the Web', duration: '12 min', type: 'video' },
            { title: 'Quiz: Web Development Basics', duration: '10 min', type: 'quiz' }
          ]
        },
        {
          title: 'HTML Fundamentals',
          lessons: [
            { title: 'HTML Structure and Syntax', duration: '25 min', type: 'video' },
            { title: 'HTML Elements and Attributes', duration: '30 min', type: 'video' },
            { title: 'Forms and Input Elements', duration: '20 min', type: 'video' },
            { title: 'Semantic HTML', duration: '18 min', type: 'video' },
            { title: 'Practice: Build Your First Webpage', duration: '45 min', type: 'project' }
          ]
        },
        {
          title: 'CSS Styling',
          lessons: [
            { title: 'CSS Basics and Selectors', duration: '22 min', type: 'video' },
            { title: 'Box Model and Layout', duration: '28 min', type: 'video' },
            { title: 'Flexbox and Grid', duration: '35 min', type: 'video' },
            { title: 'Responsive Design', duration: '30 min', type: 'video' },
            { title: 'CSS Animations', duration: '25 min', type: 'video' }
          ]
        },
        {
          title: 'JavaScript Programming',
          lessons: [
            { title: 'JavaScript Fundamentals', duration: '40 min', type: 'video' },
            { title: 'DOM Manipulation', duration: '35 min', type: 'video' },
            { title: 'Event Handling', duration: '30 min', type: 'video' },
            { title: 'Asynchronous JavaScript', duration: '45 min', type: 'video' },
            { title: 'Final Project: Interactive Website', duration: '90 min', type: 'project' }
          ]
        }
      ]
    },
    'ui-ux-design': {
      modules: [
        {
          title: 'Introduction to UI/UX Design',
          lessons: [
            { title: 'What is UI/UX Design?', duration: '18 min', type: 'video' },
            { title: 'Design Thinking Process', duration: '25 min', type: 'video' },
            { title: 'User Research Methods', duration: '30 min', type: 'video' }
          ]
        },
        {
          title: 'Design Principles',
          lessons: [
            { title: 'Color Theory', duration: '22 min', type: 'video' },
            { title: 'Typography', duration: '20 min', type: 'video' },
            { title: 'Layout and Composition', duration: '28 min', type: 'video' }
          ]
        }
      ]
    },
    'digital-marketing': {
      modules: [
        {
          title: 'Digital Marketing Fundamentals',
          lessons: [
            { title: 'Introduction to Digital Marketing', duration: '20 min', type: 'video' },
            { title: 'Marketing Channels Overview', duration: '25 min', type: 'video' },
            { title: 'Target Audience Analysis', duration: '30 min', type: 'video' }
          ]
        },
        {
          title: 'Social Media Marketing',
          lessons: [
            { title: 'Social Media Strategy', duration: '35 min', type: 'video' },
            { title: 'Content Creation', duration: '40 min', type: 'video' },
            { title: 'Analytics and Optimization', duration: '30 min', type: 'video' }
          ]
        }
      ]
    }
  };

  const currentCurriculum = curriculum[courseId as keyof typeof curriculum] || curriculum['web-development'];
  const totalLessons = currentCurriculum.modules.reduce((total, module) => total + module.lessons.length, 0);

  const handleLessonComplete = (moduleIndex: number, lessonIndex: number) => {
    const globalLessonIndex = currentCurriculum.modules
      .slice(0, moduleIndex)
      .reduce((total, module) => total + module.lessons.length, 0) + lessonIndex;
    
    const newCompleted = new Set(completedLessons);
    newCompleted.add(globalLessonIndex);
    setCompletedLessons(newCompleted);
    
    // Calculate and update progress
    const progress = Math.round((newCompleted.size / totalLessons) * 100);
    onProgressUpdate(progress);
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'quiz':
        return <BookOpen className="w-4 h-4" />;
      case 'project':
        return <Award className="w-4 h-4" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'text-blue-600 bg-blue-50';
      case 'quiz':
        return 'text-green-600 bg-green-50';
      case 'project':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      {/* Course Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Course Content</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>1,234+ students</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>12+ hours</span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Course Progress</span>
            <span className="text-sm font-bold text-gray-900">{enrollment?.progress || 0}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${enrollment?.progress || 0}%` }}
            ></div>
          </div>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{completedLessons.size}</div>
            <div className="text-sm text-blue-700">Completed</div>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{totalLessons - completedLessons.size}</div>
            <div className="text-sm text-orange-700">Remaining</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{totalLessons}</div>
            <div className="text-sm text-green-700">Total Lessons</div>
          </div>
        </div>
      </div>

      {/* Course Modules */}
      <div className="space-y-6">
        {currentCurriculum.modules.map((module, moduleIndex) => (
          <div key={moduleIndex} className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{module.lessons.length} lessons</p>
            </div>
            
            <div className="divide-y divide-gray-100">
              {module.lessons.map((lesson, lessonIndex) => {
                const globalLessonIndex = currentCurriculum.modules
                  .slice(0, moduleIndex)
                  .reduce((total, mod) => total + mod.lessons.length, 0) + lessonIndex;
                
                const isCompleted = completedLessons.has(globalLessonIndex);
                
                return (
                  <div
                    key={lessonIndex}
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      activeLesson === globalLessonIndex ? 'bg-violet-50 border-l-4 border-violet-500' : ''
                    }`}
                    onClick={() => setActiveLesson(globalLessonIndex)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getTypeColor(lesson.type)}`}>
                          {isCompleted ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            getLessonIcon(lesson.type)
                          )}
                        </div>
                        <div>
                          <h4 className={`font-medium ${isCompleted ? 'text-green-700' : 'text-gray-900'}`}>
                            {lesson.title}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-3 h-3" />
                            <span>{lesson.duration}</span>
                            <span className="capitalize text-xs bg-gray-100 px-2 py-1 rounded">
                              {lesson.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {!isCompleted && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLessonComplete(moduleIndex, lessonIndex);
                          }}
                          className="px-3 py-1 text-xs bg-violet-100 text-violet-700 rounded-full hover:bg-violet-200 transition-colors"
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Course Resources */}
      <div className="mt-8 p-6 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-xl border border-violet-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Resources</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <button className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all">
            <Download className="w-5 h-5 text-violet-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Course Materials</div>
              <div className="text-sm text-gray-600">Download PDFs, code files</div>
            </div>
          </button>
          <button className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all">
            <Award className="w-5 h-5 text-violet-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Certificate</div>
              <div className="text-sm text-gray-600">
                {enrollment?.progress === 100 ? 'Download Certificate' : 'Complete course to unlock'}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;