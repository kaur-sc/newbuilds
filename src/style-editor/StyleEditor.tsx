import { useState, useEffect } from 'react';
import { Settings2, X, ChevronRight, Save, Download, Type } from 'lucide-react';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { PageThemeSelector } from '@/components/PageThemeSelector';
import { themes, type ThemeConfig } from '@/themes';

const hexToHslVariables = (hex: string): string => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
};

const rgbToHex = (rgb: string): string => {
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) return '#000000';
  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

type ElementConfig = {
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
    // Header Background
    transparency?: string;
    blur?: string;
    navbarBlur?: string;
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
        transparency?: string;
        blur?: string;
        border?: string;
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
        transparency?: string;
        blur?: string;
        border?: string;
    };
};

type ElementMap = {
    [key: string]: ElementConfig;
};

const DEFAULT_ELEMENT_STYLES: ElementMap = {
      h1: { 
        size: '3rem', 
        weight: '700', 
        lineHeight: '1.2', 
        letterSpacing: '-0.02em',
        color: 'var(--foreground)',
        mobile: { size: '2.5rem', lineHeight: '1.3' },
        desktop: { size: '3.5rem', lineHeight: '1.1' }
    },
    navbar: {
      bg: 'var(--background)',
      transparency: '0.9',
      blur: '12px',
      color: 'var(--foreground)',
      border: 'var(--border)'
    },
    h2: { 
      size: '2.25rem', 
      weight: '700', 
      lineHeight: '1.3', 
      letterSpacing: '-0.01em',
      color: 'var(--foreground)',
      mobile: { size: '1.875rem', lineHeight: '1.4' },
      desktop: { size: '2.5rem', lineHeight: '1.2' }
    },
    h3: { 
      size: '1.875rem', 
      weight: '600', 
      lineHeight: '1.4', 
      letterSpacing: '0',
      color: 'var(--foreground)',
      mobile: { size: '1.5rem', lineHeight: '1.5' },
      desktop: { size: '2rem', lineHeight: '1.3' }
    },
    body: { 
      size: '1rem', 
      weight: '400', 
      lineHeight: '1.6', 
      letterSpacing: '0',
      color: 'var(--foreground)',
      mobile: { size: '0.9rem', lineHeight: '1.7' },
      desktop: { size: '1.1rem', lineHeight: '1.5' }
    },
    small: { 
      size: '0.875rem', 
      weight: '400', 
      lineHeight: '1.5', 
      letterSpacing: '0.01em',
      color: 'var(--foreground)',
      mobile: { size: '0.8rem', lineHeight: '1.6' },
      desktop: { size: '0.9rem', lineHeight: '1.4' }
    },
    caption: { 
      size: '0.75rem', 
      weight: '400', 
      lineHeight: '1.4', 
      letterSpacing: '0.02em',
      color: 'var(--foreground)',
      mobile: { size: '0.6875rem', lineHeight: '1.5' },
      desktop: { size: '0.8125rem', lineHeight: '1.3' }
    },
    'btn-primary': { 
      bg: 'var(--primary)', 
      text: 'var(--primary-foreground)', 
      radius: '9999px', 
      px: '2rem', 
      py: '0.75rem', 
      weight: '700',
      hoverBg: 'var(--primary)',
      hoverText: 'var(--primary-foreground)',
      hoverScale: '1.05',
      activeBg: 'var(--primary)',
      activeText: 'var(--primary-foreground)',
      activeScale: '0.95',
      mobile: { px: '1.5rem', py: '0.625rem' },
      desktop: { px: '2.5rem', py: '0.875rem' }
    },
    'btn-secondary': { 
      bg: 'var(--secondary)', 
      text: 'var(--secondary-foreground)', 
      radius: '9999px', 
      px: '2rem', 
      py: '0.75rem', 
      weight: '700',
      hoverBg: 'var(--secondary)',
      hoverText: 'var(--secondary-foreground)',
      hoverScale: '1.05',
      activeBg: 'var(--secondary)',
      activeText: 'var(--secondary-foreground)',
      activeScale: '0.95',
      mobile: { px: '1.5rem', py: '0.625rem' },
      desktop: { px: '2.5rem', py: '0.875rem' }
    },
    'btn-outline': { 
      bg: 'transparent', 
      text: 'var(--primary)', 
      radius: '9999px', 
      px: '2rem', 
      py: '0.75rem', 
      border: 'var(--border)', 
      weight: '700',
      hoverBg: 'var(--primary)',
      hoverText: 'var(--primary-foreground)',
      hoverBorder: 'var(--primary)',
      hoverScale: '1.05',
      activeBg: 'var(--primary)',
      activeText: 'var(--primary-foreground)',
      activeBorder: 'var(--primary)',
      activeScale: '0.95',
      mobile: { px: '1.5rem', py: '0.625rem' },
      desktop: { px: '2.5rem', py: '0.875rem' }
    },
    'btn-ghost': { 
      bg: 'transparent', 
      text: 'var(--primary)', 
      radius: '9999px', 
      px: '2rem', 
      py: '0.75rem', 
      weight: '700',
      hoverBg: 'var(--primary)',
      hoverText: 'var(--primary)',
      hoverScale: '1.05',
      activeBg: 'var(--primary)',
      activeText: 'var(--primary)',
      activeScale: '0.95',
      mobile: { px: '1.5rem', py: '0.625rem' },
      desktop: { px: '2.5rem', py: '0.875rem' }
    },
    'link-std': { 
      text: 'var(--primary)', 
      weight: '500', 
      under: 'underline',
      hoverText: 'var(--primary)',
      hoverScale: '1.02',
      activeText: 'var(--primary)',
      activeScale: '0.98'
    },
    'link-bold': { 
      text: 'var(--primary)', 
      weight: '700', 
      under: 'none',
      hoverText: 'var(--primary)',
      hoverScale: '1.02',
      activeText: 'var(--primary)',
      activeScale: '0.98'
    }
};

// Removed hardcoded theme objects - now using imported themes from main system

