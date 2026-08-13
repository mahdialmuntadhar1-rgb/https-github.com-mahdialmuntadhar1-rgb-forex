import { 
  Asset, 
  Quote, 
  TraderProfile, 
  MarketAnalysis, 
  SignalSetup, 
  EconomicEvent, 
  NewsArticle, 
  VideoItem, 
  Course, 
  ServiceItem, 
  CurrencyStrength, 
  MarketSession,
  SiteContentConfig
} from '../types';

export const initialTraderProfile: TraderProfile = {
  name: 'Karam Al-Rawi',
  title: 'Head Analyst & Founder, Profit Point',
  subtitle: 'Chartered Market Technician (CMT) & Institutional Market Strategist',
  bio: 'With over 12 years of hands-on institutional FX & commodities trading experience, Karam founded Profit Point to bring transparent order flow mechanics, central bank monetary policy research, and disciplined risk frameworks to traders globally.',
  experienceYears: 12,
  specialization: [
    'Institutional Order Flow',
    'Macro Central Bank Policy (Fed, ECB, BOE, BOJ)',
    'Precious Metals (XAU/USD - Gold)',
    'Systematic Risk & Capital Preservation'
  ],
  principles: [
    {
      title: 'Capital Preservation Above Speculation',
      description: 'The first rule of survival is defending downside risk. Profit is simply a mathematical byproduct of systematic risk management.',
      icon: 'ShieldCheck'
    },
    {
      title: 'Macro Context Drives Technical Levels',
      description: 'Technical chart patterns only hold value when aligned with institutional liquidity and central bank macroeconomic reality.',
      icon: 'TrendingUp'
    },
    {
      title: 'Zero Ego & Strict Invalidation Rules',
      description: 'Every trade is a probabilistic hypothesis with a predetermined invalidation level. When wrong, cut immediately without hesitation.',
      icon: 'Target'
    },
    {
      title: 'Selective Execution & High Patience',
      description: 'High-frequency overtrading destroys edge. We trade only asymmetric risk-reward setups during peak market session overlaps.',
      icon: 'Clock'
    }
  ],
  certifications: [
    'Chartered Market Technician (CMT Level III)',
    'Certified Financial Risk Specialist',
    'Macroeconomic Policy & Liquidity Analysis (London)'
  ],
  socialLinks: [
    { platform: 'telegram', url: 'https://t.me/profitpoint_official', handle: '@profitpoint_official' },
    { platform: 'whatsapp', url: 'https://wa.me/447700900077', handle: '+44 7700 900077' },
    { platform: 'youtube', url: 'https://youtube.com/@profitpoint_fx', handle: 'Profit Point Market Intelligence' },
    { platform: 'x', url: 'https://x.com/profitpoint_fx', handle: '@profitpoint_fx' },
    { platform: 'instagram', url: 'https://instagram.com/profitpoint_fx', handle: '@profitpoint_fx' }
  ],
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  bannerUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80'
};

