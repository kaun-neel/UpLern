import { useState } from 'react';
import { PaymentData, PaymentType, PRICING } from '../lib/razorpay';
import { useAuth } from '../lib/auth';

export const usePayment = () => {
  const { user } = useAuth();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentPaymentData, setCurrentPaymentData] = useState<PaymentData | null>(null);

  const initiateCoursePayment = (courseId: string, courseName: string) => {
    const paymentData: PaymentData = {
      type: PaymentType.COURSE,
      itemId: courseId,
      itemName: courseName,
      amount: PRICING.COURSE.price,
      userEmail: user?.email,
      userName: `${user?.first_name || ''} ${user?.last_name || ''}`.trim(),
      userPhone: user?.phone
    };

    setCurrentPaymentData(paymentData);
    setIsPaymentModalOpen(true);
  };

  const initiatePremiumPassPayment = () => {
    const paymentData: PaymentData = {
      type: PaymentType.PREMIUM_PASS,
      itemName: 'upLern Premium Pass',
      amount: PRICING.PREMIUM_PASS.price,
      userEmail: user?.email,
      userName: `${user?.first_name || ''} ${user?.last_name || ''}`.trim(),
      userPhone: user?.phone
    };

    setCurrentPaymentData(paymentData);
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setCurrentPaymentData(null);
  };

  const handlePaymentSuccess = (paymentResponse: any) => {
    // Here you can handle post-payment actions like:
    // - Enrolling user in course
    // - Activating premium pass
    // - Sending confirmation email
    // - Updating user's course list
    
    console.log('Payment successful:', paymentResponse);
    
    // You can add additional logic here based on payment type
    if (currentPaymentData?.type === PaymentType.COURSE) {
      // Handle course enrollment
      console.log('Enrolling user in course:', currentPaymentData.itemId);
    } else if (currentPaymentData?.type === PaymentType.PREMIUM_PASS) {
      // Handle premium pass activation
      console.log('Activating premium pass for user');
    }
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