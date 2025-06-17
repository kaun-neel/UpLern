import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Figma, Users, ArrowRight } from 'lucide-react';

const CoursesSection = () => {
  const courses = [
    {
      title: 'Web Development',
      icon: <Monitor className="text-black" size={32} />,
      topics: [
        'Introduction to Web Development',
        'Html & CSS Fundamentals',
        'Java script Fundamentals',
        'Front end & Back end',
        'Responsive Website',
        'And lot more'
      ],
      description: 'Unlock the power of the web: Learn to code, design, and create',
      path: '/courses/web-development'
    },
    {
      title: 'UI/UX Designing',
      icon: <Figma className="text-black" size={32} />,
      topics: [
        'Introduction to UI/UX Design',
        'User Research and Analysis',
        'Information Architecture and Wireframing',
        'Prototyping and Interaction Design',
        'Visual Design Principles',
        'And lot more'
      ],
      description: 'Highlight the transformative nature of UX/UI design, the power of visual communication, and the potential for innovation',
      path: '/courses/ui-ux-design'
    },
    {
      title: 'HR Management',
      icon: <Users className="text-black" size={32} />,
      topics: [],
      description: 'HR professionals are the architects of a positive and productive work environment.',
      path: '/courses/hr-management'
    }
  ];

  const handleNavigation = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-16 md:py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          What will <span className="gradient-text">You Learn?</span>
        </h2>
        <p className="text-center text-sm text-gray-600 mb-12 max-w-xl mx-auto">
          In order to create an engaging learning experience, the role of 
          instructor is optional, but the role of learner is essential.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="course-card">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center">
                  {course.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-center mb-4">{course.title}</h3>
              
              <div className="flex-1 flex flex-col justify-start">
                {course.topics.length > 0 ? (
                  <ul className="space-y-2 mb-6">
                    {course.topics.map((topic, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <span className="text-sm">{topic}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mb-6 flex-1 flex items-start">
                    <p className="text-sm text-gray-700">
                      {course.description}
                    </p>
                  </div>
                )}
                
                {course.topics.length > 0 && (
                  <p className="text-sm text-gray-700 mb-6">
                    {course.description}
                  </p>
                )}
              </div>
              
              <Link 
                to={course.path}
                onClick={handleNavigation}
                className="enroll-button mt-auto self-center block text-center"
              >
                Enroll now
              </Link>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center gap-4 mt-12">
          <Link
            to="/courses"
            onClick={handleNavigation}
            className="gradient-button px-6 py-3 rounded-full font-medium flex items-center gap-2"
          >
            Start Learning <ArrowRight size={18} />
          </Link>
          <Link
            to="/courses"
            onClick={handleNavigation}
            className="px-6 py-3 rounded-full border border-purple-300 text-purple-600 hover:bg-purple-50 transition-colors"
          >
            Browse courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;