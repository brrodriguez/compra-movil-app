import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://itx-frontend-test.onrender.com/api', 
        changeOrigin: true, 
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
})