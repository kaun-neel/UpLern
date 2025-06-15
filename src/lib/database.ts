import { supabase, User, ContactMessage, Enrollment, Profile } from './supabase';

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

export const localDB = new SupabaseDatabase();