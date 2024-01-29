import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import typescript from '@rollup/plugin-typescript';
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import * as packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ['src'], insertTypesEntry: true }), svgr(), libInjectCss()],
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
    cssMinify: true,
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'react-tree-select',
      fileName: 'react-tree-select',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      plugins: [
        typescriptPaths({
          preserveExtensions: true
        }),
        typescript({
          sourceMap: false,
          declaration: true,
          outDir: 'dist'
        })
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
