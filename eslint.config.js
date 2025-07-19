import config from "./src/index.js";

export default [
  ...config,

  // exceptions: this repo
  {
    files: ["src/**/*"],
    rules: {
      "sort-keys-fix/sort-keys-fix": "off",
    },
  },
];
