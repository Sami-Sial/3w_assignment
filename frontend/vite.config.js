import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1/register": "https://3w-assignment-vert.vercel.app",
      "/api/v1/admin/users":"https://3w-assignment-vert.vercel.app",
      "/api/v1/login": "https://3w-assignment-vert.vercel.app",
      "/api/v1/me": "https://3w-assignment-vert.vercel.app",
    }
  },
  plugins: [react()],
})
