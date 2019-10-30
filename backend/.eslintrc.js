module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb-base/legacy',
  env: {
    'node': true,
    'es6': true
  },
  rules: {
    'implicit-arrow-linebreak': 'off',
    'consistent-return': 'off',
    'comma-dangle': 'off',
    'no-param-reassign': 'off',
    'prefer-object-spread': 'off',
    'func-names': 'off',
  }
};
