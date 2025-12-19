import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig(({ command }) => {
  return {
    // If we are building for production, use the subfolder. 
    // Otherwise (local dev), use the root '/'
    base: command === 'build' ? '/staging/newbuilds/' : '/',
    
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // @ts-expect-error - ssg options might not be strictly typed in default config
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
    },
  }
})