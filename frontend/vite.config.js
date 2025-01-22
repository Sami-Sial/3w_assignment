import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1/register": "",
      "/api/v1/admin/users":"",
      "/api/v1/login": "",
      "/api/v1/me": "",
    }
  },
  plugins: [react()],
})
