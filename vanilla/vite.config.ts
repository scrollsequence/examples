import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        'aa-dev-vanilla': path.resolve(__dirname, 'aa-dev-vanilla.html'),
        'canvas-minimal': path.resolve(__dirname, 'canvas-minimal.html'),
        'scene-minimal': path.resolve(__dirname, 'scene-minimal.html'),
        'scene-progress-control': path.resolve(__dirname, 'scene-progress-control.html'),
        'scene-responsive': path.resolve(__dirname, 'scene-responsive.html'),
        'scene-static-content': path.resolve(__dirname, 'scene-static-content.html'),
        'scene-toggle-actions': path.resolve(__dirname, 'scene-toggle-actions.html'),
      },
    },
  },
});
