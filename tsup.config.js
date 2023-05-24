import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['cjs'],
  clean: true,
  dts: true,
  bundle: false,
  entry: ['src', '!src/**/*.spec.*', "!src/**/*.sh", "!src/**/*.yml"],
  target: 'es2015',
  outDir: 'dist'
});
