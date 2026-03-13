import openWcConfig from "@open-wc/eslint-config"
import tseslint from "typescript-eslint"
import prettierConfig from "eslint-config-prettier"
import storybook from "eslint-plugin-storybook"
import globals from "globals"

import { defineConfig } from "eslint/config"

export default defineConfig(
  {
    ignores: [
      "dist/**",
      "docs/**",
      "coverage/**",
      "scripts/generate-component/templates/**/*",
      "**/*.d.ts",
    ],
  },
  ...openWcConfig,
  ...tseslint.configs.recommended,
  prettierConfig,
  ...storybook.configs["flat/recommended"],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        __LEU_VERSION__: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "prefer-destructuring": [
        "error",
        {
          AssignmentExpression: {
            array: false,
          },
        },
      ],
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "error",
      "import-x/no-unresolved": "off",
    },
  },
  {
    files: ["**/scripts/**/*.js", "**/scripts/**/*.ts"],
    rules: {
      "import-x/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
        },
      ],
      "no-console": "off",
    },
  },
  {
    files: ["**/*.test.ts"],
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
  {
    files: ["**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "import-x/no-extraneous-dependencies": [
        "error",
        { devDependencies: true },
      ],
    },
  },
)
