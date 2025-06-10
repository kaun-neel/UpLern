// Authentication context and hooks for local database
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { localDB } from './database';

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
    // Check for existing session on mount
    const checkSession = async () => {
      const { user } = await localDB.getCurrentUser();
      setUser(user);
      setLoading(false);
    };

    checkSession();
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
      // Simulate Google OAuth flow
      const mockGoogleUser = {
        email: `google.user.${Date.now()}@gmail.com`,
        password: 'google-oauth-temp',
        first_name: 'Google',
        middle_name: '',
        last_name: 'User',
        phone: '9999999999'
      };

      const { user: newUser, error } = await localDB.signUp(mockGoogleUser);
      if (newUser) {
        setUser(newUser);
        return { error: null };
      }
      return { error: error || 'Failed to sign in with Google' };
    } catch (error) {
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