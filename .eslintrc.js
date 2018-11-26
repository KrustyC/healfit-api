module.exports = {
  extends: 'airbnb',
  parser: 'typescript-eslint-parser',
  env: {
    jest: true,
  },
  ecmaFeatures: {
    classes: true,
  },
  plugins: ['import', 'jsx-a11y'],
  rules: {
    'comma-dangle': ['error', 'never'],
    semi: ['error', 'never'],
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 0,
    'generator-star-spacing': 'off',
    'react/jsx-curly-spacing': [2, 'never'],
    'global-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
  },
};
