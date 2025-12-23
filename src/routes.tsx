import type { RouteRecord } from 'vite-react-ssg'
import { LandingPage } from '@/pages/LandingPage'
import { GolfPropertiesModern } from '@/pages/GolfPropertiesModern'
import { StyleEditor } from '@/style-editor'
import { GolfPropertiesNewLayout } from '@/pages/GolfPropertiesNewLayout'
import { getAllDevelopments, getDevelopment } from '@/lib/content'
import { DynamicPageNavigation } from '@/components/DynamicPageNavigation'
import { ThemeProvider } from '@/themes/ThemeProvider'

import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

// Generate routes from content
const developments = getAllDevelopments()

const RootLayout = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <DynamicPageNavigation />
      <Outlet />
    </Suspense>
  )
}

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage data={getDevelopment('sunny-hills')!} />, // Default/Home
      },
      {
        path: 'new-build-golf-properties-costa-blanca-modern/',
        element: (
          <ThemeProvider>
            <GolfPropertiesModern />
          </ThemeProvider>
        ),
      },
      {
        path: 'style-editor/',
        element: <StyleEditor />,
      },
      {
        path: 'golf-properties-new-layout/',
        element: (
          <ThemeProvider>
            <GolfPropertiesNewLayout />
          </ThemeProvider>
        ),
      },
      ...developments.map((dev) => ({
        path: `developments/${dev.id}/`,
        element: <LandingPage data={dev} />,
      })),
      {
        path: '*',
        element: <div className="p-10 text-center">404 - Not Found</div>
      }
    ]
  }
]
