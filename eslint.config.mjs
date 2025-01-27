import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import ts from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default [
  // 1. Base JS configuration (JavaScript files only)
  {
    ...js.configs.recommended,
    files: ['**/*.js']
  },

  // 2. Next.js recommended rules (from documentation)
  ...nextPlugin.configs.recommended,
  ...nextPlugin.configs['core-web-vitals'],

  // 3. TypeScript & React configuration
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': ts,
      'react': react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: true, // Auto-detect tsconfig.json
        tsconfigRootDir: __dirname,
        ecmaVersion: 2024,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: '19.0.0'
      },
      next: {
        rootDir: __dirname // Required for monorepo setups
      }
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        ignoreRestSiblings: true
      }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': ['warn', {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports'
      }],

      // React rules
      'react/no-unescaped-entities': 'off',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',

      // Next.js rules (from documentation)
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-sync-scripts': 'error',

      // Custom rules
      'no-console': ['error', { allow: ['warn', 'error'] }]
    }
  },

  // 4. API routes specific overrides
  {
    files: ['app/api/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'off'
    }
  },

  // 5. Prettier integration (must be last)
  prettier
]
