import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Development server config
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true
    }
  },
  
  // Preview server config (for testing production build locally)
  preview: {
    host: true,
    port: 5173,
  },
  
  // Production build config
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,  // Don't generate sourcemaps for production
    minify: 'terser',  // Minify the code
    
    // Optimize chunk size
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        }
      }
    },
    
    // Terser options for better compression
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console.logs in production
        drop_debugger: true
      }
    }
  }
})