import vitest from "eslint-plugin-vitest";

const withVitest = {
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
};

export { withVitest };
