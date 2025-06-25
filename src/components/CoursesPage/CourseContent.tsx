<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
import { Play, CheckCircle, Clock, BookOpen, Award, Download, Users } from 'lucide-react';
import { certificateService } from '../Certificate/CertificateService';
import CertificateModal from '../Certificate/CertificateModal';
import { useAuth } from '../../lib/auth';
<<<<<<< HEAD
=======
import { CourseContent as CourseContentType, contentService } from '../../lib/contentService';
import ContentViewer from '../CoursePlayer/ContentViewer';
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
import toast from 'react-hot-toast';

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
  const { user } = useAuth();
<<<<<<< HEAD
  const [activeLesson, setActiveLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const [showCertificateModal, setShowCertificateModal] = useState(false);

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

    // Check if course is completed (100% progress)
    if (progress === 100) {
      handleCourseCompletion();
    }
=======
  const [courseContent, setCourseContent] = useState<CourseContentType[]>([]);
  const [activeContent, setActiveContent] = useState<CourseContentType | null>(null);
  const [completedContent, setCompletedContent] = useState<Set<string>>(new Set());
  const [contentProgress, setContentProgress] = useState<Record<string, number>>({});
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourseContent();
  }, [courseId]);

  const loadCourseContent = async () => {
    try {
      setLoading(true);
      const content = await contentService.getCourseContent(courseId);
      setCourseContent(content);
      
      // Set first content as active by default
      if (content.length > 0) {
        setActiveContent(content[0]);
      }
    } catch (error) {
      console.error('Error loading course content:', error);
      toast.error('Failed to load course content');
    } finally {
      setLoading(false);
    }
  };

  const handleContentProgress = (contentId: string, progress: number) => {
    setContentProgress(prev => ({
      ...prev,
      [contentId]: progress
    }));

    // Update overall course progress
    const totalProgress = Object.values({
      ...contentProgress,
      [contentId]: progress
    }).reduce((sum, p) => sum + p, 0) / courseContent.length;
    
    onProgressUpdate(Math.round(totalProgress));
  };

  const handleContentComplete = (contentId: string) => {
    const newCompleted = new Set(completedContent);
    newCompleted.add(contentId);
    setCompletedContent(newCompleted);
    
    // Update progress to 100% for this content
    handleContentProgress(contentId, 100);

    // Check if course is completed (all content completed)
    if (newCompleted.size === courseContent.length) {
      handleCourseCompletion();
    }

    toast.success('Content completed!');
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
  };

  const handleCourseCompletion = async () => {
    if (!user) return;

    try {
      // Generate certificate
      const certificate = await certificateService.generateCertificate(
        `${user.first_name} ${user.last_name}`.trim(),
        courseName,
        courseId
      );

      toast.success('🎉 Congratulations! You\'ve completed the course and earned your certificate!');
      
      // Show certificate modal after a short delay
      setTimeout(() => {
        setShowCertificateModal(true);
      }, 1000);
    } catch (error) {
      console.error('Error generating certificate:', error);
      toast.error('Course completed but there was an issue generating your certificate.');
    }
  };

<<<<<<< HEAD
  const getLessonIcon = (type: string) => {
=======
  const getContentIcon = (type: string) => {
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
    switch (type) {
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'quiz':
        return <BookOpen className="w-4 h-4" />;
<<<<<<< HEAD
      case 'project':
        return <Award className="w-4 h-4" />;
=======
      case 'pdf':
        return <Download className="w-4 h-4" />;
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
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
<<<<<<< HEAD
      case 'project':
=======
      case 'pdf':
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

<<<<<<< HEAD
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
          <button 
            onClick={() => setShowCertificateModal(true)}
            className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all"
          >
            <Award className="w-5 h-5 text-violet-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Certificate</div>
              <div className="text-sm text-gray-600">
                {enrollment?.progress === 100 ? 'Download Certificate' : 'Complete course to unlock'}
              </div>
            </div>
          </button>
=======
  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Content Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Content</h3>
          
          {/* Progress Overview */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm font-bold text-gray-900">{enrollment?.progress || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${enrollment?.progress || 0}%` }}
              ></div>
            </div>
          </div>

          {/* Content List */}
          <div className="space-y-2">
            {courseContent.map((content, index) => {
              const isCompleted = completedContent.has(content.id);
              const isActive = activeContent?.id === content.id;
              const progress = contentProgress[content.id] || 0;
              
              return (
                <button
                  key={content.id}
                  onClick={() => setActiveContent(content)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-violet-50 border-2 border-violet-200' 
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getTypeColor(content.type)}`}>
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        getContentIcon(content.type)
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium text-sm mb-1 ${isCompleted ? 'text-green-700' : 'text-gray-900'}`}>
                        {content.title}
                      </h4>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="capitalize">{content.type}</span>
                        {content.duration && (
                          <>
                            <span>•</span>
                            <span>{formatDuration(content.duration)}</span>
                          </>
                        )}
                      </div>
                      
                      {/* Progress bar for active/in-progress content */}
                      {progress > 0 && progress < 100 && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div
                              className="bg-violet-500 h-1 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Course Stats */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-violet-600">{completedContent.size}</div>
                <div className="text-xs text-gray-500">Completed</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-600">{courseContent.length}</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-2">
        {activeContent ? (
          <ContentViewer
            content={activeContent}
            onProgress={handleContentProgress}
            onComplete={handleContentComplete}
          />
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-purple-500" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Welcome to the Course</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Select a lesson from the sidebar to start learning. Track your progress as you complete each section.
              </p>
            </div>
          </div>
        )}

        {/* Course Resources */}
        <div className="mt-6 p-6 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-xl border border-violet-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Resources</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <button className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all">
              <Download className="w-5 h-5 text-violet-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Course Materials</div>
                <div className="text-sm text-gray-600">Download PDFs, code files</div>
              </div>
            </button>
            <button 
              onClick={() => setShowCertificateModal(true)}
              className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all"
            >
              <Award className="w-5 h-5 text-violet-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Certificate</div>
                <div className="text-sm text-gray-600">
                  {enrollment?.progress === 100 ? 'Download Certificate' : 'Complete course to unlock'}
                </div>
              </div>
            </button>
          </div>
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
        </div>
      </div>

      {/* Certificate Modal */}
      {user && (
        <CertificateModal
          isOpen={showCertificateModal}
          onClose={() => setShowCertificateModal(false)}
          studentName={`${user.first_name} ${user.last_name}`.trim()}
          courseName={courseName}
          completionDate={new Date().toISOString()}
          certificateId={`CERT-${Date.now().toString(36).toUpperCase()}`}
        />
      )}
    </div>
  );
};

export default CourseContent;