export type ElementConfig = {
    // Typography
    size?: string;
    weight?: string;
    lineHeight?: string;
    letterSpacing?: string;
    under?: string;
    // Color
    color?: string;
    // UI
    bg?: string;
    text?: string;
    radius?: string;
    px?: string;
    py?: string;
    border?: string;
    gap?: string;
    transition?: string;
    // States
    hoverBg?: string;
    hoverText?: string;
    hoverBorder?: string;
    hoverScale?: string;
    activeBg?: string;
    activeText?: string;
    activeBorder?: string;
    activeScale?: string;
    // Responsive variants
    mobile?: {
        size?: string;
        weight?: string;
        lineHeight?: string;
        letterSpacing?: string;
        color?: string;
        px?: string;
        py?: string;
        radius?: string;
    };
    desktop?: {
        size?: string;
        weight?: string;
        lineHeight?: string;
        letterSpacing?: string;
        color?: string;
        px?: string;
        py?: string;
        radius?: string;
    };
};

export type ElementMap = {
    [key: string]: ElementConfig;
};

export interface ThemeConfig {
    id: string;
    name: string;
    colors: { [key: string]: string };
    baseTypo: {
        fontSize: string;
        fontFamily: string;
    };
    elementStyles: ElementMap;
}

export interface RouteMetadata {
    theme?: string;
}

export type ThemeKey = 'golf' | 'golf-elegant' | 'midnight';

export const DEFAULT_THEME: ThemeKey = 'golf';

// Re-export resolver functions for convenience
export { resolveTheme, applyTheme } from './resolver';

