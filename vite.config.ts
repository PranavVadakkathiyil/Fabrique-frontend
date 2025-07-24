import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  optimizeDeps: {
    include: ["jspdf"]
  },
  server: {
    host: true, // Enable access via local IP
    port: 5173,
    //  proxy:{
    //   '/api':"https://fabrique-backend.vercel.app"
    // } // or any port you prefer
  },
})
