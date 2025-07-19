import header from "eslint-plugin-header";

const withLicenseHeader = (license) => ({
  files: ["**/*.ts", "**/*.tsx", "**/*.js"],
  plugins: { header },
  rules: {
    "header/header": ["error", "block", ["", ...license, " "]],
  },
});

export { withLicenseHeader };
