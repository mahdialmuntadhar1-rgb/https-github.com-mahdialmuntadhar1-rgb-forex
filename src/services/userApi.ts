import { UserAlert, NotificationItem } from '../types';
import { authService } from './authApi';

class UserDataService {
  private alerts: UserAlert[];
  private notifications: NotificationItem[];
  private savedAnalysisIds: Set<string>;

  constructor() {
    this.alerts = this.load('fx_user_alerts', [
      {
        id: 'alt-1',
        userId: 'usr-demo-01',
        type: 'PRICE',
        symbol: 'EUR/USD',
        condition: 'ABOVE',
        targetValue: 1.1700,
        note: 'Breakout confirmation above major H4 resistance',
        channels: { inApp: true, email: true, sms: false, whatsapp: true },
        isActive: true,
        createdAt: '2026-08-12 14:00'
      },
      {
        id: 'alt-2',
        userId: 'usr-demo-01',
        type: 'PRICE',
        symbol: 'XAU/USD',
        condition: 'ABOVE',
        targetValue: 3435.00,
        note: 'Gold all-time-high target expansion zone',
        channels: { inApp: true, email: true, sms: true, whatsapp: true },
        isActive: true,
        createdAt: '2026-08-11 09:30'
      },
      {
        id: 'alt-3',
        userId: 'usr-demo-01',
        type: 'ECONOMIC_EVENT',
        symbol: 'USD',
        condition: 'BEFORE_MINUTES',
        targetValue: 30,
        note: 'US Core CPI release reminder',
        channels: { inApp: true, email: true, sms: false, whatsapp: false },
        isActive: true,
        createdAt: '2026-08-13 08:00'
      }
    ]);

    this.notifications = this.load('fx_user_notifications', [
      {
        id: 'notif-1',
        title: 'Target 1 Reached: EUR/USD',
        message: 'EUR/USD entered the 1.1684 target buffer (+32 pips). Consider trailing stop loss to breakeven.',
        type: 'SIGNAL_ALERT',
        timestamp: '15 mins ago',
        read: false,
        symbol: 'EUR/USD',
        link: '/signals'
      },
      {
        id: 'notif-2',
        title: 'High-Impact Economic Release Ahead',
        message: 'US Core CPI YoY will be released in 45 minutes (12:30 UTC). High volatility expected.',
        type: 'ECONOMIC_ALERT',
        timestamp: '45 mins ago',
        read: false,
        link: '/economic-calendar'
      },
      {
        id: 'notif-3',
        title: 'New Macro Analysis Published',
        message: 'Karam Al-Rawi published: "Gold (XAU/USD) Analysis: Consolidation Ahead of $3,450".',
        type: 'NEWS_ALERT',
        timestamp: '2 hours ago',
        read: true,
        link: '/market-analysis'
      }
    ]);

    const savedAnalyses = this.load('fx_saved_analyses', ['analysis-1', 'analysis-2']);
    this.savedAnalysisIds = new Set(savedAnalyses);
  }

  private load<T>(key: string, def: T): T {
    try {
      const s = localStorage.getItem(key);
      return s ? JSON.parse(s) : def;
    } catch {
      return def;
    }
  }

