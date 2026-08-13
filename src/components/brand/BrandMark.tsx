import React from 'react';

export interface BrandMarkProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  color?: string; // defaults to #2163CC
  alt?: string;
}

const sizeMap = {
  xs: 18,
  sm: 24,
  md: 32,
  lg: 44,
  xl: 60
};

export const BrandMark: React.FC<BrandMarkProps> = ({
  size = 'md',
  className = '',
  color = '#2163CC',
  alt = 'Profit Point Symbol'
}) => {
  const pixelSize = typeof size === 'number' ? size : sizeMap[size] || 32;
  const width = pixelSize * (320 / 200);
  const height = pixelSize;

  return (
    <div 
      className={`inline-flex items-center justify-center shrink-0 select-none ${className}`}
      dir="ltr"
      style={{ width, height }}
      aria-label={alt}
    >
      <svg
        viewBox="0 0 320 200"
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block"
        style={{ transform: 'none' }} // strictly prevent any RTL CSS inversion
      >
        <g fill={color}>
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
      </svg>
    </div>
  );
};
