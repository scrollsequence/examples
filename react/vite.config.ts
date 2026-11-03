import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main:                         path.resolve(__dirname, 'index.html'),
        'aa-development':             path.resolve(__dirname, 'aa-development.html'),
        'canvas-minimal':             path.resolve(__dirname, 'canvas-minimal.html'),
        'scene-minimal':              path.resolve(__dirname, 'scene-minimal.html'),
        'scene-content':              path.resolve(__dirname, 'scene-content.html'),
        'scene-depth':                path.resolve(__dirname, 'scene-depth.html'),
        'scene-progress-control':     path.resolve(__dirname, 'scene-progress-control.html'),
        'scene-responsive':           path.resolve(__dirname, 'scene-responsive.html'),
        'scene-static-content':       path.resolve(__dirname, 'scene-static-content.html'),
        'scene-toggle-actions':       path.resolve(__dirname, 'scene-toggle-actions.html'),
        'mouse-control':              path.resolve(__dirname, 'mouse-control.html'),
      },
    },
  },
});
