#!/bin/bash

# Fix React imports
find ./components -type f -name "*.tsx" -exec sed -i '' '1i\
import * as React from "react"
' {} \;

# Fix missing 'use client' directives
find ./components -type f -name "*.tsx" -exec sed -i '' '1i\
"use client";\
' {} \;

# Run ESLint fix
yarn eslint --fix "./components/**/*.{ts,tsx}" "./lib/**/*.{ts,tsx}" "./app/**/*.{ts,tsx}"

# Run Prettier
yarn prettier --write "./components/**/*.{ts,tsx}" "./lib/**/*.{ts,tsx}" "./app/**/*.{ts,tsx}"

# Install missing dependencies if needed
yarn add --dev @types/node @types/react @types/react-dom typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import eslint-config-prettier