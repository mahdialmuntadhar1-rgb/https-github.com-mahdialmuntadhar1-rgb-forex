import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import { MarketOverviewGrid } from '../components/market/MarketOverviewGrid';
import { MarketHeatmap } from '../components/market/MarketHeatmap';
import { CurrencyStrengthMeter } from '../components/market/CurrencyStrengthMeter';
import { TradingSessionsClock } from '../components/market/TradingSessionsClock';
import { ShieldCheck, TrendingUp, Compass, ArrowRight } from 'lucide-react';

interface ForexPageProps {
  onNavigate: (path: string) => void;
}

export const ForexPage: React.FC<ForexPageProps> = ({ onNavigate }) => {
  const { t, direction } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
          <Compass size={14} /> Currency Market Hub
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Forex Intelligence & Major Crosses
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Real-time institutional liquidity metrics, currency correlation matrices, session overlaps, and systematic technical analysis for the G8 currencies.
        </p>
      </div>

      {/* Trading Sessions */}
      <TradingSessionsClock />

      {/* Heatmap & Currency Strength */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <MarketHeatmap />
        </div>
        <div className="lg:col-span-5">
          <CurrencyStrengthMeter />
        </div>
      </div>

      {/* Majors & Minors Catalog */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-100 font-mono">Forex Pairs Catalog</h2>
        <MarketOverviewGrid onSelectAsset={id => onNavigate(`/markets/${id}`)} />
      </div>
    </div>
  );
};
