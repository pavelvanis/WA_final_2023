import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  server: {
    proxy: {
      '/signup': 'http://localhost:3000/signup'
    }
  },
  plugins: [react()],
})
