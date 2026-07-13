import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const moduleId = id.replaceAll('\\', '/');

          if (moduleId.includes('node_modules/gsap')) {
            return 'vendor-gsap';
          }

          if (moduleId.includes('/src/components/ui/')) {
            const shellUi = [
              '/src/components/ui/Button.js',
              '/src/components/ui/Input.js',
              '/src/components/ui/Toast.js',
              '/src/components/ui/utils.js'
            ];

            return shellUi.some((path) => moduleId.endsWith(path)) ? 'ui-shell' : 'ui-components';
          }

          if (moduleId.includes('/src/data/') || moduleId.includes('/src/repositories/')) {
            return 'catalog';
          }

          return undefined;
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup/vitest.setup.js'],
    include: [
      'tests/unit/**/*.test.js',
      'tests/integration/**/*.test.js',
      'tests/component/**/*.test.js'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        'dist/**',
        'public/**',
        'tests/**',
        'src/assets/**'
      ]
    }
  }
});
