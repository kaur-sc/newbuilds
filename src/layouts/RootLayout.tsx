import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { DynamicPageNavigation } from '@/components/DynamicPageNavigation';
import { ThemeProvider } from '@/themes/ThemeProvider';

interface RootLayoutProps {
  routes: any[];
}

export const RootLayout = ({ routes }: RootLayoutProps) => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <ThemeProvider>
        <DynamicPageNavigation routes={routes} />
        <Outlet />
      </ThemeProvider>
    </Suspense>
  );
};
