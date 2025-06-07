module.exports = {
  root: true,
  extends: ['next', 'next/core-web-vitals'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  rules: {
    // За замовчуванням — лише критичні помилки
    'no-undef': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // Дозволити невикористані змінні, якщо їх ім’я починається з _
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  settings: {
    react: { version: 'detect' },
  },
  ignorePatterns: ['.next/', 'node_modules/', 'public/'],
};
