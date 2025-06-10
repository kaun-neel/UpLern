// Google OAuth integration
declare global {
  interface Window {
    google: any;
    googleSignInCallback: (response: any) => void;
  }
}

interface GoogleUser {
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  sub: string;
}

interface GoogleAuthResponse {
  credential: string;
}

class GoogleAuthService {
  private clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'demo-client-id';
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    return new Promise((resolve, reject) => {
      const checkGoogleLoaded = () => {
        if (window.google?.accounts?.id) {
          try {
            window.google.accounts.id.initialize({
              client_id: this.clientId,
              callback: this.handleCredentialResponse.bind(this),
              auto_select: false,
              cancel_on_tap_outside: true,
            });
            this.isInitialized = true;
            resolve();
          } catch (error) {
            console.error('Failed to initialize Google Sign-In:', error);
            reject(error);
          }
        } else {
          setTimeout(checkGoogleLoaded, 100);
        }
      };
      checkGoogleLoaded();
    });
  }

  private handleCredentialResponse(response: GoogleAuthResponse): void {
    if (window.googleSignInCallback) {
      window.googleSignInCallback(response);
    }
  }

  private parseJWT(token: string): GoogleUser | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Failed to parse JWT:', error);
      return null;
    }
  }

  async signIn(): Promise<{ user: GoogleUser | null; error: string | null }> {
    try {
      await this.initialize();

      return new Promise((resolve) => {
        // Set up callback for credential response
        window.googleSignInCallback = (response: GoogleAuthResponse) => {
          const user = this.parseJWT(response.credential);
          if (user) {
            resolve({ user, error: null });
          } else {
            resolve({ user: null, error: 'Failed to parse Google user data' });
          }
        };

        // Check if we're in demo mode (no real client ID)
        if (this.clientId === 'demo-client-id') {
          // Show demo account selector
          this.showDemoAccountSelector().then((selectedAccount) => {
            if (selectedAccount) {
              resolve({ user: selectedAccount, error: null });
            } else {
              resolve({ user: null, error: 'Google sign-in cancelled' });
            }
          });
          return;
        }

        // Trigger Google Sign-In popup
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // Fallback to manual sign-in
            this.showManualSignIn().then((result) => {
              resolve(result);
            });
          }
        });
      });
    } catch (error) {
      return { user: null, error: 'Failed to initialize Google Sign-In' };
    }
  }

  private showManualSignIn(): Promise<{ user: GoogleUser | null; error: string | null }> {
    return new Promise((resolve) => {
      // Create a manual sign-in button
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      
      const modal = document.createElement('div');
      modal.className = 'bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4';
      modal.innerHTML = `
        <div class="text-center">
          <img src="https://www.google.com/favicon.ico" alt="Google" class="w-12 h-12 mx-auto mb-4">
          <h2 class="text-2xl font-semibold text-gray-900 mb-2">Sign in with Google</h2>
          <p class="text-gray-600 mb-6">Choose your Google account to continue</p>
          <div id="google-signin-button" class="mb-4"></div>
          <button class="cancel-signin w-full text-gray-600 hover:text-gray-900 transition-colors">
            Cancel
          </button>
        </div>
      `;
      
      overlay.appendChild(modal);
      document.body.appendChild(overlay);

      // Render Google Sign-In button
      if (window.google?.accounts?.id) {
        window.google.accounts.id.renderButton(
          modal.querySelector('#google-signin-button'),
          {
            theme: 'outline',
            size: 'large',
            width: 300,
            text: 'signin_with',
            shape: 'rectangular',
          }
        );
      }

      // Handle cancel
      const cancelButton = modal.querySelector('.cancel-signin');
      cancelButton?.addEventListener('click', () => {
        document.body.removeChild(overlay);
        resolve({ user: null, error: 'Google sign-in cancelled' });
      });

      // Close on overlay click
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          document.body.removeChild(overlay);
          resolve({ user: null, error: 'Google sign-in cancelled' });
        }
      });

      // Set up success callback
      const originalCallback = window.googleSignInCallback;
      window.googleSignInCallback = (response: GoogleAuthResponse) => {
        document.body.removeChild(overlay);
        const user = this.parseJWT(response.credential);
        if (user) {
          resolve({ user, error: null });
        } else {
          resolve({ user: null, error: 'Failed to parse Google user data' });
        }
        window.googleSignInCallback = originalCallback;
      };
    });
  }

  private showDemoAccountSelector(): Promise<GoogleUser | null> {
    // Demo accounts for development/testing
    const demoAccounts: GoogleUser[] = [
      {
        email: 'john.doe@gmail.com',
        name: 'John Doe',
        given_name: 'John',
        family_name: 'Doe',
        picture: 'https://randomuser.me/api/portraits/men/32.jpg',
        sub: 'demo-user-1'
      },
      {
        email: 'sarah.smith@gmail.com',
        name: 'Sarah Smith',
        given_name: 'Sarah',
        family_name: 'Smith',
        picture: 'https://randomuser.me/api/portraits/women/44.jpg',
        sub: 'demo-user-2'
      },
      {
        email: 'mike.johnson@gmail.com',
        name: 'Mike Johnson',
        given_name: 'Mike',
        family_name: 'Johnson',
        picture: 'https://randomuser.me/api/portraits/men/67.jpg',
        sub: 'demo-user-3'
      }
    ];

    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      
      const modal = document.createElement('div');
      modal.className = 'bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4';
      modal.innerHTML = `
        <div class="text-center mb-6">
          <img src="https://www.google.com/favicon.ico" alt="Google" class="w-8 h-8 mx-auto mb-3">
          <h2 class="text-xl font-semibold text-gray-900">Choose an account</h2>
          <p class="text-gray-600 text-sm">to continue to upLern</p>
        </div>
        <div class="space-y-3">
          ${demoAccounts.map((account, index) => `
            <button 
              class="google-account-option w-full flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-200 hover:border-blue-300 hover:shadow-md"
              data-index="${index}"
            >
              <img src="${account.picture}" alt="${account.name}" class="w-10 h-10 rounded-full">
              <div class="text-left flex-1">
                <div class="font-medium text-gray-900">${account.name}</div>
                <div class="text-sm text-gray-600">${account.email}</div>
              </div>
              <div class="w-2 h-2 bg-green-500 rounded-full opacity-0 transition-opacity duration-200"></div>
            </button>
          `).join('')}
        </div>
        <div class="mt-6 pt-4 border-t border-gray-200">
          <button class="cancel-google-signin w-full text-center text-gray-600 hover:text-gray-900 transition-colors py-2">
            Cancel
          </button>
        </div>
      `;
      
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
      
      // Add hover effects
      const accountOptions = modal.querySelectorAll('.google-account-option');
      accountOptions.forEach((option) => {
        option.addEventListener('mouseenter', () => {
          const indicator = option.querySelector('.bg-green-500');
          indicator?.classList.remove('opacity-0');
        });
        
        option.addEventListener('mouseleave', () => {
          const indicator = option.querySelector('.bg-green-500');
          indicator?.classList.add('opacity-0');
        });
        
        option.addEventListener('click', (e) => {
          const index = parseInt((e.currentTarget as HTMLElement).dataset.index || '0');
          const selectedAccount = demoAccounts[index];
          document.body.removeChild(overlay);
          resolve(selectedAccount);
        });
      });
      
      const cancelButton = modal.querySelector('.cancel-google-signin');
      cancelButton?.addEventListener('click', () => {
        document.body.removeChild(overlay);
        resolve(null);
      });
      
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          document.body.removeChild(overlay);
          resolve(null);
        }
      });
    });
  }
}

export const googleAuth = new GoogleAuthService();