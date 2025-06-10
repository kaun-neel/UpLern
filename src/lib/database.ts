// Local database implementation using localStorage
interface User {
  id: string;
  email: string;
  password: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  phone: string;
  created_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

interface Profile {
  id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  phone: string;
}

interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  course_name: string;
  payment_id: string;
  enrollment_type: 'course' | 'premium_pass';
  amount_paid: number;
  enrolled_at: string;
  status: 'active' | 'completed';
  progress: number;
}

class LocalDatabase {
  constructor() {
    this.initializeDemoData();
  }

  private initializeDemoData(): void {
    // Check if demo users already exist
    const users = this.getTable<User>('users');
    const demoUserExists = users.find(user => user.email === 'demo@uplern.com');
    
    if (!demoUserExists) {
      // Create demo users
      const demoUsers: User[] = [
        {
          id: 'demo-user-1',
          email: 'demo@uplern.com',
          password: 'demo123',
          first_name: 'Demo',
          middle_name: '',
          last_name: 'User',
          phone: '9876543210',
          created_at: new Date().toISOString()
        },
        {
          id: 'demo-user-2',
          email: 'john@uplern.com',
          password: 'password123',
          first_name: 'John',
          middle_name: 'M',
          last_name: 'Doe',
          phone: '9876543211',
          created_at: new Date().toISOString()
        }
      ];

      users.push(...demoUsers);
      this.setTable('users', users);

      // Create demo enrollments for demo user
      const demoEnrollments: Enrollment[] = [
        {
          id: 'enrollment-1',
          user_id: 'demo-user-1',
          course_id: 'web-development',
          course_name: 'Web Development',
          payment_id: 'pay_demo_12345',
          enrollment_type: 'course',
          amount_paid: 599,
          enrolled_at: '2024-01-15T10:30:00Z',
          status: 'active',
          progress: 75
        },
        {
          id: 'enrollment-2',
          user_id: 'demo-user-1',
          course_id: 'ui-ux-design',
          course_name: 'UI/UX Design',
          payment_id: 'pay_demo_12346',
          enrollment_type: 'course',
          amount_paid: 599,
          enrolled_at: '2024-01-10T09:15:00Z',
          status: 'completed',
          progress: 100
        },
        {
          id: 'enrollment-3',
          user_id: 'demo-user-1',
          course_id: 'digital-marketing',
          course_name: 'Digital Marketing',
          payment_id: 'pay_demo_12347',
          enrollment_type: 'course',
          amount_paid: 599,
          enrolled_at: '2024-01-22T14:20:00Z',
          status: 'active',
          progress: 30
        }
      ];

      this.setTable('enrollments', demoEnrollments);
    }
  }

