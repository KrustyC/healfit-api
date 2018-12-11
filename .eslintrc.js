module.exports = {
  extends: 'airbnb',
  parser: 'typescript-eslint-parser',
  env: {
    jest: true,
  },
  ecmaFeatures: {
    classes: true,
  },
  plugins: ['import'],
  rules: {
    'comma-dangle': ['error', 'never'],
    semi: ['error', 'never'],
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 0,
    'generator-star-spacing': 'off',
    'global-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
  },
};
