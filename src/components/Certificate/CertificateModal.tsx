import React, { useRef, useState, useEffect } from 'react';
import { X, Award, Download, Share2, Mail, MessageCircle, Copy } from 'lucide-react';
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
  const [showMobileActions, setShowMobileActions] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
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
    if (!certificateRef.current) return;

    try {
      toast.loading('Generating certificate PDF...');
      
      // Optimized settings for better alignment
      const canvasOptions = {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 1200,
        height: 850,
        logging: false,
        removeContainer: true,
        imageTimeout: 15000,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0
      };

      const canvas = await html2canvas(certificateRef.current, canvasOptions);
      const imgData = canvas.toDataURL('image/png', 0.95);
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Calculate proper centering for PDF
      const imgWidth = 297;
      const imgHeight = 210;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      const filename = `${courseName.replace(/[^a-zA-Z0-9]/g, '-')}-Certificate-${studentName.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
      pdf.save(filename);
      
      toast.dismiss();
      toast.success('Certificate downloaded successfully!');
      
      // Hide mobile actions after download
      if (isMobile) {
        setShowMobileActions(false);
      }
    } catch (error) {
      toast.dismiss();
      console.error('Error generating certificate:', error);
      toast.error('Download failed. Please try again.');
    }
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
    if (isMobile) {
      setShowMobileActions(false);
    }
  };

  const shareViaWhatsApp = () => {
    const message = encodeURIComponent(`🎓 I've successfully completed the ${courseName} course and earned my certificate from Zyntiq!

📅 Completed: ${formatDate(completionDate)}
🆔 Certificate ID: ${certificateId}
🏫 Issued by: Zyntiq

#Zyntiq #OnlineLearning #Certificate #${courseName.replace(/\s+/g, '')}`);

    window.open(`https://wa.me/?text=${message}`, '_blank');
    setShowShareMenu(false);
    if (isMobile) {
      setShowMobileActions(false);
    }
  };

  const shareViaLinkedIn = () => {
    const text = encodeURIComponent(`I'm proud to share that I've completed the ${courseName} course from Zyntiq and earned my certificate! 

This course has enhanced my skills in ${courseName} and I'm excited to apply this knowledge in my professional journey.

#Zyntiq #OnlineLearning #Certificate #ProfessionalDevelopment #${courseName.replace(/\s+/g, '')}`);

    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${text}`, '_blank');
    setShowShareMenu(false);
    if (isMobile) {
      setShowMobileActions(false);
    }
  };

  const shareViaTwitter = () => {
    const text = encodeURIComponent(`🎓 Just completed the ${courseName} course from @Zyntiq and earned my certificate! 

Excited to apply these new skills! 💪

#Zyntiq #OnlineLearning #Certificate #${courseName.replace(/\s+/g, '')}`);

    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`, '_blank');
    setShowShareMenu(false);
    if (isMobile) {
      setShowMobileActions(false);
    }
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
      if (isMobile) {
        setShowMobileActions(false);
      }
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
        if (isMobile) {
          setShowMobileActions(false);
        }
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

  const handleMobileDownloadClick = () => {
    if (isMobile) {
      setShowMobileActions(true);
    } else {
      downloadCertificate();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto">
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
          {/* Desktop Action Buttons - Always Visible on Desktop */}
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

          {/* Mobile Download Button - Shows Actions on Click */}
          {isMobile && !showMobileActions && (
            <div className="flex justify-center mb-6">
              <button
                onClick={handleMobileDownloadClick}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-lg"
              >
                <Download className="w-6 h-6" />
                Download Certificate
              </button>
            </div>
          )}

          {/* Mobile Action Buttons - Show After Download Click */}
          {isMobile && showMobileActions && (
            <div className="mb-6">
              <div className="flex flex-col gap-3">
                <button
                  onClick={downloadCertificate}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
                
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-purple-300 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  Share Certificate
                </button>

                {/* Mobile Share Menu */}
                {showShareMenu && (
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <button
                      onClick={shareViaEmail}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white rounded-lg transition-colors"
                    >
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span>Share via Email</span>
                    </button>
                    
                    <button
                      onClick={shareViaWhatsApp}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-5 h-5 text-green-600" />
                      <span>Share on WhatsApp</span>
                    </button>
                    
                    <button
                      onClick={shareViaLinkedIn}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white rounded-lg transition-colors"
                    >
                      <div className="w-5 h-5 bg-blue-700 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">in</span>
                      </div>
                      <span>Share on LinkedIn</span>
                    </button>
                    
                    <button
                      onClick={copyToClipboard}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white rounded-lg transition-colors"
                    >
                      <Copy className="w-5 h-5 text-gray-600" />
                      <span>Copy to Clipboard</span>
                    </button>
                    
                    {navigator.share && (
                      <button
                        onClick={shareViaNativeAPI}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white rounded-lg transition-colors"
                      >
                        <Share2 className="w-5 h-5 text-purple-600" />
                        <span>More Options</span>
                      </button>
                    )}
                  </div>
                )}

                <button
                  onClick={() => setShowMobileActions(false)}
                  className="text-gray-500 text-center py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Certificate Display */}
          <div className="flex justify-center">
            <div 
              ref={certificateRef}
              className="certificate-container bg-white shadow-2xl w-full max-w-5xl mx-auto"
              style={{ 
                aspectRatio: '1.414/1',
                minHeight: isMobile ? '600px' : '800px'
              }}
            >
              {/* Certificate Content */}
              <div className="w-full h-full bg-gradient-to-br from-slate-50 via-white to-purple-50 relative overflow-hidden border-8 border-purple-200 rounded-lg flex flex-col">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-16 left-16 w-32 h-32 bg-purple-500 rounded-full"></div>
                  <div className="absolute top-32 right-32 w-24 h-24 bg-indigo-500 rounded-full"></div>
                  <div className="absolute bottom-32 left-32 w-28 h-28 bg-purple-500 rounded-full"></div>
                  <div className="absolute bottom-16 right-16 w-20 h-20 bg-indigo-500 rounded-full"></div>
                </div>

                {/* Elegant Border Pattern */}
                <div className="absolute inset-6 border-2 border-purple-300 rounded-lg">
                  <div className="absolute inset-4 border border-purple-200 rounded-lg"></div>
                </div>

                {/* Header Section */}
                <div className="text-center pt-8 sm:pt-12 lg:pt-16 pb-4 sm:pb-6 lg:pb-8 px-6 sm:px-8 lg:px-12 flex-shrink-0">
                  <div className="flex justify-center mb-3 sm:mb-4 lg:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                    </div>
                  </div>
                  <h1 className="text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text mb-2 sm:mb-3 lg:mb-4 leading-tight">
                    Certificate of Completion
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 font-medium">This certifies that</p>
                </div>

                {/* Student Name Section */}
                <div className="text-center mb-4 sm:mb-6 lg:mb-8 px-6 sm:px-8 lg:px-12 flex-shrink-0">
                  <div className="mb-3 sm:mb-4 lg:mb-6">
                    <h2 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4 leading-tight break-words" 
                        style={{ 
                          fontFamily: 'Georgia, serif',
                          letterSpacing: '0.02em',
                          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                      {studentName}
                    </h2>
                    <div className="w-32 sm:w-48 lg:w-80 xl:w-96 h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full"></div>
                  </div>
                </div>

                {/* Course Details Section */}
                <div className="text-center mb-6 sm:mb-8 lg:mb-10 px-6 sm:px-8 lg:px-12 flex-grow flex flex-col justify-center">
                  <p className="text-sm sm:text-base lg:text-xl xl:text-2xl text-gray-700 mb-2 sm:mb-3 lg:mb-4 font-medium">
                    has successfully completed the course
                  </p>
                  <h3 className="text-lg sm:text-xl lg:text-3xl xl:text-4xl font-bold text-purple-900 mb-3 sm:mb-4 lg:mb-6 leading-tight break-words">
                    {courseName}
                  </h3>
                  <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600">
                    <span>Completed on</span>
                    <span className="font-semibold text-purple-700">{formatDate(completionDate)}</span>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="px-6 sm:px-8 lg:px-12 xl:px-20 pb-6 sm:pb-8 lg:pb-12 flex-shrink-0">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-8 text-center">
                    {/* Signature */}
                    <div className="flex flex-col items-center">
                      <div className="w-16 sm:w-24 lg:w-32 xl:w-40 h-0.5 bg-gray-400 mb-1 sm:mb-2 lg:mb-3"></div>
                      <p className="text-xs sm:text-sm lg:text-base xl:text-lg font-semibold text-gray-700">Zyntiq Team</p>
                      <p className="text-xs sm:text-xs lg:text-sm text-gray-500">Authorized Signature</p>
                    </div>
                    
                    {/* Official Seal */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mb-1 sm:mb-2 lg:mb-3 border-2 border-purple-300">
                        <Award className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-purple-600" />
                      </div>
                      <p className="text-xs sm:text-xs lg:text-sm text-gray-500">Official Seal</p>
                    </div>
                    
                    {/* Certificate ID */}
                    <div className="flex flex-col items-center">
                      <p className="text-xs sm:text-sm lg:text-base xl:text-lg font-semibold text-gray-700 mb-1">Certificate ID</p>
                      <p className="text-xs sm:text-xs lg:text-sm text-gray-600 font-mono break-all leading-tight">{certificateId}</p>
                      <p className="text-xs text-gray-400 mt-0.5 sm:mt-1">Verify at zyntiq.in</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute top-8 left-8 w-6 h-6 sm:w-8 sm:h-8 border-l-4 border-t-4 border-purple-300 rounded-tl-lg"></div>
                <div className="absolute top-8 right-8 w-6 h-6 sm:w-8 sm:h-8 border-r-4 border-t-4 border-purple-300 rounded-tr-lg"></div>
                <div className="absolute bottom-8 left-8 w-6 h-6 sm:w-8 sm:h-8 border-l-4 border-b-4 border-purple-300 rounded-bl-lg"></div>
                <div className="absolute bottom-8 right-8 w-6 h-6 sm:w-8 sm:h-8 border-r-4 border-b-4 border-purple-300 rounded-br-lg"></div>
              </div>
            </div>
          </div>
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