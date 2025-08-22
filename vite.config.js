import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    outDir: '../dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'gsap': ['gsap', 'gsap/ScrollTrigger']
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  css: {
    devSourcemap: true
  },
  optimizeDeps: {
    include: ['gsap', 'gsap/ScrollTrigger']
  }
})