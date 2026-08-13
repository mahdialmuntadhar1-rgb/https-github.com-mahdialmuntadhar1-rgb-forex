import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { MarketAnalysis } from '../types';
import { contentService } from '../services/contentApi';
import { userService } from '../services/userApi';
import { Search, Bookmark, ArrowRight, TrendingUp, Calendar, Clock } from 'lucide-react';

interface MarketAnalysisPageProps {
  onNavigate: (path: string) => void;
}

export const MarketAnalysisPage: React.FC<MarketAnalysisPageProps> = ({ onNavigate }) => {
  const { t, direction } = useTranslation();
  const [analyses, setAnalyses] = useState<MarketAnalysis[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBias, setSelectedBias] = useState<string>('ALL');
  const [selectedAsset, setSelectedAsset] = useState<string>('ALL');

  useEffect(() => {
    const load = async () => {
      const all = await contentService.getAnalyses();
      setAnalyses(all);
      const saved = await userService.getSavedAnalyses();
      setSavedIds(saved);
    };
    load();
  }, []);

  const handleToggleSave = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const added = await userService.toggleSaveAnalysis(id);
    setSavedIds(prev => (added ? [...prev, id] : prev.filter(x => x !== id)));
  };

  const filtered = analyses.filter(a => {
    const matchesQuery =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesBias = selectedBias === 'ALL' || a.bias === selectedBias;
    const matchesAsset = selectedAsset === 'ALL' || a.symbol === selectedAsset;
    return matchesQuery && matchesBias && matchesAsset;
  });

  const uniqueSymbols = ['ALL', ...Array.from(new Set(analyses.map(a => a.symbol)))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            {t('analysis.title')}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            In-depth macro breakdowns, multi-timeframe chart architecture, and systematic technical setups.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search analyses or tags..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
          />
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Bias Filters */}
        <div className="flex items-center gap-2">
          {['ALL', 'BULLISH', 'BEARISH', 'NEUTRAL'].map(bias => (
            <button
              key={bias}
              onClick={() => setSelectedBias(bias)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer ${
                selectedBias === bias
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {bias}
            </button>
          ))}
        </div>

        {/* Asset Filter */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {uniqueSymbols.map(sym => (
            <button
              key={sym}
              onClick={() => setSelectedAsset(sym)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono transition cursor-pointer ${
                selectedAsset === sym
                  ? 'bg-slate-800 text-blue-400 font-bold border border-blue-500/30'
                  : 'bg-slate-950 text-slate-500 hover:text-slate-300'
              }`}
            >
              {sym}
            </button>
          ))}
        </div>
      </div>

      {/* Analyses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => {
          const isSaved = savedIds.includes(item.id);
          const isBullish = item.bias === 'BULLISH';
          const isBearish = item.bias === 'BEARISH';

          return (
            <div
              key={item.id}
              onClick={() => onNavigate(`/market-analysis/${item.slug}`)}
              className="group bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/40 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.chartImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-1 rounded-md bg-slate-950/80 backdrop-blur-xs text-white border border-slate-800">
                      {item.symbol}
                    </span>
                    <span
                      className={`font-mono text-xs font-bold px-2 py-1 rounded-md backdrop-blur-xs ${
                        isBullish
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                          : isBearish
                          ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                          : 'bg-slate-900/80 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {item.bias} ({item.timeframe})
                    </span>
                  </div>

                  <button
                    onClick={e => handleToggleSave(e, item.id)}
                    title={isSaved ? 'Remove Bookmark' : 'Save Bookmark'}
                    className={`absolute top-3 right-3 p-1.5 rounded-lg backdrop-blur-xs transition ${
                      isSaved
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {item.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {item.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-100 text-base group-hover:text-blue-400 transition leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {item.subtitle}
                  </p>

                  {/* Key Levels Pill */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800 text-[11px] font-mono">
                    <div>
                      <span className="text-slate-500 text-[10px]">Support</span>
                      <div className="font-bold text-emerald-400">{item.keyLevels.support1}</div>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px]">Resistance</span>
                      <div className="font-bold text-rose-400">{item.keyLevels.resistance1}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <img
                    src={item.author.avatar}
                    alt={item.author.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="text-[11px]">{item.author.name}</span>
                </div>

                <span className="text-blue-400 font-mono font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read <ArrowRight size={12} className={direction === 'rtl' ? 'rotate-180' : ''} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
