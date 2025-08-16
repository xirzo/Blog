import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

  export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
      watch: {
        usePolling: true, 
      },
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
      hmr: {
        host: 'localhost',
        port: 3000
      }
    }
  }); 
