module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-param-reassign": 0,
    'import/no-unresolved': 0,
    'vue/component-name-in-template-casing': 0,
    'no-shadow': 0,
    'no-tabs': 0
  },
  parserOptions: {
    "parser": "babel-eslint"
  },
}