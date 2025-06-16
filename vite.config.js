// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // Base path - important for GitHub Pages deployment
  // Change this to match your repository name
  // For example, if your repo is username/my-project, use '/my-project/'
  // If your repo is username/username.github.io, use '/'
  base: '/content-credentials-app/',
  
  // Build configuration
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  
  // Server configuration for development
  server: {
    port: 3000,
    open: true
  }
})