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

// Mock Google accounts for demonstration
const mockGoogleAccounts = [
  {
    email: 'john.doe@gmail.com',
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    email: 'sarah.smith@gmail.com',
    name: 'Sarah Smith',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    email: 'mike.johnson@gmail.com',
    name: 'Mike Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
  }
];

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

  const showGoogleAccountSelector = (): Promise<any> => {
    return new Promise((resolve) => {
      // Create modal overlay
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      
      // Create modal content
      const modal = document.createElement('div');
      modal.className = 'bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4';
      modal.innerHTML = `
        <div class="text-center mb-6">
          <img src="https://www.google.com/favicon.ico" alt="Google" class="w-8 h-8 mx-auto mb-3">
          <h2 class="text-xl font-semibold text-gray-900">Choose an account</h2>
          <p class="text-gray-600 text-sm">to continue to upLern</p>
        </div>
        <div class="space-y-3">
          ${mockGoogleAccounts.map((account, index) => `
            <button 
              class="google-account-option w-full flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
              data-index="${index}"
            >
              <img src="${account.avatar}" alt="${account.name}" class="w-10 h-10 rounded-full">
              <div class="text-left">
                <div class="font-medium text-gray-900">${account.name}</div>
                <div class="text-sm text-gray-600">${account.email}</div>
              </div>
            </button>
          `).join('')}
        </div>
        <div class="mt-6 pt-4 border-t border-gray-200">
          <button class="cancel-google-signin w-full text-center text-gray-600 hover:text-gray-900 transition-colors">
            Cancel
          </button>
        </div>
      `;
      
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
      
      // Add event listeners
      const accountOptions = modal.querySelectorAll('.google-account-option');
      accountOptions.forEach((option) => {
        option.addEventListener('click', (e) => {
          const index = parseInt((e.currentTarget as HTMLElement).dataset.index || '0');
          const selectedAccount = mockGoogleAccounts[index];
          document.body.removeChild(overlay);
          resolve(selectedAccount);
        });
      });
      
      const cancelButton = modal.querySelector('.cancel-google-signin');
      cancelButton?.addEventListener('click', () => {
        document.body.removeChild(overlay);
        resolve(null);
      });
      
      // Close on overlay click
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          document.body.removeChild(overlay);
          resolve(null);
        }
      });
    });
  };

  const signInWithGoogle = async () => {
    try {
      // Show Google account selector
      const selectedAccount = await showGoogleAccountSelector();
      
      if (!selectedAccount) {
        return { error: 'Google sign-in cancelled' };
      }

      // Create user data from selected Google account
      const [firstName, ...lastNameParts] = selectedAccount.name.split(' ');
      const lastName = lastNameParts.join(' ');
      
      const googleUserData = {
        email: selectedAccount.email,
        password: 'google-oauth-temp',
        first_name: firstName,
        middle_name: '',
        last_name: lastName,
        phone: '9999999999'
      };

      const { user: newUser, error } = await localDB.signUp(googleUserData);
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