  private save(key: string, val: any) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error(e);
    }
  }

  // Watchlist
  async getWatchlist(): Promise<string[]> {
    const user = authService.getUser();
    return user ? user.watchlist : ['EUR/USD', 'XAU/USD', 'GBP/USD', 'USD/JPY'];
  }

  async toggleWatchlist(symbol: string): Promise<boolean> {
    const user = authService.getUser();
    if (!user) return false;

    const list = [...user.watchlist];
    const exists = list.includes(symbol);
    const updated = exists ? list.filter(s => s !== symbol) : [...list, symbol];
    
    await authService.updateProfile({ watchlist: updated });
    return !exists;
  }

  // Alerts
  async getAlerts(): Promise<UserAlert[]> {
    return [...this.alerts];
  }

  async createAlert(alert: Omit<UserAlert, 'id' | 'createdAt' | 'isActive'>): Promise<UserAlert> {
    const newAlert: UserAlert = {
      ...alert,
      id: `alt-${Date.now()}`,
      isActive: true,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    this.alerts.unshift(newAlert);
    this.save('fx_user_alerts', this.alerts);
    return newAlert;
  }

  async toggleAlertStatus(id: string): Promise<boolean> {
    const a = this.alerts.find(x => x.id === id);
    if (!a) return false;
    a.isActive = !a.isActive;
    this.save('fx_user_alerts', this.alerts);
    return a.isActive;
  }

  async deleteAlert(id: string): Promise<boolean> {
    this.alerts = this.alerts.filter(x => x.id !== id);
    this.save('fx_user_alerts', this.alerts);
    return true;
  }

  // Notifications
  async getNotifications(): Promise<NotificationItem[]> {
    return [...this.notifications];
  }

  async markNotificationRead(id: string): Promise<void> {
    const n = this.notifications.find(x => x.id === id);
    if (n) {
      n.read = true;
      this.save('fx_user_notifications', this.notifications);
    }
  }

  async markAllNotificationsRead(): Promise<void> {
    this.notifications.forEach(n => { n.read = true; });
    this.save('fx_user_notifications', this.notifications);
  }

  // Saved Analyses
  async getSavedAnalyses(): Promise<string[]> {
    return Array.from(this.savedAnalysisIds);
  }

  async getBookmarks(): Promise<string[]> {
    return this.getSavedAnalyses();
  }

  async toggleSaveAnalysis(id: string): Promise<boolean> {
    const exists = this.savedAnalysisIds.has(id);
    if (exists) {
      this.savedAnalysisIds.delete(id);
    } else {
      this.savedAnalysisIds.add(id);
    }
    this.save('fx_saved_analyses', Array.from(this.savedAnalysisIds));
    return !exists;
  }

  // Leads
  async submitLead(lead: {
    name?: string;
    fullName?: string;
    email: string;
    phone?: string;
    preferredChannel?: string;
    serviceInterest?: string;
    subject?: string;
    message?: string;
  }): Promise<any> {
    const leads = this.load('fx_leads', []);
    const newLead = {
      id: `lead-${Date.now()}`,
      name: lead.name || lead.fullName || 'Trader Lead',
      fullName: lead.fullName || lead.name || 'Trader Lead',
      email: lead.email,
      phone: lead.phone || '',
      preferredChannel: lead.preferredChannel || 'WhatsApp',
      serviceInterest: lead.serviceInterest || lead.subject || '1-on-1 Mentorship',
      subject: lead.subject || lead.serviceInterest || 'General Inquiry',
      message: lead.message || '',
      status: 'NEW',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    leads.unshift(newLead);
    this.save('fx_leads', leads);
    return newLead;
  }

  async getLeads(): Promise<any[]> {
    return this.load('fx_leads', [
      {
        id: 'lead-01',
        name: 'Tariq Mansoor',
        fullName: 'Tariq Mansoor',
        email: 'tariq.m@investments.ae',
        phone: '+971 50 123 4567',
        serviceInterest: 'Institutional FX Hedging Consultation',
        subject: 'Institutional FX Hedging Consultation',
        preferredChannel: 'WhatsApp',
        message: 'Interested in private consultation regarding corporate EUR/USD currency risk.',
        status: 'NEW',
        createdAt: '2026-08-13 09:12'
      },
      {
        id: 'lead-02',
        name: 'Diyar Hawrami',
        fullName: 'Diyar Hawrami',
        email: 'diyar@kurdmail.com',
        phone: '+964 750 443 2190',
        serviceInterest: '1-on-1 Mentorship Program',
        subject: 'Mentorship Program Application',
        preferredChannel: 'Telegram',
        message: 'Looking to join the 1-on-1 Gold and Forex mentorship for the upcoming quarter.',
        status: 'IN_PROGRESS',
        createdAt: '2026-08-12 15:40'
      }
    ]);
  }
}

export const userService = new UserDataService();
