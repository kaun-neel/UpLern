import { supabase, User, ContactMessage, Enrollment, Profile } from './supabase';

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  return supabaseUrl && 
         supabaseKey && 
         !supabaseUrl.includes('your-project') && 
         !supabaseKey.includes('your-anon-key');
};

// Fallback localStorage implementation
class LocalStorageDatabase {
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
    } catch (error) {
      console.error(`Error saving table ${tableName}:`, error);
    }
  }

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
      
      const existingUser = users.find(user => user.email === userData.email);
      if (existingUser && userData.password !== 'google-oauth') {
        return { user: null, error: 'User already exists with this email' };
      }

      if (existingUser && userData.password === 'google-oauth') {
        localStorage.setItem('uplern_current_user', JSON.stringify({
          id: existingUser.id,
          email: existingUser.email
        }));
        return { user: existingUser, error: null };
      }

      const newUser: User = {
        id: this.generateId(),
        email: userData.email,
        first_name: userData.first_name,
        middle_name: userData.middle_name || '',
        last_name: userData.last_name,
        phone: userData.phone,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      users.push(newUser);
      this.setTable('users', users);

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
      const user = users.find(u => u.email === email);

      if (!user) {
        return { user: null, error: 'Invalid email or password' };
      }

      localStorage.setItem('uplern_current_user', JSON.stringify({
        id: user.id,
        email: user.email
      }));

      return { user, error: null };
    } catch (error) {
      return { user: null, error: 'Failed to sign in' };
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

  async signOut(): Promise<{ error: string | null }> {
    try {
      localStorage.removeItem('uplern_current_user');
      return { error: null };
    } catch (error) {
      return { error: 'Failed to sign out' };
    }
  }

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

  async createEnrollment(enrollmentData: {
    user_id: string;
    course_id: string;
    course_name: string;
    payment_id: string;
    enrollment_type: 'course' | 'premium_pass';
    amount_paid: number;
  }): Promise<{ enrollment: Enrollment | null; error: string | null }> {
    try {
      const enrollments = this.getTable<Enrollment>('enrollments');
      
      const existingEnrollment = enrollments.find(
        e => e.user_id === enrollmentData.user_id && e.course_id === enrollmentData.course_id
      );

      if (existingEnrollment) {
        return { enrollment: existingEnrollment, error: null };
      }

      const newEnrollment: Enrollment = {
        id: this.generateId(),
        ...enrollmentData,
        enrolled_at: new Date().toISOString(),
        status: 'active',
        progress: 0
      };

      enrollments.push(newEnrollment);
      this.setTable('enrollments', enrollments);

      return { enrollment: newEnrollment, error: null };
    } catch (error) {
      return { enrollment: null, error: 'Failed to create enrollment' };
    }
  }

  async getUserEnrollments(userId: string): Promise<{ enrollments: Enrollment[]; error: string | null }> {
    try {
      const enrollments = this.getTable<Enrollment>('enrollments');
      const userEnrollments = enrollments.filter(e => e.user_id === userId);

      return { enrollments: userEnrollments, error: null };
    } catch (error) {
      return { enrollments: [], error: 'Failed to get enrollments' };
    }
  }

  async isUserEnrolledInCourse(userId: string, courseId: string): Promise<{ enrolled: boolean; enrollment?: Enrollment; error: string | null }> {
    try {
      const enrollments = this.getTable<Enrollment>('enrollments');
      const enrollment = enrollments.find(
        e => e.user_id === userId && (e.course_id === courseId || e.enrollment_type === 'premium_pass')
      );

      return { 
        enrolled: !!enrollment, 
        enrollment: enrollment || undefined, 
        error: null 
      };
    } catch (error) {
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
      return { error: 'Failed to update progress' };
    }
  }

  async hasPremiumPass(userId: string): Promise<{ hasPremium: boolean; error: string | null }> {
    try {
      const enrollments = this.getTable<Enrollment>('enrollments');
      const premiumEnrollment = enrollments.find(
        e => e.user_id === userId && e.enrollment_type === 'premium_pass'
      );

      return { hasPremium: !!premiumEnrollment, error: null };
    } catch (error) {
      return { hasPremium: false, error: 'Failed to check premium status' };
    }
  }
}

