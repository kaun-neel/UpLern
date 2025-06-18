import React, { useState } from 'react';
import { X, Award, Download, Share2, Eye } from 'lucide-react';
import CertificateBuilder from './CertificateBuilder';

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
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'classic' | 'elegant'>('modern');
  const [showPreview, setShowPreview] = useState(false);

  if (!isOpen) return null;

  const templates = [
    {
      id: 'modern' as const,
      name: 'Modern',
      description: 'Clean and contemporary design with gradient colors',
      preview: 'bg-gradient-to-br from-purple-100 to-indigo-100'
    },
    {
      id: 'classic' as const,
      name: 'Classic',
      description: 'Traditional formal certificate with gold accents',
      preview: 'bg-gradient-to-br from-yellow-100 to-yellow-200'
    },
    {
      id: 'elegant' as const,
      name: 'Elegant',
      description: 'Minimalist and sophisticated design',
      preview: 'bg-gradient-to-br from-gray-100 to-slate-100'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Certificate Generator</h2>
              <p className="text-white/90">Create your personalized certificate</p>
            </div>
          </div>
        </div>

        {!showPreview ? (
          <div className="p-8">
            {/* Certificate Info */}
            <div className="bg-purple-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">Certificate Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                  <p className="text-lg font-semibold text-gray-900">{studentName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                  <p className="text-lg font-semibold text-gray-900">{courseName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date</label>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(completionDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Certificate ID</label>
                  <p className="text-lg font-semibold text-gray-900 font-mono">{certificateId}</p>
                </div>
              </div>
            </div>

            {/* Template Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Choose Template</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`cursor-pointer rounded-2xl border-2 transition-all duration-300 ${
                      selectedTemplate === template.id
                        ? 'border-purple-500 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                    }`}
                  >
                    <div className={`h-32 rounded-t-2xl ${template.preview} flex items-center justify-center`}>
                      <Award className="w-12 h-12 text-gray-600" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
              >
                <Eye className="w-5 h-5" />
                Preview & Download
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4">
            {/* Preview Header */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setShowPreview(false)}
                className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              >
                ← Back to Templates
              </button>
              <h3 className="text-xl font-semibold text-gray-900">Certificate Preview</h3>
            </div>

            {/* Certificate Preview */}
            <CertificateBuilder
              studentName={studentName}
              courseName={courseName}
              completionDate={completionDate}
              certificateId={certificateId}
              template={selectedTemplate}
            />
          </div>
        )}
      </div>
    </div>
  );
};