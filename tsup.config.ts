import { defineConfig } from 'tsup';
import svgrPlugin from 'esbuild-plugin-svgr';

export default defineConfig({
  entry: ['src/index.tsx'],
  tsconfig: 'tsconfig.build.json',
  format: ['esm', 'cjs'],
  dts: true,
  external: ['react', 'react-dom', 'styled-components', 'styled-normalize'],
  outDir: 'dist',
  clean: true,
  esbuildPlugins: [
    svgrPlugin({
      exportType: 'named',
      namedExport: 'ReactComponent',
    }) as any,
  ],
});
