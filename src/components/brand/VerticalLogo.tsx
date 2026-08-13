import React from 'react';

export interface VerticalLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  alt?: string;
  useSvg?: boolean;
}

const heightMap = {
  sm: 64,
  md: 96,
  lg: 130,
  xl: 170
};

export const VerticalLogo: React.FC<VerticalLogoProps> = ({
  variant = 'dark',
  size = 'md',
  className = '',
  alt = 'Profit Point',
  useSvg = false
}) => {
  const pixelHeight = typeof size === 'number' ? size : heightMap[size] || 96;
  
  const imageSrc = useSvg
    ? (variant === 'light' ? '/brand/profit-point-logo-vertical.svg' : '/brand/profit-point-logo-vertical-dark.svg')
    : (variant === 'light' ? '/brand/profit-point-logo-vertical.png' : '/brand/profit-point-logo-vertical-dark.png');

  return (
    <div
      className={`inline-flex flex-col items-center justify-center select-none profit-point-logo ${className}`}
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