export const initialAssets: Asset[] = [
  {
    symbol: 'EUR/USD',
    id: 'EUR-USD',
    name: 'Euro / US Dollar',
    baseCurrency: 'EUR',
    quoteCurrency: 'USD',
    category: 'forex_major',
    description: 'The most traded currency pair globally, reflecting the economic relationship between the Eurozone and the United States.',
    digits: 5,
    pipValue: 10,
    lotSize: 100000
  },
  {
    symbol: 'GBP/USD',
    id: 'GBP-USD',
    name: 'British Pound / US Dollar',
    baseCurrency: 'GBP',
    quoteCurrency: 'USD',
    category: 'forex_major',
    description: 'Known as "Cable", representing UK economic fundamentals versus the US Dollar with high intraday liquidity.',
    digits: 5,
    pipValue: 10,
    lotSize: 100000
  },
  {
    symbol: 'USD/JPY',
    id: 'USD-JPY',
    name: 'US Dollar / Japanese Yen',
    baseCurrency: 'USD',
    quoteCurrency: 'JPY',
    category: 'forex_major',
    description: 'A major barometer of global market risk sentiment, US Treasury yields, and Bank of Japan yield curve control.',
    digits: 3,
    pipValue: 6.6,
    lotSize: 100000
  },
  {
    symbol: 'USD/CHF',
    id: 'USD-CHF',
    name: 'US Dollar / Swiss Franc',
    baseCurrency: 'USD',
    quoteCurrency: 'CHF',
    category: 'forex_major',
    description: 'Key safe-haven currency pairing deeply affected by Swiss National Bank policy and European macro stability.',
    digits: 5,
    pipValue: 11.2,
    lotSize: 100000
  },
  {
    symbol: 'AUD/USD',
    id: 'AUD-USD',
    name: 'Australian Dollar / US Dollar',
    baseCurrency: 'AUD',
    quoteCurrency: 'USD',
    category: 'forex_major',
    description: 'High-beta commodity currency strongly correlated with global industrial growth, raw materials, and Asia trade.',
    digits: 5,
    pipValue: 10,
    lotSize: 100000
  },
  {
    symbol: 'USD/CAD',
    id: 'USD-CAD',
    name: 'US Dollar / Canadian Dollar',
    baseCurrency: 'USD',
    quoteCurrency: 'CAD',
    category: 'forex_major',
    description: 'Known as the "Loonie", heavily influenced by crude oil prices, Bank of Canada rates, and North American trade flow.',
    digits: 5,
    pipValue: 7.4,
    lotSize: 100000
  },
  {
    symbol: 'NZD/USD',
    id: 'NZD-USD',
    name: 'New Zealand Dollar / US Dollar',
    baseCurrency: 'NZD',
    quoteCurrency: 'USD',
    category: 'forex_major',
    description: 'Known as the "Kiwi", reflective of dairy export demand, RBNZ interest rate expectations and risk appetite.',
    digits: 5,
    pipValue: 10,
    lotSize: 100000
  },
  {
    symbol: 'XAU/USD',
    id: 'XAU-USD',
    name: 'Gold / US Dollar',
    baseCurrency: 'XAU',
    quoteCurrency: 'USD',
    category: 'metals',
    description: 'Spot Gold per troy ounce. Premier global safe haven, inflation hedge, and central bank reserve asset.',
    digits: 2,
    pipValue: 1,
    lotSize: 100
  },
  {
    symbol: 'DXY',
    id: 'DXY',
    name: 'US Dollar Index',
    baseCurrency: 'USD',
    quoteCurrency: 'BASKET',
    category: 'indices',
    description: 'Geometric weighted index measuring the USD against a basket of 6 major foreign currencies (EUR, JPY, GBP, CAD, SEK, CHF).',
    digits: 2,
    pipValue: 1,
    lotSize: 1000
  },
  {
    symbol: 'EUR/GBP',
    id: 'EUR-GBP',
    name: 'Euro / British Pound',
    baseCurrency: 'EUR',
    quoteCurrency: 'GBP',
    category: 'forex_minor',
    description: 'The major European cross rate, trading policy divergence between the ECB and the Bank of England.',
    digits: 5,
    pipValue: 12.8,
    lotSize: 100000
  },
  {
    symbol: 'EUR/JPY',
    id: 'EUR-JPY',
    name: 'Euro / Japanese Yen',
    baseCurrency: 'EUR',
    quoteCurrency: 'JPY',
    category: 'forex_minor',
    description: 'High volatility cross sensitive to European equity flows and Yen carry trade dynamics.',
    digits: 3,
    pipValue: 6.6,
    lotSize: 100000
  },
  {
    symbol: 'GBP/JPY',
    id: 'GBP-JPY',
    name: 'British Pound / Japanese Yen',
    baseCurrency: 'GBP',
    quoteCurrency: 'JPY',
    category: 'forex_minor',
    description: 'Known as "The Beast" or "Dragon" due to substantial daily pip ranges and rapid momentum swings.',
    digits: 3,
    pipValue: 6.6,
    lotSize: 100000
  }
];

