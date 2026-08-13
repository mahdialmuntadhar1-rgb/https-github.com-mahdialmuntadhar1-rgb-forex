import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Asset, Quote, AssetCategory } from '../types';
import { marketApi } from '../services/marketApi';
import { userService } from '../services/userApi';
import { Sparkline } from '../components/common/Sparkline';
import { PriceChange } from '../components/common/PriceChange';
import { Search, Star, ArrowUpRight, ArrowDownRight, ChevronRight, SlidersHorizontal, RefreshCw } from 'lucide-react';

interface MarketsPageProps {
  onNavigate: (path: string) => void;
}

export const MarketsPage: React.FC<MarketsPageProps> = ({ onNavigate }) => {
  const { t, direction } = useTranslation();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'symbol' | 'change' | 'price' | 'spread'>('symbol');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const load = async () => {
      const allAssets = await marketApi.getAssets();
      setAssets(allAssets);
      const q = await marketApi.getQuotes();
      setQuotes(q);
      const wl = await userService.getWatchlist();
      setWatchlist(wl);
    };
    load();

    const unsub = marketApi.subscribeToTicks(latestQuotes => {
      setQuotes(latestQuotes);
    });

    return () => unsub();
  }, []);

  const handleToggleWatchlist = async (e: React.MouseEvent, symbol: string) => {
    e.stopPropagation();
    const added = await userService.toggleWatchlist(symbol);
    setWatchlist(prev => (added ? [...prev, symbol] : prev.filter(s => s !== symbol)));
  };

  const categories = [
    { id: 'all', label: t('marketOverview.all') },
    { id: 'forex_major', label: t('marketOverview.majors') },
    { id: 'forex_minor', label: t('marketOverview.minors') },
    { id: 'metals', label: t('marketOverview.metals') },
    { id: 'indices', label: t('marketOverview.indices') }
  ];

  let filtered = assets.filter(a => {
    const matchesCat = selectedCategory === 'all' || a.category === selectedCategory;
    const matchesQuery = a.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  filtered.sort((a, b) => {
    const qA = quotes[a.id];
    const qB = quotes[b.id];
    if (sortBy === 'symbol') {
      return sortOrder === 'asc' ? a.symbol.localeCompare(b.symbol) : b.symbol.localeCompare(a.symbol);
    }
    if (sortBy === 'price') {
      const pA = qA ? qA.price : 0;
      const pB = qB ? qB.price : 0;
      return sortOrder === 'asc' ? pA - pB : pB - pA;
    }
    if (sortBy === 'change') {
      const cA = qA ? qA.change24hPercent : 0;
      const cB = qB ? qB.change24hPercent : 0;
      return sortOrder === 'asc' ? cA - cB : cB - cA;
    }
    if (sortBy === 'spread') {
      const sA = qA ? qA.spread : 0;
      const sB = qB ? qB.spread : 0;
      return sortOrder === 'asc' ? sA - sB : sB - sA;
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            {t('nav.markets')} Intelligence
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time interbank currency rates, precious metals, and index metrics with institutional spreads.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Filter symbols..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
          />
        </div>
      </div>

      {/* Categories & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="bg-transparent text-slate-200 focus:outline-hidden cursor-pointer"
          >
            <option value="symbol" className="bg-slate-900">Symbol</option>
            <option value="price" className="bg-slate-900">Price</option>
            <option value="change" className="bg-slate-900">24h Change %</option>
            <option value="spread" className="bg-slate-900">Spread</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="text-blue-400 hover:text-blue-300 font-bold px-1"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Main Table Layout */}
      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-xs font-mono text-slate-400">
                <th className="py-3.5 px-4 w-10 text-center">★</th>
                <th className="py-3.5 px-4">Asset</th>
                <th className="py-3.5 px-4 text-right">Price</th>
                <th className="py-3.5 px-4 text-right">24h Change</th>
                <th className="py-3.5 px-4 text-right">Bid / Ask</th>
                <th className="py-3.5 px-4 text-right">Spread</th>
                <th className="py-3.5 px-4 text-center">24h Trend</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
              {filtered.map(asset => {
                const quote = quotes[asset.id] || {
                  price: 1.0,
                  bid: 0.9999,
                  ask: 1.0001,
                  spread: 0.2,
                  change24h: 0,
                  change24hPercent: 0,
                  high24h: 1.01,
                  low24h: 0.99,
                  sparkline: [1, 1, 1, 1, 1]
                };

                const isWatchlisted = watchlist.includes(asset.symbol);
                const digits = asset.digits;

                return (
                  <tr
                    key={asset.id}
                    onClick={() => onNavigate(`/markets/${asset.id}`)}
                    className="hover:bg-slate-850/80 transition cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={e => handleToggleWatchlist(e, asset.symbol)}
                        className={`p-1 rounded-md transition ${
                          isWatchlisted
                            ? 'text-amber-400 hover:text-amber-300'
                            : 'text-slate-600 hover:text-slate-400'
                        }`}
                      >
                        <Star size={15} fill={isWatchlisted ? 'currentColor' : 'none'} />
                      </button>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-slate-200 group-hover:bg-blue-600 group-hover:text-white transition">
                          {asset.symbol.split('/')[0] || asset.symbol.slice(0, 3)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-100 text-sm group-hover:text-blue-400 transition">
                            {asset.symbol}
                          </div>
                          <div className="text-[11px] text-slate-400 font-sans">
                            {asset.name}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-bold text-slate-100 text-sm">
                      {quote.price.toFixed(digits)}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <PriceChange
                        change={quote.change24h}
                        changePercent={quote.change24hPercent}
                        digits={digits}
                        size="sm"
                      />
                    </td>

                    <td className="py-3.5 px-4 text-right text-slate-300">
                      <span>{quote.bid.toFixed(digits)}</span>
                      <span className="text-slate-600 mx-1">/</span>
                      <span>{quote.ask.toFixed(digits)}</span>
                    </td>

                    <td className="py-3.5 px-4 text-right text-slate-400">
                      {quote.spread} pips
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <Sparkline
                        data={quote.sparkline}
                        width={80}
                        height={24}
                        isPositive={quote.change24h >= 0}
                      />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-blue-400 font-medium group-hover:translate-x-1 transition-transform">
                        Terminal <ChevronRight size={13} />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
