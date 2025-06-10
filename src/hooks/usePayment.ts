import { useState } from 'react';
import { PaymentData, PaymentType, PRICING } from '../lib/razorpay';
import { useAuth } from '../lib/auth';
import toast from 'react-hot-toast';

export const usePayment = () => {
  const { user } = useAuth();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentPaymentData, setCurrentPaymentData] = useState<PaymentData | null>(null);

  const initiateCoursePayment = (courseId: string, courseName: string) => {
    // Check if user is logged in
    if (!user) {
      toast.error('Please log in to enroll in courses');
      return;
    }

    const paymentData: PaymentData = {
      type: PaymentType.COURSE,
      itemId: courseId,
      itemName: courseName,
      amount: PRICING.COURSE.price,
      userEmail: user.email,
      userName: `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'User',
      userPhone: user.phone
    };

    console.log('Initiating course payment:', paymentData);
    setCurrentPaymentData(paymentData);
    setIsPaymentModalOpen(true);
  };

  const initiatePremiumPassPayment = () => {
    // Check if user is logged in
    if (!user) {
      toast.error('Please log in to purchase Premium Pass');
      return;
    }

    const paymentData: PaymentData = {
      type: PaymentType.PREMIUM_PASS,
      itemName: 'upLern Premium Pass',
      amount: PRICING.PREMIUM_PASS.price,
      userEmail: user.email,
      userName: `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'User',
      userPhone: user.phone
    };

    console.log('Initiating premium pass payment:', paymentData);
    setCurrentPaymentData(paymentData);
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setCurrentPaymentData(null);
  };

  const handlePaymentSuccess = (paymentResponse: any) => {
    console.log('Payment successful:', paymentResponse);
    
    // Show success message based on payment type
    if (currentPaymentData?.type === PaymentType.COURSE) {
      toast.success(`🎉 Successfully enrolled in ${currentPaymentData.itemName}!`);
      console.log('Enrolling user in course:', currentPaymentData.itemId);
      
      // Here you can add logic to:
      // - Add course to user's enrolled courses
      // - Send enrollment confirmation email
      // - Redirect to course content
      
    } else if (currentPaymentData?.type === PaymentType.PREMIUM_PASS) {
      toast.success('🚀 Premium Pass activated! You now have access to all courses!');
      console.log('Activating premium pass for user');
      
      // Here you can add logic to:
      // - Activate premium pass for user
      // - Grant access to all courses
      // - Send welcome email with premium benefits
      // - Redirect to premium dashboard
    }

    // Additional post-payment actions
    setTimeout(() => {
      // You can redirect user or update UI state here
      console.log('Post-payment actions completed');
    }, 2000);
  };

  return {
    isPaymentModalOpen,
    currentPaymentData,
    initiateCoursePayment,
    initiatePremiumPassPayment,
    closePaymentModal,
    handlePaymentSuccess
  };
};