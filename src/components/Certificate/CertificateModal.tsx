import React, { useRef, useState, useEffect } from 'react';
import { X, Award, Download, Share2, Mail, MessageCircle, Copy, ArrowLeft } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  courseName: string;
  completionDate: string;
  certificateId: string;
}

const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName,
  courseName,
  completionDate,
  certificateId
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On desktop, always show certificate
      if (!mobile) {
        setShowCertificate(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const downloadCertificate = async () => {
    try {
      toast.loading('Generating high-quality certificate PDF...');
      
      // Show certificate temporarily for capture if on mobile
      if (isMobile && !showCertificate) {
        setShowCertificate(true);
        // Wait for render
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      if (!certificateRef.current) {
        toast.dismiss();
        toast.error('Certificate not ready. Please try again.');
        return;
      }
      
      // Enhanced settings for high-quality PDF generation
      const canvasOptions = {
        scale: 3, // High scale for quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 1400,
        height: 990,
        logging: false,
        removeContainer: true,
        imageTimeout: 30000,
        foreignObjectRendering: true,
        onclone: (clonedDoc: Document) => {
          // Ensure fonts are loaded in cloned document
          const style = clonedDoc.createElement('style');
          style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
            * {
              font-family: 'Poppins', sans-serif !important;
              -webkit-font-smoothing: antialiased !important;
              -moz-osx-font-smoothing: grayscale !important;
              text-rendering: optimizeLegibility !important;
            }
          `;
          clonedDoc.head.appendChild(style);
        }
      };

      const canvas = await html2canvas(certificateRef.current, canvasOptions);
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: false
      });

      const pdfWidth = 297;
      const pdfHeight = 210;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST');
      
      const filename = `${courseName.replace(/[^a-zA-Z0-9]/g, '-')}-Certificate-${studentName.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
      pdf.save(filename);
      
      // Hide certificate again on mobile after download
      if (isMobile) {
        setTimeout(() => setShowCertificate(false), 1000);
      }
      
      toast.dismiss();
      toast.success('High-quality certificate downloaded successfully!');
      
    } catch (error) {
      toast.dismiss();
      console.error('Error generating certificate:', error);
      
      // Fallback attempt
      try {
        toast.loading('Retrying with optimized settings...');
        
        if (!certificateRef.current) {
          toast.dismiss();
          toast.error('Certificate not available. Please try again.');
          return;
        }

        const fallbackCanvas = await html2canvas(certificateRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          removeContainer: true,
          imageTimeout: 30000
        });

        const fallbackImgData = fallbackCanvas.toDataURL('image/jpeg', 0.95);
        const fallbackPdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        });

        fallbackPdf.addImage(fallbackImgData, 'JPEG', 0, 0, 297, 210);
        fallbackPdf.save(`${courseName}-Certificate-${studentName}.pdf`);
        
        if (isMobile) {
          setTimeout(() => setShowCertificate(false), 1000);
        }
        
        toast.dismiss();
        toast.success('Certificate downloaded successfully!');
      } catch (fallbackError) {
        toast.dismiss();
        console.error('Fallback download failed:', fallbackError);
        toast.error('Download failed. Please try again or contact support.');
        
        if (isMobile) {
          setShowCertificate(false);
        }
      }
    }
  };

  const handleViewCertificate = () => {
    setShowCertificate(true);
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`🎓 ${courseName} Certificate - ${studentName}`);
    const body = encodeURIComponent(`Hi there!

I'm excited to share that I've successfully completed the ${courseName} course and earned my certificate from Zyntiq!

📅 Completion Date: ${formatDate(completionDate)}
🆔 Certificate ID: ${certificateId}
🏫 Issued by: Zyntiq

This course has enhanced my skills and knowledge in ${courseName}. I'm proud to add this achievement to my professional portfolio.

You can verify this certificate at: ${window.location.origin}/verify/${certificateId}

Best regards,
${studentName}

#Zyntiq #OnlineLearning #Certificate #ProfessionalDevelopment`);

    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
    setShowShareMenu(false);
  };

  const shareViaWhatsApp = () => {
    const message = encodeURIComponent(`🎓 I've successfully completed the ${courseName} course and earned my certificate from Zyntiq!

📅 Completed: ${formatDate(completionDate)}
🆔 Certificate ID: ${certificateId}
🏫 Issued by: Zyntiq

#Zyntiq #OnlineLearning #Certificate #${courseName.replace(/\s+/g, '')}`);

    window.open(`https://wa.me/?text=${message}`, '_blank');
    setShowShareMenu(false);
  };

  const shareViaLinkedIn = () => {
    const text = encodeURIComponent(`I'm proud to share that I've completed the ${courseName} course from Zyntiq and earned my certificate! 

This course has enhanced my skills in ${courseName} and I'm excited to apply this knowledge in my professional journey.

#Zyntiq #OnlineLearning #Certificate #ProfessionalDevelopment #${courseName.replace(/\s+/g, '')}`);

    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${text}`, '_blank');
    setShowShareMenu(false);
  };

  const shareViaTwitter = () => {
    const text = encodeURIComponent(`🎓 Just completed the ${courseName} course from @Zyntiq and earned my certificate! 

Excited to apply these new skills! 💪

#Zyntiq #OnlineLearning #Certificate #${courseName.replace(/\s+/g, '')}`);

    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`, '_blank');
    setShowShareMenu(false);
  };

  const copyToClipboard = async () => {
    const shareText = `🎓 I've successfully completed the ${courseName} course and earned my certificate from Zyntiq!

📅 Completed: ${formatDate(completionDate)}
🆔 Certificate ID: ${certificateId}
🏫 Issued by: Zyntiq

#Zyntiq #OnlineLearning #Certificate #${courseName.replace(/\s+/g, '')}`;

    try {
      await navigator.clipboard.writeText(shareText);
      toast.success('Certificate details copied to clipboard!');
      setShowShareMenu(false);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      toast.error('Failed to copy to clipboard');
    }
  };

  const shareViaNativeAPI = async () => {
    const shareText = `🎓 I've successfully completed the ${courseName} course and earned my certificate from Zyntiq!

📅 Completed: ${formatDate(completionDate)}
🆔 Certificate ID: ${certificateId}
🏫 Issued by: Zyntiq

#Zyntiq #OnlineLearning #Certificate #${courseName.replace(/\s+/g, '')}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${courseName} Certificate - ${studentName}`,
          text: shareText,
          url: window.location.href
        });
        setShowShareMenu(false);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error sharing certificate:', error);
          toast.error('Failed to share certificate');
        }
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-h-[95vh] overflow-y-auto" style={{ maxWidth: isMobile ? '100%' : '90vw' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 sm:p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20"
          >
            <X size={24} />
          </button>
          <div className="flex items-center gap-4 pr-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Award className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Your Certificate</h2>
              <p className="text-white/90 text-sm sm:text-base">Congratulations on completing the course!</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-8">
          {/* Mobile: Action Buttons Only (No Preview) */}
          {isMobile && !showCertificate && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Certificate Ready!</h3>
                <p className="text-gray-600">Your certificate for {courseName} is ready to download and share.</p>
              </div>

              <button
                onClick={downloadCertificate}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-lg"
              >
                <Download className="w-6 h-6" />
                Download Certificate PDF
              </button>
              
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-purple-300 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-colors text-lg"
              >
                <Share2 className="w-6 h-6" />
                Share Certificate
              </button>

              <button
                onClick={handleViewCertificate}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-gray-300 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors text-lg"
              >
                <Award className="w-6 h-6" />
                View Certificate
              </button>

              {/* Mobile Share Menu */}
              {showShareMenu && (
                <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 text-center mb-3">Share Your Achievement</h4>
                  
                  <button
                    onClick={shareViaEmail}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white rounded-lg transition-colors border border-gray-200"
                  >
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span>Share via Email</span>
                  </button>
                  
                  <button
                    onClick={shareViaWhatsApp}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white rounded-lg transition-colors border border-gray-200"
                  >
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <span>Share on WhatsApp</span>
                  </button>
                  
                  <button
                    onClick={shareViaLinkedIn}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white rounded-lg transition-colors border border-gray-200"
                  >
                    <div className="w-5 h-5 bg-blue-700 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">in</span>
                    </div>
                    <span>Share on LinkedIn</span>
                  </button>
                  
                  <button
                    onClick={copyToClipboard}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white rounded-lg transition-colors border border-gray-200"
                  >
                    <Copy className="w-5 h-5 text-gray-600" />
                    <span>Copy to Clipboard</span>
                  </button>
                  
                  {navigator.share && (
                    <button
                      onClick={shareViaNativeAPI}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white rounded-lg transition-colors border border-gray-200"
                    >
                      <Share2 className="w-5 h-5 text-purple-600" />
                      <span>More Options</span>
                    </button>
                  )}

                  <button
                    onClick={() => setShowShareMenu(false)}
                    className="w-full text-center py-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Desktop: Always Show Certificate with Action Buttons */}
          {!isMobile && (
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 sm:mb-8">
              <button
                onClick={downloadCertificate}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 min-h-[48px]"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
              
              {/* Share Button with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-purple-300 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-colors min-h-[48px] w-full sm:w-auto"
                >
                  <Share2 className="w-5 h-5" />
                  Share Certificate
                </button>
                
                {/* Share Menu */}
                {showShareMenu && (
                  <div className="absolute top-full left-0 right-0 sm:left-auto sm:right-auto sm:w-64 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-20">
                    <div className="p-2">
                      <button
                        onClick={shareViaEmail}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Mail className="w-5 h-5 text-blue-600" />
                        <span>Share via Email</span>
                      </button>
                      
                      <button
                        onClick={shareViaWhatsApp}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <MessageCircle className="w-5 h-5 text-green-600" />
                        <span>Share on WhatsApp</span>
                      </button>
                      
                      <button
                        onClick={shareViaLinkedIn}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="w-5 h-5 bg-blue-700 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">in</span>
                        </div>
                        <span>Share on LinkedIn</span>
                      </button>
                      
                      <button
                        onClick={shareViaTwitter}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="w-5 h-5 bg-blue-400 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">𝕏</span>
                        </div>
                        <span>Share on Twitter</span>
                      </button>
                      
                      <button
                        onClick={copyToClipboard}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Copy className="w-5 h-5 text-gray-600" />
                        <span>Copy to Clipboard</span>
                      </button>
                      
                      {navigator.share && (
                        <button
                          onClick={shareViaNativeAPI}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Share2 className="w-5 h-5 text-purple-600" />
                          <span>More Options</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile: Show Certificate When Requested or Desktop: Always Show */}
          {(showCertificate || !isMobile) && (
            <>
              {/* Mobile: Back Button */}
              {isMobile && (
                <div className="mb-4">
                  <button
                    onClick={() => setShowCertificate(false)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft size={20} />
                    <span>Back to Actions</span>
                  </button>
                </div>
              )}

              {/* Certificate Display - Properly Sized for Mobile */}
              <div className="flex justify-center">
                <div 
                  ref={certificateRef}
                  className="certificate-container bg-white shadow-2xl w-full mx-auto"
                  style={{ 
                    maxWidth: isMobile ? '100%' : '900px',
                    aspectRatio: '1.414/1',
                    minHeight: isMobile ? '400px' : '600px'
                  }}
                >
                  {/* Certificate Content */}
                  <div className="w-full h-full bg-gradient-to-br from-slate-50 via-white to-purple-50 relative overflow-hidden border-4 sm:border-8 border-purple-200 rounded-lg flex flex-col">
                    {/* Decorative Background Elements */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-8 sm:top-16 left-8 sm:left-16 w-16 sm:w-32 h-16 sm:h-32 bg-purple-500 rounded-full"></div>
                      <div className="absolute top-16 sm:top-32 right-16 sm:right-32 w-12 sm:w-24 h-12 sm:h-24 bg-indigo-500 rounded-full"></div>
                      <div className="absolute bottom-16 sm:bottom-32 left-16 sm:left-32 w-14 sm:w-28 h-14 sm:h-28 bg-purple-500 rounded-full"></div>
                      <div className="absolute bottom-8 sm:bottom-16 right-8 sm:right-16 w-10 sm:w-20 h-10 sm:h-20 bg-indigo-500 rounded-full"></div>
                    </div>

                    {/* Elegant Border Pattern */}
                    <div className="absolute inset-3 sm:inset-6 border border-purple-300 rounded-lg">
                      <div className="absolute inset-2 sm:inset-4 border border-purple-200 rounded-lg"></div>
                    </div>

                    {/* Header Section */}
                    <div className="text-center pt-4 sm:pt-8 lg:pt-12 pb-2 sm:pb-4 lg:pb-6 px-3 sm:px-6 lg:px-8 flex-shrink-0">
                      <div className="flex justify-center mb-2 sm:mb-3 lg:mb-4">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                          <Award className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                        </div>
                      </div>
                      <h1 className="text-sm sm:text-xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text mb-1 sm:mb-2 lg:mb-3 leading-tight">
                        Certificate of Completion
                      </h1>
                      <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600 font-medium">This certifies that</p>
                    </div>

                    {/* Student Name Section */}
                    <div className="text-center mb-2 sm:mb-4 lg:mb-6 px-3 sm:px-6 lg:px-8 flex-shrink-0">
                      <div className="mb-2 sm:mb-3 lg:mb-4">
                        <h2 className="text-lg sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-1 sm:mb-2 lg:mb-3 leading-tight break-words" 
                            style={{ 
                              fontFamily: 'Georgia, serif',
                              letterSpacing: '0.02em',
                              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                            }}>
                          {studentName}
                        </h2>
                        <div className="w-16 sm:w-32 lg:w-64 xl:w-80 h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full"></div>
                      </div>
                    </div>

                    {/* Course Details Section */}
                    <div className="text-center mb-3 sm:mb-6 lg:mb-8 px-3 sm:px-6 lg:px-8 flex-grow flex flex-col justify-center">
                      <p className="text-xs sm:text-sm lg:text-lg xl:text-xl text-gray-700 mb-1 sm:mb-2 lg:mb-3 font-medium">
                        has successfully completed the course
                      </p>
                      <h3 className="text-sm sm:text-lg lg:text-2xl xl:text-3xl font-bold text-purple-900 mb-2 sm:mb-3 lg:mb-4 leading-tight break-words">
                        {courseName}
                      </h3>
                      <div className="flex items-center justify-center gap-1 sm:gap-2 lg:gap-3 text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600">
                        <span>Completed on</span>
                        <span className="font-semibold text-purple-700">{formatDate(completionDate)}</span>
                      </div>
                    </div>

                    {/* Footer Section */}
                    <div className="px-3 sm:px-6 lg:px-8 xl:px-12 pb-3 sm:pb-6 lg:pb-8 flex-shrink-0">
                      <div className="grid grid-cols-3 gap-1 sm:gap-2 lg:gap-4 text-center">
                        {/* Signature */}
                        <div className="flex flex-col items-center">
                          <div className="w-8 sm:w-16 lg:w-24 xl:w-32 h-0.5 bg-gray-400 mb-1 sm:mb-2"></div>
                          <p className="text-xs sm:text-sm lg:text-base font-semibold text-gray-700">Zyntiq Team</p>
                          <p className="text-xs lg:text-sm text-gray-500">Authorized Signature</p>
                        </div>
                        
                        {/* Official Seal */}
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-6 sm:w-10 sm:h-10 lg:w-14 lg:h-14 xl:w-16 xl:h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mb-1 sm:mb-2 border border-purple-300">
                            <Award className="w-3 h-3 sm:w-5 sm:h-5 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-purple-600" />
                          </div>
                          <p className="text-xs lg:text-sm text-gray-500">Official Seal</p>
                        </div>
                        
                        {/* Certificate ID */}
                        <div className="flex flex-col items-center">
                          <p className="text-xs sm:text-sm lg:text-base font-semibold text-gray-700 mb-1">Certificate ID</p>
                          <p className="text-xs lg:text-sm text-gray-600 font-mono break-all leading-tight">{certificateId}</p>
                          <p className="text-xs text-gray-400 mt-0.5">Verify at zyntiq.in</p>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Corner Elements */}
                    <div className="absolute top-4 left-4 w-3 h-3 sm:w-6 sm:h-6 border-l-2 border-t-2 border-purple-300 rounded-tl-lg"></div>
                    <div className="absolute top-4 right-4 w-3 h-3 sm:w-6 sm:h-6 border-r-2 border-t-2 border-purple-300 rounded-tr-lg"></div>
                    <div className="absolute bottom-4 left-4 w-3 h-3 sm:w-6 sm:h-6 border-l-2 border-b-2 border-purple-300 rounded-bl-lg"></div>
                    <div className="absolute bottom-4 right-4 w-3 h-3 sm:w-6 sm:h-6 border-r-2 border-b-2 border-purple-300 rounded-br-lg"></div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Overlay to close share menu */}
      {showShareMenu && !isMobile && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
};

export default CertificateModal;