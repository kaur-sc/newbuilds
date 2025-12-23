import { useEffect, type ReactNode } from 'react';
import { resolveTheme, applyTheme } from './resolver';
import { DEFAULT_THEME } from './index';
import { getPageTheme } from '@/lib/pageThemeManager';

interface ThemeProviderProps {
    children: ReactNode;
    // Route metadata can be passed as prop
    routeTheme?: string;
}

export function ThemeProvider({ children, routeTheme }: ThemeProviderProps) {
    useEffect(() => {
        console.log(`🎨 [ThemeProvider] Initializing with routeTheme: "${routeTheme}"`);
        
        // Priority: routeTheme > saved theme > default theme
        let finalThemeKey: string;
        
        if (routeTheme) {
            console.log(`🎨 [ThemeProvider] Using route theme: "${routeTheme}"`);
            const metadata = { theme: routeTheme };
            finalThemeKey = resolveTheme(metadata);
        } else {
            // Check if there's a saved theme for the current page
            const currentPath = window.location.pathname;
            const savedTheme = getPageTheme(currentPath);
            
            if (savedTheme) {
                console.log(`🎨 [ThemeProvider] Using saved theme "${savedTheme}" for path "${currentPath}"`);
                finalThemeKey = savedTheme;
            } else {
                console.log(`🎨 [ThemeProvider] No saved theme found, using default theme "${DEFAULT_THEME}"`);
                finalThemeKey = DEFAULT_THEME;
            }
        }
        
        applyTheme(finalThemeKey as any);
    }, [routeTheme]);

    return <>{children}</>;
}

// Hook for pages to declare their theme
export function usePageTheme(theme: string) {
    // This can be used by pages to declare their theme preference
    // The theme will be applied by the ThemeProvider
    return { theme };
}
