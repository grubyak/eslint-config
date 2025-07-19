# @grby/eslint-config

shared eslint config

```
pnpm add -D @grby/eslint-config
```

```
// eslint.config.js
import config from "@grby/eslint-config";

export default config;
```

```
// eslint.config.js
import config from "@grby/eslint-config";
import { withLicenseHeader } from "@grby/eslint-config/header";

export default [
  ...config,
  withLicenseHeader([" * foo", " * bar"])
];
```
