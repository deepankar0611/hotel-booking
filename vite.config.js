import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/hotel-booking/', // Replace 'hotel-booking' with your repository name
  resolve: {
    alias: {
      '@': '/src'
    }
  }
}) 