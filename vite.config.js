import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-cloudflare-files',
      writeBundle() {
        // Copy Cloudflare Pages configuration files to dist
        const files = ['_headers', '_redirects']
        files.forEach(file => {
          if (existsSync(file)) {
            copyFileSync(file, resolve('dist', file))
            console.log(`✅ Copied ${file} to dist/`)
          }
        })
      }
    }
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 8000,
    open: true
  }
})
