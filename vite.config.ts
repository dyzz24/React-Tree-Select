import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import typescript from '@rollup/plugin-typescript';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts(), svgr()],
  resolve: {
    alias: {
      '@utils': resolve(__dirname, './src/utils/'),
      '@components': resolve(__dirname, './src/components/'),
      '@reducer': resolve(__dirname, './src/reducer/')
    }
  },
  build: {
    manifest: true,
    minify: true,
    reportCompressedSize: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'react-tree-select',
      fileName: 'react-tree-select'
    },
    rollupOptions: {
      external: [],
      plugins: [
        typescriptPaths({
          preserveExtensions: true
        }),
        typescript({
          sourceMap: false,
          declaration: true,
          outDir: 'dist'
        })
      ]
    }
  }
})
