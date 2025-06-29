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
      
      // Optimized settings for both mobile and desktop
      const canvasOptions = {
        scale: isMobile ? 1.5 : 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: isMobile ? 800 : 1056,
        height: isMobile ? 600 : 816,
        logging: false,
        removeContainer: true,
        imageTimeout: 15000
      };

      const canvas = await html2canvas(certificateRef.current, canvasOptions);
      const imgData = canvas.toDataURL('image/png', 0.9);
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 297;
      const imgHeight = 210;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      const filename = `${courseName.replace(/[^a-zA-Z0-9]/g, '-')}-Certificate-${studentName.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
      pdf.save(filename);
      
      toast.dismiss();
      toast.success('Certificate downloaded successfully!');
    } catch (error) {
      toast.dismiss();
      console.error('Error generating certificate:', error);
      
      // Fallback attempt with lower quality
      try {
        toast.loading('Retrying with optimized settings...');
        
        const fallbackCanvas = await html2canvas(certificateRef.current, {
          scale: 1,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: 600,
          height: 450,
          logging: false,
          removeContainer: true,
          imageTimeout: 30000
        });

        const fallbackImgData = fallbackCanvas.toDataURL('image/jpeg', 0.7);
        const fallbackPdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        });

        fallbackPdf.addImage(fallbackImgData, 'JPEG', 0, 0, 297, 210);
        fallbackPdf.save(`${courseName}-Certificate-${studentName}.pdf`);
        
        toast.dismiss();
        toast.success('Certificate downloaded successfully!');
      } catch (fallbackError) {
        toast.dismiss();
        console.error('Fallback download failed:', fallbackError);
        toast.error('Download failed. Please try again or contact support.');
      }
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
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20"
          >
            <X size={24} />
          </button>
          <div className="flex items-center gap-4 pr-12">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Your Certificate</h2>
              <p className="text-white/90">Congratulations on completing the course!</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Action Buttons - Always Visible */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
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

          {/* Certificate Display */}
          <div className="flex justify-center">
            <div 
              ref={certificateRef}
              className="bg-white shadow-2xl max-w-4xl w-full"
              style={{ 
                aspectRatio: isMobile ? '4/3' : '1056/816',
                minHeight: isMobile ? '400px' : '600px'
              }}
            >
              {/* Certificate Content */}
              <div className="w-full h-full bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden border-8 border-purple-200 rounded-lg">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-10 left-10 w-16 sm:w-32 h-16 sm:h-32 bg-purple-500 rounded-full"></div>
                  <div className="absolute top-20 right-20 w-12 sm:w-24 h-12 sm:h-24 bg-indigo-500 rounded-full"></div>
                  <div className="absolute bottom-20 left-20 w-14 sm:w-28 h-14 sm:h-28 bg-purple-500 rounded-full"></div>
                  <div className="absolute bottom-10 right-10 w-10 sm:w-20 h-10 sm:h-20 bg-indigo-500 rounded-full"></div>
                </div>

                {/* Inner Border */}
                <div className="absolute inset-3 sm:inset-6 border-2 border-purple-300 rounded-lg"></div>

                {/* Header */}
                <div className="text-center pt-8 sm:pt-16 pb-4 sm:pb-8">
                  <div className="flex justify-center mb-3 sm:mb-6">
                    <div className="w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
                      <Award className="w-6 h-6 sm:w-12 sm:h-12 text-white" />
                    </div>
                  </div>
                  <h1 className="text-2xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text mb-1 sm:mb-2">
                    Certificate of Completion
                  </h1>
                  <p className="text-sm sm:text-xl text-gray-600">This certifies that</p>
                </div>

                {/* Student Name */}
                <div className="text-center mb-4 sm:mb-8">
                  <h2 className="text-3xl sm:text-6xl font-bold text-gray-900 mb-2 sm:mb-4" style={{ fontFamily: 'serif' }}>
                    {studentName}
                  </h2>
                  <div className="w-48 sm:w-96 h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto"></div>
                </div>

                {/* Course Details */}
                <div className="text-center mb-6 sm:mb-12">
                  <p className="text-lg sm:text-2xl text-gray-700 mb-2 sm:mb-4">has successfully completed the course</p>
                  <h3 className="text-2xl sm:text-4xl font-bold text-purple-900 mb-3 sm:mb-6">{courseName}</h3>
                  <p className="text-base sm:text-xl text-gray-600">
                    Completed on {formatDate(completionDate)}
                  </p>
                </div>

                {/* Footer */}
                <div className="absolute bottom-4 sm:bottom-16 left-0 right-0">
                  <div className="flex justify-between items-center px-6 sm:px-20">
                    <div className="text-center">
                      <div className="w-24 sm:w-48 h-0.5 sm:h-1 bg-gray-300 mb-1 sm:mb-2"></div>
                      <p className="text-sm sm:text-lg font-semibold text-gray-700">Zyntiq Team</p>
                      <p className="text-xs sm:text-sm text-gray-500">Authorized Signature</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                        <Award className="w-6 h-6 sm:w-12 sm:h-12 text-purple-600" />
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500">Official Seal</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm sm:text-lg font-semibold text-gray-700">Certificate ID</p>
                      <p className="text-xs sm:text-sm text-gray-500 font-mono">{certificateId}</p>
                      <p className="text-xs text-gray-400 mt-0.5 sm:mt-1">Verify at zyntiq.in/verify</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay to close share menu */}
      {showShareMenu && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
};

export default CertificateModal;