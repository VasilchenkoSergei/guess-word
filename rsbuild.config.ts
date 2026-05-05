import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';

export default defineConfig({
  html: {
    title: 'Guess word',
  },
  plugins: [
    pluginReact(),
    pluginSvgr({
      svgrOptions: {
        exportType: 'named',
        namedExport: 'ReactComponent',
      },
    }),
  ],
  source: {
    entry: {
      index: './src/demo.tsx',
    },
  },
  output: {
    minify: true,
    cleanDistPath: true,
    legalComments: 'none',
    sourceMap: false,
    distPath: {
      root: 'dist',
      js: '',
      css: '',
      svg: '',
      font: '',
      image: '',
    },
    filename: {
      js: '[name].js',
      css: 'index.css',
    },
  },
  server: {
    port: 4040,
    cors: true,
  },
  tools: {
    rspack: {
      output: {
        publicPath: 'http://localhost:4040/',
      },
    },
  },
});
