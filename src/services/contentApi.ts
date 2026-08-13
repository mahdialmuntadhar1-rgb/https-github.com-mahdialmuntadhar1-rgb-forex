import { 
  MarketAnalysis, 
  SignalSetup, 
  EconomicEvent, 
  NewsArticle, 
  VideoItem, 
  Course, 
  ServiceItem, 
  ContactLead,
  SiteContentConfig,
  TraderProfile
} from '../types';
import { 
  initialAnalyses, 
  initialSignals, 
  initialEconomicEvents, 
  initialNewsArticles, 
  initialVideos, 
  initialCourses, 
  initialServices, 
  initialSiteContent,
  initialTraderProfile
} from '../data/mockData';

class ContentService {
  private analyses: MarketAnalysis[];
  private signals: SignalSetup[];
  private events: EconomicEvent[];
  private news: NewsArticle[];
  private videos: VideoItem[];
  private courses: Course[];
  private services: ServiceItem[];
  private leads: ContactLead[];
  private siteContent: SiteContentConfig;
  private traderProfile: TraderProfile;

  constructor() {
    this.analyses = this.loadFromStorage('fx_analyses', initialAnalyses);
    this.signals = this.loadFromStorage('fx_signals', initialSignals);
    this.events = this.loadFromStorage('fx_events', initialEconomicEvents);
    this.news = this.loadFromStorage('fx_news', initialNewsArticles);
    this.videos = this.loadFromStorage('fx_videos', initialVideos);
    this.courses = this.loadFromStorage('fx_courses', initialCourses);
    this.services = this.loadFromStorage('fx_services', initialServices);
    this.leads = this.loadFromStorage('fx_leads', [
      {
        id: 'lead-01',
        fullName: 'Tariq Mansoor',
        email: 'tariq.m@investments.ae',
        phone: '+971 50 123 4567',
        subject: 'Institutional FX Hedging Consultation',
        message: 'Interested in private consultation regarding corporate EUR/USD currency risk.',
        preferredMethod: 'WhatsApp',
        status: 'NEW',
        createdAt: '2026-08-13 09:12'
      },
      {
        id: 'lead-02',
        fullName: 'Diyar Hawrami',
        email: 'diyar@kurdmail.com',
        phone: '+964 750 443 2190',
        subject: 'Mentorship Program Application',
        message: 'Looking to join the 1-on-1 Gold and Forex mentorship for the upcoming quarter.',
        preferredMethod: 'Telegram',
        status: 'IN_PROGRESS',
        createdAt: '2026-08-12 15:40'
      }
    ]);
    this.siteContent = this.loadFromStorage('fx_site_content', initialSiteContent);
    this.traderProfile = this.loadFromStorage('fx_trader_profile', initialTraderProfile);
  }

