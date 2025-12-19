import { defineConfig } from 'vite'
// Force restart
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
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
})
