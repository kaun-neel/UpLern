// Certificate generation and management service

export interface CertificateData {
  id: string;
  studentName: string;
  courseName: string;
  courseId: string;
  completionDate: string;
  issuedAt: string;
}

class CertificateService {
  private generateCertificateId(): string {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substr(2, 5);
    return `CERT-${timestamp}-${randomStr}`.toUpperCase();
  }

  async generateCertificate(
    studentName: string,
    courseName: string,
    courseId: string
  ): Promise<CertificateData> {
    const certificateData: CertificateData = {
      id: this.generateCertificateId(),
      studentName,
      courseName,
      courseId,
      completionDate: new Date().toISOString(),
      issuedAt: new Date().toISOString()
    };

    // Store certificate data in localStorage for demo purposes
    this.storeCertificate(certificateData);

    return certificateData;
  }

  private storeCertificate(certificateData: CertificateData): void {
    try {
      const existingCertificates = this.getUserCertificates();
      
      // Check if certificate already exists for this course
      const existingIndex = existingCertificates.findIndex(
        cert => cert.courseId === certificateData.courseId && cert.studentName === certificateData.studentName
      );
      
      if (existingIndex >= 0) {
        // Update existing certificate
        existingCertificates[existingIndex] = certificateData;
      } else {
        // Add new certificate
        existingCertificates.push(certificateData);
      }
      
      localStorage.setItem('zyntiq_certificates', JSON.stringify(existingCertificates));
      
      // Trigger storage event for cross-tab communication
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'zyntiq_certificates',
        newValue: JSON.stringify(existingCertificates),
        storageArea: localStorage
      }));
    } catch (error) {
      console.error('Error storing certificate:', error);
    }
  }

  getUserCertificates(): CertificateData[] {
    try {
      const certificates = localStorage.getItem('zyntiq_certificates');
      return certificates ? JSON.parse(certificates) : [];
    } catch (error) {
      console.error('Error retrieving certificates:', error);
      return [];
    }
  }

  getCertificateById(certificateId: string): CertificateData | null {
    const certificates = this.getUserCertificates();
    return certificates.find(cert => cert.id === certificateId) || null;
  }

  getCertificatesByCourse(courseId: string): CertificateData[] {
    const certificates = this.getUserCertificates();
    return certificates.filter(cert => cert.courseId === courseId);
  }

  verifyCertificate(certificateId: string): boolean {
    const certificate = this.getCertificateById(certificateId);
    return certificate !== null;
  }

  formatCertificateForSharing(certificate: CertificateData): string {
    return `🎓 I've successfully completed the ${certificate.courseName} course and earned my certificate!
    
📅 Completed: ${new Date(certificate.completionDate).toLocaleDateString()}
🆔 Certificate ID: ${certificate.id}
🏫 Issued by: Zyntiq

#Zyntiq #OnlineLearning #Certificate #${certificate.courseName.replace(/\s+/g, '')}`;
  }

  // Force refresh certificates from storage
  refreshCertificates(): CertificateData[] {
    return this.getUserCertificates();
  }
}

export const certificateService = new CertificateService();