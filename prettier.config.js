/** @type {import("prettier").Config} */
export default {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSpacing: false,
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'auto',
  printWidth: 100,
  tabWidth: 2,
  tailwindConfig: './tailwind.config.ts',
  tailwindFunctions: ['clsx', 'cva', 'twMerge'],
  plugins: ['prettier-plugin-tailwindcss', '@trivago/prettier-plugin-sort-imports'],
};
