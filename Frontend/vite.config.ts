import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

  export default defineConfig({
    plugins: [react()],
    server: {
      watch: {
        usePolling: true, 
      },
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
      hmr: {
        clientPort: 3000,
        host: '0.0.0.0'
      }
    }
  }); 
