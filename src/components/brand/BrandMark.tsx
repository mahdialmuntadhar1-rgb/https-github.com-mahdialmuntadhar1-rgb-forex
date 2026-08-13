import React from 'react';

export interface BrandMarkProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  alt?: string;
  useSvg?: boolean;
}

const sizeMap = {
  xs: 20,
  sm: 28,
  md: 36,
  lg: 48,
  xl: 64
};

export const BrandMark: React.FC<BrandMarkProps> = ({
  size = 'md',
  className = '',
  alt = 'Profit Point Mark',
  useSvg = false
}) => {
  const pixelHeight = typeof size === 'number' ? size : sizeMap[size] || 36;
  const imageSrc = useSvg ? '/brand/profit-point-mark.svg' : '/brand/profit-point-mark.png';

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 select-none profit-point-logo ${className}`}
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
          transform: 'none'
        }}
        loading="eager"
      />
    </div>
  );
};
