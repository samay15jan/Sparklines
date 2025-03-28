import dotenv from 'dotenv'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import macrosPlugin from 'vite-plugin-babel-macros'

// https://vitejs.dev/config/
dotenv.config()
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // configure: (proxy) => {
        //   proxy.on('proxyReq', (proxyReq, req) => {
        //    const token = sessionStorage.getItem('authToken') || '';
        //    if (token) {
        //      proxyReq.setHeader('Authorization', `Bearer ${token}`);
        //    }
        //  });
        // },
      },
    },
  },
  plugins: [react(), macrosPlugin()],
  define: {
    'process.env': process.env,
  },
})
