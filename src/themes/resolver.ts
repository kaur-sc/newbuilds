import type { ThemeKey } from './index';
import type { RouteMetadata } from './types';
import { themes, DEFAULT_THEME } from './index';

export function resolveTheme(metadata?: RouteMetadata): ThemeKey {
    // Priority: explicit page theme > default theme
    if (metadata?.theme && themes[metadata.theme as ThemeKey]) {
        return metadata.theme as ThemeKey;
    }
    return DEFAULT_THEME;
}

export function applyTheme(themeKey: ThemeKey): void {
    const theme = themes[themeKey];
    if (!theme) {
        console.warn(`Theme "${themeKey}" not found, applying default theme`);
        themeKey = DEFAULT_THEME;
    }
    
    // Re-get theme if we defaulted
    const finalTheme = themes[themeKey];
    if (!finalTheme) {
        console.error('Default theme not found');
        return;
    }
    
    // Apply theme via data-theme attribute only
    // CSS files handle all variable applications
    if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.setAttribute('data-theme', themeKey);
        console.log(`Theme applied via data-theme attribute: ${themeKey}`);
    }
}