  private loadFromStorage<T>(key: string, defaultVal: T): T {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultVal;
    } catch {
      return defaultVal;
    }
  }

  private saveToStorage(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Failed to save ${key} to storage`, err);
    }
  }

  // --- Analyses ---
  async getAnalyses(): Promise<MarketAnalysis[]> {
    return [...this.analyses];
  }

  async getAnalysisByIdOrSlug(idOrSlug: string): Promise<MarketAnalysis | null> {
    const item = this.analyses.find(a => a.id === idOrSlug || a.slug === idOrSlug);
    return item ? { ...item } : null;
  }

  async getAnalysisBySlug(slug: string): Promise<MarketAnalysis | null> {
    return this.getAnalysisByIdOrSlug(slug);
  }

  async createAnalysis(analysis: any): Promise<MarketAnalysis> {
    return this.saveAnalysis(analysis);
  }

  async saveAnalysis(analysis: Partial<MarketAnalysis> & { id?: string }): Promise<MarketAnalysis> {
    if (analysis.id) {
      const index = this.analyses.findIndex(a => a.id === analysis.id);
      if (index !== -1) {
        this.analyses[index] = { ...this.analyses[index], ...analysis } as MarketAnalysis;
        this.saveToStorage('fx_analyses', this.analyses);
        return this.analyses[index];
      }
    }
    const newAnalysis: MarketAnalysis = {
      id: `analysis-${Date.now()}`,
      slug: (analysis.title || 'market-analysis').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: analysis.title || 'New Market Analysis',
      subtitle: analysis.subtitle || '',
      symbol: analysis.symbol || 'EUR/USD',
      category: analysis.category || 'Forex Major',
      bias: analysis.bias || 'BULLISH',
      timeframe: analysis.timeframe || '4H',
      keyLevels: analysis.keyLevels || { support1: 1.1600, resistance1: 1.1700, pivot: 1.1650 },
      summary: analysis.summary || '',
      content: analysis.content || '',
      chartImageUrl: analysis.chartImageUrl || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
      author: {
        name: this.traderProfile.name,
        title: this.traderProfile.title,
        avatar: this.traderProfile.avatarUrl
      },
      publishedAt: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
      readTime: '4 min read',
      tags: analysis.tags || ['FX', 'Macro'],
      views: 0,
      likes: 0,
      isFeatured: analysis.isFeatured || false,
      status: analysis.status || 'published'
    };
    this.analyses.unshift(newAnalysis);
    this.saveToStorage('fx_analyses', this.analyses);
    return newAnalysis;
  }

  async deleteAnalysis(id: string): Promise<boolean> {
    this.analyses = this.analyses.filter(a => a.id !== id);
    this.saveToStorage('fx_analyses', this.analyses);
    return true;
  }

  // --- Signals / Setups ---
  async getSignals(): Promise<SignalSetup[]> {
    return [...this.signals];
  }

  async getSignalById(id: string): Promise<SignalSetup | null> {
    const item = this.signals.find(s => s.id === id);
    return item ? { ...item } : null;
  }

  async createSignal(signal: any): Promise<SignalSetup> {
    return this.saveSignal(signal);
  }

  async saveSignal(signal: Partial<SignalSetup> & { id?: string }): Promise<SignalSetup> {
    if (signal.id) {
      const idx = this.signals.findIndex(s => s.id === signal.id);
      if (idx !== -1) {
        this.signals[idx] = { ...this.signals[idx], ...signal } as SignalSetup;
        this.saveToStorage('fx_signals', this.signals);
        return this.signals[idx];
      }
    }
    const newSignal: SignalSetup = {
      id: `sig-${Date.now().toString().slice(-4)}`,
      symbol: signal.symbol || 'EUR/USD',
      type: signal.type || 'BUY',
      status: signal.status || 'ACTIVE',
      confidenceScore: signal.confidenceScore || 75,
      entryZone: signal.entryZone || [1.1650, 1.1660],
      target1: signal.target1 || 1.1710,
      target2: signal.target2,
      target3: signal.target3,
      stopLoss: signal.stopLoss || 1.1600,
      riskRewardRatio: signal.riskRewardRatio || '1:2.5',
      riskLevel: signal.riskLevel || 'Medium',
      timeframe: signal.timeframe || '4H',
      reasoning: signal.reasoning || '',
      publishedAt: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
      author: this.traderProfile.name,
      updates: []
    };
    this.signals.unshift(newSignal);
    this.saveToStorage('fx_signals', this.signals);
    return newSignal;
  }

  async updateSignalStatus(id: string, status: any, noteOrPips?: string | number): Promise<boolean> {
    const item = this.signals.find(s => s.id === id);
    if (!item) return false;
    item.status = status;
    if (typeof noteOrPips === 'number') {
      item.resultPips = noteOrPips;
    } else if (typeof noteOrPips === 'string') {
      item.updates = item.updates || [];
      item.updates.push({
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
        note: noteOrPips,
        statusChange: status
      });
    }
    if (status === 'COMPLETED' || status === 'CLOSED_PROFIT' || status === 'CLOSED_LOSS' || status === 'INVALIDATED') {
      item.closedAt = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
    }
    this.saveToStorage('fx_signals', this.signals);
    return true;
  }

  // --- Economic Events ---
  async getEconomicEvents(): Promise<EconomicEvent[]> {
    return [...this.events];
  }

  async saveEconomicEvent(event: Partial<EconomicEvent>): Promise<EconomicEvent> {
    if (event.id) {
      const idx = this.events.findIndex(e => e.id === event.id);
      if (idx !== -1) {
        this.events[idx] = { ...this.events[idx], ...event } as EconomicEvent;
        this.saveToStorage('fx_events', this.events);
        return this.events[idx];
      }
    }
    const newEvent: EconomicEvent = {
      id: `eco-${Date.now()}`,
      time: event.time || '12:00 UTC',
      date: event.date || new Date().toISOString().split('T')[0],
      currency: event.currency || 'USD',
      event: event.event || 'Macro Data Release',
      impact: event.impact || 'MEDIUM',
      forecast: event.forecast || '-',
      previous: event.previous || '-',
      category: event.category || 'Inflation',
      description: event.description || '',
      whyItMatters: event.whyItMatters || '',
      affectedCurrencies: event.affectedCurrencies || ['USD'],
      relatedSymbols: event.relatedSymbols || ['EUR/USD', 'DXY']
    };
    this.events.push(newEvent);
    this.saveToStorage('fx_events', this.events);
    return newEvent;
  }

  // --- News Articles ---
  async getNews(): Promise<NewsArticle[]> {
    return [...this.news];
  }

  async getNewsArticles(): Promise<NewsArticle[]> {
    return this.getNews();
  }

  async getNewsBySlug(slug: string): Promise<NewsArticle | null> {
    const item = this.news.find(n => n.slug === slug || n.id === slug);
    return item ? { ...item } : null;
  }

  async saveNews(article: Partial<NewsArticle>): Promise<NewsArticle> {
    if (article.id) {
      const idx = this.news.findIndex(n => n.id === article.id);
      if (idx !== -1) {
        this.news[idx] = { ...this.news[idx], ...article } as NewsArticle;
        this.saveToStorage('fx_news', this.news);
        return this.news[idx];
      }
    }
    const newNews: NewsArticle = {
      id: `news-${Date.now()}`,
      slug: (article.title || 'market-news').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: article.title || 'Market Update',
      category: article.category || 'Forex',
      summary: article.summary || '',
      content: article.content || '',
      image: article.image || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
      publishedAt: 'Just now',
      source: article.source || 'FX Intelligence Wire',
      author: this.traderProfile.name,
      relatedSymbols: article.relatedSymbols || ['EUR/USD'],
      readTime: '3 min read',
      views: 10
    };
    this.news.unshift(newNews);
    this.saveToStorage('fx_news', this.news);
    return newNews;
  }

  // --- Videos ---
  async getVideos(): Promise<VideoItem[]> {
    return [...this.videos];
  }

  async saveVideo(video: Partial<VideoItem>): Promise<VideoItem> {
    if (video.id) {
      const idx = this.videos.findIndex(v => v.id === video.id);
      if (idx !== -1) {
        this.videos[idx] = { ...this.videos[idx], ...video } as VideoItem;
        this.saveToStorage('fx_videos', this.videos);
        return this.videos[idx];
      }
    }
    const newVideo: VideoItem = {
      id: `vid-${Date.now()}`,
      title: video.title || 'Video Analysis',
      description: video.description || '',
      thumbnail: video.thumbnail || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
      duration: video.duration || '15:00',
      category: video.category || 'Market Analysis',
      youtubeId: video.youtubeId,
      publishedAt: 'Today',
      author: this.traderProfile.name,
      views: 0,
      relatedSymbols: video.relatedSymbols || []
    };
    this.videos.unshift(newVideo);
    this.saveToStorage('fx_videos', this.videos);
    return newVideo;
  }

  // --- Courses & Education ---
  async getCourses(): Promise<Course[]> {
    return [...this.courses];
  }

  // --- Services ---
  async getServices(): Promise<ServiceItem[]> {
    return [...this.services];
  }

  // --- Leads ---
  async getLeads(): Promise<ContactLead[]> {
    return [...this.leads];
  }

  async createLead(leadData: Omit<ContactLead, 'id' | 'status' | 'createdAt'>): Promise<ContactLead> {
    const newLead: ContactLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: 'NEW',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    this.leads.unshift(newLead);
    this.saveToStorage('fx_leads', this.leads);
    return newLead;
  }

  async updateLeadStatus(id: string, status: ContactLead['status'], notes?: string): Promise<boolean> {
    const item = this.leads.find(l => l.id === id);
    if (!item) return false;
    item.status = status;
    if (notes) item.notes = notes;
    this.saveToStorage('fx_leads', this.leads);
    return true;
  }

  // --- Site Content & Profile ---
  async getSiteContent(): Promise<SiteContentConfig> {
    return { ...this.siteContent };
  }

  async updateSiteContent(updates: Partial<SiteContentConfig>): Promise<SiteContentConfig> {
    this.siteContent = { ...this.siteContent, ...updates };
    this.saveToStorage('fx_site_content', this.siteContent);
    return this.siteContent;
  }

  async getTraderProfile(): Promise<TraderProfile> {
    return { ...this.traderProfile };
  }

  async updateTraderProfile(updates: Partial<TraderProfile>): Promise<TraderProfile> {
    this.traderProfile = { ...this.traderProfile, ...updates };
    this.saveToStorage('fx_trader_profile', this.traderProfile);
    return this.traderProfile;
  }
}

export const contentService = new ContentService();
