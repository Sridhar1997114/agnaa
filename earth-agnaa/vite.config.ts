import { defineConfig } from 'vite';
import cesium from 'vite-plugin-cesium';

export default defineConfig({
  plugins: [cesium()],
  base: './', // Ensure relative paths for assets
  server: {
    port: 3005,
  },
});
