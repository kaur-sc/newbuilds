import { Link, useLocation } from 'react-router-dom';
import { getAllDevelopments } from '@/lib/content';

interface RouteInfo {
  path: string;
  name: string;
  current: boolean;
}

interface DynamicPageNavigationProps {
  routes: any[];
}

export const DynamicPageNavigation = ({ routes }: DynamicPageNavigationProps) => {
  const location = useLocation();
  
  // Only show on the index page (home page)
  if (location.pathname !== '/') {
    return null;
  }
  
  // Extract all accessible routes from the route configuration
  const extractRoutesFromConfig = (routeConfig: any[]): RouteInfo[] => {
    const routes: RouteInfo[] = [];
    
    const processRoute = (route: any, parentPath = '') => {
      const fullPath = parentPath + route.path;
      
      // Skip wildcard routes and index routes without explicit names
      if (route.path === '*' || route.path === undefined) {
        return;
      }
      
      // Handle index routes specially
      if (route.index === true && parentPath === '') {
        routes.push({
          path: '/',
          name: 'Home',
          current: location.pathname === '/'
        });
        return;
      }
      
      // Skip the layout wrapper
      if (route.element && route.element.type.name !== 'RootLayout') {
        // Determine page name based on path and route configuration
        let name = '';
        
        if (fullPath === '/') {
          name = 'Home';
        } else if (fullPath.includes('new-build-golf-properties-costa-blanca')) {
          const themeName = route.element?.props?.routeTheme;
          if (themeName) {
            name = themeName.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
          } else {
            name = 'Golf';
          }
        } else if (fullPath.includes('style-editor')) {
          name = 'Style Editor';
        } else if (fullPath.includes('developments/')) {
          const devId = fullPath.split('developments/')[1];
          const developments = getAllDevelopments();
          const dev = developments.find(d => d.id === devId);
          name = dev?.name || devId?.charAt(0).toUpperCase() + devId?.slice(1) || devId;
        } else {
          const parts = fullPath.split('/').filter(Boolean);
          name = parts.map(part => 
            part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ')
          ).join(' ');
        }
        
        if (name) {
          routes.push({
            path: fullPath,
            name,
            current: location.pathname === fullPath
          });
        }
      }
      
      // Process children recursively
      if (route.children && Array.isArray(route.children)) {
        route.children.forEach((child: any) => processRoute(child, fullPath));
      }
    };
    
    routeConfig.forEach(route => processRoute(route));
    
    return routes;
  };
  
  const pageRoutes = extractRoutesFromConfig(routes);
  
  // Debug: Log the extracted routes to check what's being generated
  console.log('Extracted page routes:', pageRoutes);
  
  return (
    <div className="fixed top-20 left-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-xs">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Navigation</span>
      </div>
      <nav className="space-y-1">
        {pageRoutes.map((page) => (
          <Link
            key={page.path}
            to={page.path}
            className={`block px-3 py-2 text-sm rounded-md transition-all duration-200 ${
              page.current
                ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:translate-x-1'
            }`}
          >
            {page.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};
