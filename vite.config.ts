import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@components': '/src/components',
    },
  },
  test: {
    globals: true,  // This ensures that global functions like `expect` are available
    environment: 'jsdom',  // Use jsdom for simulating a browser environment
    setupFiles: './src/setupTests.ts',  // Specify setup file for jest-dom
    css: true,  // If you're testing components with CSS
  },
});
