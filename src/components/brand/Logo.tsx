import React from 'react';
import { HorizontalLogo, HorizontalLogoProps } from './HorizontalLogo';
import { VerticalLogo, VerticalLogoProps } from './VerticalLogo';
import { BrandMark, BrandMarkProps } from './BrandMark';

export interface LogoProps {
  layout?: 'horizontal' | 'vertical' | 'mark';
  variant?: 'light' | 'dark';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  showTagline?: boolean;
  tagline?: string;
  alt?: string;
}

export const Logo: React.FC<LogoProps> = ({
  layout = 'horizontal',
  variant = 'dark',
  size = 'md',
  className = '',
  showTagline = false,
  tagline,
  alt
}) => {
  if (layout === 'mark') {
    return (
      <BrandMark
        size={size}
        className={className}
        alt={alt}
      />
    );
  }

  if (layout === 'vertical') {
    return (
      <VerticalLogo
        variant={variant}
        size={size as VerticalLogoProps['size']}
        className={className}
        showTagline={showTagline}
        tagline={tagline}
      />
    );
  }

  return (
    <HorizontalLogo
      variant={variant}
      size={size as HorizontalLogoProps['size']}
      className={className}
      showTagline={showTagline}
      tagline={tagline}
    />
  );
};

export { HorizontalLogo, VerticalLogo, BrandMark };
