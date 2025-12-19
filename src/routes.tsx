import type { RouteRecord } from 'vite-react-ssg'
import { LandingPage } from '@/pages/LandingPage'
import { GolfProperties } from '@/pages/GolfProperties'
import { getAllDevelopments, getDevelopment } from '@/lib/content'

import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

// Generate routes from content
const developments = getAllDevelopments()

const RootLayout = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
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
        path: 'new-build-golf-properties-costa-blanca',
        element: <GolfProperties />,
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
