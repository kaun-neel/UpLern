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
          const { user: userData } = await localDB.getCurrentUser();
          setUser(userData);
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
          const { user: userData } = await localDB.getCurrentUser();
          setUser(userData);
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (userData: {
    email: string;
    password: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    phone: string;
  }) => {
    const { user: newUser, error } = await localDB.signUp(userData);
    if (newUser) {
      setUser(newUser);
    }
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { user: signedInUser, error } = await localDB.signIn(email, password);
    if (signedInUser) {
      setUser(signedInUser);
    }
    return { error };
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
    const { error } = await localDB.signOut();
    if (!error) {
      setUser(null);
    }
    return { error };
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