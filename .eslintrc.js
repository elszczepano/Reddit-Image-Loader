module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'ckeditor5',
    'plugin:eslint-plugin-vue/recommended',
  ],
  parser: 'vue-eslint-parser',
  plugins: [
    'eslint-plugin-vue'
  ]
};
