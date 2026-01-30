import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/v4': {
        target: 'https://api.football-data.org',
        changeOrigin: true,
        secure: false,
      },
      '/rapidapi': {
        target: 'https://api-football-v1.p.rapidapi.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/rapidapi/, '')
      },
      '/espn': {
        target: 'https://site.api.espn.com/apis/site/v2/sports',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/espn/, '')
      }
    }
  }
})