export const initialQuotes: Record<string, Quote> = {
  'EUR-USD': {
    symbol: 'EUR/USD',
    id: 'EUR-USD',
    price: 1.1684,
    previousClose: 1.1635,
    bid: 1.16835,
    ask: 1.16845,
    spread: 0.1,
    change24h: 0.0049,
    change24hPercent: 0.42,
    high24h: 1.1712,
    low24h: 1.1620,
    volume24h: '184.2B',
    status: 'OPEN',
    lastUpdated: 'Just now',
    isDelayed: false,
    sparkline: [1.1635, 1.1642, 1.1630, 1.1655, 1.1668, 1.1660, 1.1675, 1.1684]
  },
  'GBP-USD': {
    symbol: 'GBP/USD',
    id: 'GBP-USD',
    price: 1.3418,
    previousClose: 1.3442,
    bid: 1.34172,
    ask: 1.34188,
    spread: 0.16,
    change24h: -0.0024,
    change24hPercent: -0.18,
    high24h: 1.3465,
    low24h: 1.3395,
    volume24h: '122.8B',
    status: 'OPEN',
    lastUpdated: 'Just now',
    isDelayed: false,
    sparkline: [1.3442, 1.3450, 1.3435, 1.3410, 1.3398, 1.3412, 1.3405, 1.3418]
  },
  'USD-JPY': {
    symbol: 'USD/JPY',
    id: 'USD-JPY',
    price: 151.48,
    previousClose: 151.02,
    bid: 151.472,
    ask: 151.488,
    spread: 0.16,
    change24h: 0.46,
    change24hPercent: 0.31,
    high24h: 151.85,
    low24h: 150.90,
    volume24h: '145.6B',
    status: 'OPEN',
    lastUpdated: 'Just now',
    isDelayed: false,
    sparkline: [151.02, 151.15, 151.30, 151.22, 151.60, 151.75, 151.52, 151.48]
  },
  'USD-CHF': {
    symbol: 'USD/CHF',
    id: 'USD-CHF',
    price: 0.7918,
    previousClose: 0.7928,
    bid: 0.79174,
    ask: 0.79186,
    spread: 0.12,
    change24h: -0.0010,
    change24hPercent: -0.12,
    high24h: 0.7940,
    low24h: 0.7905,
    volume24h: '48.1B',
    status: 'OPEN',
    lastUpdated: 'Just now',
    isDelayed: false,
    sparkline: [0.7928, 0.7932, 0.7925, 0.7918, 0.7912, 0.7908, 0.7915, 0.7918]
  },
  'AUD-USD': {
    symbol: 'AUD/USD',
    id: 'AUD-USD',
    price: 0.6548,
    previousClose: 0.6530,
    bid: 0.65473,
    ask: 0.65487,
    spread: 0.14,
    change24h: 0.0018,
    change24hPercent: 0.27,
    high24h: 0.6570,
    low24h: 0.6522,
    volume24h: '68.5B',
    status: 'OPEN',
    lastUpdated: 'Just now',
    isDelayed: false,
    sparkline: [0.6530, 0.6535, 0.6540, 0.6532, 0.6555, 0.6562, 0.6550, 0.6548]
  },
  'USD-CAD': {
    symbol: 'USD/CAD',
    id: 'USD-CAD',
    price: 1.3778,
    previousClose: 1.3790,
    bid: 1.37772,
    ask: 1.37788,
    spread: 0.16,
    change24h: -0.0012,
    change24hPercent: -0.09,
    high24h: 1.3810,
    low24h: 1.3762,
    volume24h: '56.4B',
    status: 'OPEN',
    lastUpdated: 'Just now',
    isDelayed: false,
    sparkline: [1.3790, 1.3802, 1.3795, 1.3780, 1.3770, 1.3765, 1.3772, 1.3778]
  },
  'NZD-USD': {
    symbol: 'NZD/USD',
    id: 'NZD-USD',
    price: 0.5982,
    previousClose: 0.5970,
    bid: 0.59812,
    ask: 0.59828,
    spread: 0.16,
    change24h: 0.0012,
    change24hPercent: 0.20,
    high24h: 0.6005,
    low24h: 0.5960,
    volume24h: '32.1B',
    status: 'OPEN',
    lastUpdated: 'Just now',
    isDelayed: false,
    sparkline: [0.5970, 0.5975, 0.5968, 0.5980, 0.5992, 0.5985, 0.5980, 0.5982]
  },
  'XAU-USD': {
    symbol: 'XAU/USD',
    id: 'XAU-USD',
    price: 3422.50,
    previousClose: 3394.00,
    bid: 3422.30,
    ask: 3422.70,
    spread: 0.40,
    change24h: 28.50,
    change24hPercent: 0.84,
    high24h: 3438.00,
    low24h: 3388.50,
    volume24h: '94.8B',
    status: 'OPEN',
    lastUpdated: 'Just now',
    isDelayed: false,
    sparkline: [3394, 3402, 3410, 3405, 3418, 3432, 3425, 3422.5]
  },
  'DXY': {
    symbol: 'DXY',
    id: 'DXY',
    price: 99.42,
    previousClose: 99.78,
    bid: 99.41,
    ask: 99.43,
    spread: 0.02,
    change24h: -0.36,
    change24hPercent: -0.36,
    high24h: 99.90,
    low24h: 99.30,
    volume24h: '42.0B',
    status: 'OPEN',
    lastUpdated: 'Just now',
    isDelayed: false,
    sparkline: [99.78, 99.72, 99.65, 99.50, 99.40, 99.35, 99.38, 99.42]
  },
  'EUR-GBP': {
    symbol: 'EUR/GBP',
    id: 'EUR-GBP',
    price: 0.8708,
    previousClose: 0.8656,
    bid: 0.87072,
    ask: 0.87088,
    spread: 0.16,
    change24h: 0.0052,
    change24hPercent: 0.60,
    high24h: 0.8725,
    low24h: 0.8650,
    volume24h: '28.4B',
    status: 'OPEN',
    lastUpdated: 'Just now',
    isDelayed: false,
    sparkline: [0.8656, 0.8665, 0.8672, 0.8688, 0.8710, 0.8718, 0.8705, 0.8708]
  },
  'EUR-JPY': {
    symbol: 'EUR/JPY',
    id: 'EUR-JPY',
    price: 176.98,
    previousClose: 175.70,
    bid: 176.965,
    ask: 176.995,
    spread: 0.30,
    change24h: 1.28,
    change24hPercent: 0.73,
    high24h: 177.30,
    low24h: 175.50,
    volume24h: '41.2B',
    status: 'OPEN',
    lastUpdated: 'Just now',
    isDelayed: false,
    sparkline: [175.70, 175.90, 176.20, 176.55, 177.10, 177.25, 176.85, 176.98]
  },
  'GBP-JPY': {
    symbol: 'GBP/JPY',
    id: 'GBP-JPY',
    price: 203.25,
    previousClose: 203.01,
    bid: 203.228,
    ask: 203.272,
    spread: 0.44,
    change24h: 0.24,
    change24hPercent: 0.12,
    high24h: 204.10,
    low24h: 202.60,
    volume24h: '52.7B',
    status: 'OPEN',
    lastUpdated: 'Just now',
    isDelayed: false,
    sparkline: [203.01, 203.35, 203.80, 203.40, 202.90, 203.10, 203.40, 203.25]
  }
};

