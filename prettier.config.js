/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 80, // Keep your preferred line length
  semi: true, // Keep your preference for semicolons
  singleQuote: true, // Keep your preference for single quotes
  trailingComma: 'all', // Keep your preference for trailing commas
  tabWidth: 2, // Keep your preferred tab width
  endOfLine: 'auto', // Keep your preference for end of line
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.ts', // Important: Link to your Tailwind config
  overrides: [
    {
      files: ['*.json', '.prettierrc', '.eslintrc'], // JSON files
      options: {
        parser: 'json', // Use the JSON parser for JSON files
        tabWidth: 2, // Consistent tab width
      },
    },
    {
      files: ['*.md'], // Markdown files
      options: {
        parser: 'markdown', // Use the Markdown parser
        proseWrap: 'always', // Wrap prose for readability
      },
    },
    {
      files: ['*.yaml', '*.yml'], // YAML files
      options: {
        parser: 'yaml', // Use the YAML parser
        tabWidth: 2,
      },
    },
  ],
};
