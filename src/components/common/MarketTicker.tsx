import React, { useState, useEffect, useRef } from 'react';
import { Quote } from '../../types';
import { marketApi } from '../../services/marketApi';
import { useTranslation } from '../../context/LanguageContext';
import { ArrowUpRight, ArrowDownRight, Radio } from 'lucide-react';

interface MarketTickerProps {
  onSelectSymbol?: (symbol: string) => void;
}

export const MarketTicker: React.FC<MarketTickerProps> = ({ onSelectSymbol }) => {
  const { t } = useTranslation();
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});
  const [flashingKeys, setFlashingKeys] = useState<Record<string, 'up' | 'down'>>({});
  const prevPricesRef = useRef<Record<string, number>>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initial fetch
    marketApi.getQuotes().then(initial => {
      setQuotes(initial);
      const priceMap: Record<string, number> = {};
      Object.entries(initial).forEach(([k, q]) => {
        priceMap[k] = q.price;
      });
      prevPricesRef.current = priceMap;
    });

    const unsubscribe = marketApi.subscribeToTicks(newQuotes => {
      const flashes: Record<string, 'up' | 'down'> = {};
      
      Object.entries(newQuotes).forEach(([key, quote]) => {
        const oldPrice = prevPricesRef.current[key];
        if (oldPrice !== undefined) {
          if (quote.price > oldPrice) flashes[key] = 'up';
          else if (quote.price < oldPrice) flashes[key] = 'down';
        }
        prevPricesRef.current[key] = quote.price;
      });

      if (Object.keys(flashes).length > 0) {
        setFlashingKeys(flashes);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setFlashingKeys({});
        }, 800);
      }

      setQuotes(newQuotes);
    });

    return () => {
      unsubscribe();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const quoteList: Quote[] = Object.values(quotes);

  return (
    <div className="w-full bg-slate-950 border-y border-slate-800/90 py-1.5 px-4 overflow-hidden relative select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Live Indicator Badge */}
        <div className="shrink-0 flex items-center gap-2 pr-3 border-r border-slate-800">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-mono font-bold tracking-wider text-emerald-400 flex items-center gap-1">
            <Radio size={12} className="animate-pulse" /> {t('common.live')}
          </span>
        </div>

        {/* Scrolling Ticker Items */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar scroll-smooth flex-1 py-0.5" dir="ltr">
          {quoteList.map(q => {
            const isPositive = q.change24h >= 0;
            const flash = flashingKeys[q.id];
            const digits = q.symbol.includes('XAU') || q.symbol === 'DXY' ? 2 : 5;

            return (
              <button
                key={q.id}
                onClick={() => onSelectSymbol && onSelectSymbol(q.symbol)}
                className={`shrink-0 flex items-center gap-2.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-300 ${
                  flash === 'up'
                    ? 'bg-emerald-500/20 shadow-sm border border-emerald-500/30'
                    : flash === 'down'
                    ? 'bg-rose-500/20 shadow-sm border border-rose-500/30'
                    : 'bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800/60'
                }`}
              >
                <span className="font-bold text-slate-200 tracking-tight">{q.symbol}</span>
                <span
                  className={`font-semibold transition-colors ${
                    flash === 'up'
                      ? 'text-emerald-300'
                      : flash === 'down'
                      ? 'text-rose-300'
                      : isPositive
                      ? 'text-slate-100'
                      : 'text-slate-100'
                  }`}
                >
                  {q.price.toFixed(digits)}
                </span>
                <span
                  className={`flex items-center text-[11px] ${
                    isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isPositive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  {isPositive ? '+' : ''}
                  {q.change24hPercent.toFixed(2)}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Timestamp */}
        <div className="hidden lg:flex shrink-0 items-center gap-2 pl-3 border-l border-slate-800 text-[11px] font-mono text-slate-400">
          <span>UTC: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
};