export const StyleEditor = () => {
  const [availableThemes, setAvailableThemes] = useState<ThemeConfig[]>(Object.values(themes));
  const [activeThemeId, setActiveThemeId] = useState<keyof typeof themes>('golf');
  const [editingStyle, setEditingStyle] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('desktop');

  const activeTheme = availableThemes.find(t => t.id === activeThemeId) || availableThemes[0];

  // Ensure navbar styles exist for all themes
  useEffect(() => {
    if (!activeTheme.elementStyles.navbar) {
      updateActiveTheme(t => ({
        ...t,
        elementStyles: {
          ...t.elementStyles,
          navbar: DEFAULT_ELEMENT_STYLES.navbar
        }
      }));
    }
  }, [activeThemeId]);

  // Removed JavaScript CSS variable application to prevent conflicts with CSS theme files
  // Theme switching now relies solely on data-theme attribute and CSS files

  // Load theme CSS reliably using theme attribute switching
  useEffect(() => {
    // Set theme attribute on HTML element to activate the correct theme
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-theme', activeThemeId);
    
    console.log(`Activating theme: ${activeThemeId}`);
    
    // Force a re-render to ensure theme variables are applied
    setTimeout(() => {
      // Trigger a reflow to ensure CSS variables are applied
      document.body.style.display = 'none';
      document.body.offsetHeight; // Force reflow
      document.body.style.display = '';
    }, 100);
  }, [activeThemeId]);

  const updateActiveTheme = (updater: (prev: ThemeConfig) => ThemeConfig) => {
    setAvailableThemes(prev => prev.map(t => t.id === activeThemeId ? updater(t) : t));
  };

  const handleColorChange = (variable: string, value: string) => {
    updateActiveTheme(t => ({
        ...t,
        colors: { ...t.colors, [variable]: value }
    }));
    // Removed direct CSS variable setting to prevent conflicts with CSS theme files
  };

  const handleBaseTypoChange = (key: 'fontSize' | 'fontFamily', value: string) => {
    updateActiveTheme(t => ({
        ...t,
        baseTypo: { ...t.baseTypo, [key]: value }
    }));
    // Removed direct CSS variable setting to prevent conflicts with CSS theme files
  };

  const handleElementStyleChange = (key: string, field: keyof ElementConfig, value: string) => {
    updateActiveTheme(t => ({
        ...t,
        elementStyles: {
            ...t.elementStyles,
            [key]: { ...t.elementStyles[key], [field]: value }
        }
    }));
    
    // Removed direct CSS variable setting to prevent conflicts with CSS theme files
    // CSS files now handle all variable applications
    console.log(`Updated ${key} ${field}: ${value}`);
};

  const handleResponsiveChange = (key: string, breakpoint: 'mobile' | 'desktop', field: string, value: string) => {
    updateActiveTheme(t => ({
        ...t,
        elementStyles: {
            ...t.elementStyles,
            [key]: { 
                ...t.elementStyles[key], 
                [breakpoint]: { 
                    ...(t.elementStyles[key][breakpoint] || {}) as any, 
                    [field]: value 
                }
            }
        }
    }));
    
    // Removed direct CSS variable setting to prevent conflicts with CSS theme files
    console.log(`Updated responsive ${key} ${breakpoint} ${field}: ${value}`);
  };

  const saveToConfig = () => {
    const themeName = activeTheme.name.replace(/\s+/g, ' ').trim();
    const cssContent = `/* ${themeName} Theme CSS - Defines theme classes that consume CSS variables */
[data-theme="${activeTheme.id}"] {
    /* Colors (HSL format for Tailwind) */
    ${Object.entries(activeTheme.colors).map(([v, hex]) => `${v}: ${hexToHslVariables(hex)}; /* ${hex} */`).join('\n    ')}
    
    /* Global Typography */
    --font-base-size: ${activeTheme.baseTypo.fontSize};
    --font-base-family: ${activeTheme.baseTypo.fontFamily};

    /* Granular Element Styles */
    ${Object.entries(activeTheme.elementStyles).map(([key, config]) => {
      const baseVars = Object.entries(config)
        .filter(([field, val]) => val !== undefined && typeof val === 'string')
        .map(([field, val]) => {
            let suf = field === 'lineHeight' ? '-line-height' : field === 'letterSpacing' ? '-letter-spacing' : `-${field}`;
            let finalVal = val;
            
            // Special handling for navbar properties
            if (key === 'navbar') {
                if (field === 'bg' && typeof val === 'string') {
                    // Convert bg to navbar-bg-color for CSS export
                    finalVal = val.startsWith('var(--') ? val.replace('var(--', '').replace(')', '') : hexToHslVariables(val);
                    return `--navbar-bg-color: ${finalVal};`;
                } else if (field === 'transparency' && typeof val === 'string') {
                    return `--navbar-bg-transparency: ${val};`;
                } else if (field === 'blur' && typeof val === 'string') {
                    return `--navbar-bg-blur: ${val};`;
                }
            }
            
            // Regular color handling
            if (['bg', 'text', 'border', 'hoverBg', 'hoverText', 'hoverBorder', 'activeBg', 'activeText', 'activeBorder', 'color'].includes(field) && typeof val === 'string' && val.startsWith('#')) {
                finalVal = hexToHslVariables(val);
            }
            return `--${key}${suf}: ${finalVal};`;
        }).join('\n    ');

      const mobileVars = config.mobile ? Object.entries(config.mobile)
        .filter(([field, val]) => val !== undefined)
        .map(([field, val]) => {
            let suf = field === 'lineHeight' ? '-line-height' : field === 'letterSpacing' ? '-letter-spacing' : `-${field}`;
            let finalVal = val;
            
            // Special handling for navbar mobile properties
            if (key === 'navbar') {
                if (field === 'bg' && typeof val === 'string') {
                    finalVal = val.startsWith('var(--') ? val.replace('var(--', '').replace(')', '') : hexToHslVariables(val);
                    return `--navbar-mobile-bg-color: ${finalVal};`;
                } else if (field === 'transparency' && typeof val === 'string') {
                    return `--navbar-mobile-bg-transparency: ${val};`;
                } else if (field === 'blur' && typeof val === 'string') {
                    return `--navbar-mobile-bg-blur: ${val};`;
                }
            }
            
            // Regular color handling
            if (['bg', 'text', 'border', 'hoverBg', 'hoverText', 'hoverBorder', 'activeBg', 'activeText', 'activeBorder', 'color'].includes(field) && typeof val === 'string' && val.startsWith('#')) {
                finalVal = hexToHslVariables(val);
            }
            return `--${key}-mobile-${field}: ${finalVal};`;
        }).join('\n    ') : '';

      return [baseVars, mobileVars].filter(v => v).join('\n    ');
    }).join('\n\n    ')}
}

/* Theme Classes - These consume the CSS variables defined above */

/* Typography Classes */
.h1 {
    font-size: var(--h1-size);
    font-weight: var(--h1-weight);
    line-height: var(--h1-line-height);
    letter-spacing: var(--h1-letter-spacing);
    color: hsl(var(--h1-color));
}

.h2 {
    font-size: var(--h2-size);
    font-weight: var(--h2-weight);
    line-height: var(--h2-line-height);
    letter-spacing: var(--h2-letter-spacing);
    color: hsl(var(--h2-color));
}

.h3 {
    font-size: var(--h3-size);
    font-weight: var(--h3-weight);
    line-height: var(--h3-line-height);
    letter-spacing: var(--h3-letter-spacing);
    color: hsl(var(--h3-color));
}

.body {
    font-size: var(--body-size);
    font-weight: var(--body-weight);
    line-height: var(--body-line-height);
    letter-spacing: var(--body-letter-spacing);
    color: hsl(var(--body-color));
}

.small {
    font-size: var(--small-size);
    font-weight: var(--small-weight);
    line-height: var(--small-line-height);
    letter-spacing: var(--small-letter-spacing);
    color: hsl(var(--small-color));
}

.caption {
    font-size: var(--caption-size);
    font-weight: var(--caption-weight);
    line-height: var(--caption-line-height);
    letter-spacing: var(--caption-letter-spacing);
    color: hsl(var(--caption-color));
}

/* Button Classes */
.btn-primary {
    background: hsl(var(--btn-primary-bg));
    color: hsl(var(--btn-primary-text));
    border-radius: var(--btn-primary-radius);
    padding-left: var(--btn-primary-px);
    padding-right: var(--btn-primary-px);
    padding-top: var(--btn-primary-py);
    padding-bottom: var(--btn-primary-py);
    font-weight: var(--btn-primary-weight);
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
}

.btn-primary:hover {
    background: hsl(var(--btn-primary-hover-bg));
    color: hsl(var(--btn-primary-hover-text));
    transform: scale(var(--btn-primary-hover-scale));
}

.btn-primary:active {
    background: hsl(var(--btn-primary-active-bg));
    color: hsl(var(--btn-primary-active-text));
    transform: scale(var(--btn-primary-active-scale));
}

.btn-secondary {
    background: hsl(var(--btn-secondary-bg));
    color: hsl(var(--btn-secondary-text));
    border-radius: var(--btn-secondary-radius);
    padding-left: var(--btn-secondary-px);
    padding-right: var(--btn-secondary-px);
    padding-top: var(--btn-secondary-py);
    padding-bottom: var(--btn-secondary-py);
    font-weight: var(--btn-secondary-weight);
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
}

.btn-secondary:hover {
    background: hsl(var(--btn-secondary-hover-bg));
    color: hsl(var(--btn-secondary-hover-text));
    transform: scale(var(--btn-secondary-hover-scale));
}

.btn-secondary:active {
    background: hsl(var(--btn-secondary-active-bg));
    color: hsl(var(--btn-secondary-active-text));
    transform: scale(var(--btn-secondary-active-scale));
}

.btn-outline {
    background: hsl(var(--btn-outline-bg));
    color: hsl(var(--btn-outline-text));
    border-radius: var(--btn-outline-radius);
    padding-left: var(--btn-outline-px);
    padding-right: var(--btn-outline-px);
    padding-top: var(--btn-outline-py);
    padding-bottom: var(--btn-outline-py);
    font-weight: var(--btn-outline-weight);
    border: 1px solid hsl(var(--btn-outline-border));
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
}

.btn-outline:hover {
    background: hsl(var(--btn-outline-hover-bg));
    color: hsl(var(--btn-outline-hover-text));
    border-color: hsl(var(--btn-outline-hover-border));
    transform: scale(var(--btn-outline-hover-scale));
}

.btn-outline:active {
    background: hsl(var(--btn-outline-active-bg));
    color: hsl(var(--btn-outline-active-text));
    border-color: hsl(var(--btn-outline-active-border));
    transform: scale(var(--btn-outline-active-scale));
}

.btn-ghost {
    background: hsl(var(--btn-ghost-bg));
    color: hsl(var(--btn-ghost-text));
    border-radius: var(--btn-ghost-radius);
    padding-left: var(--btn-ghost-px);
    padding-right: var(--btn-ghost-px);
    padding-top: var(--btn-ghost-py);
    padding-bottom: var(--btn-ghost-py);
    font-weight: var(--btn-ghost-weight);
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
}

.btn-ghost:hover {
    background: hsl(var(--btn-ghost-hover-bg));
    color: hsl(var(--btn-ghost-hover-text));
    transform: scale(var(--btn-ghost-hover-scale));
}

.btn-ghost:active {
    background: hsl(var(--btn-ghost-active-bg));
    color: hsl(var(--btn-ghost-active-text));
    transform: scale(var(--btn-ghost-active-scale));
}

/* Link Classes */
.link-std {
    color: hsl(var(--link-std-text));
    font-weight: var(--link-std-weight);
    text-decoration: var(--link-std-under);
    transition: all 0.2s ease;
    cursor: pointer;
}

.link-std:hover {
    color: hsl(var(--link-std-hover-text));
    transform: scale(var(--link-std-hover-scale));
}

.link-std:active {
    color: hsl(var(--link-std-active-text));
    transform: scale(var(--link-std-active-scale));
}

.link-bold {
    color: hsl(var(--link-bold-text));
    font-weight: var(--link-bold-weight);
    text-decoration: var(--link-bold-under);
    transition: all 0.2s ease;
    cursor: pointer;
}

.link-bold:hover {
    color: hsl(var(--link-bold-hover-text));
    transform: scale(var(--link-bold-hover-scale));
}

.link-bold:active {
    color: hsl(var(--link-bold-active-text));
    transform: scale(var(--link-bold-active-scale));
}

/* Navigation Classes */
.site-title {
    font-size: var(--site-title-size);
    font-weight: var(--site-title-weight);
    line-height: var(--site-title-line-height);
    letter-spacing: var(--site-title-letter-spacing);
    color: hsl(var(--foreground));
}

.mobile-menu-btn {
    font-size: var(--mobile-menu-btn-size);
    font-weight: var(--mobile-menu-btn-weight);
    line-height: var(--mobile-menu-btn-line-height);
    letter-spacing: var(--mobile-menu-btn-letter-spacing);
    color: hsl(var(--foreground));
}

.mobile-menu-links {
    font-size: var(--mobile-menu-links-size);
    font-weight: var(--mobile-menu-links-weight);
    line-height: var(--mobile-menu-links-line-height);
    letter-spacing: var(--mobile-menu-links-letter-spacing);
    color: hsl(var(--foreground));
}

/* Responsive Mobile Variants */
@media (max-width: 768px) {
    .h1 {
        font-size: var(--h1-mobile-size);
        line-height: var(--h1-mobile-line-height);
    }
    
    .h2 {
        font-size: var(--h2-mobile-size);
        line-height: var(--h2-mobile-line-height);
    }
    
    .h3 {
        font-size: var(--h3-mobile-size);
        line-height: var(--h3-mobile-line-height);
    }
    
    .body {
        font-size: var(--body-mobile-size);
        line-height: var(--body-mobile-line-height);
    }
    
    .small {
        font-size: var(--small-mobile-size);
        line-height: var(--small-mobile-line-height);
    }
    
    .caption {
        font-size: var(--caption-mobile-size);
        line-height: var(--caption-mobile-line-height);
    }
    
    .btn-primary {
        padding-left: var(--btn-primary-mobile-px);
        padding-right: var(--btn-primary-mobile-px);
        padding-top: var(--btn-primary-mobile-py);
        padding-bottom: var(--btn-primary-mobile-py);
    }
    
    .btn-secondary {
        padding-left: var(--btn-secondary-mobile-px);
        padding-right: var(--btn-secondary-mobile-px);
        padding-top: var(--btn-secondary-mobile-py);
        padding-bottom: var(--btn-secondary-mobile-py);
    }
    
    .btn-outline {
        padding-left: var(--btn-outline-mobile-px);
        padding-right: var(--btn-outline-mobile-px);
        padding-top: var(--btn-outline-mobile-py);
        padding-bottom: var(--btn-outline-mobile-py);
    }
    
    .btn-ghost {
        padding-left: var(--btn-ghost-mobile-px);
        padding-right: var(--btn-ghost-mobile-px);
        padding-top: var(--btn-ghost-mobile-py);
        padding-bottom: var(--btn-ghost-mobile-py);
    }
}`;
    console.log(`Generated CSS for theme: ${activeTheme.name}`, cssContent);
    
    // Copy to clipboard
    navigator.clipboard.writeText(cssContent).then(() => {
      alert(`CSS for ${activeTheme.name} copied to clipboard! Paste into src/styles/${activeThemeId}-theme.css`);
    }).catch(err => {
      console.error('Failed to copy CSS: ', err);
      alert('Failed to copy CSS. Check console for details.');
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen font-sans text-foreground bg-background border-t relative overflow-x-hidden">
      {/* Sidebar Controls */}
      <aside className="w-full lg:w-96 bg-card border-r p-6 space-y-8 overflow-y-auto max-h-screen lg:sticky lg:top-0 shadow-xl z-20 style-editor-ui">
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div className="text-xl font-bold flex items-center gap-2">
            <span className="w-3 h-3 bg-primary rounded-full animate-pulse"></span>
            Style Editor
          </div>
          <Settings2 className="w-5 h-5 text-muted-foreground" />
        </div>

        {/* THEME SELECTOR DROPDOWN */}
        <div className="space-y-3">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Select Theme</label>
            <div className="relative">
                <select
                    value={activeThemeId}
                    onChange={(e) => setActiveThemeId(e.target.value as keyof typeof themes)}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 pr-10 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-primary/30 transition-all"
                >
                    {availableThemes.map(theme => (
                        <option key={theme.id} value={theme.id}>
                            {theme.name}
                        </option>
                    ))}
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none rotate-90" />
            </div>
        </div>

        {/* DEVICE TOGGLE */}
        <div className="flex gap-2 p-1 bg-muted rounded-xl">
            <button
                onClick={() => setPreviewDevice('desktop')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${previewDevice === 'desktop' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-secondary text-secondary-foreground hover:bg-primary/20'}`}
            >
                Desktop View
            </button>
            <button
                onClick={() => setPreviewDevice('mobile')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${previewDevice === 'mobile' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-secondary text-secondary-foreground hover:bg-primary/20'}`}
            >
                Mobile View
            </button>
        </div>

        {/* SECTION: COLORS */}
        <section className="space-y-4">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Design Tokens: Colors</div>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(activeTheme.colors).map(([v, hex]) => (
              <div key={v} className="flex items-center justify-between bg-muted/50 p-2.5 rounded-xl border border-border hover:border-primary/30 transition-all group">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground group-hover:text-primary transition-colors">{v.replace('--', '')}</span>
                    <span className="text-xs font-mono font-medium text-foreground">{hex}</span>
                </div>
                <input 
                  type="color" 
                  value={hex}
                  className="w-10 h-10 rounded-lg border p-1 cursor-pointer bg-background"
                  onChange={(e) => handleColorChange(v, e.target.value)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: TYPOGRAPHY LIST */}
        <section className="space-y-4 pt-4 border-t">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Text Styles</div>
          <div className="space-y-2">
             <div className="p-3 bg-foreground rounded-xl text-background space-y-3 shadow-lg">
                <div className="space-y-1">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">Base Font Size</div>
                    <select 
                        value={activeTheme.baseTypo.fontSize}
                        onChange={(e) => handleBaseTypoChange('fontSize', e.target.value)}
                        className="w-full bg-card border-none rounded-lg p-2 text-sm focus:ring-1 focus:ring-primary/20 outline-none"
                    >
                        {['14px', '16px', '18px', '20px'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div className="space-y-1">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">Font Family</div>
                    <select 
                        value={activeTheme.baseTypo.fontFamily}
                        onChange={(e) => handleBaseTypoChange('fontFamily', e.target.value)}
                        className="w-full bg-card border-none rounded-lg p-2 text-sm focus:ring-1 focus:ring-primary/20 outline-none"
                    >
                        <option value="ui-sans-serif, system-ui, sans-serif">Sans (System)</option>
                        <option value="Inter, sans-serif">Inter</option>
                        <option value="'Roboto', sans-serif">Roboto</option>
                        <option value="'Playfair Display', serif">Playfair (Serif)</option>
                        <option value="monospace">Monospace</option>
                    </select>
                </div>
             </div>

             {Object.keys(activeTheme.elementStyles).map((styleKey) => (
                <button 
                  key={styleKey}
                  onClick={() => setEditingStyle(styleKey)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-card border border-border hover:bg-muted hover:border-primary/20 transition-all group"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                            <Type className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-sm uppercase text-foreground">{styleKey}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </button>
             ))}
          </div>
        </section>

        <PageThemeSelector />

        <section className="pt-8 space-y-3">
          <button 
            onClick={saveToConfig}
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg active:scale-95"
          >
            <Download className="w-5 h-5" />
            Export {activeTheme.name} CSS
          </button>
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
            <div className="text-[10px] text-amber-800 leading-normal flex items-start gap-2">
              <Save className="w-3 h-3 mt-0.5 shrink-0" />
              <span><strong>Persistence:</strong> Changes are temporary. Copy exported code into <code>src/styles/theme.css</code>.</span>
            </div>
          </div>
        </section>
      </aside>

      {/* Main Preview Area */}
      <main className={`flex-1 p-4 lg:p-12 overflow-y-auto bg-card/50 pattern-grid transition-all duration-500 ${previewDevice === 'mobile' ? 'flex justify-center' : ''}`}>
         <div className={`preview-${previewDevice} mx-auto space-y-12 transition-all duration-500 ${previewDevice === 'mobile' ? 'w-[375px] border-[12px] border-foreground rounded-[3rem] bg-background h-[812px] overflow-y-auto shadow-2xl relative' : 'max-w-5xl w-full'}`}>
            {previewDevice === 'mobile' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-foreground rounded-b-2xl z-50"></div>
            )}
            
            {/* Header Block copied from Golf page Navbar with Mobile Support */}
            <div className="relative">
              {/* Base navbar background */}
              <div className="navbar border-b bg-card/30 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 rounded-t-2xl">
                {/* Hover effect layer - between background and content */}
                <div 
                  className="absolute inset-0 bg-green-500/0 hover:bg-green-500/10 hover:ring-2 hover:ring-green-500/30 hover:ring-inset transition-all group pointer-events-none"
                  onClick={(e) => { e.stopPropagation(); setEditingStyle('navbar'); }}
                ></div>
                
                {/* Header content on top */}
                <div className="relative z-10">
                {/* Edit button for header background */}
                <button 
                  onClick={(e) => { e.stopPropagation(); setEditingStyle('navbar'); }}
                  className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center gap-1 z-50"
                  title="Edit header background"
                >
                  <Settings2 className="w-3 h-3" />
                  Edit
                </button>
                {previewDevice === 'mobile' ? (
                /* Mobile Header - matching Golf page Navbar mobile structure */
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    {/* Page Name - using site-title style for independent editing */}
                    <div className="site-title hover:opacity-80 transition-opacity cursor-pointer hover:ring-2 hover:ring-primary/20 hover:bg-primary/5 rounded px-2 -mx-2 transition-all" onClick={() => setEditingStyle('site-title')}>
                      Golf Properties
                    </div>
                    
                    {/* Mobile Menu Toggle - using ghost button style like in Navbar */}
                    <button className="btn-ghost" onClick={() => setEditingStyle('btn-ghost')}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Mobile Menu Items - matching Navbar mobile menu structure */}
                  <div className="md:hidden border-t p-4 space-y-4 bg-white/70 backdrop-blur">
                    <a href="#" className="block text-sm font-medium hover:text-primary transition-colors cursor-pointer hover:ring-2 hover:ring-primary/20 hover:bg-primary/5 rounded px-2 -mx-2 transition-all mobile-menu-links" onClick={(e) => { e.preventDefault(); setEditingStyle('mobile-menu-links'); }}>
                      Villas
                    </a>
                    <a href="#" className="block text-sm font-medium hover:text-primary transition-colors cursor-pointer hover:ring-2 hover:ring-primary/20 hover:bg-primary/5 rounded px-2 -mx-2 transition-all mobile-menu-links" onClick={(e) => { e.preventDefault(); setEditingStyle('mobile-menu-links'); }}>
                      Golf
                    </a>
                    <a href="#" className="block text-sm font-medium hover:text-primary transition-colors cursor-pointer hover:ring-2 hover:ring-primary/20 hover:bg-primary/5 rounded px-2 -mx-2 transition-all mobile-menu-links" onClick={(e) => { e.preventDefault(); setEditingStyle('mobile-menu-links'); }}>
                      Location
                    </a>
                    <a href="#" className="block text-sm font-medium hover:text-primary transition-colors cursor-pointer hover:ring-2 hover:ring-primary/20 hover:bg-primary/5 rounded px-2 -mx-2 transition-all mobile-menu-links" onClick={(e) => { e.preventDefault(); setEditingStyle('mobile-menu-links'); }}>
                      Lifestyle
                    </a>
                    <button className="btn-primary w-full mobile-menu-btn" onClick={() => setEditingStyle('btn-primary')}>
                      Prices & Visits
                    </button>
                    <div className="flex justify-center pt-2">
                      <LanguageSwitcher />
                    </div>
                  </div>
                </div>
              ) : (
                /* Desktop Header */
                <div className="px-6 py-4 h-16 flex items-center justify-between">
                  {/* Page Name - using site-title style for independent editing */}
                  <h1 className="site-title hover:opacity-80 transition-opacity cursor-pointer hover:ring-2 hover:ring-primary/20 hover:bg-primary/5 rounded px-2 -mx-2 transition-all" onClick={() => setEditingStyle('site-title')}>
                    Golf Properties
                  </h1>
                  
                  {/* Single Menu Item - using link style */}
                  <div className="flex items-center gap-6">
                    <a href="#" className="text-sm font-medium hover:text-primary transition-colors cursor-pointer hover:ring-2 hover:ring-primary/20 hover:bg-primary/5 rounded px-2 -mx-2 transition-all" onClick={(e) => { e.preventDefault(); setEditingStyle('link-std'); }}>
                      Features
                    </a>
                    
                    {/* Single Button - using btn-primary style */}
                    <button className="btn-primary" onClick={() => setEditingStyle('btn-primary')}>
                      Get Info
                    </button>
                  </div>
                </div>
              )}
                </div>
              </div>
            </div>

            <div className={`bg-card transition-all ${previewDevice === 'mobile' ? 'p-6 pt-4' : 'rounded-b-3xl rounded-t-none p-8 lg:p-16 shadow-2xl border border-border relative'}`}>
                <div className="flex flex-col space-y-16">
                    {/* Typography Showcase */}
                    <div className="space-y-8">
                        <div className="text-[10px] uppercase font-bold text-muted-foreground border-b pb-2">Typography Scale</div>
                        
                        <div className="grid grid-cols-1 gap-4">
                            <div className="cursor-pointer hover:ring-2 hover:ring-primary/20 hover:bg-primary/5 rounded px-2 -mx-2 transition-all" onClick={() => setEditingStyle('h1')}>
                                <h1 className="h1">Headline Level 1</h1>
                            </div>
                            <div className="cursor-pointer hover:ring-2 hover:ring-primary/20 hover:bg-primary/5 rounded px-2 -mx-2 transition-all border-t pt-4" onClick={() => setEditingStyle('h2')}>
                                <h2 className="h2">Headline Level 2</h2>
                            </div>
                            <div className="cursor-pointer hover:ring-2 hover:ring-primary/20 hover:bg-primary/5 rounded px-2 -mx-2 transition-all border-t pt-4" onClick={() => setEditingStyle('h3')}>
                                <h3 className="h3">Headline Level 3</h3>
                            </div>
                            <div className="cursor-pointer hover:ring-2 hover:ring-primary/20 hover:bg-primary/5 rounded px-2 -mx-2 transition-all border-t pt-4" onClick={() => setEditingStyle('body')}>
                                <p className="body">Body Text: The quick brown fox jumps over lazy dog. This demonstrates readable paragraph text with proper line height and spacing.</p>
                            </div>
                            <div className="cursor-pointer hover:ring-2 hover:ring-primary/20 hover:bg-primary/5 rounded px-2 -mx-2 transition-all border-t pt-4" onClick={() => setEditingStyle('small')}>
                                <small className="small">Small Text: Used for metadata, captions, and supporting information throughout interface.</small>
                            </div>
                            <div className="cursor-pointer hover:ring-2 hover:ring-primary/20 hover:bg-primary/5 rounded px-2 -mx-2 transition-all border-t pt-4" onClick={() => setEditingStyle('caption')}>
                                <div className="caption">Caption: Helper text and form field descriptions</div>
                            </div>
                        </div>
                    </div>

                    {/* Complete Button Showcase */}
                    <div className="space-y-8 border-t pt-8">
                        <div className="text-[10px] uppercase font-bold text-muted-foreground">Complete Button System</div>
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-4">
                                <button className="btn-primary" onClick={() => setEditingStyle('btn-primary')}>
                                    Primary Button
                                </button>
                                <button className="btn-secondary" onClick={() => setEditingStyle('btn-secondary')}>
                                    Secondary Button
                                </button>
                                <button className="btn-outline" onClick={() => setEditingStyle('btn-outline')}>
                                    Outline Button
                                </button>
                                <button className="btn-ghost" onClick={() => setEditingStyle('btn-ghost')}>
                                    Ghost Button
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span>• Hover to see hover states</span>
                                <span>• Click to see active states</span>
                                <span>• All buttons have responsive padding</span>
                            </div>
                        </div>
                    </div>

                    {/* Complete Link Showcase */}
                    <div className="space-y-8 border-t pt-8">
                        <div className="text-[10px] uppercase font-bold text-muted-foreground">Complete Link System</div>
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-8 items-center">
                                <a href="#" className="link-std" onClick={(e) => { e.preventDefault(); setEditingStyle('link-std'); }}>
                                    Standard Link →
                                </a>
                                <a href="#" className="link-bold" onClick={(e) => { e.preventDefault(); setEditingStyle('link-bold'); }}>
                                    Bold Link →
                                </a>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                <span>• Underline style for standard links</span>
                                <span>• No underline for bold links</span>
                                <span>• Hover and active states with scale</span>
                            </div>
                        </div>
                    </div>

                    {/* Color Palette Showcase */}
                    <div className="space-y-8 border-t pt-8">
                        <div className="text-[10px] uppercase font-bold text-muted-foreground">Color Palette</div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 rounded-xl bg-card border border-border shadow-sm flex flex-col items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary"></div>
                                <span className="text-xs font-medium">Primary</span>
                            </div>
                            <div className="p-4 rounded-xl bg-card border border-border shadow-sm flex flex-col items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-secondary"></div>
                                <span className="text-xs font-medium">Secondary</span>
                            </div>
                            <div className="p-4 rounded-xl bg-card border border-border shadow-sm flex flex-col items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-accent"></div>
                                <span className="text-xs font-medium">Accent</span>
                            </div>
                            <div className="p-4 rounded-xl bg-card border border-border shadow-sm flex flex-col items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-muted"></div>
                                <span className="text-xs font-medium">Muted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </main>

      {/* TYPOGRAPHY EDIT DIALOG */}
      {editingStyle && (activeTheme.elementStyles[editingStyle] || editingStyle === 'navbar') && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 style-editor-ui">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setEditingStyle(null)} />
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-white/10">
                    <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Preview Style: {editingStyle.toUpperCase()}</div>
                    <div className="live-style-preview truncate py-2 min-h-[60px] flex items-center" style={{ 
                        color: activeTheme.elementStyles[editingStyle]?.color ? 
                            (activeTheme.elementStyles[editingStyle].color?.startsWith('#') ? 
                                `hsl(${hexToHslVariables(activeTheme.elementStyles[editingStyle].color)})` : 
                                activeTheme.elementStyles[editingStyle].color) : undefined 
                    }}>
                        {editingStyle === 'h1' && <h1 className="h1">Heading 1 Preview</h1>}
                        {editingStyle === 'h2' && <h2 className="h2">Heading 2 Preview</h2>}
                        {editingStyle === 'h3' && <h3 className="h3">Heading 3 Preview</h3>}
                        {editingStyle === 'body' && <p className="body">Body Paragraph Preview Style</p>}
                        {editingStyle === 'small' && <small className="small">Small Caption Preview</small>}
                        {editingStyle === 'caption' && <div className="caption">Caption text preview</div>}
                        {editingStyle === 'site-title' && <div className="site-title">Golf Properties</div>}
                        {editingStyle.startsWith('btn') && <button className={editingStyle}>
                            {editingStyle.replace('btn-', '')} Label
                        </button>}
                    </div>
                    </div>
                    <button onClick={() => setEditingStyle(null)} className="p-2 hover:bg-white/10 rounded-lg shrink-0 ml-4 self-start"><X className="w-5 h-5" /></button>
                </div>

                <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-6">
                        <div className="text-[10px] font-bold uppercase text-muted-foreground">Base Styles (Desktop)</div>
                        <div className="grid grid-cols-2 gap-4">
                            {activeTheme.elementStyles[editingStyle].size && (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400">Font Size</label>
                                    <input type="text" value={activeTheme.elementStyles[editingStyle].size} onChange={(e) => handleElementStyleChange(editingStyle, 'size', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" />
                                </div>
                            )}
                            {activeTheme.elementStyles[editingStyle].weight && (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400">Weight</label>
                                    <select value={activeTheme.elementStyles[editingStyle].weight} onChange={(e) => handleElementStyleChange(editingStyle, 'weight', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm">
                                        {[300,400,500,600,700,800].map(w => <option key={w} value={w.toString()}>{w}</option>)}
                                    </select>
                                </div>
                            )}
                            {activeTheme.elementStyles[editingStyle].lineHeight && (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400">Line Height</label>
                                    <input type="text" value={activeTheme.elementStyles[editingStyle].lineHeight} onChange={(e) => handleElementStyleChange(editingStyle, 'lineHeight', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" />
                                </div>
                            )}
                            {activeTheme.elementStyles[editingStyle].radius !== undefined && (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400">Border Radius</label>
                                    <input type="text" value={activeTheme.elementStyles[editingStyle].radius || '9999px'} onChange={(e) => handleElementStyleChange(editingStyle, 'radius', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" placeholder="e.g. 0.5rem, 8px, 9999px" />
                                </div>
                            )}
                            {activeTheme.elementStyles[editingStyle].letterSpacing !== undefined && (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400">Letter Spacing</label>
                                    <input type="text" value={activeTheme.elementStyles[editingStyle].letterSpacing || '0'} onChange={(e) => handleElementStyleChange(editingStyle, 'letterSpacing', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" placeholder="e.g. -0.02em, 0.01em, normal" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6 pt-6 border-t border-slate-100">
                        <div className="text-[10px] font-bold uppercase text-purple-600">Color</div>
                        <div className="space-y-4">
                            {/* Preset Color Options */}
                            <div className="grid grid-cols-2 gap-2">
                                {Object.entries(activeTheme.colors).map(([colorVar, colorHex]) => (
                                    <button
                                        key={colorVar}
                                        onClick={() => {
                                            console.log(`Clicked color: ${colorVar} = ${colorHex} for element: ${editingStyle}`);
                                            handleElementStyleChange(editingStyle, 'color', colorHex);
                                        }}
                                        className={`p-2 rounded-lg border text-xs font-medium transition-all ${activeTheme.elementStyles[editingStyle].color === colorHex ? 'bg-purple-500 text-white border-purple-500' : 'bg-white border-slate-200 hover:border-purple-300'}`}
                                    >
                                        <div className="w-4 h-4 rounded-full border-2" style={{ backgroundColor: colorHex }}></div>
                                        <span className="font-mono">{colorVar.replace('--', '')}</span>
                                    </button>
                                ))}
                            </div>
                            
                            {/* Custom Color Input */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400">Custom Color</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="color" 
                                        value={activeTheme.elementStyles[editingStyle].color || '#000000'}
                                        onChange={(e) => {
                                            console.log(`Custom color change: ${editingStyle} = ${e.target.value}`);
                                            handleElementStyleChange(editingStyle, 'color', e.target.value);
                                        }}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm"
                                    />
                                    <input 
                                        type="text" 
                                        value={activeTheme.elementStyles[editingStyle].color || '#000000'}
                                        onChange={(e) => {
                                            console.log(`Custom text color change: ${editingStyle} = ${e.target.value}`);
                                            handleElementStyleChange(editingStyle, 'color', e.target.value);
                                        }}
                                        placeholder="#000000"
                                        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-mono"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interactive States - for buttons and links */}
                    {(editingStyle.startsWith('btn') || editingStyle.startsWith('link')) && (
                        <div className="space-y-6 pt-6 border-t border-slate-100">
                            <div className="text-[10px] font-bold uppercase text-blue-600">Interactive States</div>
                            
                            {/* Hover States */}
                            <div className="space-y-4">
                                <div className="text-[10px] font-bold uppercase text-slate-400 mb-3">Hover State</div>
                                <div className="grid grid-cols-2 gap-4">
                                    {activeTheme.elementStyles[editingStyle].hoverBg !== undefined && (
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400">Background</label>
                                            <input type="color" value={activeTheme.elementStyles[editingStyle].hoverBg || '#000000'} onChange={(e) => handleElementStyleChange(editingStyle, 'hoverBg', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" />
                                        </div>
                                    )}
                                    {activeTheme.elementStyles[editingStyle].hoverText !== undefined && (
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400">Text Color</label>
                                            <input type="color" value={activeTheme.elementStyles[editingStyle].hoverText || '#000000'} onChange={(e) => handleElementStyleChange(editingStyle, 'hoverText', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" />
                                        </div>
                                    )}
                                    {activeTheme.elementStyles[editingStyle].hoverBorder !== undefined && (
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400">Border Color</label>
                                            <input type="color" value={activeTheme.elementStyles[editingStyle].hoverBorder || '#000000'} onChange={(e) => handleElementStyleChange(editingStyle, 'hoverBorder', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" />
                                        </div>
                                    )}
                                    {activeTheme.elementStyles[editingStyle].hoverScale !== undefined && (
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400">Scale</label>
                                            <input type="text" value={activeTheme.elementStyles[editingStyle].hoverScale || '1'} onChange={(e) => handleElementStyleChange(editingStyle, 'hoverScale', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" placeholder="e.g. 1.05" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Active States */}
                            <div className="space-y-4">
                                <div className="text-[10px] font-bold uppercase text-slate-400 mb-3">Active State</div>
                                <div className="grid grid-cols-2 gap-4">
                                    {activeTheme.elementStyles[editingStyle].activeBg !== undefined && (
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400">Background</label>
                                            <input type="color" value={activeTheme.elementStyles[editingStyle].activeBg || '#000000'} onChange={(e) => handleElementStyleChange(editingStyle, 'activeBg', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" />
                                        </div>
                                    )}
                                    {activeTheme.elementStyles[editingStyle].activeText !== undefined && (
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400">Text Color</label>
                                            <input type="color" value={activeTheme.elementStyles[editingStyle].activeText || '#000000'} onChange={(e) => handleElementStyleChange(editingStyle, 'activeText', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" />
                                        </div>
                                    )}
                                    {activeTheme.elementStyles[editingStyle].activeBorder !== undefined && (
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400">Border Color</label>
                                            <input type="color" value={activeTheme.elementStyles[editingStyle].activeBorder || '#000000'} onChange={(e) => handleElementStyleChange(editingStyle, 'activeBorder', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" />
                                        </div>
                                    )}
                                    {activeTheme.elementStyles[editingStyle].activeScale !== undefined && (
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400">Scale</label>
                                            <input type="text" value={activeTheme.elementStyles[editingStyle].activeScale || '1'} onChange={(e) => handleElementStyleChange(editingStyle, 'activeScale', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" placeholder="e.g. 0.95" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-6 pt-6 border-t border-slate-100">
                        <div className="text-[10px] font-bold uppercase text-purple-600">Mobile Overrides</div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400">Mobile Size</label>
                                <input type="text" value={activeTheme.elementStyles[editingStyle].mobile?.size || ''} onChange={(e) => handleResponsiveChange(editingStyle, 'mobile', 'size', e.target.value)} className="w-full bg-purple-50/50 border border-purple-100 rounded-lg p-2 text-sm" placeholder="e.g. 1.5rem" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400">Mobile Line-H</label>
                                <input type="text" value={activeTheme.elementStyles[editingStyle].mobile?.lineHeight || ''} onChange={(e) => handleResponsiveChange(editingStyle, 'mobile', 'lineHeight', e.target.value)} className="w-full bg-purple-50/50 border border-purple-100 rounded-lg p-2 text-sm" placeholder="e.g. 1.2" />
                            </div>
                        </div>
                    </div>

                    {/* Header Background Controls - only for navbar */}
                    {editingStyle === 'navbar' && (
                        <div className="space-y-6 pt-6 border-t border-slate-100">
                            <div className="text-[10px] font-bold uppercase text-green-600">Header Background</div>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400">Background Color</label>
                                    <input 
                                        type="text" 
                                        value={activeTheme.elementStyles[editingStyle].bg || ''} 
                                        onChange={(e) => handleElementStyleChange(editingStyle, 'bg', e.target.value)} 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" 
                                        placeholder="e.g. var(--background)"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400">Transparency (0-1)</label>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="1" 
                                        step="0.1"
                                        value={(activeTheme.elementStyles[editingStyle] as any)?.transparency || '0.9'} 
                                        onChange={(e) => handleElementStyleChange(editingStyle, 'transparency', e.target.value)} 
                                        className="w-full" 
                                    />
                                    <div className="text-xs text-slate-500 text-center">{(activeTheme.elementStyles[editingStyle] as any)?.transparency || '0.9'}</div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400">Blur Amount (px)</label>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="50" 
                                        step="1"
                                        value={activeTheme.elementStyles[editingStyle].blur || '12'} 
                                        onChange={(e) => handleElementStyleChange(editingStyle, 'blur', e.target.value)} 
                                        className="w-full" 
                                    />
                                    <div className="text-xs text-slate-500 text-center">{activeTheme.elementStyles[editingStyle].blur || '12'}px</div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400">Border Color</label>
                                    <input 
                                        type="text" 
                                        value={activeTheme.elementStyles[editingStyle].border || ''} 
                                        onChange={(e) => handleElementStyleChange(editingStyle, 'border', e.target.value)} 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" 
                                        placeholder="e.g. var(--border)"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="pt-4"><button onClick={() => setEditingStyle(null)} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl">Done</button></div>
                </div>
            </div>
        </div>
      )}
      <style>{`
        .style-editor-ui { font-size: 14px !important; font-family: Inter, sans-serif !important; }
        .live-style-preview h1, .live-style-preview h2, .live-style-preview h3, .live-style-preview p, .live-style-preview small { margin: 0 !important; }
      `}</style>
    </div>
  );
};
