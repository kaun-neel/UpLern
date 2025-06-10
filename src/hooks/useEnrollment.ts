import { useState, useEffect } from 'react';
import { localDB } from '../lib/database';
import { useAuth } from '../lib/auth';

interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  course_name: string;
  payment_id: string;
  enrollment_type: 'course' | 'premium_pass';
  amount_paid: number;
  enrolled_at: string;
  status: 'active' | 'completed';
  progress: number;
}

export const useEnrollment = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasPremiumPass, setHasPremiumPass] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserEnrollments();
      checkPremiumStatus();
    } else {
      setEnrollments([]);
      setHasPremiumPass(false);
      setLoading(false);
    }
  }, [user]);

  const loadUserEnrollments = async () => {
    if (!user) return;

    try {
      const { enrollments: userEnrollments, error } = await localDB.getUserEnrollments(user.id);
      if (error) {
        console.error('Failed to load enrollments:', error);
        return;
      }
      setEnrollments(userEnrollments);
    } catch (error) {
      console.error('Error loading enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkPremiumStatus = async () => {
    if (!user) return;

    try {
      const { hasPremium } = await localDB.hasPremiumPass(user.id);
      setHasPremiumPass(hasPremium);
    } catch (error) {
      console.error('Error checking premium status:', error);
    }
  };

  const isEnrolledInCourse = async (courseId: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { enrolled } = await localDB.isUserEnrolledInCourse(user.id, courseId);
      return enrolled;
    } catch (error) {
      console.error('Error checking course enrollment:', error);
      return false;
    }
  };

  const getCourseEnrollment = (courseId: string): Enrollment | undefined => {
    return enrollments.find(e => e.course_id === courseId);
  };

  const updateProgress = async (enrollmentId: string, progress: number) => {
    try {
      const { error } = await localDB.updateEnrollmentProgress(enrollmentId, progress);
      if (error) {
        console.error('Failed to update progress:', error);
        return;
      }
      
      // Update local state
      setEnrollments(prev => 
        prev.map(e => 
          e.id === enrollmentId 
            ? { ...e, progress, status: progress === 100 ? 'completed' : 'active' }
            : e
        )
      );
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  return {
    enrollments,
    loading,
    hasPremiumPass,
    isEnrolledInCourse,
    getCourseEnrollment,
    updateProgress,
    refreshEnrollments: loadUserEnrollments
  };
};