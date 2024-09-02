import { defineConfig } from 'vitest/config'
import { join } from 'path'

export default defineConfig({
  test: {
    globals: true, // Optional: if you want to use globals like `describe`, `it`, etc.
    environment: 'jsdom', // Optional: specify the test environment
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'], // Specify your test file patterns
    setupFiles: ['src/config/setupTests.ts'], // Optional: for any global setup, e.g., mocking
    coverage: {
      reporter: ['text', 'json', 'html'], // Specify coverage reporters
      exclude: ['node_modules/**', 'tests/**'], // Files to exclude from coverage
    },
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
})
