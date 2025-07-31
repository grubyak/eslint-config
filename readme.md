# @grby/eslint-config

eslint flat config with support for typescript, react, vitest, and license headers

### setup

```
pnpm add -D @grby/eslint-config
```

### usage

```
// eslint.config.js
import config from "@grby/eslint-config";

export default config;
```

### usage: license header

```
// eslint.config.js
import config from "@grby/eslint-config";
import { withLicenseHeader } from "@grby/eslint-config/header";

export default [
  ...config,
  withLicenseHeader([" * foo", " * bar"])
];
```

### usage: vitest

```
// eslint.config.js
import config from "@grby/eslint-config";
import { withVitest } from "@grby/eslint-config/vitest";

export default [
  ...config,
  withVitest
];
```

### usage: react

```
// eslint.config.js
import config from "@grby/eslint-config";
import { withReact } from "@grby/eslint-config/react";

export default [
  ...config,
  ...withReact
];
```
