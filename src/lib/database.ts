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

class LocalDatabase {
  private getStorageKey(table: string): string {
    return `uplern_${table}`;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private getTable<T>(tableName: string): T[] {
    const data = localStorage.getItem(this.getStorageKey(tableName));
    return data ? JSON.parse(data) : [];
  }

  private setTable<T>(tableName: string, data: T[]): void {
    localStorage.setItem(this.getStorageKey(tableName), JSON.stringify(data));
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
      
      // Check if user already exists
      const existingUser = users.find(user => user.email === userData.email);
      if (existingUser) {
        return { user: null, error: 'User already exists with this email' };
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
}

export const localDB = new LocalDatabase();