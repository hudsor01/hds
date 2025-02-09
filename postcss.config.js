export default {
  plugins: {
    'postcss-import': {},
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
}
