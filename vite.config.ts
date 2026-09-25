import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => ({
  base: mode === 'github-pages' ? '/Memo-game/' : '/',
  plugins: [
    react(),
    svgr()
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@app': path.resolve(import.meta.dirname, './src/app'),
      '@features': path.resolve(import.meta.dirname, './src/features'),
      '@components': path.resolve(import.meta.dirname, './src/components'),
      '@hooks': path.resolve(import.meta.dirname, './src/hooks'),
      '@styles': path.resolve(import.meta.dirname, './src/styles'),
      '@types': path.resolve(import.meta.dirname, './src/types'),
      '@assets': path.resolve(import.meta.dirname, './src/assets'),
      '@utils': path.resolve(import.meta.dirname, './src/utils'),
    },
  },
}))
