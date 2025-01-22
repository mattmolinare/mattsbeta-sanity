module.exports = {
  extends: [
    "@sanity/eslint-config-studio",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  plugins: ["import"],
  rules: {
    "sort-imports": [
      "error",
      {
        ignoreDeclarationSort: true,
      },
    ],
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
        },
        "newlines-between": "never",
      },
    ],
    "react-hooks/exhaustive-deps": "off",
  },
};
