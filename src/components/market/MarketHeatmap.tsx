import React from 'react';
import { useTranslation } from '../../context/LanguageContext';

export const MarketHeatmap: React.FC = () => {
  const { t } = useTranslation();

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'AUD', 'CAD', 'NZD'];

  // Matrix values: relative % performance base vs quote
  const matrix: Record<string, Record<string, number>> = {
    USD: { USD: 0, EUR: -0.42, GBP: +0.18, JPY: +0.31, CHF: +0.12, AUD: -0.27, CAD: +0.09, NZD: -0.20 },
    EUR: { USD: +0.42, EUR: 0, GBP: +0.60, JPY: +0.73, CHF: +0.54, AUD: +0.15, CAD: +0.51, NZD: +0.22 },
    GBP: { USD: -0.18, EUR: -0.60, GBP: 0, JPY: +0.12, CHF: -0.06, AUD: -0.45, CAD: -0.09, NZD: -0.38 },
    JPY: { USD: -0.31, EUR: -0.73, GBP: -0.12, JPY: 0, CHF: -0.18, AUD: -0.58, CAD: -0.22, NZD: -0.51 },
    CHF: { USD: -0.12, EUR: -0.54, GBP: +0.06, JPY: +0.18, CHF: 0, AUD: -0.39, CAD: -0.03, NZD: -0.32 },
    AUD: { USD: +0.27, EUR: -0.15, GBP: +0.45, JPY: +0.58, CHF: +0.39, AUD: 0, CAD: +0.36, NZD: +0.07 },
    CAD: { USD: -0.09, EUR: -0.51, GBP: +0.09, JPY: +0.22, CHF: +0.03, AUD: -0.36, CAD: 0, NZD: -0.29 },
    NZD: { USD: +0.20, EUR: -0.22, GBP: +0.38, JPY: +0.51, CHF: +0.32, AUD: -0.07, CAD: +0.29, NZD: 0 }
  };

  const getHeatmapColor = (val: number) => {
    if (val === 0) return 'bg-slate-900 text-slate-600';
    if (val > 0.5) return 'bg-emerald-500/35 text-emerald-300 font-bold border border-emerald-500/40';
    if (val > 0.2) return 'bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30';
    if (val > 0) return 'bg-emerald-500/10 text-emerald-400/90';
    if (val < -0.5) return 'bg-rose-500/35 text-rose-300 font-bold border border-rose-500/40';
    if (val < -0.2) return 'bg-rose-500/20 text-rose-400 font-semibold border border-rose-500/30';
    return 'bg-rose-500/10 text-rose-400/90';
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="font-bold text-slate-100 text-lg">{t('heatmap.title')}</h3>
          <p className="text-xs text-slate-400">{t('heatmap.subtitle')}</p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-3 h-3 rounded-xs bg-emerald-500/30 border border-emerald-500/50 inline-block"></span>
            {t('heatmap.legendGreen')}
          </span>
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="w-3 h-3 rounded-xs bg-rose-500/30 border border-rose-500/50 inline-block"></span>
            {t('heatmap.legendRed')}
          </span>
        </div>
      </div>

      {/* Heatmap Matrix Table */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-center border-collapse min-w-[500px]" dir="ltr">
          <thead>
            <tr>
              <th className="p-2 text-xs font-mono font-bold text-slate-500 bg-slate-950/40 rounded-tl-lg">
                Base \ Quote
              </th>
              {currencies.map(c => (
                <th key={c} className="p-2 text-xs font-mono font-bold text-slate-300 bg-slate-950/60">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currencies.map(base => (
              <tr key={base} className="border-t border-slate-800/60">
                <td className="p-2 text-xs font-mono font-bold text-slate-200 bg-slate-950/60 text-left">
                  {base}
                </td>
                {currencies.map(quote => {
                  const val = matrix[base]?.[quote] || 0;
                  const isDiag = base === quote;

                  return (
                    <td key={quote} className="p-1">
                      <div
                        className={`py-2 px-1 rounded-md font-mono text-xs transition-transform hover:scale-105 ${
                          isDiag ? 'bg-slate-950/40 text-slate-600' : getHeatmapColor(val)
                        }`}
                      >
                        {isDiag ? '—' : `${val > 0 ? '+' : ''}${val.toFixed(2)}%`}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