  private getStorageKey(table: string): string {
    return `uplern_${table}`;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private getTable<T>(tableName: string): T[] {
    try {
      const data = localStorage.getItem(this.getStorageKey(tableName));
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error reading table ${tableName}:`, error);
      return [];
    }
  }

  private setTable<T>(tableName: string, data: T[]): void {
    try {
      localStorage.setItem(this.getStorageKey(tableName), JSON.stringify(data));
      console.log(`Successfully saved ${data.length} records to ${tableName}`);
    } catch (error) {
      console.error(`Error saving table ${tableName}:`, error);
    }
  }

  // User authentication methods
  async signUp(userData: {
    email: string;
    password: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    phone: string;
  }): Promise<{ user: User | null; error: string | null }> {
    try {
      const users = this.getTable<User>('users');
      
      // Check if user already exists (but allow OAuth users to be recreated)
      const existingUser = users.find(user => user.email === userData.email);
      if (existingUser && userData.password !== 'google-oauth') {
        return { user: null, error: 'User already exists with this email' };
      }

      // If it's a Google OAuth user and they already exist, return the existing user
      if (existingUser && userData.password === 'google-oauth') {
        // Set current session
        localStorage.setItem('uplern_current_user', JSON.stringify({
          id: existingUser.id,
          email: existingUser.email
        }));
        return { user: existingUser, error: null };
      }

      const newUser: User = {
        id: this.generateId(),
        email: userData.email,
        password: userData.password, // In production, this should be hashed
        first_name: userData.first_name,
        middle_name: userData.middle_name,
        last_name: userData.last_name,
        phone: userData.phone,
        created_at: new Date().toISOString()
      };

      users.push(newUser);
      this.setTable('users', users);

      // Set current session
      localStorage.setItem('uplern_current_user', JSON.stringify({
        id: newUser.id,
        email: newUser.email
      }));

      return { user: newUser, error: null };
    } catch (error) {
      return { user: null, error: 'Failed to create account' };
    }
  }

  async signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      const users = this.getTable<User>('users');
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        return { user: null, error: 'Invalid email or password' };
      }

      // Set current session
      localStorage.setItem('uplern_current_user', JSON.stringify({
        id: user.id,
        email: user.email
      }));

      return { user, error: null };
    } catch (error) {
      return { user: null, error: 'Failed to sign in' };
    }
  }

  async signOut(): Promise<{ error: string | null }> {
    try {
      localStorage.removeItem('uplern_current_user');
      return { error: null };
    } catch (error) {
      return { error: 'Failed to sign out' };
    }
  }

  async getCurrentUser(): Promise<{ user: User | null; error: string | null }> {
    try {
      const currentUserData = localStorage.getItem('uplern_current_user');
      if (!currentUserData) {
        return { user: null, error: null };
      }

      const { id } = JSON.parse(currentUserData);
      const users = this.getTable<User>('users');
      const user = users.find(u => u.id === id);

      return { user: user || null, error: null };
    } catch (error) {
      return { user: null, error: 'Failed to get current user' };
    }
  }

  // Profile methods
  async getProfile(userId: string): Promise<{ data: Profile | null; error: string | null }> {
    try {
      const users = this.getTable<User>('users');
      const user = users.find(u => u.id === userId);

      if (!user) {
        return { data: null, error: 'User not found' };
      }

      const profile: Profile = {
        id: user.id,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone
      };

      return { data: profile, error: null };
    } catch (error) {
      return { data: null, error: 'Failed to get profile' };
    }
  }

  // Contact messages
  async insertContactMessage(messageData: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }): Promise<{ error: string | null }> {
    try {
      const messages = this.getTable<ContactMessage>('contact_messages');
      
      const newMessage: ContactMessage = {
        id: this.generateId(),
        ...messageData,
        created_at: new Date().toISOString()
      };

      messages.push(newMessage);
      this.setTable('contact_messages', messages);

      return { error: null };
    } catch (error) {
      return { error: 'Failed to send message' };
    }
  }

  // Enrollment methods
  async createEnrollment(enrollmentData: {
    user_id: string;
    course_id: string;
    course_name: string;
    payment_id: string;
    enrollment_type: 'course' | 'premium_pass';
    amount_paid: number;
  }): Promise<{ enrollment: Enrollment | null; error: string | null }> {
    try {
      console.log('Creating enrollment with data:', enrollmentData);
      
      const enrollments = this.getTable<Enrollment>('enrollments');
      
      // Check if user is already enrolled in this course
      const existingEnrollment = enrollments.find(
        e => e.user_id === enrollmentData.user_id && e.course_id === enrollmentData.course_id
      );

      if (existingEnrollment) {
        console.log('User already enrolled, returning existing enrollment:', existingEnrollment);
        return { enrollment: existingEnrollment, error: null };
      }

      const newEnrollment: Enrollment = {
        id: this.generateId(),
        ...enrollmentData,
        enrolled_at: new Date().toISOString(),
        status: 'active',
        progress: 0
      };

      console.log('Creating new enrollment:', newEnrollment);

      enrollments.push(newEnrollment);
      this.setTable('enrollments', enrollments);

      // Verify the enrollment was saved
      const savedEnrollments = this.getTable<Enrollment>('enrollments');
      const savedEnrollment = savedEnrollments.find(e => e.id === newEnrollment.id);
      
      if (!savedEnrollment) {
        console.error('Failed to save enrollment to localStorage');
        return { enrollment: null, error: 'Failed to save enrollment' };
      }

      console.log('Enrollment successfully saved:', savedEnrollment);
      return { enrollment: newEnrollment, error: null };
    } catch (error) {
      console.error('Error creating enrollment:', error);
      return { enrollment: null, error: 'Failed to create enrollment' };
    }
  }

  async getUserEnrollments(userId: string): Promise<{ enrollments: Enrollment[]; error: string | null }> {
    try {
      const enrollments = this.getTable<Enrollment>('enrollments');
      const userEnrollments = enrollments.filter(e => e.user_id === userId);
      console.log(`Found ${userEnrollments.length} enrollments for user ${userId}:`, userEnrollments);

      return { enrollments: userEnrollments, error: null };
    } catch (error) {
      console.error('Error getting user enrollments:', error);
      return { enrollments: [], error: 'Failed to get enrollments' };
    }
  }

  async isUserEnrolledInCourse(userId: string, courseId: string): Promise<{ enrolled: boolean; enrollment?: Enrollment; error: string | null }> {
    try {
      const enrollments = this.getTable<Enrollment>('enrollments');
      const enrollment = enrollments.find(
        e => e.user_id === userId && (e.course_id === courseId || e.enrollment_type === 'premium_pass')
      );

      console.log(`Checking enrollment for user ${userId} in course ${courseId}:`, !!enrollment);

      return { 
        enrolled: !!enrollment, 
        enrollment: enrollment || undefined, 
        error: null 
      };
    } catch (error) {
      console.error('Error checking enrollment:', error);
      return { enrolled: false, error: 'Failed to check enrollment' };
    }
  }

  async updateEnrollmentProgress(enrollmentId: string, progress: number): Promise<{ error: string | null }> {
    try {
      const enrollments = this.getTable<Enrollment>('enrollments');
      const enrollmentIndex = enrollments.findIndex(e => e.id === enrollmentId);

      if (enrollmentIndex === -1) {
        return { error: 'Enrollment not found' };
      }

      enrollments[enrollmentIndex].progress = Math.min(100, Math.max(0, progress));
      if (enrollments[enrollmentIndex].progress === 100) {
        enrollments[enrollmentIndex].status = 'completed';
      }

      this.setTable('enrollments', enrollments);
      return { error: null };
    } catch (error) {
      console.error('Error updating progress:', error);
      return { error: 'Failed to update progress' };
    }
  }

  async hasPremiumPass(userId: string): Promise<{ hasPremium: boolean; error: string | null }> {
    try {
      const enrollments = this.getTable<Enrollment>('enrollments');
      const premiumEnrollment = enrollments.find(
        e => e.user_id === userId && e.enrollment_type === 'premium_pass'
      );

      console.log(`Checking premium pass for user ${userId}:`, !!premiumEnrollment);

      return { hasPremium: !!premiumEnrollment, error: null };
    } catch (error) {
      console.error('Error checking premium status:', error);
      return { hasPremium: false, error: 'Failed to check premium status' };
    }
  }
}

export const localDB = new LocalDatabase();