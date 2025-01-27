import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const nextConfig = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  plugins: {
    '@next/next': nextPlugin
  },
  rules: nextPlugin.configs.recommended.rules
}

export default [
  js.configs.recommended,
  nextConfig,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': ts,
      'react': react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
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
