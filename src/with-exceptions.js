import globals from "globals";

const withExceptions = [
  // configs
  {
    files: ["**/src/index.js", "**/{eslint,prettier,vite,vitest}.config.{js,ts,mts,mjs}"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "import/no-default-export": "off",
      "sort-keys-fix/sort-keys-fix": "off",
    },
  },

  // type definitions
  {
    files: ["**/*.d.ts"],
    rules: {
      "import/no-default-export": "off",
      "no-undef": "off",
    },
  },
];

export { withExceptions };
