/// <reference types="vitest" />
import path from 'path'
import path from 'path'
import { defineConfig } from 'vite'
import { defineConfig } from 'vite';
import { defineConfig } from 'vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  test: {},
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});



})
