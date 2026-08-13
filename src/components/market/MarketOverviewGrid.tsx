import React, { useState, useEffect } from 'react';
import { Asset, Quote, AssetCategory } from '../../types';
import { marketApi } from '../../services/marketApi';
import { userService } from '../../services/userApi';
import { useTranslation } from '../../context/LanguageContext';
import { PriceChange } from '../common/PriceChange';
import { Sparkline } from '../common/Sparkline';
import { Star, ChevronRight, Activity, TrendingUp } from 'lucide-react';

interface MarketOverviewGridProps {
  onSelectAsset: (symbol: string) => void;
  limit?: number;
  featuredOnly?: boolean;
}

export const MarketOverviewGrid: React.FC<MarketOverviewGridProps> = ({
  onSelectAsset,
  limit,
  featuredOnly = false
}) => {
  const { t } = useTranslation();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    const fetchBase = async () => {
      const assetList = await marketApi.getAssets();
      setAssets(assetList);
      const initialQ = await marketApi.getQuotes();
      setQuotes(initialQ);
      const wl = await userService.getWatchlist();
      setWatchlist(wl);
    };

    fetchBase();

    const unsubscribe = marketApi.subscribeToTicks(latestQuotes => {
      setQuotes(latestQuotes);
    });

    return () => unsubscribe();
  }, []);

  const handleToggleWatchlist = async (e: React.MouseEvent, symbol: string) => {
    e.stopPropagation();
    const isAdded = await userService.toggleWatchlist(symbol);
    setWatchlist(prev => (isAdded ? [...prev, symbol] : prev.filter(s => s !== symbol)));
  };

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: t('marketOverview.all') },
    { id: 'forex_major', label: t('marketOverview.majors') },
    { id: 'forex_minor', label: t('marketOverview.minors') },
    { id: 'metals', label: t('marketOverview.metals') },
    { id: 'indices', label: t('marketOverview.indices') }
  ];

  let filteredAssets = assets.filter(a => {
    if (selectedCategory === 'all') return true;
    return a.category === selectedCategory;
  });

  if (featuredOnly) {
    filteredAssets = filteredAssets.filter(a => 
      ['EUR/USD', 'GBP/USD', 'USD/JPY', 'XAU/USD', 'DXY', 'USD/CHF', 'AUD/USD', 'USD/CAD'].includes(a.symbol)
    );
  }

  if (limit) {
    filteredAssets = filteredAssets.slice(0, limit);
  }

  return (
    <div className="w-full space-y-4">
      {/* Category Pills */}
      {!featuredOnly && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Grid of Asset Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {filteredAssets.map(asset => {
          const quote = quotes[asset.id] || {
            symbol: asset.symbol,
            id: asset.id,
            price: 1.0,
            previousClose: 1.0,
            bid: 0.9999,
            ask: 1.0001,
            spread: 0.1,
            change24h: 0,
            change24hPercent: 0,
            high24h: 1.01,
            low24h: 0.99,
            volume24h: '50B',
            status: 'OPEN' as const,
            lastUpdated: 'Now',
            isDelayed: false,
            sparkline: [1, 1, 1, 1, 1]
          };

          const isWatchlisted = watchlist.includes(asset.symbol);
          const isGold = asset.symbol.includes('XAU') || asset.symbol === 'DXY';
          const digits = asset.digits;

          return (
            <div
              key={asset.id}
              onClick={() => onSelectAsset(asset.id)}
              className="group relative bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/40 rounded-xl p-4 transition-all duration-300 shadow-lg hover:shadow-blue-500/5 cursor-pointer flex flex-col justify-between select-none"
            >
              {/* Header: Symbol, Name, Star */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-slate-100 group-hover:text-blue-400 transition">
                      {asset.symbol}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs bg-slate-800 text-slate-400 border border-slate-700/60">
                      {quote.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 truncate max-w-[150px]">
                    {asset.name}
                  </div>
                </div>

                <button
                  onClick={e => handleToggleWatchlist(e, asset.symbol)}
                  title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
                  className={`p-1.5 rounded-lg transition ${
                    isWatchlisted
                      ? 'text-amber-400 bg-amber-400/10 hover:bg-amber-400/20'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Star size={16} fill={isWatchlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Price and Sparkline Row */}
              <div className="flex items-end justify-between gap-2 my-2">
                <div>
                  <div className="font-mono text-xl font-extrabold text-slate-100 tracking-tight">
                    {quote.price.toFixed(digits)}
                  </div>
                  <PriceChange
                    change={quote.change24h}
                    changePercent={quote.change24hPercent}
                    digits={digits}
                    showPercentOnly={true}
                    size="sm"
                    className="mt-1"
                  />
                </div>

                <div className="shrink-0">
                  <Sparkline
                    data={quote.sparkline}
                    width={90}
                    height={32}
                    isPositive={quote.change24h >= 0}
                  />
                </div>
              </div>

              {/* Metrics Footer (High/Low, Spread) */}
              <div className="pt-3 mt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span>H: <strong className="text-slate-300">{quote.high24h.toFixed(digits)}</strong></span>
                  <span>L: <strong className="text-slate-300">{quote.low24h.toFixed(digits)}</strong></span>
                </div>
                <div className="flex items-center gap-1 text-blue-400 group-hover:translate-x-1 transition-transform">
                  <span>Sp: {quote.spread}</span>
                  <ChevronRight size={13} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
