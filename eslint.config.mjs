import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import tsEslintPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'
import zodPlugin from 'eslint-plugin-zod'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const eslintConfig = [
    {
        ...js.configs.recommended
    },
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
            '@next/next': nextPlugin,
            '@typescript-eslint': tsEslintPlugin,
            react: reactPlugin,
            'react-hooks': reactHooks,
            import: importPlugin,
            zod: zodPlugin,
            prettier: prettier
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: __dirname,
                sourceType: 'module',
                ecmaVersion: 2022,
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json'
                }
            }
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...tsEslintPlugin.configs['recommended-type-checked']
                .rules,
            ...reactPlugin.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...importPlugin.configs.recommended.rules,
            'prettier/prettier': 'error',
            semi: 'off',
            '@typescript-eslint/semi': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_' }
            ],
            '@typescript-eslint/consistent-type-imports': 'warn',
            '@typescript-eslint/consistent-type-exports': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            'no-unused-vars': 'off',
            'react/prop-types': 'off'
        }
    }
]

export default eslintConfig
