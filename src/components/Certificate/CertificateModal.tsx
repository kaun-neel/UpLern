import React, { useRef } from 'react';
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
      
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 1056,
        height: 816
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 297;
      const imgHeight = 210;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${courseName}-Certificate-${studentName.replace(/\s+/g, '-')}.pdf`);
      
      toast.dismiss();
      toast.success('Certificate downloaded successfully!');
    } catch (error) {
      toast.dismiss();
      console.error('Error generating certificate:', error);
      toast.error('Failed to download certificate. Please try again.');
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
  };

  const shareViaWhatsApp = () => {
    const message = encodeURIComponent(`🎓 I've successfully completed the ${courseName} course and earned my certificate from Zyntiq!

📅 Completed: ${formatDate(completionDate)}
🆔 Certificate ID: ${certificateId}
🏫 Issued by: Zyntiq

#Zyntiq #OnlineLearning #Certificate #${courseName.replace(/\s+/g, '')}`);

    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const shareViaLinkedIn = () => {
    const text = encodeURIComponent(`I'm proud to share that I've completed the ${courseName} course from Zyntiq and earned my certificate! 

This course has enhanced my skills in ${courseName} and I'm excited to apply this knowledge in my professional journey.

#Zyntiq #OnlineLearning #Certificate #ProfessionalDevelopment #${courseName.replace(/\s+/g, '')}`);

    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${text}`, '_blank');
  };

  const shareViaTwitter = () => {
    const text = encodeURIComponent(`🎓 Just completed the ${courseName} course from @Zyntiq and earned my certificate! 

Excited to apply these new skills! 💪

#Zyntiq #OnlineLearning #Certificate #${courseName.replace(/\s+/g, '')}`);

    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`, '_blank');
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
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error sharing certificate:', error);
          toast.error('Failed to share certificate');
        }
      }
    } else {
      // Fallback to copy to clipboard
      copyToClipboard();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 sm:p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/80 hover:text-white transition-colors w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/20"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3 sm:gap-4 pr-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <Award className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Your Certificate</h2>
              <p className="text-white/90 text-sm sm:text-base">Congratulations on completing the course!</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <button
              onClick={downloadCertificate}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-sm sm:text-base min-h-[48px]"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              Download PDF
            </button>
            
            {/* Share Dropdown */}
            <div className="relative group">
              <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 border-2 border-purple-300 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-colors text-sm sm:text-base min-h-[48px] w-full sm:w-auto">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                Share Certificate
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 right-0 sm:left-auto sm:right-auto sm:w-64 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-10">
                <div className="p-2">
                  <button
                    onClick={shareViaEmail}
                    className="w-full flex items-center gap-3 px-3 sm:px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors text-sm sm:text-base min-h-[44px]"
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    <span>Share via Email</span>
                  </button>
                  
                  <button
                    onClick={shareViaWhatsApp}
                    className="w-full flex items-center gap-3 px-3 sm:px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors text-sm sm:text-base min-h-[44px]"
                  >
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    <span>Share on WhatsApp</span>
                  </button>
                  
                  <button
                    onClick={shareViaLinkedIn}
                    className="w-full flex items-center gap-3 px-3 sm:px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors text-sm sm:text-base min-h-[44px]"
                  >
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-700 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">in</span>
                    </div>
                    <span>Share on LinkedIn</span>
                  </button>
                  
                  <button
                    onClick={shareViaTwitter}
                    className="w-full flex items-center gap-3 px-3 sm:px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors text-sm sm:text-base min-h-[44px]"
                  >
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-400 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">𝕏</span>
                    </div>
                    <span>Share on Twitter</span>
                  </button>
                  
                  <button
                    onClick={copyToClipboard}
                    className="w-full flex items-center gap-3 px-3 sm:px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors text-sm sm:text-base min-h-[44px]"
                  >
                    <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    <span>Copy to Clipboard</span>
                  </button>
                  
                  {navigator.share && (
                    <button
                      onClick={shareViaNativeAPI}
                      className="w-full flex items-center gap-3 px-3 sm:px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors text-sm sm:text-base min-h-[44px]"
                    >
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                      <span>More Options</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Certificate */}
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              {/* Mobile Certificate Preview */}
              <div className="block lg:hidden bg-gradient-to-br from-purple-50 via-white to-indigo-50 rounded-2xl p-6 border-4 border-purple-200 mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text mb-2">
                    Certificate of Completion
                  </h3>
                  <p className="text-gray-600 mb-4">This certifies that</p>
                  
                  <h4 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'serif' }}>
                    {studentName}
                  </h4>
                  <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mb-4"></div>
                  
                  <p className="text-lg text-gray-700 mb-2">has successfully completed the course</p>
                  <h5 className="text-2xl font-bold text-purple-900 mb-4">{courseName}</h5>
                  <p className="text-base text-gray-600 mb-6">
                    Completed on {formatDate(completionDate)}
                  </p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div>
                      <p className="font-semibold">Zyntiq Team</p>
                      <p className="text-xs">Authorized Signature</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mb-1">
                        <Award className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="text-xs">Official Seal</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">Certificate ID</p>
                      <p className="text-xs font-mono">{certificateId}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Certificate */}
              <div 
                ref={certificateRef}
                className="hidden lg:block bg-white shadow-2xl"
                style={{ width: '1056px', height: '816px' }}
              >
                {/* Certificate Content */}
                <div className="w-full h-full bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden border-8 border-purple-200">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full"></div>
                    <div className="absolute top-20 right-20 w-24 h-24 bg-indigo-500 rounded-full"></div>
                    <div className="absolute bottom-20 left-20 w-28 h-28 bg-purple-500 rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-20 h-20 bg-indigo-500 rounded-full"></div>
                  </div>

                  {/* Inner Border */}
                  <div className="absolute inset-6 border-2 border-purple-300 rounded-lg"></div>

                  {/* Header */}
                  <div className="text-center pt-16 pb-8">
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                        <Award className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text mb-2">
                      Certificate of Completion
                    </h1>
                    <p className="text-xl text-gray-600">This certifies that</p>
                  </div>

                  {/* Student Name */}
                  <div className="text-center mb-8">
                    <h2 className="text-6xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'serif' }}>
                      {studentName}
                    </h2>
                    <div className="w-96 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto"></div>
                  </div>

                  {/* Course Details */}
                  <div className="text-center mb-12">
                    <p className="text-2xl text-gray-700 mb-4">has successfully completed the course</p>
                    <h3 className="text-4xl font-bold text-purple-900 mb-6">{courseName}</h3>
                    <p className="text-xl text-gray-600">
                      Completed on {formatDate(completionDate)}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="absolute bottom-16 left-0 right-0">
                    <div className="flex justify-between items-center px-20">
                      <div className="text-center">
                        <div className="w-48 h-1 bg-gray-300 mb-2"></div>
                        <p className="text-lg font-semibold text-gray-700">Zyntiq Team</p>
                        <p className="text-sm text-gray-500">Authorized Signature</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mb-2">
                          <Award className="w-12 h-12 text-purple-600" />
                        </div>
                        <p className="text-sm text-gray-500">Official Seal</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-700">Certificate ID</p>
                        <p className="text-sm text-gray-500 font-mono">{certificateId}</p>
                        <p className="text-xs text-gray-400 mt-1">Verify at zyntiq.in/verify</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;