export const initialCurrencyStrengths: CurrencyStrength[] = [
  { currency: 'USD', score: 86, momentum: 'stable', change24h: -1.2 },
  { currency: 'EUR', score: 74, momentum: 'increasing', change24h: +4.8 },
  { currency: 'GBP', score: 62, momentum: 'decreasing', change24h: -2.4 },
  { currency: 'CHF', score: 58, momentum: 'stable', change24h: +0.5 },
  { currency: 'JPY', score: 44, momentum: 'decreasing', change24h: -3.1 },
  { currency: 'AUD', score: 41, momentum: 'increasing', change24h: +1.9 },
  { currency: 'CAD', score: 37, momentum: 'stable', change24h: -0.4 },
  { currency: 'NZD', score: 32, momentum: 'decreasing', change24h: -1.8 }
];

export const initialMarketSessions: MarketSession[] = [
  {
    name: 'Sydney',
    city: 'Sydney',
    country: 'Australia',
    openUtc: 21,
    closeUtc: 6,
    isOpen: false,
    progressPercent: 0,
    localTime: '05:04 AM'
  },
  {
    name: 'Tokyo',
    city: 'Tokyo',
    country: 'Japan',
    openUtc: 0,
    closeUtc: 9,
    isOpen: false,
    progressPercent: 0,
    localTime: '04:04 AM'
  },
  {
    name: 'London',
    city: 'London',
    country: 'United Kingdom',
    openUtc: 8,
    closeUtc: 16.5,
    isOpen: true,
    progressPercent: 82,
    localTime: '08:04 PM',
    isOverlap: true
  },
  {
    name: 'New York',
    city: 'New York',
    country: 'United States',
    openUtc: 13,
    closeUtc: 21,
    isOpen: true,
    progressPercent: 75,
    localTime: '03:04 PM',
    isOverlap: true
  }
];

export const initialAnalyses: MarketAnalysis[] = [
  {
    id: 'analysis-1',
    slug: 'eur-usd-macro-breakout-outlook',
    title: 'EUR/USD Weekly Outlook: Bullish Expansion Above 1.1640 Institutional Liquidity Zone',
    subtitle: 'ECB rate pause combined with softening US Treasury 10Y yields creates an asymmetric bullish liquidity imbalance toward 1.1780.',
    symbol: 'EUR/USD',
    category: 'Forex Major',
    bias: 'BULLISH',
    timeframe: '4H',
    keyLevels: {
      support1: 1.1640,
      support2: 1.1585,
      resistance1: 1.1715,
      resistance2: 1.1780,
      pivot: 1.1670
    },
    summary: 'The pair has formed a multi-week ascending accumulation structure. As long as price sustains above 1.1640 order block, we anticipate expansion toward 1.1715 and 1.1780 liquidity sweeps.',
    content: `### Executive Macro Summary

The Euro has demonstrated notable resilience following recent ECB commentary indicating steady balance sheet management, while the US Dollar Index (DXY) continues to lose upward momentum below the 100.00 psychological barrier.

### Order Flow & Technical Structure

On the 4-Hour timeframe, EUR/USD has completed a clean Wyckoff-style re-accumulation above the daily 50 EMA. 
- **Institutional Invalidation Level:** A daily close below 1.1585 invalidates this bullish thesis.
- **Immediate Reaction Zone:** The 1.1640 - 1.1655 Fair Value Gap (FVG) served as a strong demand reaction during the European morning overlap.

### Actionable Strategy

We maintain a disciplined **Bullish bias** targeting the buy-side liquidity resting above 1.1715, with extended swing targets toward 1.1780. Risk exposure must not exceed standard 1% account limits given upcoming US CPI data releases.`,
    chartImageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Karam Al-Rawi',
      title: 'Senior Macro Strategist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-08-13 10:30 UTC',
    readTime: '4 min read',
    tags: ['EURUSD', 'ECB', 'DXY', 'OrderFlow', 'Macro'],
    views: 3420,
    likes: 218,
    isFeatured: true,
    status: 'published'
  },
  {
    id: 'analysis-2',
    slug: 'xau-usd-gold-all-time-high-consolidation',
    title: 'Gold (XAU/USD) Analysis: Consolidation Ahead of $3,450 Breakout Target',
    subtitle: 'Persistent central bank physical bullion buying and geopolitical risk premia anchor deep institutional bids at $3,380 support.',
    symbol: 'XAU/USD',
    category: 'Precious Metals',
    bias: 'BULLISH',
    timeframe: '1D',
    keyLevels: {
      support1: 3390.00,
      support2: 3365.00,
      resistance1: 3438.00,
      resistance2: 3480.00,
      pivot: 3410.00
    },
    summary: 'Gold remains inside an aggressive structural bull market. Pullbacks to the $3,390-$3,400 zone continue to be absorbed by institutional bids.',
    content: `### Precious Metal Macro Drivers

Gold is operating in a classic sovereign reserve accumulation cycle. Global central banks have maintained net bullion purchases for 14 consecutive quarters, insulating spot prices from short-term US dollar fluctuations.

### Technical Level Mapping

- **Resistance Target 1:** $3,438 (Recent swing high)
- **Primary Support:** $3,390 (Daily 20 EMA dynamic support)
- **Major Structural Invalidation:** $3,340

Traders should monitor the London/New York session overlap for clean intraday momentum confirmations.`,
    chartImageUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Karam Al-Rawi',
      title: 'Senior Macro Strategist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-08-12 14:15 UTC',
    readTime: '6 min read',
    tags: ['XAUUSD', 'Gold', 'Commodities', 'CentralBanks', 'Inflation'],
    views: 5120,
    likes: 412,
    isFeatured: true,
    status: 'published'
  },
  {
    id: 'analysis-3',
    slug: 'gbp-usd-bank-of-england-divergence',
    title: 'GBP/USD Analysis: Rejection at 1.3465 Resistance as UK Inflation Normalizes',
    subtitle: 'Sterling faces short-term supply pressure at 1.3460 with potential mean reversion toward 1.3340 demand.',
    symbol: 'GBP/USD',
    category: 'Forex Major',
    bias: 'BEARISH',
    timeframe: '1H',
    keyLevels: {
      support1: 1.3360,
      support2: 1.3310,
      resistance1: 1.3465,
      resistance2: 1.3520,
      pivot: 1.3410
    },
    summary: 'A clean double-top pattern combined with bearish RSI divergence on the 1-Hour chart warrants a disciplined pullback strategy towards 1.3360.',
    content: `### UK Macro Landscape

The Bank of England's recent dovish tilt on interest rate path has created temporary friction for Sterling bulls against the Dollar.

### Level Identification

- **Key Invalidation:** Above 1.3475
- **Downside Liquidity Pool:** 1.3360
- **Risk Assessment:** Moderate risk setup strictly dependent on London fix flows.`,
    chartImageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Karam Al-Rawi',
      title: 'Senior Macro Strategist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: '2026-08-11 09:00 UTC',
    readTime: '3 min read',
    tags: ['GBPUSD', 'BOE', 'Cable', 'TechnicalAnalysis'],
    views: 2890,
    likes: 174,
    isFeatured: false,
    status: 'published'
  }
];