class SupabaseDatabase {
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
      // First, sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (authError) {
        return { user: null, error: authError.message };
      }

      if (!authData.user) {
        return { user: null, error: 'Failed to create user account' };
      }

      // Create user record in our custom users table
      const { data: user, error: userError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: userData.email,
          first_name: userData.first_name,
          middle_name: userData.middle_name || '',
          last_name: userData.last_name,
          phone: userData.phone,
        })
        .select()
        .single();

      if (userError) {
        console.error('Error creating user record:', userError);
        return { user: null, error: 'Failed to create user profile' };
      }

      return { user, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { user: null, error: 'Failed to create account' };
    }
  }

  async signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      // Handle OAuth users
      if (password === 'google-oauth') {
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .single();

        if (error || !user) {
          return { user: null, error: 'User not found' };
        }

        return { user, error: null };
      }

      // Sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        return { user: null, error: authError.message };
      }

      if (!authData.user) {
        return { user: null, error: 'Invalid email or password' };
      }

      // Get user data from our custom users table
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (userError) {
        console.error('Error fetching user data:', userError);
        return { user: null, error: 'Failed to fetch user data' };
      }

      return { user, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { user: null, error: 'Failed to sign in' };
    }
  }

  async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { error: error.message };
      }
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: 'Failed to sign out' };
    }
  }

  async getCurrentUser(): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data: authData } = await supabase.auth.getUser();
      
      if (!authData.user) {
        return { user: null, error: null };
      }

      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (error) {
        console.error('Error fetching current user:', error);
        return { user: null, error: 'Failed to fetch user data' };
      }

      return { user, error: null };
    } catch (error) {
      console.error('Get current user error:', error);
      return { user: null, error: 'Failed to get current user' };
    }
  }

  // Profile methods
  async getProfile(userId: string): Promise<{ data: Profile | null; error: string | null }> {
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('id, first_name, middle_name, last_name, email, phone')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return { data: null, error: 'Failed to fetch profile' };
      }

      return { data: user, error: null };
    } catch (error) {
      console.error('Get profile error:', error);
      return { data: null, error: 'Failed to get profile' };
    }
  }

  async updateProfile(userId: string, profileData: Partial<Profile>): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase
        .from('users')
        .update(profileData)
        .eq('id', userId);

      if (error) {
        console.error('Error updating profile:', error);
        return { error: 'Failed to update profile' };
      }

      return { error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      return { error: 'Failed to update profile' };
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
      const { error } = await supabase
        .from('contact_messages')
        .insert(messageData);

      if (error) {
        console.error('Error inserting contact message:', error);
        return { error: 'Failed to send message' };
      }

      return { error: null };
    } catch (error) {
      console.error('Insert contact message error:', error);
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
      
      // Check if user is already enrolled in this course
      const { data: existingEnrollment } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', enrollmentData.user_id)
        .eq('course_id', enrollmentData.course_id)
        .single();

      if (existingEnrollment) {
        console.log('User already enrolled, returning existing enrollment:', existingEnrollment);
        return { enrollment: existingEnrollment, error: null };
      }

      const { data: enrollment, error } = await supabase
        .from('enrollments')
        .insert(enrollmentData)
        .select()
        .single();

      if (error) {
        console.error('Error creating enrollment:', error);
        return { enrollment: null, error: 'Failed to create enrollment' };
      }

      console.log('Enrollment successfully created:', enrollment);
      return { enrollment, error: null };
    } catch (error) {
      console.error('Create enrollment error:', error);
      return { enrollment: null, error: 'Failed to create enrollment' };
    }
  }

  async getUserEnrollments(userId: string): Promise<{ enrollments: Enrollment[]; error: string | null }> {
    try {
      const { data: enrollments, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', userId)
        .order('enrolled_at', { ascending: false });

      if (error) {
        console.error('Error getting user enrollments:', error);
        return { enrollments: [], error: 'Failed to get enrollments' };
      }

      console.log(`Found ${enrollments?.length || 0} enrollments for user ${userId}:`, enrollments);
      return { enrollments: enrollments || [], error: null };
    } catch (error) {
      console.error('Get user enrollments error:', error);
      return { enrollments: [], error: 'Failed to get enrollments' };
    }
  }

  async isUserEnrolledInCourse(userId: string, courseId: string): Promise<{ enrolled: boolean; enrollment?: Enrollment; error: string | null }> {
    try {
      // Check for specific course enrollment or premium pass
      const { data: enrollments, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', userId)
        .or(`course_id.eq.${courseId},enrollment_type.eq.premium_pass`);

      if (error) {
        console.error('Error checking enrollment:', error);
        return { enrolled: false, error: 'Failed to check enrollment' };
      }

      const enrollment = enrollments?.[0];
      console.log(`Checking enrollment for user ${userId} in course ${courseId}:`, !!enrollment);

      return { 
        enrolled: !!enrollment, 
        enrollment: enrollment || undefined, 
        error: null 
      };
    } catch (error) {
      console.error('Check enrollment error:', error);
      return { enrolled: false, error: 'Failed to check enrollment' };
    }
  }

  async updateEnrollmentProgress(enrollmentId: string, progress: number): Promise<{ error: string | null }> {
    try {
      const clampedProgress = Math.min(100, Math.max(0, progress));
      const status = clampedProgress === 100 ? 'completed' : 'active';

      const { error } = await supabase
        .from('enrollments')
        .update({ 
          progress: clampedProgress,
          status: status
        })
        .eq('id', enrollmentId);

      if (error) {
        console.error('Error updating progress:', error);
        return { error: 'Failed to update progress' };
      }

      return { error: null };
    } catch (error) {
      console.error('Update progress error:', error);
      return { error: 'Failed to update progress' };
    }
  }

  async hasPremiumPass(userId: string): Promise<{ hasPremium: boolean; error: string | null }> {
    try {
      const { data: enrollment, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', userId)
        .eq('enrollment_type', 'premium_pass')
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
        console.error('Error checking premium status:', error);
        return { hasPremium: false, error: 'Failed to check premium status' };
      }

      console.log(`Checking premium pass for user ${userId}:`, !!enrollment);
      return { hasPremium: !!enrollment, error: null };
    } catch (error) {
      console.error('Check premium status error:', error);
      return { hasPremium: false, error: 'Failed to check premium status' };
    }
  }

  // Google OAuth user creation
  async createGoogleUser(googleUser: {
    id: string;
    email: string;
    given_name: string;
    family_name: string;
  }): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data: user, error } = await supabase
        .from('users')
        .insert({
          id: googleUser.id,
          email: googleUser.email,
          first_name: googleUser.given_name || 'User',
          middle_name: '',
          last_name: googleUser.family_name || '',
          phone: '0000000000', // Default phone for OAuth users
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating Google user:', error);
        return { user: null, error: 'Failed to create user profile' };
      }

      return { user, error: null };
    } catch (error) {
      console.error('Create Google user error:', error);
      return { user: null, error: 'Failed to create user profile' };
    }
  }
}

// Export the appropriate database implementation
export const localDB = isSupabaseConfigured() ? new SupabaseDatabase() : new LocalStorageDatabase();

// Initialize demo data for localStorage fallback
if (!isSupabaseConfigured()) {
  console.log('Supabase not configured, using localStorage with demo data');
  
  // Initialize demo data
  const initializeDemoData = () => {
    const users = JSON.parse(localStorage.getItem('uplern_users') || '[]');
    const demoUserExists = users.find((user: User) => user.email === 'demo@uplern.com');
    
    if (!demoUserExists) {
      const demoUsers: User[] = [
        {
          id: 'demo-user-1',
          email: 'demo@uplern.com',
          first_name: 'Demo',
          middle_name: '',
          last_name: 'User',
          phone: '9876543210',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'demo-user-2',
          email: 'john@uplern.com',
          first_name: 'John',
          middle_name: 'M',
          last_name: 'Doe',
          phone: '9876543211',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];

      users.push(...demoUsers);
      localStorage.setItem('uplern_users', JSON.stringify(users));

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

      localStorage.setItem('uplern_enrollments', JSON.stringify(demoEnrollments));
    }
  };

  initializeDemoData();
}