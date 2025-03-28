import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    proxy: {
      "/api": {
        target: "https://auth-user-contact-project-production.up.railway.app",
        changeOrigin: true,
        secure: false
      }
    }
  },
  css: {
    preprocessorOptions: {
      css: {
        charset: false,
      },
    },
  },
})
