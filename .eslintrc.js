module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  plugins: ["react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2018,
  },
  settings: {
    react: {
      version: "^17.0.2",
    },
  },
  rules: {
    "react-hooks/exhaustive-deps": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "no-console": "off",
    "max-lines": ["warn", { max: 2000 }],
    "react-hooks/rules-of-hooks": "warn",
    "no-unused-vars": "warn",
    "react/display-name": "warn",
    curly: "error",
    "no-unneeded-ternary": "warn",
    "max-nested-callbacks": ["warn", { max: 3 }],
    "max-depth": ["warn", { max: 5 }],
  },
};
