import { routes } from '@/routes';
import { themes, type ThemeKey } from '@/themes';
import { applyTheme } from '@/themes/resolver';

export interface PageInfo {
  path: string;
  name: string;
  currentTheme?: ThemeKey;
}

export interface PageThemeAssignment {
  pagePath: string;
  themeId: ThemeKey;
}

// Extract all pages from routes configuration
export const extractPagesFromRoutes = (): PageInfo[] => {
  const pages: PageInfo[] = [];
  
  const processRoute = (route: any, parentPath = '') => {
    const fullPath = parentPath + route.path;
    
    // Skip wildcard routes, layout wrapper, and style editor (admin page)
    if (route.path === '*' || route.path === undefined || route.element?.type?.name === 'RootLayout' || route.path === 'style-editor') {
      return;
    }
    
    // Handle index routes specially
    if (route.index === true && parentPath === '') {
      pages.push({
        path: '/',
        name: 'Home'
      });
      return;
    }
    
    // Determine page name based on path and route configuration
    let name = '';
    
    if (fullPath === '/') {
      name = 'Home';
    } else if (fullPath === 'new-build-golf-properties-costa-blanca') {
      name = 'Golf Properties';
    } else if (fullPath.includes('new-build-golf-properties-costa-blanca')) {
      // Extract theme from ThemeProvider wrapper
      const hasThemeProvider = route.element && 
        route.element.type && 
        route.element.type.name === 'ThemeProvider' && 
        route.element.props.routeTheme;
      if (hasThemeProvider) {
        const themeName = route.element.props.routeTheme;
        name = themeName.split('-').map((part: string) => 
          part.charAt(0).toUpperCase() + part.slice(1)
        ).join('-');
      } else {
        name = 'Golf Properties';
      }
    } else if (fullPath.includes('style-editor')) {
      name = 'Style Editor';
    } else if (fullPath.includes('developments/')) {
      // Extract development ID from path
      const devId = fullPath.split('developments/')[1];
      if (devId) {
        name = devId.charAt(0).toUpperCase() + devId.slice(1);
      }
    } else {
      // Generate name from path
      const parts = fullPath.split('/').filter(Boolean);
      name = parts.map(part => 
        part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ')
      ).join(' ');
    }
    
    if (name) {
      // Check if route has ThemeProvider to determine current theme
      let currentTheme: ThemeKey | undefined;
      if (route.element && route.element.type?.name === 'ThemeProvider' && route.element.props.routeTheme) {
        currentTheme = route.element.props.routeTheme as ThemeKey;
      }
      
      pages.push({
        path: fullPath,
        name,
        currentTheme
      });
    }
    
    // Process children recursively
    if (route.children && Array.isArray(route.children)) {
      route.children.forEach((child: any) => processRoute(child, fullPath));
    }
  };
  
  routes.forEach(route => {
    // Process the root layout and its children
    if (route.children && Array.isArray(route.children)) {
      route.children.forEach((child: any) => processRoute(child, route.path || ''));
    }
  });
  
  return pages;
};

// Get available themes
export const getAvailableThemes = () => {
  return Object.entries(themes).map(([id, theme]) => ({
    id: id as ThemeKey,
    name: theme.name
  }));
};

// Helper function to detect if user is currently on the target page
const isCurrentPage = (pagePath: string): boolean => {
  const currentPath = window.location.pathname;
  
  // Exact match
  if (currentPath === pagePath) {
    return true;
  }
  
  // Handle root path
  if (pagePath === '/' && currentPath === '/') {
    return true;
  }
  
  // Handle Golf Properties variations
  if (pagePath.includes('new-build-golf-properties') && currentPath.includes('new-build-golf-properties')) {
    return true;
  }
  
  return false;
};

// Apply theme to a page and actually switch the theme if on that page
export const applyThemeToPage = (pagePath: string, themeId: ThemeKey): void => {
  // Save to localStorage (existing logic)
  const assignments = getPageThemeAssignments();
  const existingIndex = assignments.findIndex(a => a.pagePath === pagePath);
  
  if (existingIndex >= 0) {
    assignments[existingIndex].themeId = themeId;
  } else {
    assignments.push({ pagePath, themeId });
  }
  
  localStorage.setItem('pageThemeAssignments', JSON.stringify(assignments));
  
  // NEW: Actually apply the theme if user is on the target page
  if (isCurrentPage(pagePath)) {
    applyTheme(themeId);
    console.log(`✅ Applied theme "${themeId}" to current page "${pagePath}"`);
    
    // Force a re-render to ensure theme is applied
    setTimeout(() => {
      document.body.style.display = 'none';
      document.body.offsetHeight; // Force reflow
      document.body.style.display = '';
    }, 100);
  } else {
    console.log(`📝 Assigned theme "${themeId}" to "${pagePath}" (navigate to see effect)`);
  }
};

// Get all page theme assignments
export const getPageThemeAssignments = (): PageThemeAssignment[] => {
  try {
    const stored = localStorage.getItem('pageThemeAssignments');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Get theme for a specific page
export const getPageTheme = (pagePath: string): ThemeKey | undefined => {
  const assignments = getPageThemeAssignments();
  const assignment = assignments.find(a => a.pagePath === pagePath);
  return assignment?.themeId;
};
