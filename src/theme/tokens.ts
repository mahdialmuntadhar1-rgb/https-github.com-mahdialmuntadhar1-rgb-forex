export const designTokens = {
  colors: {
    // Canvas & Terminals
    background: {
      primary: '#0B0F17', // Deep obsidian slate
      secondary: '#111827', // Dark navy charcoal
      tertiary: '#1A2234', // Elevated card surface
      elevated: '#202B42', // Popovers & Modals
      subtle: '#141D2E', // Subtle inset panels
    },
    border: {
      default: '#1E293B',
      subtle: '#152136',
      accent: '#334155',
      highlight: '#3B82F6',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
      muted: '#64748B',
      inverse: '#0B0F17',
    },
    // Institutional Financial Status Badges
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
    },
    gold: {
      primary: '#EAB308',
      glow: 'rgba(234, 179, 8, 0.2)',
      light: '#FEF08A',
      dark: '#854D0E',
    },
    brand: {
      primary: '#2563EB', // Sapphire Blue
      secondary: '#3B82F6',
      dark: '#1D4ED8',
      light: '#60A5FA',
      accent: '#06B6D4', // Cyan accent for terminal metrics
    }
  },
  typography: {
    fontFamily: {
      sans: "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif",
      arabic: "'Tajawal', 'Cairo', 'Vazirmatn', system-ui, sans-serif",
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
    glow: '0 0 20px rgba(37, 99, 235, 0.2)',
  }
};
