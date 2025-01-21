import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1/register": import.meta.env.BACKEND_BASE_URL,
      "/api/v1/admin/users": import.meta.env.BACKEND_BASE_URL,
      "/api/v1/login": import.meta.env.BACKEND_BASE_URL,
      "/api/v1/me": import.meta.env.BACKEND_BASE_URL,
    }
  },
  plugins: [react()],
})
