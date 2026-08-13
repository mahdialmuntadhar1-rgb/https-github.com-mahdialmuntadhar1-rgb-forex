import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { SignalSetup, SignalStatus } from '../types';
import { contentService } from '../services/contentApi';
import { 
  Target, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Archive, 
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Percent
} from 'lucide-react';

interface SignalsPageProps {
  onNavigate: (path: string) => void;
}

export const SignalsPage: React.FC<SignalsPageProps> = ({ onNavigate }) => {
  const { t, direction } = useTranslation();
  const [signals, setSignals] = useState<SignalSetup[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedAsset, setSelectedAsset] = useState<string>('ALL');

  useEffect(() => {
    const load = async () => {
      const list = await contentService.getSignals();
      setSignals(list);
    };
    load();
  }, []);

  const filtered = signals.filter(s => {
    const matchesStatus = selectedStatus === 'ALL' || s.status === selectedStatus;
    const matchesAsset = selectedAsset === 'ALL' || s.symbol === selectedAsset;
    return matchesStatus && matchesAsset;
  });

  const uniqueAssets = ['ALL', ...Array.from(new Set(signals.map(s => s.symbol)))];

  const getStatusBadge = (status: SignalStatus) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <Zap size={12} className="animate-pulse" /> ACTIVE
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/40">
            <CheckCircle2 size={12} /> TARGET HIT
          </span>
        );
      case 'INVALIDATED':
        return (
          <span className="flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/40">
            <XCircle size={12} /> INVALIDATED (SL)
          </span>
        );
      case 'ARCHIVED':
        return (
          <span className="flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-800 text-slate-400">
            <Archive size={12} /> ARCHIVED
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-950 border border-amber-500/20 rounded-3xl p-6 sm:p-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
          <Target size={14} className="text-amber-400" /> Systematic Trading Setups
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          {t('signals.activeSetups')} & Execution Framework
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Probabilistic market hypotheses based on institutional liquidity pools, session momentum, and strict risk-reward parameters. Every setup contains non-negotiable invalidation levels.
        </p>

        {/* Regulatory Risk Notice */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5 max-w-3xl">
          <ShieldCheck size={16} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            {t('signals.disclaimer')}
          </p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Status Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {['ALL', 'ACTIVE', 'COMPLETED', 'INVALIDATED'].map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer ${
                selectedStatus === status
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {status === 'ALL' ? 'All Setups' : status}
            </button>
          ))}
        </div>

        {/* Asset Filter */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {uniqueAssets.map(asset => (
            <button
              key={asset}
              onClick={() => setSelectedAsset(asset)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono transition cursor-pointer ${
                selectedAsset === asset
                  ? 'bg-slate-800 text-amber-400 font-bold border border-amber-500/30'
                  : 'bg-slate-950 text-slate-500 hover:text-slate-300'
              }`}
            >
              {asset}
            </button>
          ))}
        </div>
      </div>

      {/* Setups List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map(setup => {
          const isBuy = setup.type === 'BUY';

          return (
            <div
              key={setup.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xl font-extrabold text-slate-100">
                      {setup.symbol}
                    </span>
                    <span
                      className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded-md ${
                        isBuy
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {setup.type} ({setup.timeframe})
                    </span>
                  </div>

                  {getStatusBadge(setup.status)}
                </div>

                {/* Main Execution Parameters Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Entry Zone</span>
                    <strong className="text-slate-200 text-xs sm:text-sm">{setup.entryZone.join(' - ')}</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[10px] block">Target 1 (TP1)</span>
                    <strong className="text-emerald-400 text-xs sm:text-sm">{setup.target1}</strong>
                  </div>

                  {setup.target2 && (
                    <div>
                      <span className="text-slate-500 text-[10px] block">Target 2 (TP2)</span>
                      <strong className="text-emerald-300 text-xs sm:text-sm">{setup.target2}</strong>
                    </div>
                  )}

                  <div>
                    <span className="text-slate-500 text-[10px] block">Invalidation (SL)</span>
                    <strong className="text-rose-400 text-xs sm:text-sm">{setup.stopLoss}</strong>
                  </div>
                </div>

                {/* Setup Reasoning & Context */}
                <div className="space-y-1.5">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                    Setup Rationale:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {setup.reasoning}
                  </p>
                </div>

                {/* Risk-Reward & Metrics */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                  <span>Risk / Reward: <strong className="text-slate-200">{setup.riskRewardRatio}</strong></span>
                  <span>Confidence: <strong className="text-emerald-400">{setup.confidenceScore}%</strong></span>
                  <span>Max Risk: <strong className="text-amber-400">{setup.riskPercent}%</strong></span>
                  {setup.pipsGained !== undefined && (
                    <span className={setup.pipsGained >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      Result: <strong>{setup.pipsGained >= 0 ? `+${setup.pipsGained}` : setup.pipsGained} pips</strong>
                    </span>
                  )}
                </div>
              </div>

              {/* Footer / Terminal Link */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Issued: {setup.createdAt}</span>
                <button
                  onClick={() => onNavigate(`/markets/${setup.symbol.replace('/', '-')}`)}
                  className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  Inspect Terminal Chart <ArrowRight size={13} className={direction === 'rtl' ? 'rotate-180' : ''} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
