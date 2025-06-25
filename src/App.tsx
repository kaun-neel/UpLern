import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './lib/auth.tsx';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import OfferingsSection from './components/OfferingsSection';
import CoursesSection from './components/CoursesSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';
import ContactPage from './components/ContactPage';
import LoginPage from './components/AuthPages/LoginPage';
import SignupPage from './components/AuthPages/SignupPage';
import AccountPage from './components/AccountPage/AccountPage';
import CoursesPage from './components/CoursesPage/CoursesPage';
import CourseDetailPage from './components/CoursesPage/CourseDetailPage';
import AboutPage from './components/AboutPage/AboutPage';
import PremiumPassPage from './components/PremiumPass/PremiumPassPage';
import CareersPage from './components/CareersPage/CareersPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage/TermsOfServicePage';
import RefundPolicyPage from './components/RefundPolicyPage/RefundPolicyPage';
import SupportPage from './components/SupportPage/SupportPage';
<<<<<<< HEAD
=======
import WhatsAppFloat from './components/WhatsAppFloat';
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5

function App() {
  return (
    <AuthProvider>
      <Router>
<<<<<<< HEAD
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
=======
        <div className="min-h-screen yellow-gradient-bg">
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
          <Toaster position="top-right" />
          <Navbar />
          <Routes>
            <Route path="/" element={
              <main>
                <HeroSection />
                <BenefitsSection />
                <OfferingsSection />
                <CoursesSection />
                <TestimonialsSection />
                <PricingSection />
              </main>
            } />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/premium-pass" element={<PremiumPassPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />
            <Route path="/support" element={<SupportPage />} />
          </Routes>
          <Footer />
<<<<<<< HEAD
=======
          
          {/* WhatsApp Float Button - Available on all pages */}
          <WhatsAppFloat />
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;