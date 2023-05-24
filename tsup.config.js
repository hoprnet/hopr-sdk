import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['cjs'],
  clean: true,
  dts: true,
  bundle: false,
  entry: ['src', '!src/**/*.spec.*'],
  target: 'es2015',
  outDir: 'dist'
});
