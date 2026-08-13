import { User, UserRole, Language } from '../types';

interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  private currentUser: User | null = null;
  private listeners: Set<(user: User | null) => void> = new Set();

  constructor() {
    const saved = localStorage.getItem('fx_user_session');
    if (saved) {
      try {
        this.currentUser = JSON.parse(saved);
      } catch {
        this.currentUser = null;
      }
    } else {
      // Default demo logged-in user with role 'user' (can switch to admin anytime)
      this.currentUser = {
        id: 'usr-demo-01',
        name: 'Sardar Bakir',
        email: 'sardar.trader@gmail.com',
        phone: '+964 750 123 4567',
        country: 'Iraq / Kurdistan',
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        preferredLanguage: 'en',
        createdAt: '2026-08-01',
        watchlist: ['EUR/USD', 'XAU/USD', 'GBP/USD', 'USD/JPY'],
        alertsCount: 3
      };
      this.saveSession();
    }
  }

  private saveSession() {
    if (this.currentUser) {
      localStorage.setItem('fx_user_session', JSON.stringify(this.currentUser));
    } else {
      localStorage.removeItem('fx_user_session');
    }
    this.listeners.forEach(cb => cb(this.currentUser));
  }

  getUser(): User | null {
    return this.currentUser;
  }

  subscribe(callback: (user: User | null) => void): () => void {
    this.listeners.add(callback);
    callback(this.currentUser);
    return () => {
      this.listeners.delete(callback);
    };
  }

  async login(emailOrPhone: string, _password?: string): Promise<AuthResponse> {
    // Determine role based on email hint for easy testing
    const isAdmin = emailOrPhone.toLowerCase().includes('admin');
    const user: User = {
      id: `usr-${Date.now()}`,
      name: isAdmin ? 'Karam Al-Rawi (Admin)' : (emailOrPhone.split('@')[0] || 'FX Trader'),
      email: emailOrPhone.includes('@') ? emailOrPhone : 'trader@fxintelligence.com',
      phone: emailOrPhone.includes('@') ? '+44 7700 900077' : emailOrPhone,
      country: 'United Kingdom',
      role: isAdmin ? 'admin' : 'user',
      avatar: isAdmin 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      preferredLanguage: 'en',
      createdAt: '2026-08-13',
      watchlist: ['EUR/USD', 'XAU/USD', 'GBP/USD', 'USD/JPY'],
      alertsCount: 2
    };

    this.currentUser = user;
    this.saveSession();
    return { user, token: 'mock-jwt-token-fx-7788' };
  }

  async register(data: {
    name: string;
    email: string;
    phone?: string;
    country?: string;
    preferredLanguage?: Language;
  }): Promise<AuthResponse> {
    const user: User = {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      country: data.country || 'Global',
      role: 'user',
      preferredLanguage: data.preferredLanguage || 'en',
      createdAt: new Date().toISOString().split('T')[0],
      watchlist: ['EUR/USD', 'XAU/USD']
    };

    this.currentUser = user;
    this.saveSession();
    return { user, token: 'mock-jwt-token-fx-7788' };
  }

  async switchRole(role: UserRole) {
    if (this.currentUser) {
      this.currentUser = { ...this.currentUser, role };
    } else {
      this.currentUser = {
        id: 'usr-switch',
        name: role === 'admin' ? 'Karam Al-Rawi (Admin)' : 'Registered Trader',
        email: role === 'admin' ? 'admin@fxintelligence.com' : 'user@fxintelligence.com',
        role,
        preferredLanguage: 'en',
        createdAt: '2026-08-13',
        watchlist: ['EUR/USD', 'XAU/USD']
      };
    }
    this.saveSession();
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    this.saveSession();
  }

  async updateProfile(updates: Partial<User>): Promise<User | null> {
    if (!this.currentUser) return null;
    this.currentUser = { ...this.currentUser, ...updates };
    this.saveSession();
    return this.currentUser;
  }
}

export const authService = new AuthService();
