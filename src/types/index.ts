export type Language = 'en' | 'ar' | 'ckb';
export type Direction = 'ltr' | 'rtl';

export type UserRole = 'guest' | 'user' | 'vip' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  role: UserRole;
  avatar?: string;
  preferredLanguage: Language;
  createdAt: string;
  watchlist: string[]; // symbol array
  alertsCount?: number;
}

export interface TraderProfile {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  experienceYears: number;
  specialization: string[];
  principles: {
    title: string;
    description: string;
    icon?: string;
  }[];
  certifications: string[];
  socialLinks: {
    platform: 'telegram' | 'whatsapp' | 'youtube' | 'x' | 'instagram' | 'facebook';
    url: string;
    handle: string;
  }[];
  avatarUrl: string;
  bannerUrl: string;
}

export type AssetCategory = 'forex_major' | 'forex_minor' | 'metals' | 'indices' | 'crypto';
export type MarketStatus = 'OPEN' | 'CLOSED' | 'PRE_MARKET' | 'AFTER_HOURS';

export interface Asset {
  symbol: string; // e.g. "EUR/USD"
  id: string; // e.g. "EUR-USD"
  name: string;
  baseCurrency: string;
  quoteCurrency: string;
  category: AssetCategory;
  description: string;
  digits: number; // decimal places (e.g. 5 for EUR/USD, 3 for USD/JPY, 2 for Gold)
  pipValue: number;
  lotSize: number;
}

export interface SparklinePoint {
  time: string;
  value: number;
}

export interface Quote {
  symbol: string;
  id: string;
  price: number;
  previousClose: number;
  bid: number;
  ask: number;
  spread: number;
  change24h: number;
  change24hPercent: number;
  high24h: number;
  low24h: number;
  volume24h: string;
  status: MarketStatus;
  lastUpdated: string;
  isDelayed: boolean;
  sparkline: number[];
  historical?: {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }[];
}

export interface MarketSession {
  name: 'Sydney' | 'Tokyo' | 'London' | 'New York';
  city: string;
  country: string;
  openUtc: number; // e.g. 21 (for Sydney)
  closeUtc: number; // e.g. 6
  isOpen: boolean;
  progressPercent: number;
  localTime: string;
  isOverlap?: boolean;
}

export interface CurrencyStrength {
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CHF' | 'AUD' | 'CAD' | 'NZD';
  score: number; // 0 to 100
  momentum: 'increasing' | 'decreasing' | 'stable';
  change24h: number;
}

export type MarketBias = 'BULLISH' | 'BEARISH' | 'NEUTRAL';

export interface KeyLevels {
  support1: number;
  support2?: number;
  resistance1: number;
  resistance2?: number;
  pivot: number;
}

export interface TechnicalIndicators {
  trend: 'Bullish' | 'Bearish' | 'Neutral';
  rsi: {
    value: number;
    status: 'Overbought' | 'Oversold' | 'Neutral';
  };
  macd: {
    value: number;
    signal: number;
    histogram: number;
    status: 'Bullish' | 'Bearish' | 'Neutral';
  };
  ema50: {
    value: number;
    status: 'Bullish' | 'Bearish';
  };
  ema200: {
    value: number;
    status: 'Bullish' | 'Bearish';
  };
  atr: number;
  volatility: 'Low' | 'Medium' | 'High';
}

export interface FundamentalFactors {
  baseCurrencyFactors: {
    institution: string; // e.g. "ECB"
    interestRate: string;
    inflation: string;
    gdpGrowth: string;
    employment: string;
    stance: string; // e.g. "Hawkish / Neutral"
  };
  quoteCurrencyFactors: {
    institution: string; // e.g. "Federal Reserve"
    interestRate: string;
    inflation: string;
    gdpGrowth: string;
    employment: string;
    stance: string;
  };
  marketContext: string;
}

export interface MarketAnalysis {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  symbol: string;
  category: string;
  bias: MarketBias;
  timeframe: '15M' | '1H' | '4H' | '1D' | '1W';
  keyLevels: KeyLevels;
  summary: string;
  content: string;
  chartImageUrl?: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  tags: string[];
  views: number;
  likes: number;
  isFeatured?: boolean;
  status: 'published' | 'draft' | 'archived';
}

