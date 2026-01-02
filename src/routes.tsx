import type { RouteRecord } from 'vite-react-ssg'
import { LandingPage } from '@/pages/LandingPage'
import { GolfPropertiesModern } from '@/pages/GolfPropertiesModern'
import { GolfPropertiesNewLayout } from '@/pages/GolfPropertiesNewLayout'
import { getAllDevelopments, getDevelopment } from '@/lib/content'

// Generate routes from content
const developments = getAllDevelopments()
const homeData = getDevelopment('new-build-golf-properties-costa-blanca')

export const routes: RouteRecord[] = [
  {
    index: true,
    element: homeData ? <LandingPage data={homeData} /> : <div className="p-10 text-center">Home development data not found.</div>,
  },
  {
    path: 'new-build-golf-properties-costa-blanca-modern/',
    element: <GolfPropertiesModern />,
  },
  {
    path: 'golf-properties-new-layout/',
    element: <GolfPropertiesNewLayout />,
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
