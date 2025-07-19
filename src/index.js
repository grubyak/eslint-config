import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import json from "eslint-plugin-json";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importSort from "eslint-plugin-simple-import-sort";
import sonarjs from "eslint-plugin-sonarjs";
import sortKeysFix from "eslint-plugin-sort-keys-fix";
import vitest from "eslint-plugin-vitest";
import globals from "globals";
import ts from "typescript-eslint";

const globalsBrowser = Object.fromEntries(Object.entries(globals.browser).map(([key, val]) => [key.trim(), val]));

const tsconfigConfig = {
  project: "./tsconfig.json",
  tsconfigRootDir: process.cwd(),
};

export default ts.config(
  // recommendations
  js.configs.recommended,
  ts.configs.recommended,
  sonarjs.configs.recommended,

  // it needs eslint-config-prettier
  prettierRecommended,

  // project
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globalsBrowser,
      parserOptions: {
        ...tsconfigConfig,
      },
    },
  },

  // imports
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: { import: importPlugin },
    rules: {
      ...importPlugin.flatConfigs.recommended.rules,
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "import/export": "error",
      "import/first": "error",
      "import/no-cycle": "error",
      "import/no-default-export": "error",
      "import/no-deprecated": "warn",
      "import/no-duplicates": [
        "error",
        {
          considerQueryString: true,
          "prefer-inline": false,
        },
      ],
      "import/no-unresolved": "off",
    },
    settings: {
      "import/resolver": {
        typescript: {
          ...tsconfigConfig,
        },
      },
    },
  },

  // import sort
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    plugins: { "simple-import-sort": importSort },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            [
              // react and related libraries
              "^react",
              "^react(-.*)?",

              // third-party packages
              "^(?!src/|i18n/|tests/|assets/|react)(@?\\w.*)$",

              // internal paths
              "^src/",
              "^\\.",
              "^\\./",
              "^i18n/",
              "^tests/",

              "^\\.\\.?/.*(?<!s?css)$",
              "^\\.\\.?$",

              // icons and assets
              "^assets/",

              // relative imports (excluding css files)
              "^\\.\\.?/.*(?<!s?css)$",
              "^\\.\\.?$",

              // css/scss imports
              "\\.s?css$",
            ],
          ],
        },
      ],
    },
  },

  // typescript
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        ...tsconfigConfig,
      },
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-empty-function": ["warn", { allow: [] }],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
          prefer: "type-imports",
        },
      ],
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_$",
          caughtErrorsIgnorePattern: "^_$",
          varsIgnorePattern: "^_$",
        },
      ],
      "@typescript-eslint/no-unnecessary-template-expression": "error",
      "no-undef": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTaggedTemplates: false,
          allowTernary: true,
        },
      ],
    },
  },

  // complexity
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    rules: {
      complexity: ["error", { max: 15 }],
      "max-lines-per-function": [
        "error",
        {
          max: 75,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      "max-params": ["error", { max: 4 }],
      "max-statements": ["error", { max: 15 }],
      "no-unused-vars": "off",
    },
  },

  // sonarjs
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    rules: {
      "sonarjs/no-commented-code": "warn",
      "sonarjs/todo-tag": "warn",
    },
  },

  // json
  {
    files: ["**/*.json"],
    plugins: { json },
    processor: "json/json",
    rules: {
      "json/*": ["error", { allowComments: true }],
    },
  },

  // style
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    rules: {
      // simplify arrow functions
      "arrow-body-style": ["error", "as-needed"],

      "no-useless-concat": ["error"],

      // require property shorthand syntax for object literals
      "object-shorthand": ["error", "always"],

      // arrow functions instead of function expressions
      "prefer-arrow-callback": ["error"],

      // trailing commas
      "comma-dangle": ["error", "always-multiline"],

      // template literals instead of string concatenation
      "prefer-template": ["error"],

      // no one liners
      curly: ["error", "all"],

      // quotes
      quotes: ["error", "double", { avoidEscape: true }],

      "func-style": ["error", "expression"],
      // blank lines
      "no-multiple-empty-lines": ["error", { max: 1 }],
      // comment readability
      "spaced-comment": ["error", "always", { markers: ["/"] }],
      // padding
      "padding-line-between-statements": [
        "error",

        // require a newline after imports unless the previous statement was also an import
        { blankLine: "always", next: "*", prev: "import" },
        { blankLine: "any", next: "import", prev: "import" },

        // require a newline after variable declarations if the next statement is not a variable declaration of the same type
        {
          blankLine: "always",
          next: [
            "expression",
            "block",
            "block-like",
            "return",
            "if",
            "function",
            "class",
            "for",
            "do",
            "while",
            "switch",
            "try",
            "with",
          ],
          prev: ["const", "let"],
        },

        // do not require a newline between variable declarations of the same type
        { blankLine: "any", next: ["const"], prev: ["const"] },
        { blankLine: "any", next: ["let"], prev: ["let"] },

        // enforce a newline after block statements and before the next statement
        { blankLine: "always", next: "*", prev: ["block", "block-like"] },
        { blankLine: "always", next: "if", prev: "*" },
        { blankLine: "always", next: "*", prev: "if" },

        // enforce a newline before the export keyword
        { blankLine: "always", next: "export", prev: "*" },
        { blankLine: "any", next: "export", prev: "export" },
      ],
    },
  },

  // sort-keys-fix
  {
    files: ["src/**/*", "**/src/**/*"],
    plugins: { "sort-keys-fix": sortKeysFix },
    rules: {
      "sort-keys-fix/sort-keys-fix": "warn",
    },
  },

  // react-refresh
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    plugins: { "react-refresh": reactRefresh },
    rules: {
      ...reactRefresh.configs.recommended.rules,
      "react-refresh/only-export-components": ["error", { allowConstantExport: true }],
    },
  },

  // react-hooks
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    plugins: { "react-hooks": reactHooks },
    rules: {
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/rules-of-hooks": "error",
    },
  },

  // react
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    plugins: { react },
    rules: {
      ...react.configs.flat.recommended.rules,
      "react/jsx-curly-brace-presence": ["warn", { children: "never", props: "never" }],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
    settings: { react: { version: "detect" } },
  },

  // tests
  {
    files: ["**/tests/**/*"],
    languageOptions: {
      globals: {
        ...vitest.environments?.env?.globals,
        global: true,
      },
    },
    rules: {
      "max-lines-per-function": [
        "error",
        {
          max: 200,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
    },
  },

  // exceptions: configs
  {
    files: ["**/src/index.js", "**/{eslint,prettier,vite,vitest}.config.{js,ts,mts,mjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "import/no-default-export": "off",
      "sort-keys-fix/sort-keys-fix": "off",
    },
  },

  // exceptions: type definitions
  {
    files: ["**/*.d.ts"],
    rules: {
      "import/no-default-export": "off",
      "no-undef": "off",
    },
  },

  // ignores
  {
    ignores: ["dist", "node_modules"],
  },
);
