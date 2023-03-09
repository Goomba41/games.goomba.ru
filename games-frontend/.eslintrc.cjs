/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  plugins: ["prettier"],
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
    "prettier",
  ],
  rules: {
    "prettier/prettier": 1,
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
};
