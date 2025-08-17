import eslint from "@eslint/js";
import studio from "@sanity/eslint-config-studio";
import importPlugin from "eslint-plugin-import";
import tselint from "typescript-eslint";

export default tselint.config(
  eslint.configs.recommended,
  tselint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  ...studio,
  {
    rules: {
      "sort-imports": [
        "error",
        {
          ignoreDeclarationSort: true,
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-explicit-any": "off",
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
      "import/no-unresolved": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
);
