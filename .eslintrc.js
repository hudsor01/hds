module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'react', 'jsx-a11y', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'error',
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'public/',
    '*.config.js',
    '*.config.ts',
    '.eslintrc.js',
  ],
}
