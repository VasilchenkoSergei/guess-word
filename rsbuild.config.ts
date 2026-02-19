import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginSvgr({
      svgrOptions: {
        exportType: 'named',
        namedExport: 'ReactComponent',
      },
    }),
    pluginModuleFederation({
      name: 'guess_word',
      exposes: {
        './GuessWord': './src/index.tsx',
      },
      filename: 'remoteEntry.js',
      shared: {
        react: {
          singleton: true,
          requiredVersion: false,
          eager: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: false,
          eager: true,
        },
      },
    }),
  ],
  source: {
    entry: {
      index: './src/index.tsx',
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
        uniqueName: 'guess_word',
      },
    },
  },
});
