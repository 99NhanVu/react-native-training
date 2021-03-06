module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  'prettier/prettier': [
    'error',
    {
      endOfLine: 'auto',
    },
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'react-native/no-inline-styles': 'off',
        'no-unused-vars': ["error", { "caughtErrors": "all" }],
      },
    },
  ],
};
