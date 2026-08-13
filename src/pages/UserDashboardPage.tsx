import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { userService } from '../services/userApi';
import { marketApi } from '../services/marketApi';
import { contentService } from '../services/contentApi';
import { PriceAlert, Quote, Asset, MarketAnalysis } from '../types';
import { PriceChange } from '../components/common/PriceChange';
import { 
  User, 
  Star, 
  Bell, 
  Bookmark, 
  Settings, 
  Trash2, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  Plus
} from 'lucide-react';

interface UserDashboardPageProps {
  onNavigate: (path: string) => void;
}

export const UserDashboardPage: React.FC<UserDashboardPageProps> = ({ onNavigate }) => {
  const { t, direction } = useTranslation();
  const [activeTab, setActiveTab] = useState<'watchlist' | 'alerts' | 'bookmarks' | 'settings'>('watchlist');
  const [watchlistSymbols, setWatchlistSymbols] = useState<string[]>([]);
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});
  const [assets, setAssets] = useState<Asset[]>([]);
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [savedAnalyses, setSavedAnalyses] = useState<MarketAnalysis[]>([]);

  useEffect(() => {
    const load = async () => {
      const allAssets = await marketApi.getAssets();
      setAssets(allAssets);

      const qs = await marketApi.getQuotes();
      setQuotes(qs);

      const wl = await userService.getWatchlist();
      setWatchlistSymbols(wl);

      const al = await userService.getAlerts();
      setAlerts(al);

      const bks = await userService.getBookmarks();
      const allAn = await contentService.getAnalyses();
      setSavedAnalyses(allAn.filter(a => bks.includes(a.id)));
    };

    load();

    const unsub = marketApi.subscribeToTicks(latestQuotes => {
      setQuotes(prev => {
        const next = { ...prev };
        Object.values(latestQuotes).forEach(q => {
          next[q.symbol] = q;
        });
        return next;
      });
    });

    return () => unsub();
  }, []);

  const handleRemoveFromWatchlist = async (symbol: string) => {
    await userService.toggleWatchlist(symbol);
    setWatchlistSymbols(prev => prev.filter(s => s !== symbol));
  };

  const handleDeleteAlert = async (alertId: string) => {
    await userService.deleteAlert(alertId);
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* User Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-mono font-extrabold text-white text-xl shadow-lg">
            DR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100">
                Demo Trader Workspace
              </h1>
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-[10px] font-bold border border-blue-500/20">
                VIP ACTIVE
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-0.5">trader.demo@karam-fx.com • Tier 1 Interbank Feed</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-950/80 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'watchlist' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Star size={13} /> Watchlist ({watchlistSymbols.length})
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'alerts' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bell size={13} /> Alerts ({alerts.length})
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'bookmarks' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark size={13} /> Saved ({savedAnalyses.length})
          </button>
        </div>
      </div>

      {/* 1. WATCHLIST VIEW */}
      {activeTab === 'watchlist' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 font-mono text-sm uppercase tracking-wider">
              Monitored Instruments
            </h3>
            <button
              onClick={() => onNavigate('/markets')}
              className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
            >
              <Plus size={13} /> Add More Pairs
            </button>
          </div>

          {watchlistSymbols.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl text-slate-500 space-y-3">
              <Star size={32} className="mx-auto opacity-30" />
              <p className="text-xs">Your watchlist is currently empty. Star pairs from the markets page.</p>
              <button
                onClick={() => onNavigate('/markets')}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-mono"
              >
                Browse Markets
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {watchlistSymbols.map(sym => {
                const quote = quotes[sym];
                const asset = assets.find(a => a.symbol === sym);
                const digits = asset?.digits || 4;

                return (
                  <div
                    key={sym}
                    className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-4 shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div
                        onClick={() => onNavigate(`/markets/${sym.replace('/', '-')}`)}
                        className="cursor-pointer"
                      >
                        <h4 className="font-bold font-mono text-slate-100 text-lg hover:text-blue-400 transition">
                          {sym}
                        </h4>
                        <span className="text-[11px] text-slate-400">{asset?.name || 'Forex Pair'}</span>
                      </div>

                      <button
                        onClick={() => handleRemoveFromWatchlist(sym)}
                        className="text-slate-500 hover:text-rose-400 transition p-1"
                        title="Remove from watchlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {quote ? (
                      <div className="flex items-end justify-between font-mono">
                        <div>
                          <div className="text-slate-500 text-[10px]">Live Price</div>
                          <div className="text-xl font-extrabold text-slate-100">
                            {quote.price.toFixed(digits)}
                          </div>
                        </div>

                        <PriceChange
                          change={quote.change24h}
                          changePercent={quote.change24hPercent}
                          digits={digits}
                          size="sm"
                        />
                      </div>
                    ) : (
                      <div className="text-xs font-mono text-slate-500">Connecting interbank stream...</div>
                    )}

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                      <button
                        onClick={() => onNavigate(`/markets/${sym.replace('/', '-')}`)}
                        className="text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                      >
                        Terminal View &rarr;
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. ALERTS VIEW */}
      {activeTab === 'alerts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 font-mono text-sm uppercase tracking-wider">
              Configured Real-Time Price Triggers
            </h3>
            <button
              onClick={() => onNavigate('/markets')}
              className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
            >
              <Plus size={13} /> Set New Trigger
            </button>
          </div>

          <div className="space-y-3">
            {alerts.map(al => (
              <div
                key={al.id}
                className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm">
                    <Bell size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-mono text-slate-100 text-base">{al.symbol}</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {al.condition} {al.targetValue}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{al.note}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    ARMED
                  </span>
                  <button
                    onClick={() => handleDeleteAlert(al.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. SAVED BOOKMARKS */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-100 font-mono text-sm uppercase tracking-wider">
            Saved Intelligence & Research
          </h3>

          <div className="space-y-3">
            {savedAnalyses.map(an => (
              <div
                key={an.id}
                onClick={() => onNavigate(`/market-analysis/${an.slug}`)}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 transition cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-blue-400">
                    <span>{an.symbol}</span>
                    <span>•</span>
                    <span>{an.bias}</span>
                    <span>•</span>
                    <span>{an.publishedAt}</span>
                  </div>
                  <h4 className="font-bold text-slate-100 text-base mt-1">{an.title}</h4>
                </div>
                <ArrowRight size={18} className="text-slate-500" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
