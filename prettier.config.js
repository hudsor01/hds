module.exports = {
  printWidth: 100,
  trailingComma: 'all',
  tabWidth: 2,
  overrides: [
    {
    files: ['**/*.json'],
      options: {
        trailingComma: 'none',
      },
    },
  ],
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSpacing: false,
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'auto',
  tailwindConfig: './tailwind.config.ts',
  tailwindFunctions: ['clsx', 'cva', 'twMerge'],
  plugins: ['prettier-plugin-tailwindcss', '@trivago/prettier-plugin-sort-imports']
};
