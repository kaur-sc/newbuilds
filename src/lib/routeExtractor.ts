import type { ThemeKey } from '@/themes';

export interface PageInfo {
  path: string;
  name: string;
  currentTheme?: ThemeKey;
}

// Extract all pages from routes configuration
// Note: Pass the routes in to avoid circular dependencies
export const extractPagesFromRoutes = (routes: any[]): PageInfo[] => {
  const pages: PageInfo[] = [];
  
  const processRoute = (route: any, parentPath = '') => {
    // For index routes, path might be undefined or empty
    const routePath = route.path || (route.index ? '' : '');
    
    // Normalize path joining
    let fullPathJoined = parentPath;
    if (routePath) {
      if (!fullPathJoined.endsWith('/') && !routePath.startsWith('/')) {
        fullPathJoined += '/';
      }
      fullPathJoined += routePath;
    }

    // Standardize to leading slash, no trailing slash (except for root)
    let fullPath = fullPathJoined.startsWith('/') ? fullPathJoined : '/' + fullPathJoined;
    if (fullPath.length > 1 && fullPath.endsWith('/')) {
      fullPath = fullPath.slice(0, -1);
    }

    // Skip wildcard routes and the style editor itself (admin page)
    if (route.path === '*' || fullPath === '/style-editor') {
      return;
    }
    
    // Determine page name based on path and route configuration
    let name = '';
    
    if (fullPath === '/' || route.index) {
      name = 'Home';
    } else if (fullPath.includes('new-build-golf-properties-costa-blanca')) {
      // Look for routeTheme in element props if it's a ThemeProvider wrapper
      const themeName = route.element?.props?.routeTheme;
      if (themeName) {
        name = themeName.split('-').map((part: string) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
      } else {
        name = 'Golf Properties';
      }
    } else if (fullPath.includes('developments/')) {
      const devId = fullPath.split('developments/')[1];
      if (devId) {
        name = devId.charAt(0).toUpperCase() + devId.slice(1).replace(/-/g, ' ');
      }
    } else {
      const parts = fullPath.split('/').filter(Boolean);
      name = parts.map(part => 
        part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ')
      ).join(' ');
    }
    
    if (name) {
      // Check if route has ThemeProvider to determine current theme
      let currentTheme: ThemeKey | undefined;
      // In flattened routes, ThemeProvider might be the direct element or wrap the element
      if (route.element && route.element.props?.routeTheme) {
        currentTheme = route.element.props.routeTheme as ThemeKey;
      }
      
      // Avoid duplicates
      if (!pages.some(p => p.path === fullPath)) {
        pages.push({
          path: fullPath,
          name,
          currentTheme
        });
      }
    }
    
    // Process children recursively
    if (route.children && Array.isArray(route.children)) {
      route.children.forEach((child: any) => processRoute(child, fullPathJoined));
    }
  };
  
  routes.forEach(route => processRoute(route));
  
  return pages;
};