export type SignalType = 'BUY' | 'SELL';
export type SignalStatus = 'ACTIVE' | 'COMPLETED' | 'INVALIDATED' | 'ARCHIVED';
export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface SignalSetup {
  id: string;
  symbol: string;
  type: SignalType;
  status: SignalStatus;
  confidenceScore: number; // 0 - 100
  entryZone: [number, number]; // e.g. [1.1650, 1.1660]
  target1: number;
  target2?: number;
  target3?: number;
  stopLoss: number;
  riskRewardRatio: string; // e.g. "1:2.8"
  riskLevel: RiskLevel;
  timeframe: string;
  reasoning: string;
  chartUrl?: string;
  publishedAt: string;
  closedAt?: string;
  resultPips?: number;
  author: string;
  updates?: {
    timestamp: string;
    note: string;
    statusChange?: SignalStatus;
  }[];
}

export type ImpactLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface EconomicEvent {
  id: string;
  time: string; // e.g. "12:30 UTC"
  date: string; // "2026-08-14"
  currency: string; // "USD", "EUR", etc.
  event: string;
  impact: ImpactLevel;
  actual?: string;
  forecast: string;
  previous: string;
  category: 'Employment' | 'Inflation' | 'Central Bank' | 'GDP' | 'Trade' | 'Consumer';
  description: string;
  whyItMatters: string;
  affectedCurrencies: string[];
  relatedSymbols: string[];
  historicalValues?: {
    date: string;
    actual: string;
    forecast: string;
    previous: string;
  }[];
  traderCommentary?: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Forex' | 'Gold' | 'Central Banks' | 'Economy' | 'Global Markets';
  summary: string;
  content: string;
  image: string;
  publishedAt: string;
  source: string;
  author: string;
  relatedSymbols: string[];
  readTime: string;
  views: number;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string; // "14:25"
  category: 'Market Analysis' | 'Education' | 'Forex' | 'Gold' | 'Trading Psychology' | 'Weekly Outlook';
  youtubeId?: string;
  videoUrl?: string;
  publishedAt: string;
  author: string;
  views: number;
  relatedSymbols?: string[];
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  keyTakeaways: string[];
  order: number;
  completed?: boolean;
}

export interface Course {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  duration: string;
  lessonsCount: number;
  icon: string;
  lessons: CourseLesson[];
  color: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  availability: 'Available' | 'Limited Slots' | 'Waitlist';
  badge?: string;
  ctaText: string;
}

export type LeadContactMethod = 'WhatsApp' | 'Telegram' | 'Email' | 'Phone';
export type LeadStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'ARCHIVED';

export interface ContactLead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredMethod: LeadContactMethod;
  status: LeadStatus;
  createdAt: string;
  notes?: string;
}

export type AlertType = 'PRICE' | 'ECONOMIC_EVENT' | 'MARKET_SETUP' | 'NEWS';
export type PriceAlert = UserAlert;
export type EventImpact = ImpactLevel;
export type LeadInquiry = ContactLead;

export interface UserAlert {
  id: string;
  userId: string;
  type: AlertType;
  symbol?: string;
  condition?: 'ABOVE' | 'BELOW' | 'BEFORE_MINUTES';
  targetValue?: number | string;
  note: string;
  channels: {
    inApp: boolean;
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
  };
  isActive: boolean;
  createdAt: string;
  triggeredAt?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'PRICE_ALERT' | 'SIGNAL_ALERT' | 'ECONOMIC_ALERT' | 'NEWS_ALERT' | 'SYSTEM';
  timestamp: string;
  read: boolean;
  link?: string;
  symbol?: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: string;
  uploadedAt: string;
  dimensions?: string;
}

export interface SiteContentConfig {
  brandName: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  traderName: string;
  traderTitle: string;
  traderBio: string;
  whatsappNumber: string;
  telegramHandle: string;
  emailAddress: string;
  disclaimerText: string;
}
