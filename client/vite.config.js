import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000/',
      '/signup': 'http://localhost:3000/',
      '/login': 'http://localhost:3000/'
    }
  },
  plugins: [react()],
})
