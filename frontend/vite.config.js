import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import macrosPlugin from 'vite-plugin-babel-macros'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://sparklines-backend.vercel.app/api',
        changeOrigin: true,
        secure: true,
        rewrite: path => path.replace('/api', ''),
      },
    },
  },
  plugins: [react(), macrosPlugin()],
})