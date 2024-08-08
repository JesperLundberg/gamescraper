module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: [
    "plugin:import/errors",
    "plugin:import/warnings",
    "airbnb-base",
    // "prettier",
    // "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2023, // Updated to the latest ECMAScript version
    sourceType: "module",
  },
  ignorePatterns: ["**/__tests__/**", "**/?(*.)+(spec|test).[jt]s?(x)"],
  rules: {
    // Enforce double quotes
    quotes: ["error", "double"],
    // Example rule to demonstrate ignoring warnings for _ variables
    // Note: This is a placeholder as ESLint does not natively support ignoring warnings based on variable names
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-console": "off", // Globally disable console.log warnings
  },
  overrides: [
    {
      files: ["**/__test__/**/*.test.js"],
      rules: {
        "*": "off",
      },
    },
  ],
};
