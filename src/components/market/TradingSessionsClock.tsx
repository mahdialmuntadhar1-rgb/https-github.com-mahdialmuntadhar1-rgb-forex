import React, { useState, useEffect } from 'react';
import { MarketSession } from '../../types';
import { marketApi } from '../../services/marketApi';
import { useTranslation } from '../../context/LanguageContext';
import { Clock, Globe, Zap } from 'lucide-react';

export const TradingSessionsClock: React.FC = () => {
  const { t } = useTranslation();
  const [sessions, setSessions] = useState<MarketSession[]>([]);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = async () => {
      const sess = await marketApi.getTradingSessions();
      setSessions(sess);
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const hasOverlap = sessions.some(s => s.isOverlap && s.isOpen);

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="font-bold text-slate-100 text-lg flex items-center gap-2">
            <Globe size={18} className="text-blue-400" />
            {t('sessions.title')}
          </h3>
          <p className="text-xs text-slate-400">{t('sessions.subtitle')}</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/70 px-3 py-1.5 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
          <Clock size={14} className="text-blue-400" />
          <span>Local: <strong>{currentTime}</strong></span>
        </div>
      </div>

      {/* High Liquidity Overlap Alert */}
      {hasOverlap && (
        <div className="mb-4 flex items-center gap-2.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
          <Zap size={16} className="text-amber-400 shrink-0 animate-bounce" />
          <div>
            <strong>{t('sessions.overlapNotice')}:</strong> {t('sessions.londonNewYork')}
          </div>
        </div>
      )}

      {/* 4 Major Sessions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {sessions.map(s => {
          return (
            <div
              key={s.name}
              className={`p-3.5 rounded-xl border transition-all ${
                s.isOpen
                  ? s.isOverlap
                    ? 'bg-amber-950/20 border-amber-500/30 shadow-md shadow-amber-500/5'
                    : 'bg-emerald-950/20 border-emerald-500/30'
                  : 'bg-slate-950/40 border-slate-800/80 opacity-75'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-bold text-slate-200 text-sm">{s.name}</span>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    s.isOpen
                      ? s.isOverlap
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {s.isOpen ? t('common.open') : t('common.closed')}
                </span>
              </div>

              <div className="text-xs text-slate-400 font-mono flex items-center justify-between">
                <span>{s.city}, {s.country}</span>
                <span>{s.openUtc}:00-{s.closeUtc}:00 UTC</span>
              </div>

              {/* Progress bar if open */}
              {s.isOpen && (
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>{t('sessions.sessionProgress')}</span>
                    <span>{s.progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        s.isOverlap ? 'bg-amber-400' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${s.progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