export const initialSignals: SignalSetup[] = [
  {
    id: 'sig-001',
    symbol: 'EUR/USD',
    type: 'BUY',
    status: 'ACTIVE',
    confidenceScore: 78,
    entryZone: [1.1645, 1.1660],
    target1: 1.1710,
    target2: 1.1750,
    target3: 1.1790,
    stopLoss: 1.1605,
    riskRewardRatio: '1:2.8',
    riskLevel: 'Medium',
    timeframe: '4H',
    reasoning: 'Re-test of H4 Fair Value Gap demand zone + Bullish MACD histogram cross + Sustained weakness in DXY index below 99.80.',
    publishedAt: '2026-08-13 08:30 UTC',
    author: 'Karam Al-Rawi',
    updates: [
      {
        timestamp: '2026-08-13 11:00 UTC',
        note: 'Entry triggered at 1.1652. Price is hovering at +32 pips. Move stop loss to breakeven once Target 1 is approached.'
      }
    ]
  },
  {
    id: 'sig-002',
    symbol: 'XAU/USD',
    type: 'BUY',
    status: 'ACTIVE',
    confidenceScore: 84,
    entryZone: [3395.0, 3405.0],
    target1: 3435.0,
    target2: 3460.0,
    target3: 3490.0,
    stopLoss: 3375.0,
    riskRewardRatio: '1:3.2',
    riskLevel: 'Low',
    timeframe: '1D',
    reasoning: 'Multi-week ascending flag consolidation breakout confirmed with rising spot physical exchange volume and falling US 10Y real yields.',
    publishedAt: '2026-08-12 13:00 UTC',
    author: 'Karam Al-Rawi',
    updates: [
      {
        timestamp: '2026-08-13 09:15 UTC',
        note: 'Target 1 hit at $3,435 (+350 pips). Secured 50% profits; remaining position stop loss trailed to $3,410.'
      }
    ]
  },
  {
    id: 'sig-003',
    symbol: 'USD/JPY',
    type: 'SELL',
    status: 'COMPLETED',
    confidenceScore: 72,
    entryZone: [152.80, 153.10],
    target1: 151.50,
    target2: 150.80,
    stopLoss: 153.60,
    riskRewardRatio: '1:2.4',
    riskLevel: 'Medium',
    timeframe: '4H',
    reasoning: 'Strong rejection at historical multi-year resistance + Bank of Japan verbal intervention rhetoric + Bearish RSI divergence.',
    publishedAt: '2026-08-09 07:00 UTC',
    closedAt: '2026-08-11 16:30 UTC',
    resultPips: 145,
    author: 'Karam Al-Rawi'
  },
  {
    id: 'sig-004',
    symbol: 'GBP/USD',
    type: 'SELL',
    status: 'INVALIDATED',
    confidenceScore: 65,
    entryZone: [1.3480, 1.3495],
    target1: 1.3410,
    target2: 1.3360,
    stopLoss: 1.3525,
    riskRewardRatio: '1:2.1',
    riskLevel: 'High',
    timeframe: '1H',
    reasoning: 'Intraday exhaustion wick at 1.3490 resistance during London morning session.',
    publishedAt: '2026-08-08 10:15 UTC',
    closedAt: '2026-08-08 14:45 UTC',
    resultPips: -35,
    author: 'Karam Al-Rawi'
  }
];

