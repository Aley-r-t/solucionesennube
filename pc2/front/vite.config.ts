import { defineConfig } from 'vite'


// 👇 Esto usa lo que importaste
export default defineConfig({
  server: {
    host: true,
    port: 4000,
    allowedHosts: ['unxdcaminando.online']
  }
})
