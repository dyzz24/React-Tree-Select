import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  resolve: {
    alias: {
      '@utils': resolve(__dirname, './src/utils/'),
      '@components': resolve(__dirname, './src/components/'),
      '@reducer': resolve(__dirname, './src/reducer/')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'react-tree-select',
      fileName: 'react-tree-select'
    }
  }
})
