import React from 'react';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  isPositive?: boolean;
  className?: string;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 100,
  height = 32,
  color,
  isPositive,
  className = ''
}) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;
  const padding = 2;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * (width - padding * 2) + padding;
      const y = height - padding - ((val - min) / range) * (height - padding * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const strokeColor = color 
    ? color 
    : isPositive !== undefined
    ? isPositive
      ? '#10B981'
      : '#EF4444'
    : data[data.length - 1] >= data[0]
    ? '#10B981'
    : '#EF4444';

  const gradientId = `sparkline-grad-${Math.random().toString(36).substring(2, 9)}`;

  // Area path for gradient
  const firstPoint = points.split(' ')[0];
  const lastPoint = points.split(' ')[points.split(' ').length - 1];
  const areaPoints = `${firstPoint.split(',')[0]},${height} ${points} ${lastPoint.split(',')[0]},${height}`;

  return (
    <div className={`relative inline-block ${className}`} style={{ width, height }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <polygon points={areaPoints} fill={`url(#${gradientId})`} />
        
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    </div>
  );
};
