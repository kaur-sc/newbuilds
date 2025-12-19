import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import './index.css'
import './i18n'

// Root component, can be a layout or simple fragment if routes handle everything
const app = ViteReactSSG(
  { routes, basename: import.meta.env.BASE_URL }
)

// In development/client-side, we need to invoke the app to mount it
// The SSG builder will import createApp and call it manually
if (!import.meta.env.SSR) {
  // ViteReactSSG returns a promise-like or function, we execute it
  // Check strict signature: (client?, routePath?) => Promise<Context>
  // passing true for client
  (app as any)(true);
}

export const createApp = app;
// Alias createRoot to satisfy vite-react-ssg v0.8.9 requirement
export const createRoot = app;
export default app;
