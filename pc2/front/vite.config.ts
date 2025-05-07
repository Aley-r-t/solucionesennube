import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
// vite.config.js
export default {
  // ...otras configuraciones

  server: {
    host: true,
    port: 5173,
    allowedHosts: ['unxdcaminando.online']
  }
}
