module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  overrides: [
    {
      // Context modules (provider + hook pattern) and shadcn/ui primitives
      // (component + variants pattern) intentionally export non-component
      // values; fast refresh falls back to a full reload for these files.
      files: ['src/context/**/*.tsx', 'src/components/ui/**/*.{ts,tsx}'],
      rules: { 'react-refresh/only-export-components': 'off' },
    },
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Parity with @typescript-eslint v7 recommended (rules added/tightened in v8).
    // Remove these overrides when ready to adopt the stricter v8 defaults.
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none' }],
  },
}