export const initialEconomicEvents: EconomicEvent[] = [
  {
    id: 'eco-01',
    time: '12:30 UTC',
    date: '2026-08-14',
    currency: 'USD',
    event: 'Core Consumer Price Index (CPI) YoY',
    impact: 'HIGH',
    forecast: '2.8%',
    previous: '2.9%',
    category: 'Inflation',
    description: 'Measures the changes in the price of consumer goods and services excluding volatile food and energy components.',
    whyItMatters: 'The Federal Reserve heavily gauges Core CPI to decide whether to cut or hike benchmark interest rates. Lower than expected readings weaken the USD.',
    affectedCurrencies: ['USD', 'EUR', 'GBP', 'JPY', 'XAU'],
    relatedSymbols: ['EUR/USD', 'XAU/USD', 'USD/JPY', 'DXY'],
    historicalValues: [
      { date: 'Jul 2026', actual: '2.9%', forecast: '3.0%', previous: '3.1%' },
      { date: 'Jun 2026', actual: '3.1%', forecast: '3.1%', previous: '3.3%' },
      { date: 'May 2026', actual: '3.3%', forecast: '3.4%', previous: '3.4%' }
    ],
    traderCommentary: 'Watch EUR/USD closely during release. A print of 2.7% or below will likely trigger aggressive Gold rallies and USD sell-offs.'
  },
  {
    id: 'eco-02',
    time: '09:00 UTC',
    date: '2026-08-14',
    currency: 'EUR',
    event: 'Eurozone Gross Domestic Product (GDP) QoQ',
    impact: 'MEDIUM',
    forecast: '0.3%',
    previous: '0.3%',
    category: 'GDP',
    description: 'The primary gauge of broad European economic activity and aggregate output.',
    whyItMatters: 'Confirms whether Eurozone economic growth is sustaining expansionary momentum.',
    affectedCurrencies: ['EUR', 'GBP', 'CHF'],
    relatedSymbols: ['EUR/USD', 'EUR/GBP', 'EUR/JPY']
  },
  {
    id: 'eco-03',
    time: '06:00 UTC',
    date: '2026-08-14',
    currency: 'GBP',
    event: 'UK Claimant Count / Unemployment Rate',
    impact: 'HIGH',
    forecast: '4.2%',
    previous: '4.3%',
    category: 'Employment',
    description: 'Measures the change in the number of unemployed people and wage growth inflation trajectory in the UK.',
    whyItMatters: 'Direct input into Bank of England Monetary Policy Committee decision-making.',
    affectedCurrencies: ['GBP', 'EUR', 'USD'],
    relatedSymbols: ['GBP/USD', 'EUR/GBP', 'GBP/JPY']
  },
  {
    id: 'eco-04',
    time: '18:00 UTC',
    date: '2026-08-14',
    currency: 'USD',
    event: 'FOMC Meeting Minutes',
    impact: 'HIGH',
    forecast: '-',
    previous: '-',
    category: 'Central Bank',
    description: 'Detailed record of the FOMC most recent meeting providing in-depth insights into economic conditions and future rate path.',
    whyItMatters: 'High market volatility across all USD pairs and Gold.',
    affectedCurrencies: ['USD', 'XAU', 'EUR', 'JPY'],
    relatedSymbols: ['XAU/USD', 'EUR/USD', 'USD/JPY']
  }
];

