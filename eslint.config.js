import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import sortImports from "eslint-plugin-simple-import-sort";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      "simple-import-sort": sortImports,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^node:", "^react", "^@?react"],
            ["^@?\\w"],
            ["^@/core"],
            ["^@/layout"],
            ["^@/shared"],
            ["^@/"],
            ["^\\./", "^\\.\\./"],
            ["^.+\\.s?css$"],
          ],
        },
      ],
    },
  },
  {
    files: ["src/main.tsx"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
]);
