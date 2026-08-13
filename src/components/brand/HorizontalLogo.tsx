import React from 'react';

export interface HorizontalLogoProps {
  variant?: 'light' | 'dark'; // 'light' (charcoal text on light bg), 'dark' (white text on dark bg)
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  alt?: string;
  useSvg?: boolean;
}

const heightMap = {
  sm: 32,
  md: 44, // 42-50px for header
  lg: 52,
  xl: 64
};

export const HorizontalLogo: React.FC<HorizontalLogoProps> = ({
  variant = 'dark',
  size = 'md',
  className = '',
  alt = 'Profit Point',
  useSvg = false
}) => {
  const pixelHeight = typeof size === 'number' ? size : heightMap[size] || 44;
  
  // Select official image asset
  const imageSrc = useSvg
    ? (variant === 'light' ? '/brand/profit-point-logo-horizontal.svg' : '/brand/profit-point-logo-horizontal-dark.svg')
    : (variant === 'light' ? '/brand/profit-point-logo-light.png' : '/brand/profit-point-logo.png');

  return (
    <div
      className={`inline-flex items-center select-none profit-point-logo ${className}`}
      dir="ltr"
      style={{
        height: pixelHeight,
        transform: 'none',
        unicodeBidi: 'normal'
      }}
    >
      <img
        src={imageSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        className="w-auto block max-w-full"
        style={{
          height: pixelHeight,
          width: 'auto',
          objectFit: 'contain',
          transform: 'none',
          filter: 'none'
        }}
        loading="eager"
      />
    </div>
  );
};
