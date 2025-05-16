import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: path.join(__dirname, '..', 'web', 'build'),
    assetsDir: 'assets',
    emptyOutDir: true,
  }
})