export const themes: Record<ThemeKey, ThemeConfig> = {
  golf: {
    id: 'golf',
    name: 'Golf',
    colors: {
      '--primary': '#10b981',
      '--primary-foreground': '#ffffff',
      '--secondary': '#f1f5f9',
      '--secondary-foreground': '#0f172a',
      '--accent': '#f1f5f9',
      '--accent-foreground': '#0f172a',
      '--muted': '#f1f5f9',
      '--muted-foreground': '#64748b',
      '--background': '#ffffff',
      '--foreground': '#0f172a',
      '--card': '#ffffff',
      '--card-foreground': '#0f172a',
      '--popover': '#ffffff',
      '--popover-foreground': '#0f172a',
      '--border': '#f1f5f9',
      '--input': '#f1f5f9',
      '--ring': '#0f172a',
      '--radius': '0.5rem',
      '--destructive': '#ef4444',
      '--destructive-foreground': '#ffffff'
    },
    baseTypo: {
      fontSize: '16px',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif'
    },
    elementStyles: {
      h1: { size: '3.75rem', weight: '700', lineHeight: '1', letterSpacing: '-0.02em' },
      h2: { size: '3rem', weight: '700', lineHeight: '1', letterSpacing: '-0.01em' },
      h3: { size: '1.875rem', weight: '700', lineHeight: '2.25rem', letterSpacing: '0' },
      body: { size: '1rem', weight: '400', lineHeight: '1.5rem', letterSpacing: '0' },
      'body-l': { size: '1.25rem', weight: '400', lineHeight: '1.6rem', letterSpacing: '0' },
      small: { size: '0.875rem', weight: '400', lineHeight: '1.5', letterSpacing: '0.01em' },
      caption: { size: '0.75rem', weight: '400', lineHeight: '1.4', letterSpacing: '0.02em' },
      'btn-primary': { bg: 'var(--primary)', text: 'var(--primary-foreground)', radius: '9999px', px: '1.5rem', py: '0.625rem', weight: '700' },
      'btn-secondary': { bg: 'var(--secondary)', text: 'var(--secondary-foreground)', radius: '9999px', px: '2rem', py: '0.75rem', weight: '700' },
      'btn-outline': { bg: 'transparent', text: 'var(--primary)', radius: '9999px', px: '2rem', py: '0.75rem', border: 'var(--border)', weight: '700' },
      'btn-ghost': { bg: 'transparent', text: 'var(--primary)', radius: '9999px', px: '2rem', py: '0.75rem', weight: '700' },
      'link-std': { text: 'var(--primary)', weight: '500', under: 'underline' },
      'link-bold': { text: 'var(--primary)', weight: '700', under: 'none' },
      'site-title': { size: '1.25rem', weight: '700', lineHeight: '1.2', letterSpacing: '-0.01em' },
      'mobile-menu-btn': { size: '0.875rem', weight: '600', lineHeight: '1.4', letterSpacing: '0.01em' },
      'mobile-menu-links': { size: '1rem', weight: '500', lineHeight: '1.5', letterSpacing: '0' },
      'gallery-tab-container': { 
        bg: 'var(--muted)', 
        px: '0.25rem', 
        py: '0.25rem', 
        radius: '0.75rem',
        gap: '0.25rem'
      },
      'gallery-tab': { 
        px: '1.5rem', 
        py: '0.625rem', 
        radius: '0.5rem', 
        weight: '600', 
        size: '0.875rem',
        letterSpacing: '0.025em',
        bg: 'transparent',
        text: 'var(--muted-foreground)',
        hoverBg: 'var(--background)',
        hoverText: 'var(--foreground)',
        activeBg: 'var(--background)',
        activeText: 'var(--primary)',
        transition: '200ms'
      }
    }
  },

  'golf-elegant': {
    id: 'golf-elegant',
    name: 'Golf Elegant',
    colors: {
      '--primary': '#10b981',
      '--primary-foreground': '#ffffff',
      '--secondary': '#f1f5f9',
      '--secondary-foreground': '#0f172a',
      '--accent': '#f1f5f9',
      '--accent-foreground': '#0f172a',
      '--muted': '#f1f5f9',
      '--muted-foreground': '#64748b',
      '--background': '#ffffff',
      '--foreground': '#0f172a',
      '--card': '#ffffff',
      '--card-foreground': '#0f172a',
      '--popover': '#ffffff',
      '--popover-foreground': '#0f172a',
      '--border': '#f1f5f9',
      '--input': '#f1f5f9',
      '--ring': '#0f172a',
      '--radius': '0.5rem',
      '--destructive': '#ef4444',
      '--destructive-foreground': '#ffffff'
    },
    baseTypo: {
      fontSize: '16px',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif'
    },
    elementStyles: {
      h1: { size: '3.75rem', weight: '700', lineHeight: '1', letterSpacing: '-0.02em' },
      h2: { size: '3rem', weight: '700', lineHeight: '1', letterSpacing: '-0.01em' },
      h3: { size: '1.875rem', weight: '700', lineHeight: '2.25rem', letterSpacing: '0' },
      body: { size: '1rem', weight: '400', lineHeight: '1.5rem', letterSpacing: '0' },
      'body-l': { size: '1.25rem', weight: '400', lineHeight: '1.6rem', letterSpacing: '0' },
      small: { size: '0.875rem', weight: '400', lineHeight: '1.5', letterSpacing: '0.01em' },
      caption: { size: '0.75rem', weight: '400', lineHeight: '1.4', letterSpacing: '0.02em' },
      'btn-primary': { bg: 'var(--primary)', text: 'var(--primary-foreground)', radius: '9999px', px: '1.5rem', py: '0.625rem', weight: '700' },
      'btn-secondary': { bg: 'var(--secondary)', text: 'var(--secondary-foreground)', radius: '9999px', px: '2rem', py: '0.75rem', weight: '700' },
      'btn-outline': { bg: 'transparent', text: 'var(--primary)', radius: '9999px', px: '2rem', py: '0.75rem', border: 'var(--border)', weight: '700' },
      'btn-ghost': { bg: 'transparent', text: 'var(--primary)', radius: '9999px', px: '2rem', py: '0.75rem', weight: '700' },
      'link-std': { text: 'var(--primary)', weight: '500', under: 'underline' },
      'link-bold': { text: 'var(--primary)', weight: '700', under: 'none' },
      'site-title': { size: '1.25rem', weight: '700', lineHeight: '1.2', letterSpacing: '-0.01em' },
      'mobile-menu-btn': { size: '0.875rem', weight: '600', lineHeight: '1.4', letterSpacing: '0.01em' },
      'mobile-menu-links': { size: '1rem', weight: '500', lineHeight: '1.5', letterSpacing: '0' },
      'gallery-tab-container': { 
        bg: 'var(--muted)', 
        px: '0.25rem', 
        py: '0.25rem', 
        radius: '0.75rem',
        gap: '0.25rem'
      },
      'gallery-tab': { 
        px: '1.5rem', 
        py: '0.625rem', 
        radius: '0.5rem', 
        weight: '600', 
        size: '0.875rem',
        letterSpacing: '0.025em',
        bg: 'transparent',
        text: 'var(--muted-foreground)',
        hoverBg: 'var(--background)',
        hoverText: 'var(--foreground)',
        activeBg: 'var(--background)',
        activeText: 'var(--primary)',
        transition: '200ms'
      }
    }
  },

  midnight: {
    id: 'midnight',
    name: 'Midnight',
    colors: {
      '--primary': '#8b5cf6',
      '--primary-foreground': '#ffffff',
      '--secondary': '#1e293b',
      '--secondary-foreground': '#e2e8f0',
      '--accent': '#312e81',
      '--accent-foreground': '#e2e8f0',
      '--muted': '#1e293b',
      '--muted-foreground': '#94a3b8',
      '--background': '#0f172a',
      '--foreground': '#e2e8f0',
      '--card': '#1e293b',
      '--card-foreground': '#e2e8f0',
      '--popover': '#1e293b',
      '--popover-foreground': '#e2e8f0',
      '--border': '#334155',
      '--input': '#1e293b',
      '--ring': '#8b5cf6',
      '--radius': '0.5rem',
      '--destructive': '#ef4444',
      '--destructive-foreground': '#ffffff'
    },
    baseTypo: {
      fontSize: '16px',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif'
    },
    elementStyles: {
      h1: { size: '3.75rem', weight: '700', lineHeight: '1', letterSpacing: '-0.02em' },
      h2: { size: '3rem', weight: '700', lineHeight: '1', letterSpacing: '-0.01em' },
      h3: { size: '1.875rem', weight: '700', lineHeight: '2.25rem', letterSpacing: '0' },
      body: { size: '1rem', weight: '400', lineHeight: '1.5rem', letterSpacing: '0' },
      'body-l': { size: '1.25rem', weight: '400', lineHeight: '1.6rem', letterSpacing: '0' },
      small: { size: '0.875rem', weight: '400', lineHeight: '1.5', letterSpacing: '0.01em' },
      caption: { size: '0.75rem', weight: '400', lineHeight: '1.4', letterSpacing: '0.02em' },
      'btn-primary': { bg: 'var(--primary)', text: 'var(--primary-foreground)', radius: '9999px', px: '1.5rem', py: '0.625rem', weight: '700' },
      'btn-secondary': { bg: 'var(--secondary)', text: 'var(--secondary-foreground)', radius: '9999px', px: '2rem', py: '0.75rem', weight: '700' },
      'btn-outline': { bg: 'transparent', text: 'var(--primary)', radius: '9999px', px: '2rem', py: '0.75rem', border: 'var(--border)', weight: '700' },
      'btn-ghost': { bg: 'transparent', text: 'var(--primary)', radius: '9999px', px: '2rem', py: '0.75rem', weight: '700' },
      'link-std': { text: 'var(--primary)', weight: '500', under: 'underline' },
      'link-bold': { text: 'var(--primary)', weight: '700', under: 'none' },
      'site-title': { size: '1.25rem', weight: '700', lineHeight: '1.2', letterSpacing: '-0.01em' },
      'mobile-menu-btn': { size: '0.875rem', weight: '600', lineHeight: '1.4', letterSpacing: '0.01em' },
      'mobile-menu-links': { size: '1rem', weight: '500', lineHeight: '1.5', letterSpacing: '0' },
      'gallery-tab-container': { 
        bg: 'var(--muted)', 
        px: '0.25rem', 
        py: '0.25rem', 
        radius: '0.75rem',
        gap: '0.25rem'
      },
      'gallery-tab': { 
        px: '1.5rem', 
        py: '0.625rem', 
        radius: '0.5rem', 
        weight: '600', 
        size: '0.875rem',
        letterSpacing: '0.025em',
        bg: 'transparent',
        text: 'var(--muted-foreground)',
        hoverBg: 'var(--background)',
        hoverText: 'var(--foreground)',
        activeBg: 'var(--background)',
        activeText: 'var(--primary)',
        transition: '200ms'
      }
    }
  }
};
