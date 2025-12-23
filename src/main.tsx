import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import './i18n'; // Import and initialize i18n
import './spec/themes' // Import all theme CSS for production bundling
import './index.css'

export const createApp = ViteReactSSG(
  { routes, basename: import.meta.env.BASE_URL }
)

// In a client-only environment (dev server or after hydration),
// we need to manually trigger the app mount.
// The SSG process calls `createApp` directly.
if (!import.meta.env.SSR) {
  createApp()
}

export default createApp;
