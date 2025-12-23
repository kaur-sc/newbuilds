import type { ThemeKey } from './index';
import type { RouteMetadata } from './types';
import { themes, DEFAULT_THEME } from './index';

export function resolveTheme(metadata?: RouteMetadata): ThemeKey {
    // Priority: explicit page theme > saved theme > default theme
    
    // Check if explicit theme is provided and valid
    if (metadata?.theme && themes[metadata.theme as ThemeKey]) {
        console.log(`🎨 [ThemeResolver] Using explicit theme: "${metadata.theme}"`);
        return metadata.theme as ThemeKey;
    }
    
    // Check if there's a saved theme for current page
    if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        try {
            const assignments = JSON.parse(localStorage.getItem('pageThemeAssignments') || '[]');
            const savedAssignment = assignments.find((a: any) => {
                // Handle Golf Properties variations
                const isGolfPropertiesPage = (path: string) => 
                    path.includes('new-build-golf-properties-costa-blanca');
                
                if (isGolfPropertiesPage(a.pagePath) && isGolfPropertiesPage(currentPath)) {
                    return true;
                }
                return a.pagePath === currentPath;
            });
            
            if (savedAssignment && savedAssignment.themeId && themes[savedAssignment.themeId as ThemeKey]) {
                console.log(`🎨 [ThemeResolver] Using saved theme: "${savedAssignment.themeId}" for path "${currentPath}"`);
                return savedAssignment.themeId as ThemeKey;
            }
        } catch (error) {
            console.warn(`🎨 [ThemeResolver] Error reading saved theme:`, error);
        }
    }
    
    console.log(`🎨 [ThemeResolver] Using default theme: "${DEFAULT_THEME}"`);
    return DEFAULT_THEME;
}

// Validate that theme CSS is loaded and available
function validateThemeCSS(themeKey: ThemeKey): boolean {
    if (typeof document === 'undefined') return false;
    
    try {
        // Create a test element to check if theme CSS variables are available
        const testElement = document.createElement('div');
        testElement.style.display = 'none';
        testElement.setAttribute('data-theme', themeKey);
        document.body.appendChild(testElement);
        
        // Check if primary CSS variable is available (this indicates theme CSS is loaded)
        const computedStyle = getComputedStyle(testElement);
        const primaryColor = computedStyle.getPropertyValue('--primary');
        
        // Clean up
        document.body.removeChild(testElement);
        
        if (primaryColor && primaryColor.trim() !== '') {
            console.log(`✅ [ThemeResolver] Theme CSS validation passed for "${themeKey}"`);
            return true;
        } else {
            console.warn(`⚠️ [ThemeResolver] Theme CSS validation failed for "${themeKey}" - CSS variables not available`);
            return false;
        }
    } catch (error) {
        console.warn(`⚠️ [ThemeResolver] Theme CSS validation error for "${themeKey}":`, error);
        return false;
    }
}

export function applyTheme(themeKey: ThemeKey): void {
    console.log(`🎨 [ThemeResolver] Attempting to apply theme: "${themeKey}"`);
    
    const theme = themes[themeKey];
    if (!theme) {
        console.warn(`⚠️ [ThemeResolver] Theme "${themeKey}" not found, applying default theme "${DEFAULT_THEME}"`);
        themeKey = DEFAULT_THEME;
    }
    
    // Re-get theme if we defaulted
    const finalTheme = themes[themeKey];
    if (!finalTheme) {
        console.error(`❌ [ThemeResolver] Default theme "${DEFAULT_THEME}" not found`);
        return;
    }
    
    // Apply theme via data-theme attribute only
    // CSS files handle all variable applications
    if (typeof document !== 'undefined' && document.documentElement) {
        const previousTheme = document.documentElement.getAttribute('data-theme');
        document.documentElement.setAttribute('data-theme', themeKey);
        
        console.log(`✅ [ThemeResolver] Theme applied: "${themeKey}" (previous: "${previousTheme}")`);
        
        // Validate theme CSS is loaded and verify theme was applied
        setTimeout(() => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const cssValid = validateThemeCSS(themeKey);
            
            if (currentTheme === themeKey && cssValid) {
                console.log(`✅ [ThemeResolver] Theme application successful: "${currentTheme}"`);
            } else {
                console.error(`❌ [ThemeResolver] Theme application failed. Expected "${themeKey}", got "${currentTheme}", CSS valid: ${cssValid}`);
            }
        }, 100);
    } else {
        console.warn(`⚠️ [ThemeResolver] Document not available for theme application`);
    }
}
