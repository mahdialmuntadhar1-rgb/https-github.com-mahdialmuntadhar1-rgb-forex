import React, { useState, useEffect } from 'react';
import { CurrencyStrength } from '../../types';
import { marketApi } from '../../services/marketApi';
import { useTranslation } from '../../context/LanguageContext';
import { ArrowUp, ArrowDown, Activity, Sparkles } from 'lucide-react';

export const CurrencyStrengthMeter: React.FC = () => {
  const { t } = useTranslation();
  const [strengths, setStrengths] = useState<CurrencyStrength[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await marketApi.getCurrencyStrength();
      // Sort highest to lowest
      data.sort((a, b) => b.score - a.score);
      setStrengths(data);
    };
    load();
  }, []);

  const strongest = strengths.length > 0 ? strengths[0] : null;
  const weakest = strengths.length > 0 ? strengths[strengths.length - 1] : null;

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-bold text-slate-100 text-lg flex items-center gap-2">
              <Activity size={18} className="text-blue-400" />
              {t('currencyStrength.title')}
            </h3>
            <p className="text-xs text-slate-400">{t('currencyStrength.subtitle')}</p>
          </div>
        </div>

        {/* Currency Bars */}
        <div className="space-y-3 my-4">
          {strengths.map(c => {
            const isTop = c.score >= 70;
            const isBottom = c.score <= 40;

            const barColor = isTop
              ? 'bg-emerald-500'
              : isBottom
              ? 'bg-rose-500'
              : 'bg-blue-500';

            return (
              <div key={c.currency} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-slate-200">{c.currency}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-medium">{c.score} / 100</span>
                    {c.momentum === 'increasing' && <ArrowUp size={12} className="text-emerald-400" />}
                    {c.momentum === 'decreasing' && <ArrowDown size={12} className="text-rose-400" />}
                  </div>
                </div>

                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${barColor}`}
                    style={{ width: `${c.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Highlights & Potential Setup Callout */}
      {strongest && weakest && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 bg-slate-950/40 -mx-2 -mb-2 p-3 rounded-xl">
          <div className="text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-400" />
            {t('currencyStrength.potentialPairs')}
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {strongest.currency}/{weakest.currency} (Bullish Bias)
            </span>
            <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20">
              {weakest.currency}/{strongest.currency} (Bearish Bias)
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 italic">
            {t('currencyStrength.disclaimer')}
          </p>
        </div>
      )}
    </div>
  );
};
