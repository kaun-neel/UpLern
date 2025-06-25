import React, { useState, useEffect } from 'react';
import { Award, Download, Share2, Eye, Calendar, Search } from 'lucide-react';
import { certificateService, CertificateData } from '../Certificate/CertificateService';
import CertificateModal from '../Certificate/CertificateModal';

const CertificatesPage = () => {
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateData | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = () => {
    const userCertificates = certificateService.getUserCertificates();
    setCertificates(userCertificates);
  };

  const filteredCertificates = certificates.filter(cert =>
    cert.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewCertificate = (certificate: CertificateData) => {
    setSelectedCertificate(certificate);
    setShowCertificateModal(true);
  };

  const handleShareCertificate = async (certificate: CertificateData) => {
    const shareText = certificateService.formatCertificateForSharing(certificate);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${certificate.courseName} Certificate`,
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing certificate:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Certificate details copied to clipboard!');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
<<<<<<< HEAD
    <div className="bg-white rounded-2xl shadow-sm p-8">
=======
    <div className="glass-card-dark rounded-2xl p-8">
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">My Certificates</h2>
          <p className="text-gray-600 mt-1">View and download your earned certificates</p>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search certificates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
<<<<<<< HEAD
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
=======
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
          />
        </div>
      </div>

      {filteredCertificates.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-12 h-12 text-purple-500" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Certificates Yet</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Complete courses to earn certificates that showcase your achievements and skills.
          </p>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
<<<<<<< HEAD
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
=======
            <div className="bg-gradient-to-br from-purple-50/80 to-purple-100/80 backdrop-blur-sm rounded-xl p-6 border border-purple-200/50">
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
              <div className="flex items-center justify-between mb-2">
                <Award className="w-8 h-8 text-purple-600" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-900">{certificates.length}</div>
                  <div className="text-sm text-purple-700 font-medium">Total Certificates</div>
                </div>
              </div>
            </div>
            
<<<<<<< HEAD
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
=======
            <div className="bg-gradient-to-br from-green-50/80 to-green-100/80 backdrop-blur-sm rounded-xl p-6 border border-green-200/50">
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-8 h-8 text-green-600" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-900">
                    {certificates.length > 0 ? formatDate(certificates[certificates.length - 1].completionDate) : 'N/A'}
                  </div>
                  <div className="text-sm text-green-700 font-medium">Latest Certificate</div>
                </div>
              </div>
            </div>
            
<<<<<<< HEAD
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
=======
            <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50">
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
              <div className="flex items-center justify-between mb-2">
                <Eye className="w-8 h-8 text-blue-600" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-900">100%</div>
                  <div className="text-sm text-blue-700 font-medium">Verified</div>
                </div>
              </div>
            </div>
          </div>

          {/* Certificates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((certificate) => (
              <div
                key={certificate.id}
<<<<<<< HEAD
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-purple-200 transition-all duration-300"
=======
                className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg hover:border-purple-200 transition-all duration-300"
>>>>>>> 117c30fa8015fd276c748e4ca9ae5645df66f8c5
              >
                {/* Certificate Preview */}
                <div className="h-32 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                  <Award className="w-12 h-12 text-white" />
                  <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-xs text-white font-medium">Certificate</span>
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {certificate.courseName}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Completed: {formatDate(certificate.completionDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span className="font-mono text-xs">ID: {certificate.id}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewCertificate(certificate)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleShareCertificate(certificate)}
                    className="px-3 py-2 border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Certificate Modal */}
      {selectedCertificate && (
        <CertificateModal
          isOpen={showCertificateModal}
          onClose={() => {
            setShowCertificateModal(false);
            setSelectedCertificate(null);
          }}
          studentName={selectedCertificate.studentName}
          courseName={selectedCertificate.courseName}
          completionDate={selectedCertificate.completionDate}
          certificateId={selectedCertificate.id}
        />
      )}
    </div>
  );
};

export default CertificatesPage;