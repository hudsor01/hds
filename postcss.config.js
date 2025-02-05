module.exports = {
  plugins: {
    'postcss-import': {},
    '@tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-env': {
      features: {
        'nesting-rules': false,
        'custom-properties': false,
        'is-pseudo-class': false,
      },
    },
  },
};
