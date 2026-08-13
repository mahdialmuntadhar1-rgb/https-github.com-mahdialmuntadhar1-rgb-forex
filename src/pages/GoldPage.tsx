import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { InteractiveChart } from '../components/common/InteractiveChart';
import { MarketAnalysis, SignalSetup, Quote } from '../types';
import { contentService } from '../services/contentApi';
import { marketApi } from '../services/marketApi';
import { PriceChange } from '../components/common/PriceChange';
import { 
  Sparkles, 
  Coins, 
  TrendingUp, 
  ShieldCheck, 
  Landmark, 
  Layers, 
  Flame, 
  ArrowRight,
  Bell
} from 'lucide-react';

interface GoldPageProps {
  onNavigate: (path: string) => void;
}

export const GoldPage: React.FC<GoldPageProps> = ({ onNavigate }) => {
  const { t, direction } = useTranslation();
  const [goldQuote, setGoldQuote] = useState<Quote | null>(null);
  const [goldAnalyses, setGoldAnalyses] = useState<MarketAnalysis[]>([]);
  const [goldSignals, setGoldSignals] = useState<SignalSetup[]>([]);

  useEffect(() => {
    const load = async () => {
      const q = await marketApi.getQuote('XAU-USD');
      setGoldQuote(q);

      const analyses = await contentService.getAnalyses();
      setGoldAnalyses(analyses.filter(a => a.symbol.includes('XAU') || a.symbol.includes('Gold')));

      const signals = await contentService.getSignals();
      setGoldSignals(signals.filter(s => s.symbol.includes('XAU') || s.symbol.includes('Gold')));
    };

    load();

    const unsub = marketApi.subscribeToTicks(quotes => {
      if (quotes['XAU-USD']) {
        setGoldQuote(quotes['XAU-USD']);
      }
    });

    return () => unsub();
  }, []);

  const price = goldQuote ? goldQuote.price : 3412.50;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <Sparkles size={14} className="text-amber-400" /> Precious Metals Intelligence
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-mono tracking-tight">
                Gold (XAU/USD) Strategic Hub
              </h1>
              <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
                Institutional macro drivers, central bank bullion acquisitions, real yield correlations, and intraday liquidity levels for physical and spot Gold.
              </p>
            </div>

            {goldQuote && (
              <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 font-mono">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Spot Gold</div>
                  <div className="text-2xl font-extrabold text-amber-400">
                    ${goldQuote.price.toFixed(2)}
                  </div>
                </div>
                <PriceChange
                  change={goldQuote.change24h}
                  changePercent={goldQuote.change24hPercent}
                  digits={2}
                  size="sm"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Terminal Chart */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-200 font-mono text-sm">XAU/USD Live Technical Canvas</h3>
          <span className="text-xs font-mono text-slate-400">S1: $3,390 | R1: $3,438 | ATH Pivot: $3,450</span>
        </div>
        <InteractiveChart
          symbol="XAU/USD"
          height={480}
          supportLevel={3390.0}
          resistanceLevel={3438.0}
        />
      </div>

      {/* Macro Fundamentals & Central Bank Dynamics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold font-mono text-sm">
            <Landmark size={18} /> Central Bank Reserves
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Global central banks added over 1,000 metric tons in consecutive fiscal periods. Structural de-dollarization and FX reserve diversification provide an institutional floor under long-term pullbacks.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-blue-400 font-bold font-mono text-sm">
            <Layers size={18} /> Real Yield Correlation
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            US 10-Year TIPS yields demonstrate historical inverse elasticity with Gold. As market projections price in terminal rate cuts, the opportunity cost of holding non-yielding bullion diminishes.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono text-sm">
            <Flame size={18} /> Liquidity & Invalidation
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            High volatility during the London/NY overlap requires strictly defined risk parameters. Key structural invalidation is anchored at the $3,365 swing pivot.
          </p>
        </div>
      </div>

      {/* Gold Analysis & Active Setups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Setups */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-100 font-mono text-base flex items-center gap-2">
            <TrendingUp size={18} className="text-amber-400" /> Active Gold Setups
          </h3>
          {goldSignals.length === 0 ? (
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-500 text-center">
              No active Gold setups at this moment. Waiting for higher timeframe confluence.
            </div>
          ) : (
            goldSignals.map(sig => (
              <div
                key={sig.id}
                onClick={() => onNavigate('/signals')}
                className="p-5 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/40 transition cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-100">{sig.type} Setup</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {sig.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{sig.reasoning}</p>
                <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-2 rounded-xl text-xs font-mono">
                  <div>
                    <span className="text-slate-500 text-[10px]">Entry</span>
                    <div className="font-bold text-slate-200">{sig.entryZone.join('-')}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px]">Target</span>
                    <div className="font-bold text-emerald-400">{sig.target1}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px]">Stop</span>
                    <div className="font-bold text-rose-400">{sig.stopLoss}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Analyses */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-100 font-mono text-base flex items-center gap-2">
            <Coins size={18} className="text-amber-400" /> Deep Dive Gold Reports
          </h3>
          <div className="space-y-3">
            {goldAnalyses.map(an => (
              <div
                key={an.id}
                onClick={() => onNavigate(`/market-analysis/${an.slug}`)}
                className="p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/40 transition cursor-pointer flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-amber-400">{an.bias} • {an.timeframe}</span>
                  <h4 className="font-bold text-slate-100 text-sm mt-0.5">{an.title}</h4>
                </div>
                <ArrowRight size={16} className="text-slate-500 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
