import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve the `@/...` path alias the same way tsconfig.json does
// ("@/*" -> "./*") so tests can import app modules.
const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': root,
    },
  },
  test: {
    // Pure-logic units run fine in Node; UI rendering is covered by TESTING.md.
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
