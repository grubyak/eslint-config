import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

const withReact = [
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
];

export { withReact };
