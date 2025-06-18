import React, { useRef } from 'react';
import { Award, Download, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CertificateBuilderProps {
  studentName: string;
  courseName: string;
  completionDate: string;
  certificateId: string;
  template?: 'modern' | 'classic' | 'elegant';
}

const CertificateBuilder: React.FC<CertificateBuilderProps> = ({
  studentName,
  courseName,
  completionDate,
  certificateId,
  template = 'modern'
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${courseName}-Certificate-${studentName}.pdf`);
    } catch (error) {
      console.error('Error generating certificate:', error);
    }
  };

  const shareCertificate = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${courseName} Certificate`,
          text: `I've completed the ${courseName} course and earned my certificate!`,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing certificate:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Certificate link copied to clipboard!');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderModernTemplate = () => (
    <div className="w-[1056px] h-[816px] bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-indigo-500 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 bg-purple-500 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-indigo-500 rounded-full"></div>
      </div>

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
            <p className="text-lg font-semibold text-gray-700">upLern Team</p>
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
            <p className="text-xs text-gray-400 mt-1">Verify at uplern.com/verify</p>
          </div>
        </div>
      </div>

      {/* Border */}
      <div className="absolute inset-4 border-4 border-gradient-to-r from-purple-500 to-indigo-500 rounded-lg pointer-events-none"></div>
      <div className="absolute inset-6 border-2 border-purple-200 rounded-lg pointer-events-none"></div>
    </div>
  );

  const renderClassicTemplate = () => (
    <div className="w-[1056px] h-[816px] bg-white relative border-8 border-yellow-600">
      {/* Ornate Border */}
      <div className="absolute inset-4 border-4 border-yellow-500"></div>
      <div className="absolute inset-6 border-2 border-yellow-400"></div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 bg-yellow-600 transform rotate-45"></div>
      <div className="absolute top-8 right-8 w-16 h-16 bg-yellow-600 transform rotate-45"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 bg-yellow-600 transform rotate-45"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 bg-yellow-600 transform rotate-45"></div>

      {/* Header */}
      <div className="text-center pt-20 pb-8">
        <h1 className="text-6xl font-bold text-yellow-700 mb-4" style={{ fontFamily: 'serif' }}>
          CERTIFICATE
        </h1>
        <h2 className="text-3xl font-semibold text-gray-800">OF ACHIEVEMENT</h2>
        <div className="w-32 h-1 bg-yellow-600 mx-auto mt-4"></div>
      </div>

      {/* Content */}
      <div className="text-center px-16">
        <p className="text-2xl text-gray-700 mb-6">This is to certify that</p>
        <h3 className="text-5xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'serif' }}>
          {studentName}
        </h3>
        <p className="text-xl text-gray-700 mb-4">has successfully completed</p>
        <h4 className="text-3xl font-bold text-yellow-700 mb-8">{courseName}</h4>
        <p className="text-lg text-gray-600">on this {formatDate(completionDate)}</p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-20 left-0 right-0 px-20">
        <div className="flex justify-between items-end">
          <div className="text-center">
            <div className="w-40 h-1 bg-gray-400 mb-2"></div>
            <p className="text-lg font-bold text-gray-700">Director</p>
            <p className="text-sm text-gray-500">upLern Academy</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-yellow-600 rounded-full flex items-center justify-center mb-2">
              <Award className="w-10 h-10 text-white" />
            </div>
            <p className="text-xs text-gray-500">Official Seal</p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">Certificate No.</p>
            <p className="text-lg font-bold text-gray-700">{certificateId}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderElegantTemplate = () => (
    <div className="w-[1056px] h-[816px] bg-gradient-to-br from-slate-50 to-gray-100 relative">
      {/* Elegant Border */}
      <div className="absolute inset-8 border-2 border-gray-300 rounded-lg"></div>
      <div className="absolute inset-12 border border-gray-200 rounded-lg"></div>

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <Award className="w-96 h-96 text-gray-400" />
      </div>

      {/* Header */}
      <div className="text-center pt-16 pb-8">
        <div className="flex justify-center mb-6">
          <div className="text-6xl font-light text-gray-700">upLern</div>
        </div>
        <h1 className="text-4xl font-light text-gray-800 mb-2 tracking-wide">
          CERTIFICATE OF COMPLETION
        </h1>
        <div className="w-24 h-px bg-gray-400 mx-auto"></div>
      </div>

      {/* Content */}
      <div className="text-center px-20">
        <p className="text-xl text-gray-600 mb-8 font-light">
          This is to certify that
        </p>
        
        <h2 className="text-5xl font-light text-gray-900 mb-12 tracking-wide" style={{ fontFamily: 'serif' }}>
          {studentName}
        </h2>
        
        <p className="text-lg text-gray-600 mb-4 font-light">
          has successfully completed the comprehensive course
        </p>
        
        <h3 className="text-3xl font-medium text-gray-800 mb-12 tracking-wide">
          {courseName}
        </h3>
        
        <p className="text-lg text-gray-600 font-light">
          Date of Completion: {formatDate(completionDate)}
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-16 left-0 right-0 px-20">
        <div className="flex justify-between items-center">
          <div className="text-left">
            <div className="w-32 h-px bg-gray-400 mb-3"></div>
            <p className="text-lg text-gray-700 font-medium">Authorized by</p>
            <p className="text-sm text-gray-500">upLern Education</p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Certificate ID</p>
            <p className="text-lg font-mono text-gray-700">{certificateId}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate = () => {
    switch (template) {
      case 'classic':
        return renderClassicTemplate();
      case 'elegant':
        return renderElegantTemplate();
      default:
        return renderModernTemplate();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={downloadCertificate}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </button>
          <button
            onClick={shareCertificate}
            className="flex items-center gap-2 px-6 py-3 border-2 border-purple-300 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            Share Certificate
          </button>
        </div>

        {/* Certificate */}
        <div className="flex justify-center">
          <div 
            ref={certificateRef}
            className="shadow-2xl rounded-lg overflow-hidden"
            style={{ transform: 'scale(0.8)', transformOrigin: 'center' }}
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateBuilder;