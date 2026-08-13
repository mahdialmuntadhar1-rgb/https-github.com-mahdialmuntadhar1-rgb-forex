import { 
  Asset, 
  Quote, 
  CurrencyStrength, 
  MarketSession, 
  TechnicalIndicators, 
  FundamentalFactors,
  SparklinePoint 
} from '../types';
import { 
  initialAssets, 
  initialQuotes, 
  initialCurrencyStrengths, 
  initialMarketSessions 
} from '../data/mockData';

export interface MarketDataProvider {
  getAssets(): Promise<Asset[]>;
  getQuotes(): Promise<Record<string, Quote>>;
  getQuote(idOrSymbol: string): Promise<Quote | null>;
  getHistoricalCandles(symbol: string, timeframe: string): Promise<{
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }[]>;
  getTechnicalAnalysis(symbol: string): Promise<TechnicalIndicators>;
  getFundamentalFactors(symbol: string): Promise<FundamentalFactors>;
  getCurrencyStrength(): Promise<CurrencyStrength[]>;
  getTradingSessions(): Promise<MarketSession[]>;
  subscribeToTicks(callback: (updatedQuotes: Record<string, Quote>) => void): () => void;
}

class MockMarketDataProvider implements MarketDataProvider {
  private quotes: Record<string, Quote>;
  private assets: Asset[];
  private currencyStrengths: CurrencyStrength[];
  private sessions: MarketSession[];
  private subscribers: Set<(updatedQuotes: Record<string, Quote>) => void> = new Set();
  private intervalId: any = null;
  private isSimulationLive: boolean = true;

  constructor() {
    // Load from local cache if existing or use initial mock data
    const savedQuotes = localStorage.getItem('fx_quotes_cache');
    this.quotes = savedQuotes ? JSON.parse(savedQuotes) : { ...initialQuotes };
    this.assets = [...initialAssets];
    this.currencyStrengths = [...initialCurrencyStrengths];
    this.sessions = [...initialMarketSessions];

    this.startLiveSimulation();
  }