export const initialNewsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    slug: 'fed-liquidity-and-gold-demand-surge',
    title: 'Central Banks Accelerate Physical Gold Reserves as De-Dollarization Trends Solidify',
    category: 'Gold',
    summary: 'Global central banks added 48 tons of gold reserves last month, providing robust structural demand floors beneath spot bullion prices.',
    content: 'Comprehensive analysis of central bank purchasing programs, sovereign wealth allocations, and how commercial banks manage physical gold delivery requirements in London and Zurich.',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80',
    publishedAt: '2 hours ago',
    source: 'FX Macro Wire',
    author: 'Karam Al-Rawi',
    relatedSymbols: ['XAU/USD', 'DXY'],
    readTime: '3 min read',
    views: 1840
  },
  {
    id: 'news-2',
    slug: 'ecb-policy-stability-strengthens-euro',
    title: 'European Central Bank Signals Measured Policy Stance Amid Resilient Service Sector',
    category: 'Forex',
    summary: 'President Lagarde emphasized data dependency, dampening expectations for emergency rate cuts and boosting EUR sentiment.',
    content: 'Detailed breakdown of ECB staff macroeconomic projections for inflation and GDP growth in Frankfurt.',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
    publishedAt: '5 hours ago',
    source: 'European Central Review',
    author: 'Karam Al-Rawi',
    relatedSymbols: ['EUR/USD', 'EUR/GBP'],
    readTime: '4 min read',
    views: 1420
  },
  {
    id: 'news-3',
    slug: 'japan-yen-intervention-thresholds',
    title: 'Bank of Japan and Ministry of Finance Reiterate Warning Against Speculative Yen Shorting',
    category: 'Central Banks',
    summary: 'Japanese authorities signaled ready intervention mechanisms if USD/JPY breaches key psychological ceiling levels.',
    content: 'Examining the mechanics of Japanese foreign exchange reserve interventions and carry trade unwinding.',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    publishedAt: '1 day ago',
    source: 'Asia Markets Dispatch',
    author: 'Karam Al-Rawi',
    relatedSymbols: ['USD/JPY', 'EUR/JPY', 'GBP/JPY'],
    readTime: '5 min read',
    views: 2950
  }
];

export const initialVideos: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Weekly Masterclass: How Institutional Order Flow Identifies Real Support & Resistance',
    description: 'In-depth 24-minute chart breakdown demonstrating how market makers accumulate liquidity before major session breakouts.',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    duration: '24:18',
    category: 'Market Analysis',
    youtubeId: 'dQw4w9WgXcQ',
    publishedAt: '2 days ago',
    author: 'Karam Al-Rawi',
    views: 4890,
    relatedSymbols: ['EUR/USD', 'XAU/USD']
  },
  {
    id: 'vid-2',
    title: 'Trading Psychology: The Mathematics of Drawdown and Emotional Discipline',
    description: 'Why 90% of retail traders blow accounts despite having good technical setups, and how systematic position sizing saves careers.',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    duration: '18:45',
    category: 'Trading Psychology',
    publishedAt: '5 days ago',
    author: 'Karam Al-Rawi',
    views: 6120
  },
  {
    id: 'vid-3',
    title: 'Gold (XAU/USD) 2026 Strategic Outlook: Navigating Real Yields & Central Bank Buying',
    description: 'A complete institutional roadmap to trading Spot Gold across daily, 4H, and 15M timeframes.',
    thumbnail: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80',
    duration: '31:10',
    category: 'Gold',
    publishedAt: '1 week ago',
    author: 'Karam Al-Rawi',
    views: 8930,
    relatedSymbols: ['XAU/USD']
  }
];

