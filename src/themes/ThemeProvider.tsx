import { useEffect } from 'react';
import { resolveTheme, applyTheme } from './resolver';
import { DEFAULT_THEME } from './index';

interface ThemeProviderProps {
    children: React.ReactNode;
    // Route metadata can be passed as prop
    routeTheme?: string;
}

export function ThemeProvider({ children, routeTheme }: ThemeProviderProps) {
    useEffect(() => {
        // Resolve theme based on route metadata or fallback to default
        const metadata = routeTheme ? { theme: routeTheme } : undefined;
        const themeKey = resolveTheme(metadata);
        
        // Apply theme
        applyTheme(themeKey);
    }, [routeTheme]);

    return <>{children}</>;
}

// Hook for pages to declare their theme
export function usePageTheme(theme: string) {
    // This can be used by pages to declare their theme preference
    // The theme will be applied by the ThemeProvider
    return { theme };
}
