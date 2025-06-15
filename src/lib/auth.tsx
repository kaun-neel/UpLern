// Authentication context and hooks for Supabase with Google OAuth
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from './supabase';
import { localDB } from './database';
import { googleAuth } from './googleAuth';

interface User {
  id: string;
  email: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (userData: {
    email: string;
    password: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    phone: string;
  }) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          await handleUserSession(session.user);
        }
      } catch (error) {
        console.log('Supabase not configured, using fallback auth');
      }
      
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (session?.user) {
          await handleUserSession(session.user);
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleUserSession = async (authUser: any) => {
    try {
      // Try to get user data from our custom users table
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // User doesn't exist in our custom table, create them
        console.log('Creating new user profile for OAuth user');
        
        // Extract name parts from user metadata
        const fullName = authUser.user_metadata?.full_name || authUser.email.split('@')[0];
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0] || 'User';
        const lastName = nameParts.slice(1).join(' ') || '';

        const newUserData = {
          id: authUser.id,
          email: authUser.email,
          first_name: firstName,
          middle_name: '',
          last_name: lastName,
          phone: authUser.user_metadata?.phone || '0000000000'
        };

        const { data: createdUser, error: createError } = await supabase
          .from('users')
          .insert([newUserData])
          .select()
          .single();

        if (createError) {
          console.error('Error creating user profile:', createError);
          return;
        }

        setUser(createdUser);
      } else if (userData) {
        // User exists, set the user data
        setUser(userData);
      }
    } catch (error) {
      console.error('Error handling user session:', error);
      // Fallback to local database
      try {
        const { user: userData } = await localDB.getCurrentUser();
        setUser(userData);
      } catch (fallbackError) {
        console.error('Fallback auth also failed:', fallbackError);
      }
    }
  };

  const signUp = async (userData: {
    email: string;
    password: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    phone: string;
  }) => {
    try {
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project') || supabaseKey.includes('your-anon-key')) {
        // Use local database fallback
        const { user: newUser, error } = await localDB.signUp(userData);
        if (newUser) {
          setUser(newUser);
        }
        return { error };
      }

      // Use Supabase auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (authError) {
        return { error: authError.message };
      }

      if (authData.user) {
        // Create user profile in our custom table
        const userProfile = {
          id: authData.user.id,
          email: userData.email,
          first_name: userData.first_name,
          middle_name: userData.middle_name || '',
          last_name: userData.last_name,
          phone: userData.phone
        };

        const { data: createdUser, error: profileError } = await supabase
          .from('users')
          .insert([userProfile])
          .select()
          .single();

        if (profileError) {
          console.error('Error creating user profile:', profileError);
          return { error: 'Failed to create user profile' };
        }

        setUser(createdUser);
      }

      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: 'Sign up failed. Please try again.' };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project') || supabaseKey.includes('your-anon-key')) {
        // Use local database fallback
        const { user: signedInUser, error } = await localDB.signIn(email, password);
        if (signedInUser) {
          setUser(signedInUser);
        }
        return { error };
      }

      // Use Supabase auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        return { error: authError.message };
      }

      // The auth state change listener will handle setting the user
      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: 'Sign in failed. Please try again.' };
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project') || supabaseKey.includes('your-anon-key')) {
        // Fallback to demo Google auth
        console.log('Using demo Google auth');
        const { user: googleUser, error } = await googleAuth.signIn();
        
        if (error || !googleUser) {
          return { error: error || 'Google sign-in failed' };
        }

        // Check if user already exists in our database
        const existingUserResult = await localDB.signIn(googleUser.email, 'google-oauth');
        
        if (existingUserResult.user) {
          // User exists, sign them in
          setUser(existingUserResult.user);
          return { error: null };
        }

        // User doesn't exist, create new account
        const googleUserData = {
          email: googleUser.email,
          password: 'google-oauth', // Special password for OAuth users
          first_name: googleUser.given_name || googleUser.name.split(' ')[0] || 'User',
          middle_name: '',
          last_name: googleUser.family_name || googleUser.name.split(' ').slice(1).join(' ') || '',
          phone: '0000000000' // Default phone for OAuth users
        };

        const { user: newUser, error: signUpError } = await localDB.signUp(googleUserData);
        
        if (signUpError) {
          return { error: signUpError };
        }

        if (newUser) {
          setUser(newUser);
        }

        return { error: null };
      }

      // Use real Supabase OAuth
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        console.error('Google OAuth error:', error);
        return { error: error.message };
      }

      // The auth state change listener will handle setting the user
      return { error: null };
    } catch (error) {
      console.error('Google sign-in error:', error);
      return { error: 'Google sign-in failed. Please try again.' };
    }
  };

  const signOut = async () => {
    try {
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project') || supabaseKey.includes('your-anon-key')) {
        // Use local database fallback
        const { error } = await localDB.signOut();
        if (!error) {
          setUser(null);
        }
        return { error };
      }

      // Use Supabase auth
      const { error } = await supabase.auth.signOut();
      if (!error) {
        setUser(null);
      }
      return { error: error?.message || null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: 'Sign out failed. Please try again.' };
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};