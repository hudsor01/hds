import nextPlugin from '@next/eslint-plugin-next'
import tseslint from '@typescript-eslint/eslint-plugin'
import * as parser from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import globals from 'globals'

export default [
  {
    files: ['app/**/*.{ts,tsx}'],
    ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**'],
    plugins: {
      '@typescript-eslint': tseslint,
      '@next/next': nextPlugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.es2024,
        React: 'readonly',
        JSX: 'readonly',
        NodeJS: 'readonly'
      },
    },
    settings: {
      react: {
        version: '19'
      },
      next: {
        rootDir: '.'
      }
    },
    rules: {
      ...tseslint.configs['recommended'].rules,
      ...nextPlugin.configs['recommended'].rules,
      ...reactPlugin.configs['recommended'].rules,
      ...reactHooksPlugin.configs['recommended'].rules,
      ...jsxA11yPlugin.configs['recommended'].rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
  eslintConfigPrettier,
]
