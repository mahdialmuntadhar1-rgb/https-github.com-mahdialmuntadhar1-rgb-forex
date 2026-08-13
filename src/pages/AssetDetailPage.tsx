import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Asset, Quote, MarketAnalysis, SignalSetup } from '../types';
import { marketApi } from '../services/marketApi';
import { userService } from '../services/userApi';
import { contentService } from '../services/contentApi';
import { InteractiveChart } from '../components/common/InteractiveChart';
import { PriceChange } from '../components/common/PriceChange';
import { 
  Star, 
  Bell, 
  ArrowLeft, 
  Activity, 
  TrendingUp, 
  Layers, 
  Landmark, 
  ShieldAlert, 
  BarChart2, 
  CheckCircle2, 
  Zap,
  ArrowRight
} from 'lucide-react';

interface AssetDetailPageProps {
  assetId: string;
  onNavigate: (path: string) => void;
}

export const AssetDetailPage: React.FC<AssetDetailPageProps> = ({ assetId, onNavigate }) => {
  const { t, direction } = useTranslation();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [activeTab, setActiveTab] = useState<'technicals' | 'fundamentals' | 'commentary' | 'orderflow'>('technicals');
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [relatedAnalyses, setRelatedAnalyses] = useState<MarketAnalysis[]>([]);
  const [relatedSignals, setRelatedSignals] = useState<SignalSetup[]>([]);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertTargetPrice, setAlertTargetPrice] = useState<string>('');

  useEffect(() => {
    let currentAssetId = '';
    const load = async () => {
      const allAssets = await marketApi.getAssets();
      const current = allAssets.find(a => a.id.toLowerCase() === assetId.toLowerCase() || a.symbol.replace('/', '-').toLowerCase() === assetId.toLowerCase());
      if (current) {
        currentAssetId = current.id;
        setAsset(current);
        const q = await marketApi.getQuote(current.id);
        setQuote(q);
        if (q) setAlertTargetPrice(q.price.toString());

        const wl = await userService.getWatchlist();
        setIsWatchlisted(wl.includes(current.symbol));

        const analyses = await contentService.getAnalyses();
        setRelatedAnalyses(analyses.filter(a => a.symbol === current.symbol));

        const signals = await contentService.getSignals();
        setRelatedSignals(signals.filter(s => s.symbol === current.symbol));
      }
    };
    load();

    const unsub = marketApi.subscribeToTicks(quotes => {
      const idToLookup = currentAssetId || assetId;
      const q = quotes[idToLookup] || quotes[idToLookup.toUpperCase()] || quotes[idToLookup.replace('/', '-')];
      if (q) setQuote(q);
    });

    return () => unsub();
  }, [assetId]);

  if (!asset || !quote) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">
        <div className="animate-spin text-blue-400 mb-2">Loading asset terminal...</div>
      </div>
    );
  }

  const digits = asset.digits;
  const isGold = asset.symbol.includes('XAU');

  const handleToggleWatchlist = async () => {
    const added = await userService.toggleWatchlist(asset.symbol);
    setIsWatchlisted(added);
  };

  const handleCreateAlert = async () => {
    const target = parseFloat(alertTargetPrice);
    if (!isNaN(target)) {
      await userService.createAlert({
        userId: 'usr-demo-01',
        type: 'PRICE',
        symbol: asset.symbol,
        condition: target >= quote.price ? 'ABOVE' : 'BELOW',
        targetValue: target,
        note: `Target price alert for ${asset.symbol}`,
        channels: { inApp: true, email: true, sms: false, whatsapp: true }
      });
      setAlertModalOpen(false);
    }
  };

  // Mock Pivot Points & Indicators for realism
  const pivot = quote.price;
  const r1 = isGold ? pivot + 18.5 : pivot + 0.0045;
  const r2 = isGold ? pivot + 34.0 : pivot + 0.0082;
  const s1 = isGold ? pivot - 16.0 : pivot - 0.0038;
  const s2 = isGold ? pivot - 28.5 : pivot - 0.0075;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('/markets')}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 transition cursor-pointer"
        >
          <ArrowLeft size={14} className={direction === 'rtl' ? 'rotate-180' : ''} />
          <span>Back to Markets</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAlertModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 transition cursor-pointer"
          >
            <Bell size={13} className="text-amber-400" />
            <span>Set Alert</span>
          </button>
          <button
            onClick={handleToggleWatchlist}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition cursor-pointer ${
              isWatchlisted
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Star size={13} fill={isWatchlisted ? 'currentColor' : 'none'} />
            <span>{isWatchlisted ? 'Watchlisted' : 'Watchlist'}</span>
          </button>
        </div>
      </div>

      {/* Asset Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Symbol & Name */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#2163CC] flex items-center justify-center font-mono font-extrabold text-white text-lg shadow-md shadow-[#2163CC]/20">
              {asset.symbol.split('/')[0] || asset.symbol.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono">
                  {asset.symbol}
                </h1>
                <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {quote.status}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                  {asset.category.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{asset.name} • Institutional Interbank Feed</p>
            </div>
          </div>

          {/* Metrics Pills */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs">
            <div>
              <div className="text-slate-500 text-[10px] uppercase">Live Price</div>
              <div className="text-2xl font-extrabold text-slate-100">{quote.price.toFixed(digits)}</div>
            </div>

            <div>
              <div className="text-slate-500 text-[10px] uppercase">24h Change</div>
              <PriceChange
                change={quote.change24h}
                changePercent={quote.change24hPercent}
                digits={digits}
                size="sm"
                className="mt-1"
              />
            </div>

            <div className="hidden sm:block">
              <div className="text-slate-500 text-[10px] uppercase">24h Range (L / H)</div>
              <div className="text-slate-300 font-semibold mt-1">
                {quote.low24h.toFixed(digits)} - {quote.high24h.toFixed(digits)}
              </div>
            </div>

            <div>
              <div className="text-slate-500 text-[10px] uppercase">Spread / Vol</div>
              <div className="text-slate-300 font-semibold mt-1">
                {quote.spread} pips • {quote.volume24h}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Terminal Chart */}
      <div className="w-full">
        <InteractiveChart
          symbol={asset.symbol}
          height={460}
          supportLevel={s1}
          resistanceLevel={r1}
        />
      </div>

      {/* Structured Analysis Tabs */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="flex items-center gap-2 border-b border-slate-800 px-4 pt-3 bg-slate-950/60 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('technicals')}
            className={`px-4 py-2.5 text-xs font-mono font-medium border-b-2 transition flex items-center gap-2 ${
              activeTab === 'technicals'
                ? 'border-blue-500 text-blue-400 font-bold bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity size={14} /> Technical Indicators & Pivots
          </button>
          <button
            onClick={() => setActiveTab('fundamentals')}
            className={`px-4 py-2.5 text-xs font-mono font-medium border-b-2 transition flex items-center gap-2 ${
              activeTab === 'fundamentals'
                ? 'border-blue-500 text-blue-400 font-bold bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Landmark size={14} /> Macro & Central Bank Policy
          </button>
          <button
            onClick={() => setActiveTab('commentary')}
            className={`px-4 py-2.5 text-xs font-mono font-medium border-b-2 transition flex items-center gap-2 ${
              activeTab === 'commentary'
                ? 'border-blue-500 text-blue-400 font-bold bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp size={14} /> Trader Setups & Commentary ({relatedAnalyses.length + relatedSignals.length})
          </button>
          <button
            onClick={() => setActiveTab('orderflow')}
            className={`px-4 py-2.5 text-xs font-mono font-medium border-b-2 transition flex items-center gap-2 ${
              activeTab === 'orderflow'
                ? 'border-blue-500 text-blue-400 font-bold bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart2 size={14} /> Order Flow & Sentiment
          </button>
        </div>

        <div className="p-6">
          {/* Tab 1: Technicals */}
          {activeTab === 'technicals' && (
            <div className="space-y-6">
              {/* Oscillator Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="text-slate-500 text-xs font-mono uppercase">RSI (14 Period)</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-mono font-bold text-slate-100">58.4</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Neutral / Bullish Tilt
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Trading above 50 midline confirming bullish momentum without entering overbought threshold.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="text-slate-500 text-xs font-mono uppercase">MACD (12, 26, 9)</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-mono font-bold text-emerald-400">+0.0014</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Bullish Crossover
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">MACD signal line crossed above zero histogram supporting continuous expansion.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="text-slate-500 text-xs font-mono uppercase">ATR (14 Volatility)</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-mono font-bold text-slate-100">
                      {isGold ? '24.50' : '0.0062'}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Moderate Expansion
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Daily average true range providing optimal risk buffer for stop placement.</p>
                </div>
              </div>

              {/* Pivot Points Matrix */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-200 font-mono uppercase tracking-wider">
                  Daily Classical Pivot Levels
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-mono">
                  <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30">
                    <div className="text-slate-500 text-[10px]">Resistance 2 (R2)</div>
                    <div className="font-bold text-rose-400 text-sm mt-0.5">{r2.toFixed(digits)}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-rose-950/10 border border-rose-500/20">
                    <div className="text-slate-500 text-[10px]">Resistance 1 (R1)</div>
                    <div className="font-bold text-rose-300 text-sm mt-0.5">{r1.toFixed(digits)}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-500/30">
                    <div className="text-slate-500 text-[10px]">Central Pivot (P)</div>
                    <div className="font-bold text-blue-400 text-sm mt-0.5">{pivot.toFixed(digits)}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-950/10 border border-emerald-500/20">
                    <div className="text-slate-500 text-[10px]">Support 1 (S1)</div>
                    <div className="font-bold text-emerald-300 text-sm mt-0.5">{s1.toFixed(digits)}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30">
                    <div className="text-slate-500 text-[10px]">Support 2 (S2)</div>
                    <div className="font-bold text-emerald-400 text-sm mt-0.5">{s2.toFixed(digits)}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Fundamentals */}
          {activeTab === 'fundamentals' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
                    <Landmark size={18} className="text-blue-400" />
                    Central Bank Policy Stance
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {asset.symbol === 'EUR/USD' 
                      ? 'The European Central Bank maintains a data-dependent pause while the US Federal Reserve hints at measured easing cycles. Policy rate differentials continue to drive medium-term directional bias.'
                      : isGold
                      ? 'Gold remains supported by structural central bank physical reserves accumulation (BRICS+ & European banks) alongside negative real rate projections.'
                      : 'Macro drivers are influenced by economic growth divergences and fiscal deficit dynamics.'}
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Base Interest Rate: <strong className="text-slate-200">4.25%</strong></span>
                    <span>Quote Interest Rate: <strong className="text-slate-200">5.25%</strong></span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
                    <ShieldAlert size={18} className="text-amber-400" />
                    Key Macro Catalysts & Risks
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>Upcoming US CPI and Non-Farm Payrolls reports set to dictate next quarterly leg.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>Geopolitical energy route security creating periodic safe-haven flows.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Commentary & Setups */}
          {activeTab === 'commentary' && (
            <div className="space-y-6">
              {relatedSignals.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <Zap size={16} /> Active Market Setups
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedSignals.map(sig => (
                      <div
                        key={sig.id}
                        onClick={() => onNavigate('/signals')}
                        className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/40 transition cursor-pointer space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-100 text-sm font-mono">
                            {sig.type} Setup
                          </span>
                          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                            {sig.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2">{sig.reasoning}</p>
                        <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex justify-between">
                          <span>Target: <strong className="text-emerald-400">{sig.target1}</strong></span>
                          <span>SL: <strong className="text-rose-400">{sig.stopLoss}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {relatedAnalyses.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-mono font-bold text-blue-400 uppercase tracking-wider">
                    Published Detailed Analyses
                  </h4>
                  <div className="space-y-3">
                    {relatedAnalyses.map(an => (
                      <div
                        key={an.id}
                        onClick={() => onNavigate(`/market-analysis/${an.slug}`)}
                        className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/40 transition cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <span className="text-xs font-mono text-blue-400">{an.bias} ({an.timeframe}) • {an.publishedAt}</span>
                          <h5 className="font-bold text-slate-100 text-sm mt-0.5">{an.title}</h5>
                        </div>
                        <ArrowRight size={16} className="text-slate-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Order Flow */}
          {activeTab === 'orderflow' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-100 text-sm">Retail Crowd Positioning (Contrarian Indicator)</h4>
                  <span className="text-xs font-mono text-slate-400">Total Positions: 24,800 Lots</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-emerald-400 font-bold">LONG: 68%</span>
                    <span className="text-rose-400 font-bold">SHORT: 32%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden flex border border-slate-800">
                    <div className="bg-emerald-500 h-full" style={{ width: '68%' }} />
                    <div className="bg-rose-500 h-full" style={{ width: '32%' }} />
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Institutional order flow analysis suggests heavy retail Long exposure often acts as a contrarian indicator, hinting at potential liquidity grabs beneath recent swing lows before higher timeframe continuation.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Set Alert Modal */}
      {alertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-slate-100 text-lg flex items-center gap-2">
              <Bell size={18} className="text-amber-400" />
              Set Price Alert for {asset.symbol}
            </h3>
            <p className="text-xs text-slate-400">
              Receive immediate push notifications, email, and WhatsApp notifications when price crosses your specified level.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">Target Trigger Price</label>
              <input
                type="number"
                step="any"
                value={alertTargetPrice}
                onChange={e => setAlertTargetPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono text-slate-100 focus:outline-hidden focus:border-blue-500"
              />
              <div className="text-[11px] font-mono text-slate-500">
                Current: {quote.price.toFixed(digits)}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setAlertModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAlert}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-mono text-white font-bold shadow-md shadow-blue-500/20"
              >
                Save Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
