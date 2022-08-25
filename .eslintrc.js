module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['prettier-standard'],
  env: {
    node: true,
    jest: true,
    puppeteer: true
  },
  rules: {
    'prefer-const': 'off'
  }
}
