export const designTokens = {
  colors: {
    // Official Profit Point Palette
    brand: {
      primary: '#2163CC', // Primary Profit Blue (RGB: 33, 99, 204)
      primaryHover: '#1855B5',
      primaryLight: 'rgba(33, 99, 204, 0.12)',
      navy: '#0B1C2D', // Deep Navy (RGB: 11, 28, 45)
      navySurface: '#0F2236',
      navyCard: '#132A42',
      navyBorder: '#1E3A57',
      charcoal: '#333333', // Charcoal (RGB: 51, 51, 51)
      white: '#FFFFFF', // Pure White (RGB: 255, 255, 255)
    },
    // Canvas & Terminals
    background: {
      primary: '#0B1C2D', // Deep Navy
      secondary: '#0F2236', // Navy surface
      tertiary: '#132A42', // Elevated card surface
      elevated: '#183452', // Popovers & Modals
      subtle: '#0E2033', // Inset panels
      light: '#FFFFFF', // Light theme surfaces
    },
    border: {
      default: '#1E3A57',
      subtle: '#152C42',
      accent: '#2163CC',
      highlight: '#2163CC',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#94A3B8',
      muted: '#64748B',
      dark: '#333333',
      darkSecondary: '#555555',
    },
    // Financial Market Status Badges (Strictly for quotes & market data, not brand)
    bullish: {
      primary: '#10B981', // Emerald 500
      glow: 'rgba(16, 185, 129, 0.15)',
      subtle: '#064E3B',
      text: '#34D399',
    },
    bearish: {
      primary: '#EF4444', // Rose/Red 500
      glow: 'rgba(239, 68, 68, 0.15)',
      subtle: '#7F1D1D',
      text: '#F87171',
    },
    neutral: {
      primary: '#F59E0B', // Amber 500
      glow: 'rgba(245, 158, 11, 0.15)',
      subtle: '#78350F',
      text: '#FBBF24',
    }
  },
  typography: {
    fontFamily: {
      sans: "'Montserrat', 'Inter', system-ui, -apple-system, sans-serif",
      arabic: "'IBM Plex Sans Arabic', 'Cairo', 'Tajawal', system-ui, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace",
    }
  },
  radii: {
    sm: '0.375rem', // 6px
    md: '0.5rem',   // 8px
    lg: '0.75rem',  // 12px
    xl: '1rem',     // 16px
    full: '9999px',
  },
  shadows: {
    card: '0 4px 20px -2px rgba(0, 0, 0, 0.35)',
    elevated: '0 10px 30px -4px rgba(0, 0, 0, 0.5)',
    glow: '0 0 20px rgba(33, 99, 204, 0.2)',
  }
};