  private startLiveSimulation() {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      if (!this.isSimulationLive) return;

      const updatedKeys = Object.keys(this.quotes);
      // Pick 2-4 random assets to tick each 2 seconds
      const countToUpdate = Math.floor(Math.random() * 3) + 2;
      let hasChanges = false;

      for (let i = 0; i < countToUpdate; i++) {
        const randomKey = updatedKeys[Math.floor(Math.random() * updatedKeys.length)];
        const quote = this.quotes[randomKey];
        if (!quote) continue;

        // Pip delta
        const assetDef = this.assets.find(a => a.id === quote.id || a.symbol === quote.symbol);
        const digits = assetDef ? assetDef.digits : 5;
        const tickSize = Math.pow(10, -digits);
        const maxPips = quote.symbol === 'XAU/USD' ? 0.8 : 0.0003;
        
        const changeDelta = (Math.random() * 2 - 1) * maxPips;
        const newPrice = Number((quote.price + changeDelta).toFixed(digits));
        
        if (newPrice > 0) {
          const priceDiff = newPrice - quote.previousClose;
          const changePercent = Number(((priceDiff / quote.previousClose) * 100).toFixed(2));
          const spreadPips = quote.spread || 0.1;
          const halfSpread = (spreadPips * tickSize) / 2;

          // Update sparkline
          const newSparkline = [...quote.sparkline.slice(1), newPrice];

          const now = new Date();
          const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

          this.quotes[randomKey] = {
            ...quote,
            price: newPrice,
            bid: Number((newPrice - halfSpread).toFixed(digits)),
            ask: Number((newPrice + halfSpread).toFixed(digits)),
            change24h: Number(priceDiff.toFixed(digits)),
            change24hPercent: changePercent,
            high24h: Math.max(quote.high24h, newPrice),
            low24h: Math.min(quote.low24h, newPrice),
            lastUpdated: timeStr,
            sparkline: newSparkline
          };
          hasChanges = true;
        }
      }

      if (hasChanges) {
        this.notifySubscribers();
      }
    }, 2500);
  }

  private notifySubscribers() {
    this.subscribers.forEach(cb => cb({ ...this.quotes }));
  }

  public setSimulationLive(isLive: boolean) {
    this.isSimulationLive = isLive;
  }

  async getAssets(): Promise<Asset[]> {
    return [...this.assets];
  }

  async getQuotes(): Promise<Record<string, Quote>> {
    return { ...this.quotes };
  }

  async getQuote(idOrSymbol: string): Promise<Quote | null> {
    const cleanId = idOrSymbol.replace('/', '-').toUpperCase();
    if (this.quotes[cleanId]) return { ...this.quotes[cleanId] };
    
    // Find by symbol
    const found = Object.values(this.quotes).find(
      q => q.symbol.toUpperCase() === idOrSymbol.toUpperCase() || q.id.toUpperCase() === cleanId
    );
    return found ? { ...found } : null;
  }

  async getHistoricalCandles(symbol: string, timeframe: string = '1H'): Promise<{
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }[]> {
    const cleanId = symbol.replace('/', '-').toUpperCase();
    const quote = this.quotes[cleanId] || this.quotes['EUR-USD'];
    const currentPrice = quote.price;
    const isGold = symbol.includes('XAU') || symbol.includes('Gold');
    const digits = isGold ? 2 : 5;
    const baseVolatility = isGold ? 4.5 : 0.0015;

    const candles = [];
    const count = 40;
    let price = currentPrice - (baseVolatility * 10);

    for (let i = count; i >= 0; i--) {
      const d = new Date();
      if (timeframe === '15M') d.setMinutes(d.getMinutes() - i * 15);
      else if (timeframe === '1H') d.setHours(d.getHours() - i);
      else if (timeframe === '4H') d.setHours(d.getHours() - i * 4);
      else if (timeframe === '1D') d.setDate(d.getDate() - i);
      else d.setDate(d.getDate() - i * 7);

      const timeLabel = timeframe === '1D' || timeframe === '1W' 
        ? d.toLocaleDateString([], { month: 'short', day: 'numeric' })
        : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const movement = (Math.random() - 0.48) * baseVolatility * 2;
      const open = price;
      const close = Number((open + movement).toFixed(digits));
      const high = Number((Math.max(open, close) + Math.random() * baseVolatility).toFixed(digits));
      const low = Number((Math.min(open, close) - Math.random() * baseVolatility).toFixed(digits));
      const volume = Math.floor(Math.random() * 15000) + 5000;

      price = close;
      candles.push({
        time: timeLabel,
        open,
        high,
        low,
        close,
        volume
      });
    }

    // Ensure final candle matches current live price
    if (candles.length > 0) {
      candles[candles.length - 1].close = currentPrice;
      candles[candles.length - 1].high = Math.max(candles[candles.length - 1].high, currentPrice);
      candles[candles.length - 1].low = Math.min(candles[candles.length - 1].low, currentPrice);
    }

    return candles;
  }

  async getTechnicalAnalysis(symbol: string): Promise<TechnicalIndicators> {
    const isBullish = !symbol.includes('GBP');
    return {
      trend: isBullish ? 'Bullish' : 'Bearish',
      rsi: {
        value: isBullish ? 63.4 : 44.2,
        status: 'Neutral'
      },
      macd: {
        value: isBullish ? 0.0014 : -0.0008,
        signal: 0.0009,
        histogram: isBullish ? 0.0005 : -0.0003,
        status: isBullish ? 'Bullish' : 'Bearish'
      },
      ema50: {
        value: 1.1642,
        status: isBullish ? 'Bullish' : 'Bearish'
      },
      ema200: {
        value: 1.1570,
        status: 'Bullish'
      },
      atr: symbol.includes('XAU') ? 24.50 : 0.0068,
      volatility: 'Medium'
    };
  }

  async getFundamentalFactors(symbol: string): Promise<FundamentalFactors> {
    return {
      baseCurrencyFactors: {
        institution: 'European Central Bank (ECB)',
        interestRate: '3.75%',
        inflation: '2.4% YoY',
        gdpGrowth: '0.3% QoQ',
        employment: '6.4% Unemp Rate',
        stance: 'Data-dependent / Steady'
      },
      quoteCurrencyFactors: {
        institution: 'Federal Reserve (Fed)',
        interestRate: '5.25% - 5.50%',
        inflation: '2.9% YoY',
        gdpGrowth: '2.8% Ann',
        employment: '4.3% Unemp Rate',
        stance: 'Measured Easing Anticipated'
      },
      marketContext: 'The monetary policy divergence between the ECB and the Federal Reserve remains the primary macro catalyst. Market pricing is heavily sensitive to upcoming US CPI prints and European core manufacturing PMIs.'
    };
  }

  async getCurrencyStrength(): Promise<CurrencyStrength[]> {
    return [...this.currencyStrengths];
  }

  async getTradingSessions(): Promise<MarketSession[]> {
    // Dynamically calculate UTC time and session overlap
    const now = new Date();
    const utcHour = now.getUTCHours() + now.getUTCMinutes() / 60;

    return this.sessions.map(s => {
      let isOpen = false;
      let progress = 0;

      if (s.openUtc < s.closeUtc) {
        isOpen = utcHour >= s.openUtc && utcHour < s.closeUtc;
        if (isOpen) {
          progress = Math.min(100, Math.max(0, ((utcHour - s.openUtc) / (s.closeUtc - s.openUtc)) * 100));
        }
      } else {
        // Wraps midnight (e.g. Sydney 21:00 to 06:00 UTC)
        isOpen = utcHour >= s.openUtc || utcHour < s.closeUtc;
        if (isOpen) {
          const duration = (24 - s.openUtc) + s.closeUtc;
          const elapsed = utcHour >= s.openUtc ? utcHour - s.openUtc : (24 - s.openUtc) + utcHour;
          progress = Math.min(100, Math.max(0, (elapsed / duration) * 100));
        }
      }

      // Check if London + NY overlap
      const isOverlap = (utcHour >= 13 && utcHour < 16.5) && (s.name === 'London' || s.name === 'New York');

      return {
        ...s,
        isOpen,
        progressPercent: Math.round(progress),
        isOverlap
      };
    });
  }

  subscribeToTicks(callback: (updatedQuotes: Record<string, Quote>) => void): () => void {
    this.subscribers.add(callback);
    // Send immediate initial quotes
    callback({ ...this.quotes });
    return () => {
      this.subscribers.delete(callback);
    };
  }
}

// Singleton export
export const marketApi = new MockMarketDataProvider();
