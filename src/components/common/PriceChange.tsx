import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface PriceChangeProps {
  change: number;
  changePercent: number;
  digits?: number;
  showPercentOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PriceChange: React.FC<PriceChangeProps> = ({
  change,
  changePercent,
  digits = 4,
  showPercentOnly = false,
  size = 'md',
  className = ''
}) => {
  const isPositive = change > 0;
  const isNegative = change < 0;
  const isZero = change === 0;

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5 gap-1',
    md: 'text-sm px-2 py-0.5 gap-1.5',
    lg: 'text-base px-2.5 py-1 gap-2 font-medium'
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  const sign = isPositive ? '+' : '';

  return (
    <span
      className={`inline-flex items-center rounded-md font-mono transition-colors duration-300 ${
        isPositive
          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
          : isNegative
          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
          : 'bg-slate-800/60 text-slate-400 border border-slate-700/50'
      } ${sizeClasses[size]} ${className}`}
      dir="ltr"
    >
      {isPositive && <ArrowUpRight size={iconSizes[size]} className="shrink-0 text-emerald-400" />}
      {isNegative && <ArrowDownRight size={iconSizes[size]} className="shrink-0 text-rose-400" />}
      {isZero && <Minus size={iconSizes[size]} className="shrink-0 text-slate-400" />}

      <span>
        {showPercentOnly
          ? `${sign}${changePercent.toFixed(2)}%`
          : `${sign}${change.toFixed(digits)} (${sign}${changePercent.toFixed(2)}%)`}
      </span>
    </span>
  );
};