export const initialCourses: Course[] = [
  {
    id: 'course-beginner',
    title: 'Forex Foundations & Market Mechanics',
    level: 'Beginner',
    description: 'Master the bedrock fundamentals of foreign exchange: currency pairs, pip calculations, lot sizing, margin, and order types without misleading jargon.',
    duration: '4.5 Hours',
    lessonsCount: 6,
    icon: 'BookOpen',
    color: '#3B82F6',
    lessons: [
      {
        id: 'b-01',
        title: 'What Is the Forex Market & How Does Liquidity Flow?',
        duration: '25 min',
        content: 'Understand the global decentralized OTC network of commercial banks, institutional funds, central banks, and retail liquidity providers.',
        keyTakeaways: [
          'Forex is the largest financial market in the world ($7.5T+ daily volume)',
          'Currency prices move in pairs: Base vs Quote',
          'Trading happens across 4 primary overlapping global sessions'
        ],
        order: 1
      },
      {
        id: 'b-02',
        title: 'Pips, Pipettes, Lot Sizes & Leverage Explained Mathematically',
        duration: '35 min',
        content: 'Clear calculations showing exact financial value of a pip across standard, mini, and micro lots.',
        keyTakeaways: [
          'Standard Lot = 100,000 units (1 pip ≈ $10 on EUR/USD)',
          'Leverage amplifies both gains and losses equally',
          'Never risk more than 1-2% of total capital on a single execution'
        ],
        order: 2
      },
      {
        id: 'b-03',
        title: 'Bid, Ask, Spread & Commission Structures',
        duration: '20 min',
        content: 'How brokers earn fees, why spreads widen during high-impact news, and how to minimize transaction drag.',
        keyTakeaways: [
          'Spread is the difference between buy (Ask) and sell (Bid)',
          'Liquidity during London/New York session overlap offers the tightest spreads',
          'Avoid entering during rollover hours (21:00-23:00 UTC)'
        ],
        order: 3
      }
    ]
  },
  {
    id: 'course-intermediate',
    title: 'Technical Analysis & Market Structure',
    level: 'Intermediate',
    description: 'Learn institutional price action: Higher Highs / Lower Lows, Fair Value Gaps (FVG), Liquidity Sweeps, and multi-timeframe confluence.',
    duration: '6.5 Hours',
    lessonsCount: 8,
    icon: 'TrendingUp',
    color: '#10B981',
    lessons: [
      {
        id: 'i-01',
        title: 'Market Structure & Break of Structure (BOS)',
        duration: '40 min',
        content: 'Mapping swing highs, swing lows, and identifying when a trend has genuinely shifted versus a temporary corrective retracement.',
        keyTakeaways: [
          'True trend continuation requires a confirmed candle close beyond swing structure',
          'Differentiate between impulse moves and corrective consolidations',
          'Always trade in the direction of the dominant higher-timeframe structure'
        ],
        order: 1
      },
      {
        id: 'i-02',
        title: 'Institutional Supply & Demand Zones vs Retail Support & Resistance',
        duration: '45 min',
        content: 'Identify where large commercial orders were filled and where unfilled orders remain waiting for re-tests.',
        keyTakeaways: [
          'Fresh unmitigated order blocks have the highest reaction probability',
          'Look for displacement (large candles) leaving the zone',
          'Combine with Fibonacci 50-61.8% premium/discount levels'
        ],
        order: 2
      }
    ]
  },
  {
    id: 'course-advanced',
    title: 'Macroeconomics, Central Banks & Portfolio Risk',
    level: 'Advanced',
    description: 'Connect macroeconomic data (CPI, NFP, GDP, PMI) and central bank yield curves to systematic position sizing and multi-asset correlation.',
    duration: '8 Hours',
    lessonsCount: 10,
    icon: 'Award',
    color: '#EAB308',
    lessons: [
      {
        id: 'a-01',
        title: 'Central Bank Monetary Policy & Interest Rate Differentials',
        duration: '50 min',
        content: 'How global capital flows chase higher risk-adjusted yields (Carry Trades) and how central bank forward guidance shapes 6-month trends.',
        keyTakeaways: [
          'Interest rate expectations drive structural currency direction',
          'Hawkish central banks strengthen domestic currencies; dovish banks weaken them',
          'Watch real yields (Nominal Rate minus Inflation) rather than nominal rates alone'
        ],
        order: 1
      }
    ]
  }
];

export const initialServices: ServiceItem[] = [
  {
    id: 'srv-01',
    title: 'Private 1-on-1 Market Mentorship',
    description: 'Direct personalized coaching covering live chart execution, trading psychology, tailored risk management, and personalized trade journaling review.',
    icon: 'UserCheck',
    features: [
      'Weekly 60-minute private video sessions',
      'Personalized trade audit & risk optimization',
      'Direct Telegram priority access for setup discussions',
      'Customized execution plan for your timezone'
    ],
    availability: 'Limited Slots',
    badge: 'High Demand',
    ctaText: 'Apply for Mentorship'
  },
  {
    id: 'srv-02',
    title: 'Institutional Macro Briefing & Weekly Reports',
    description: 'Comprehensive weekly institutional intelligence dossier covering global central banks, liquidity flows, and upcoming high-impact economic setup roadmaps.',
    icon: 'FileText',
    features: [
      'Comprehensive 25+ page PDF weekly report every Sunday',
      'High-probability institutional level mapping',
      'Commitment of Traders (COT) report breakdown',
      'Gold & FX macro catalyst schedule'
    ],
    availability: 'Available',
    ctaText: 'Request Sample Report'
  },
  {
    id: 'srv-03',
    title: 'Executive Portfolio & Risk Consultation',
    description: 'Institutional risk advisory for high-net-worth individuals and corporate treasuries seeking currency hedging strategies and gold reserve allocation.',
    icon: 'Briefcase',
    features: [
      'FX exposure & hedging assessment',
      'Precious metals allocation framework',
      'Tailored institutional risk metrics'
    ],
    availability: 'Available',
    ctaText: 'Book Strategic Consultation'
  }
];

export const initialSiteContent: SiteContentConfig = {
  brandName: 'Profit Point',
  heroHeadline: 'Understand the Market. Trade With Knowledge.',
  heroSubtitle: 'Real-time institutional FX & Gold analytics, systematic technical levels, disciplined risk framework, and continuous trader education.',
  heroPrimaryCta: 'Explore Live Markets',
  heroSecondaryCta: 'Contact Profit Point Desk',
  traderName: 'Karam Al-Rawi',
  traderTitle: 'Head Analyst & Founder, Profit Point',
  traderBio: '12+ years of institutional FX & Gold market analysis. Focus on order flow, macro central bank policy, and capital preservation.',
  whatsappNumber: '+44 7700 900077',
  telegramHandle: '@profitpoint_official',
  emailAddress: 'contact@profitpoint.pro',
  disclaimerText: 'Profit Point is a financial market intelligence and education platform. Trading foreign exchange and leveraged instruments involves substantial risk of loss and is not suitable for all investors. Market commentary and setups provided on this platform are for educational and research purposes only.'
};
