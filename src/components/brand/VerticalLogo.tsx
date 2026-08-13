import React from 'react';

export interface VerticalLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  showTagline?: boolean;
  tagline?: string;
}

const heightMap = {
  sm: 60,
  md: 90,
  lg: 120,
  xl: 160
};

export const VerticalLogo: React.FC<VerticalLogoProps> = ({
  variant = 'dark',
  size = 'md',
  className = '',
  showTagline = false,
  tagline = 'MARKET INTELLIGENCE'
}) => {
  const pixelHeight = typeof size === 'number' ? size : heightMap[size] || 90;
  const textColor = variant === 'light' ? '#333333' : '#FFFFFF';
  const taglineColor = variant === 'light' ? '#666666' : '#94A3B8';

  return (
    <div
      className={`inline-flex flex-col items-center justify-center select-none ${className}`}
      dir="ltr"
      style={{ height: pixelHeight }}
      aria-label="Profit Point"
    >
      <svg
        viewBox="0 0 500 440"
        height={pixelHeight}
        width={(pixelHeight * 500) / 440}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto block shrink-0"
        style={{ transform: 'none' }}
      >
        {/* Symbol Mark in #2163CC (centered at top) */}
        <g transform="translate(90, 20)">
          <g fill="#2163CC">
            {/* Top-Right Loop & Stem */}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="
                M 116 20
                L 236 20
                C 274.66 20 306 51.34 306 90
                C 306 128.66 274.66 160 236 160
                L 204 160
                L 182 200
                L 142 200
                L 164 160
                L 152 160
                L 174 120
                L 236 120
                C 252.57 120 266 106.57 266 90
                C 266 73.43 252.57 60 236 60
                L 94 60
                L 116 20
                Z
                M 92 20
                L 132 20
                L 77 120
                L 37 120
                L 92 20
                Z
              "
            />
            {/* Lower-Left Loop & Stem */}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="
                M 204 180
                L 84 180
                C 45.34 180 14 148.66 14 110
                C 14 71.34 45.34 40 84 40
                L 116 40
                L 138 0
                L 178 0
                L 156 40
                L 168 40
                L 146 80
                L 84 80
                C 67.43 80 54 93.43 54 110
                C 54 126.57 67.43 140 84 140
                L 226 140
                L 204 180
                Z
                M 228 180
                L 188 180
                L 243 80
                L 283 80
                L 228 180
                Z
              "
            />
          </g>
        </g>

        {/* Wordmark centered */}
        <text
          x="250"
          y="320"
          textAnchor="middle"
          fill={textColor}
          fontFamily="'Montserrat', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontSize="50"
          fontWeight="800"
          letterSpacing="5"
        >
          PROFIT POINT
        </text>

        {showTagline && (
          <text
            x="250"
            y="370"
            textAnchor="middle"
            fill={taglineColor}
            fontFamily="'Montserrat', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontSize="22"
            fontWeight="600"
            letterSpacing="8"
          >
            {tagline}
          </text>
        )}
      </svg>
    </div>
  );
};
