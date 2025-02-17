import eslint from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import tsEslintPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const eslintConfig = [
  eslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
      prettier: prettier,
      react: reactPlugin,
      'react-hooks': reactHooks,
      import: importPlugin,
      '@typescript-eslint': tsEslintPlugin
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules
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
  }
]

export default eslintConfig
