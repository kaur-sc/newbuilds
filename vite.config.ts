import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig(({ command }) => {
  const isProd = command === 'build';
  // This must match your FTP subfolder exactly
  const base = isProd ? '/newbuilds/' : '/';

  return {
    base: base,
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      // Adding base here ensures the pre-rendered HTML files use the correct prefix
      base: base, 
    },
  }
})