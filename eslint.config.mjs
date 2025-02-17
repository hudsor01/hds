import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import tsEslintPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname
})
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript']
  }),
  js.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      prettier: prettier,
      react: reactPlugin,
      'react-hooks': reactHooks,
      import: importPlugin
    },
    rules: {
      'prettier/prettier': 'error',
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'error'
    },
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2022,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },

  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tsEslintPlugin
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      }
    },
    rules: {
      ...tsEslintPlugin.configs.recommended.rules,
      ...tsEslintPlugin.configs['recommended-type-checked'].rules,
      ...tsEslintPlugin.configs.strict.rules,
      ...tsEslintPlugin.configs['strict-type-checked'].rules,
      semi: 'off',
      '@typescript-eslint/semi': 'off',
      camelcase: 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off'
    }
  },

  // Next.js configurations
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules
    }
  }
]

export default eslintConfig
