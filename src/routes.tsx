import type { RouteRecord } from 'vite-react-ssg'
import { LandingPage } from '@/pages/LandingPage'
import { LaVistaBoulevard } from '@/pages/LaVistaBoulevard'
import { getAllDevelopments, getDevelopment } from '@/lib/content'

import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

// Generate routes from content
const developments = getAllDevelopments()

import { HelmetProvider } from 'react-helmet-async'

const RootLayout = () => {
  return (
    <HelmetProvider>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <Outlet />
      </Suspense>
    </HelmetProvider>
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
        path: 'la-vista-boulevard',
        element: <LaVistaBoulevard />,
      },
      ...developments.map((dev) => ({
        path: `developments/${dev.id}`,
        element: <LandingPage data={dev} />,
      })),
      {
        path: '*',
        element: <div className="p-10 text-center">404 - Not Found</div>
      }
    ]
  }
]
