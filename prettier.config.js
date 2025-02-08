/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 80,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  endOfLine: 'auto',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.ts',
  overrides: [
    {
      files: ['*.json', '.prettierrc', '.eslintrc'],
      options: {
        parser: 'json',
        tabWidth: 2,
      },
    },
    {
      files: ['*.md'],
      options: {
        parser: 'markdown',
        proseWrap: 'always',
      },
    },
    {
      files: ['*.yaml', '*.yml'],
      options: {
        parser: 'yaml',
        tabWidth: 2,
      },
    },
  ],
};
