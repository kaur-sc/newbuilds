import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig(({ command }) => {
  const isProd = command === 'build';
  // Use the full staging URL path for production
  const base = isProd ? '/staging/newbuilds/' : '/';

  return {
    base: base,
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // SSG needs the base path passed here as well
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      base: base, 
    },
  }
})