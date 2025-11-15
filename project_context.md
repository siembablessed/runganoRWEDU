# Project Context Map for: RunganoRwedu

This file contains the directory structure and the contents of important project files.

---

## 1. Directory Structure

├── .gitignore
├── app.json
├── babel.config.js
├── eas.json
├── eslint.config.js
├── expo-env.d.ts
├── metro.config.js
├── package-lock.json
├── package.json
├── project_mapper.py
├── README.md
├── tsconfig.json
│   ├── **app/**
│   │   ├── _layout.tsx
│   │   ├── **(tabs)/**
│   │   │   ├── goals.tsx
│   │   │   ├── index.tsx
│   │   │   ├── memories.tsx
│   │   │   ├── settings.tsx
│   │   │   ├── travel.tsx
│   │   │   ├── _layout.tsx
│   │   ├── **modals/**
│   │   │   ├── dates.tsx
│   │   │   ├── vision.tsx
│   ├── **assets/**
│   │   ├── **images/**
│   ├── **components/**
│   │   ├── ActionMenu.tsx
│   │   ├── ConfirmDialog.tsx
│   │   ├── FormModal.tsx
│   ├── **constants/**
│   │   ├── colors.ts
│   ├── **contexts/**
│   │   ├── AppContext.tsx
│   │   ├── SettingsContext.tsx
│   ├── **types/**
│   │   ├── index.ts

---

## 2. File Contents


### File: `.gitignore`

```text
# Learn more https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files

# dependencies
node_modules/

# Expo
.expo/
dist/
web-build/
expo-env.d.ts

# Native
*.orig.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision

# Metro
.metro-health-check*

# debug
npm-debug.*
yarn-debug.*
yarn-error.*

# macOS
.DS_Store
*.pem

# local env files
.env*.local

# typescript
*.tsbuildinfo
.vercel

```

### File: `app.json`

```json
{
  "expo": {
    "name": "Rungano Rwedu",
    "slug": "rungano-rwedu",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "rork-app",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/images/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.runganorwedu.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.runganorwedu.app"
    },
    "web": {
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      [
        "expo-router",
        {
          "origin": "https://rork.com/"
        }
      ],
      "expo-font",
      "expo-web-browser"
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": "https://rork.com/"
      },
      "eas": {
        "projectId": "387f21c2-4d4d-4fbe-b76e-26806d58a900"
      }
    }
  }
}

```

### File: `babel.config.js`

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};


```

### File: `eas.json`

```json
{
  "cli": {
    "version": ">= 16.26.0",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}

```

### File: `eslint.config.js`

```js
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  }
]);

```

### File: `expo-env.d.ts`

```ts
/// <reference types="expo/types" />

// NOTE: This file should not be edited and should be in your git ignore
```

### File: `metro.config.js`

```js
// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = config;


```

### File: `package-lock.json`

```json
{
  "name": "expo-app",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "expo-app",
      "version": "1.0.0",
      "dependencies": {
        "@expo/vector-icons": "^15.0.3",
        "@nkzw/create-context-hook": "^1.1.0",
        "@react-native-async-storage/async-storage": "2.2.0",
        "@stardazed/streams-text-encoding": "^1.0.2",
        "@tanstack/react-query": "^5.83.0",
        "@ungap/structured-clone": "^1.3.0",
        "expo": "^54.0.20",
        "expo-blur": "~15.0.7",
        "expo-constants": "~18.0.10",
        "expo-font": "~14.0.9",
        "expo-haptics": "~15.0.7",
        "expo-image": "~3.0.10",
        "expo-image-picker": "~17.0.8",
        "expo-linear-gradient": "~15.0.7",
        "expo-linking": "~8.0.8",
        "expo-location": "~19.0.7",
        "expo-router": "~6.0.13",
        "expo-splash-screen": "~31.0.10",
        "expo-status-bar": "~3.0.8",
        "expo-symbols": "~1.0.7",
        "expo-system-ui": "~6.0.8",
        "expo-web-browser": "~15.0.8",
        "lucide-react-native": "^0.553.0",
        "nativewind": "^4.1.23",
        "react": "19.1.0",
        "react-dom": "19.1.0",
        "react-native": "0.81.5",
        "react-native-draggable-flatlist": "^4.0.3",
        "react-native-gesture-handler": "~2.28.0",
        "react-native-reanimated": "~4.1.5",
        "react-native-safe-area-context": "~5.6.0",
        "react-native-screens": "~4.16.0",
        "react-native-svg": "15.12.1",
        "react-native-web": "^0.21.0",
        "react-native-worklets": "0.5.1",
        "react-native-worklets-core": "^1.6.2",
        "zustand": "^5.0.2"
      },
      "devDependencies": {
        "@babel/core": "^7.25.2",
        "@expo/ngrok": "^4.1.0",
        "@types/react": "~19.1.10",
        "eslint": "^9.31.0",
        "eslint-config-expo": "~10.0.0",
        "typescript": "~5.9.2"
      }
    },
    "node_modules/@0no-co/graphql.web": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/@0no-co/graphql.web/-/graphql.web-1.2.0.tgz",
      "integrity": "sha512-/1iHy9TTr63gE1YcR5idjx8UREz1s0kFhydf3bBLCXyqjhkIc6igAzTOx3zPifCwFR87tsh/4Pa9cNts6d2otw==",
      "license": "MIT",
      "peerDependencies": {
        "graphql": "^14.0.0 || ^15.0.0 || ^16.0.0"
      },
      "peerDependenciesMeta": {
        "graphql": {
          "optional": true
        }
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.2.0.tgz",
      "integrity": "sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==",
      "license": "MIT",
      "peer": true,
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.27.1.tgz",
      "integrity": "sha512-cjQ7ZlQ0Mv3b47hABuTevyTuYN4i+loJKGeV9flcCgIK37cCXRh+L1bd3iBHlynerhQ7BhCkn2BPbQUL+rGqFg==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.27.1",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.28.5.tgz",
      "integrity": "sha512-6uFXyCayocRbqhZOB+6XcuZbkMNimwfVGFji8CTZnCzOHVGvDqzvitu1re2AU5LROliz7eQPhB8CpAMvnx9EjA==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.28.5.tgz",
      "integrity": "sha512-e7jT4DxYvIDLk1ZHmU/m/mB19rex9sv0c2ftBtjSBv+kVM/902eh0fINUzD7UwLLNR+jU585GxUJ8/EBfAM5fw==",
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.27.1",
        "@babel/generator": "^7.28.5",
        "@babel/helper-compilation-targets": "^7.27.2",
        "@babel/helper-module-transforms": "^7.28.3",
        "@babel/helpers": "^7.28.4",
        "@babel/parser": "^7.28.5",
        "@babel/template": "^7.27.2",
        "@babel/traverse": "^7.28.5",
        "@babel/types": "^7.28.5",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.28.5.tgz",
      "integrity": "sha512-3EwLFhZ38J4VyIP6WNtt2kUdW9dokXA9Cr4IVIFHuCpZ3H8/YFOl5JjZHisrn1fATPBmKKqXzDFvh9fUwHz6CQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.28.5",
        "@babel/types": "^7.28.5",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-annotate-as-pure": {
      "version": "7.27.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-annotate-as-pure/-/helper-annotate-as-pure-7.27.3.tgz",
      "integrity": "sha512-fXSwMQqitTGeHLBC08Eq5yXz2m37E4pJX1qAU1+2cNedz/ifv/bVXft90VeSav5nFO61EcNgwr0aJxbyPaWBPg==",
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.27.3"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.27.2",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.27.2.tgz",
      "integrity": "sha512-2+1thGUUWWjLTYTHZWK1n8Yga0ijBz1XAhUXcKy81rd5g6yh7hGqMp45v7cadSbEHc9G3OTv45SyneRN3ps4DQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.27.2",
        "@babel/helper-validator-option": "^7.27.1",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-create-class-features-plugin": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-create-class-features-plugin/-/helper-create-class-features-plugin-7.28.5.tgz",
      "integrity": "sha512-q3WC4JfdODypvxArsJQROfupPBq9+lMwjKq7C33GhbFYJsufD0yd/ziwD+hJucLeWsnFPWZjsU2DNFqBPE7jwQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-annotate-as-pure": "^7.27.3",
        "@babel/helper-member-expression-to-functions": "^7.28.5",
        "@babel/helper-optimise-call-expression": "^7.27.1",
        "@babel/helper-replace-supers": "^7.27.1",
        "@babel/helper-skip-transparent-expression-wrappers": "^7.27.1",
        "@babel/traverse": "^7.28.5",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-create-regexp-features-plugin": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-create-regexp-features-plugin/-/helper-create-regexp-features-plugin-7.28.5.tgz",
      "integrity": "sha512-N1EhvLtHzOvj7QQOUCCS3NrPJP8c5W6ZXCHDn7Yialuy1iu4r5EmIYkXlKNqT99Ciw+W0mDqWoR6HWMZlFP3hw==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-annotate-as-pure": "^7.27.3",
        "regexpu-core": "^6.3.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-define-polyfill-provider": {
      "version": "0.6.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-define-polyfill-provider/-/helper-define-polyfill-provider-0.6.5.tgz",
      "integrity": "sha512-uJnGFcPsWQK8fvjgGP5LZUZZsYGIoPeRjSF5PGwrelYgq7Q15/Ft9NGFp1zglwgIv//W0uG4BevRuSJRyylZPg==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-compilation-targets": "^7.27.2",
        "@babel/helper-plugin-utils": "^7.27.1",
        "debug": "^4.4.1",
        "lodash.debounce": "^4.0.8",
        "resolve": "^1.22.10"
      },
      "peerDependencies": {
        "@babel/core": "^7.4.0 || ^8.0.0-0 <8.0.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.28.0.tgz",
      "integrity": "sha512-+W6cISkXFa1jXsDEdYA8HeevQT/FULhxzR99pxphltZcVaugps53THCeiWA8SguxxpSp3gKPiuYfSWopkLQ4hw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-member-expression-to-functions": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-member-expression-to-functions/-/helper-member-expression-to-functions-7.28.5.tgz",
      "integrity": "sha512-cwM7SBRZcPCLgl8a7cY0soT1SptSzAlMH39vwiRpOQkJlh53r5hdHwLSCZpQdVLT39sZt+CRpNwYG4Y2v77atg==",
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.28.5",
        "@babel/types": "^7.28.5"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.27.1.tgz",
      "integrity": "sha512-0gSFWUPNXNopqtIPQvlD5WgXYI5GY2kP2cCvoT8kczjbfcfuIljTbcWrulD1CIPIX2gt1wghbDy08yE1p+/r3w==",
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.27.1",
        "@babel/types": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.28.3.tgz",
      "integrity": "sha512-gytXUbs8k2sXS9PnQptz5o0QnpLL51SwASIORY6XaBKF88nsOT0Zw9szLqlSGQDP/4TljBAD5y98p2U1fqkdsw==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.27.1",
        "@babel/traverse": "^7.28.3"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-optimise-call-expression": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-optimise-call-expression/-/helper-optimise-call-expression-7.27.1.tgz",
      "integrity": "sha512-URMGH08NzYFhubNSGJrpUEphGKQwMQYBySzat5cAByY1/YgIRkULnIy3tAMeszlL/so2HbeilYloUmSpd7GdVw==",
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.27.1.tgz",
      "integrity": "sha512-1gn1Up5YXka3YYAHGKpbideQ5Yjf1tDa9qYcgysz+cNCXukyLl6DjPXhD3VRwSb8c0J9tA4b2+rHEZtc6R0tlw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-remap-async-to-generator": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-remap-async-to-generator/-/helper-remap-async-to-generator-7.27.1.tgz",
      "integrity": "sha512-7fiA521aVw8lSPeI4ZOD3vRFkoqkJcS+z4hFo82bFSH/2tNd6eJ5qCVMS5OzDmZh/kaHQeBaeyxK6wljcPtveA==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-annotate-as-pure": "^7.27.1",
        "@babel/helper-wrap-function": "^7.27.1",
        "@babel/traverse": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-replace-supers": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-replace-supers/-/helper-replace-supers-7.27.1.tgz",
      "integrity": "sha512-7EHz6qDZc8RYS5ElPoShMheWvEgERonFCs7IAonWLLUTXW59DP14bCZt89/GKyreYn8g3S83m21FelHKbeDCKA==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-member-expression-to-functions": "^7.27.1",
        "@babel/helper-optimise-call-expression": "^7.27.1",
        "@babel/traverse": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-skip-transparent-expression-wrappers": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-skip-transparent-expression-wrappers/-/helper-skip-transparent-expression-wrappers-7.27.1.tgz",
      "integrity": "sha512-Tub4ZKEXqbPjXgWLl2+3JpQAYBJ8+ikpQ2Ocj/q/r0LwE3UhENh7EUabyHjz2kCEsrRY83ew2DQdHluuiDQFzg==",
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.27.1",
        "@babel/types": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.27.1.tgz",
      "integrity": "sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.28.5.tgz",
      "integrity": "sha512-qSs4ifwzKJSV39ucNjsvc6WVHs6b7S03sOh2OcHF9UHfVPqWWALUsNUVzhSBiItjRZoLHx7nIarVjqKVusUZ1Q==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.27.1.tgz",
      "integrity": "sha512-YvjJow9FxbhFFKDSuFnVCe2WxXk1zWc22fFePVNEaWJEu8IrZVlda6N0uHwzZrUM1il7NC9Mlp4MaJYbYd9JSg==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-wrap-function": {
      "version": "7.28.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-wrap-function/-/helper-wrap-function-7.28.3.tgz",
      "integrity": "sha512-zdf983tNfLZFletc0RRXYrHrucBEg95NIFMkn6K9dbeMY

... [Content truncated at 15000 characters] ...
```

### File: `package.json`

```json
{
  "name": "expo-app",
  "main": "expo-router/entry",
  "version": "1.0.0",
  "scripts": {
    "start": "bunx rork start -p wys8p5usd4sbf1x849wyi --tunnel",
    "start-web": "bunx rork start -p wys8p5usd4sbf1x849wyi --web --tunnel",
    "start-web-dev": "DEBUG=expo* bunx rork start -p wys8p5usd4sbf1x849wyi --web --tunnel",
    "lint": "expo lint",
    "android": "expo run:android",
    "ios": "expo run:ios"
  },
  "dependencies": {
    "@expo/vector-icons": "^15.0.3",
    "@nkzw/create-context-hook": "^1.1.0",
    "@react-native-async-storage/async-storage": "2.2.0",
    "@stardazed/streams-text-encoding": "^1.0.2",
    "@tanstack/react-query": "^5.83.0",
    "@ungap/structured-clone": "^1.3.0",
    "expo": "^54.0.20",
    "expo-blur": "~15.0.7",
    "expo-constants": "~18.0.10",
    "expo-font": "~14.0.9",
    "expo-haptics": "~15.0.7",
    "expo-image": "~3.0.10",
    "expo-image-picker": "~17.0.8",
    "expo-linear-gradient": "~15.0.7",
    "expo-linking": "~8.0.8",
    "expo-location": "~19.0.7",
    "expo-router": "~6.0.13",
    "expo-splash-screen": "~31.0.10",
    "expo-status-bar": "~3.0.8",
    "expo-symbols": "~1.0.7",
    "expo-system-ui": "~6.0.8",
    "expo-web-browser": "~15.0.8",
    "lucide-react-native": "^0.553.0",
    "nativewind": "^4.1.23",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-native": "0.81.5",
    "react-native-draggable-flatlist": "^4.0.3",
    "react-native-gesture-handler": "~2.28.0",
    "react-native-reanimated": "~4.1.5",
    "react-native-safe-area-context": "~5.6.0",
    "react-native-screens": "~4.16.0",
    "react-native-svg": "15.12.1",
    "react-native-web": "^0.21.0",
    "react-native-worklets": "0.5.1",
    "react-native-worklets-core": "^1.6.2",
    "zustand": "^5.0.2"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@expo/ngrok": "^4.1.0",
    "@types/react": "~19.1.10",
    "eslint": "^9.31.0",
    "eslint-config-expo": "~10.0.0",
    "typescript": "~5.9.2"
  },
  "private": true
}

```

### File: `project_mapper.py`

```py
import os
import sys

# --- Configuration ---
# Directories to ignore during the scan (e.g., environments, build folders, version control)
EXCLUDE_DIRS = [
    '.git', '__pycache__', 'venv', 'env', 'node_modules', 'dist', 'build', '.idea', '.vscode'
]
# File extensions to ignore (e.g., binary files, compressed files)
EXCLUDE_EXTENSIONS = [
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.pdf', '.zip', '.tar', '.gz',
    '.sqlite3', '.db', '.bin', '.dll', '.exe', '.lock', '.log', '.pyd', '.pyc'
]
# Maximum character limit for file content included in the output (to avoid exceeding LLM context limits)
MAX_CONTENT_CHARS = 15000 
# Maximum number of files to process to prevent extremely long outputs
MAX_FILES = 100 
# --- End Configuration ---


def get_file_content(filepath):
    """Safely reads file content, handling encoding errors and size limits."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read(MAX_CONTENT_CHARS)
        
        if len(content) == MAX_CONTENT_CHARS:
            content += f"\n\n... [Content truncated at {MAX_CONTENT_CHARS} characters] ..."
            
        return content
    except UnicodeDecodeError:
        # Ignore binary or non-UTF-8 files
        return "[Content skipped: Binary or non-UTF-8 encoded file]"
    except Exception as e:
        return f"[Content skipped: Error reading file: {e}]"

def map_project(root_dir, output_file_path):
    """
    Scans the project directory, builds the structure map, and extracts content.
    """
    print(f"Starting scan of directory: {os.path.abspath(root_dir)}")
    
    # 1. Structure the output
    structure_map = f"# Project Context Map for: {os.path.basename(os.path.abspath(root_dir))}\n\n"
    structure_map += "This file contains the directory structure and the contents of important project files.\n\n"
    structure_map += "---\n\n## 1. Directory Structure\n\n"
    
    content_map = "\n---\n\n## 2. File Contents\n"

    file_count = 0

    for root, dirs, files in os.walk(root_dir, topdown=True):
        # Filter out excluded directories in place for os.walk to respect
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS and not d.startswith('.')]
        
        # Calculate indentation level
        depth = root[len(root_dir):].count(os.sep)
        indent = '│   ' * depth
        
        # Add the current directory to the structure map (relative path)
        relative_path = os.path.relpath(root, root_dir)
        if relative_path != '.':
            structure_map += f"{indent}├── **{os.path.basename(root)}/**\n"
            indent += '│   ' # Increase indent for contents

        # Process files in the current directory
        for i, file_name in enumerate(files):
            file_path = os.path.join(root, file_name)
            
            # Check for file extension exclusion
            if any(file_name.lower().endswith(ext) for ext in EXCLUDE_EXTENSIONS):
                continue
            
            # Check max file limit
            if file_count >= MAX_FILES:
                structure_map += f"{indent}└── ... (Maximum file limit reached: {MAX_FILES} files processed)\n"
                print(f"Maximum file limit ({MAX_FILES}) reached. Stopping scan.")
                break

            file_count += 1
            
            # Add file to the structure map
            structure_map += f"{indent}├── {file_name}\n"
            
            # 2. Extract and format file content
            relative_file_path = os.path.relpath(file_path, root_dir)
            content = get_file_content(file_path)
            
            # Determine code block language for syntax highlighting (optional, helps LLM)
            extension = os.path.splitext(file_name)[1].lstrip('.')
            
            content_map += f"\n\n### File: `{relative_file_path}`\n\n"
            content_map += f"```{extension if extension else 'text'}\n"
            content_map += content
            content_map += "\n```"

        if file_count >= MAX_FILES:
            break

    # Combine and write the final output
    final_output = structure_map + content_map
    
    try:
        with open(output_file_path, 'w', encoding='utf-8') as f:
            f.write(final_output)
        print(f"\n✅ Successfully generated project context map to: {os.path.abspath(output_file_path)}")
        print(f"Total files processed: {file_count}")
        print("You can now copy the contents of this file directly into a Gemini prompt.")

    except Exception as e:
        print(f"\n❌ ERROR: Could not write output file {output_file_path}. Reason: {e}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        # If no path is provided, use the current directory
        project_path = os.getcwd()
        print("No directory path provided. Defaulting to current directory.")
    else:
        project_path = sys.argv[1]
    
    if not os.path.isdir(project_path):
        print(f"Error: The path '{project_path}' is not a valid directory.")
        sys.exit(1)

    # Use a fixed output name for easy use in LLM prompts
    output_filename = "project_context.md"
    map_project(project_path, output_filename)

```

### File: `README.md`

```md
# Rungano Rwedu
```

### File: `tsconfig.json`

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": [
        "./*"
      ]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}

```

### File: `app\_layout.tsx`

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProvider } from "../contexts/AppContext";
import { SettingsProvider } from "../contexts/SettingsContext";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <AppProvider>
          <GestureHandlerRootView>
            <RootLayoutNav />
          </GestureHandlerRootView>
        </AppProvider>
      </SettingsProvider>
    </QueryClientProvider>
  );
}

```

### File: `app\(tabs)\goals.tsx`

```tsx
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "@/contexts/AppContext";
import { useSettings } from "../../contexts/SettingsContext";
import Colors from "../../constants/colors";
import { CheckCircle2, Circle, Plus, Trash2, Edit3, ChevronDown, DollarSign, Target, X } from "lucide-react-native";
import { useState, useCallback, useMemo } from "react";
import FormModal, { FormInput, FormButton } from "../../components/FormModal";
import ActionMenu from "../../components/ActionMenu";
import ConfirmDialog from "../../components/ConfirmDialog";
import * as Haptics from "expo-haptics";
import type { Goal, Milestone, DateIdea } from "../../types";

// Import the DatesScreen content from the new modal location
import DatesScreenContent from '../modals/dates'; 


export default function GoalsScreen() {
  const { goals, toggleGoal, addGoal, updateGoal, deleteGoal, dateIdeas, addDateIdea, updateDateIdea } = useApp();
  const { settings } = useSettings();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'goals' | 'dates'>('goals'); 
  
  // --- GOAL STATE ---
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [expandedGoalId, setExpandedGoalId] = useState<string | null>(null);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState<boolean>(false);
  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<Goal["category"]>("collective");
  const [goalType, setGoalType] = useState<Goal["type"]>("simple");
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [newMilestone, setNewMilestone] = useState<string>("");
  const [financialTarget, setFinancialTarget] = useState<string>("");
  const [financialCurrent, setFinancialCurrent] = useState<string>("");
  const [financialContribution, setFinancialContribution] = useState<string>("");
  const [financialContributionType, setFinancialContributionType] = useState<"fixed" | "percentage">("fixed");

  // --- DATES STATE ---
  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);
  const [editingDateIdea, setEditingDateIdea] = useState<DateIdea | null>(null);
  const [dateTitle, setDateTitle] = useState<string>("");
  const [dateDescription, setDateDescription] = useState<string>("");
  const [dateCategory, setDateCategory] = useState<DateIdea["category"]>("romantic");
  const [dateImageUrl, setDateImageUrl] = useState<string>("");

  // --- Shared Action Menu State ---
  const [actionMenuVisible, setActionMenuVisible] = useState<boolean>(false);
  const [anchorPosition, setAnchorPosition] = useState<{ x: number; y: number } | undefined>();
  
  // --- START GOAL HANDLERS ---
  const resetGoalForm = () => {
    setEditingGoal(null);
    setTitle("");
    setDescription("");
    setCategory("collective");
    setGoalType("simple");
    setMilestones([]);
    setNewMilestone("");
    setFinancialTarget("");
    setFinancialCurrent("");
    setFinancialContribution("");
    setFinancialContributionType("fixed");
  };

  const openGoalModal = useCallback((goal?: Goal) => {
    if (goal) {
      setEditingGoal(goal);
      setTitle(goal.title);
      setDescription(goal.description || "");
      setCategory(goal.category);
      setGoalType(goal.type || "simple");
      setMilestones(goal.milestones || []);
      setFinancialTarget(goal.financialTarget?.toString() || "");
      setFinancialCurrent(goal.financialCurrent?.toString() || "");
      setFinancialContribution(goal.financialContribution?.toString() || "");
      setFinancialContributionType(goal.financialContributionType || "fixed");
    } else {
      resetGoalForm();
    }
    setModalVisible(true);
  }, []);
  
  const addMilestone = useCallback(() => {
    if (!newMilestone.trim()) return;
    setMilestones(currentMilestones => [...currentMilestones, {
      id: Date.now().toString(),
      title: newMilestone.trim(),
      completed: false,
    }]);
    setNewMilestone("");
  }, [newMilestone]);

  const removeMilestone = useCallback((id: string) => {
    setMilestones(currentMilestones => currentMilestones.filter((m) => m.id !== id));
  }, []);

  const toggleMilestoneInGoal = useCallback((goalId: string, milestoneId: string) => {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal || !goal.milestones) return;

    const updatedMilestones = goal.milestones.map((m) =>
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    );

    const completedCount = updatedMilestones.filter((m) => m.completed).length;
    const progress = Math.round((completedCount / updatedMilestones.length) * 100);

    updateGoal(goalId, {
      milestones: updatedMilestones,
      progress,
      completed: completedCount === updatedMilestones.length,
    });
  }, [goals, updateGoal]);
  
  const handleContribute = useCallback((goal: Goal) => {
    if (!goal.financialTarget || !goal.financialContribution) return;

    let newAmount = goal.financialCurrent || 0;

    if (goal.financialContributionType === "fixed") {
      newAmount += goal.financialContribution;
    } else {
      newAmount += (goal.financialTarget * goal.financialContribution) / 100;
    }

    newAmount = Math.min(newAmount, goal.financialTarget);
    const progress = Math.round((newAmount / goal.financialTarget) * 100);

    updateGoal(goal.id, {
      financialCurrent: newAmount,
      progress,
      completed: newAmount >= goal.financialTarget,
    });
  }, [updateGoal]);

  const handleGoalSave = useCallback(() => {
    if (!title.trim()) return;

    const goalData: Partial<Goal> = {
      title: title.trim(),
      description: description.trim() || undefined,
      category,
      type: goalType,
    };

    if (goalType === "milestone" && milestones.length > 0) {
      const completedCount = milestones.filter((m) => m.completed).length;
      goalData.milestones = milestones;
      goalData.progress = Math.round((completedCount / milestones.length) * 100);
      goalData.completed = completedCount === milestones.length;
    } else if (goalType === "financial" && financialTarget) {
      const target = parseFloat(financialTarget);
      const current = parseFloat(financialCurrent) || 0;
      const contribution = parseFloat(financialContribution) || 0;
      goalData.financialTarget = target;
      goalData.financialCurrent = current;
      goalData.financialContribution = contribution;
      goalData.financialContributionType = financialContributionType;
      goalData.progress = Math.round((current / target) * 100);
      goalData.completed = current >= target;
    } else if (goalType === "simple") {
        goalData.progress = undefined;
        goalData.milestones = undefined;
        goalData.financialTarget = undefined;
        goalData.financialCurrent = undefined;
        goalData.financialContribution = undefined;
    }

    if (editingGoal) {
      updateGoal(editingGoal.id, goalData);
    } else {
      const newGoal = {
        id: Date.now().toString(),
        ...goalData,
        completed: false,
        progress: goalData.progress !== undefined ? goalData.progress : (goalType === "simple" ? undefined : 0),
      } as Goal;
      addGoal(newGoal);
    }

    setModalVisible(false);
  }, [title, description, category, goalType, milestones, financialTarget, financialCurrent, financialContribution, financialContributionType, editingGoal, updateGoal, addGoal]);

  const handleLongPress = useCallback((goalId: string, event: any) => {
    if (settings.hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    if (event?.nativeEvent) {
      setAnchorPosition({
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY,
      });
    }
    setSelectedGoalId(goalId);
    setActionMenuVisible(true);
  }, [settings.hapticFeedback]);
  
  const resetDateForm = () => {
    setEditingDateIdea(null);
    setDateTitle("");
    setDateDescription("");
    setDateCategory("romantic");
    setDateImageUrl("");
  };

  const openDatesModal = useCallback((dateIdea?: DateIdea) => {
    if (dateIdea) {
      setEditingDateIdea(dateIdea);
      setDateTitle(dateIdea.title);
      setDateDescription(dateIdea.description);
      setDateCategory(dateIdea.category);
      setDateImageUrl(dateIdea.imageUrl || "");
    } else {
      resetDateForm();
    }
    setDateModalVisible(true);
  }, []);

  const handleDateSave = useCallback(() => {
    if (!dateTitle.trim() || !dateDescription.trim()) return;

    if (editingDateIdea) {
      updateDateIdea(editingDateIdea.id, {
        title: dateTitle.trim(),
        description: dateDescription.trim(),
        category: dateCategory,
        imageUrl: dateImageUrl.trim() || undefined,
      });
    } else {
      addDateIdea({
        id: Date.now().toString(),
        title: dateTitle.trim(),
        description: dateDescription.trim(),
        category: dateCategory,
        completed: false,
        imageUrl: dateImageUrl.trim() || undefined,
      });
    }

    setDateModalVisible(false);
  }, [dateTitle, dateDescription, dateCategory, dateImageUrl, editingDateIdea, updateDateIdea, addDateIdea]);

  // --- END HANDLERS ---

  // --- Rendering Functions ---

  const renderGoalCard = (goal: Goal, color: string) => {
    const isExpanded = expandedGoalId === goal.id;
    const isFinancial = goal.type === "financial";
    const isMilestone = goal.type === "milestone";

    let progressText = "";
    if (isFinancial && goal.financialTarget) {
        progressText = `${goal.progress || 0}% ($${goal.financialCurrent?.toFixed(2) || "0.00"} / $${goal.financialTarget.toFixed(2)})`;
    } else if (isMilestone && goal.milestones) {
        const completedCount = goal.milestones.filter((m) => m.completed).length;
        progressText = `${completedCount} / ${goal.milestones.length} Milestones (${goal.progress || 0}%)`;
    } else if (goal.progress !== undefined) {
        progressText = `${goal.progress}% Complete`;
    } else if (goal.completed) {
        progressText = "Completed!";
    }

    return (
      <View key={goal.id} style={styles.goalCard}>
        <TouchableOpacity
          style={styles.goalToggleArea}
          onLongPress={(e) => handleLongPress(goal.id, e)}
          activeOpacity={0.7}
          onPress={() => {
            if (settings.hapticFeedback) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            if (isMilestone || isFinancial) {
                setExpandedGoalId(isExpanded ? null : goal.id);
            } else {
                toggleGoal(goal.id);
            }
          }}
        >
          {/* 1. Dedicated Completion Toggle Button */}
          {(isMilestone || isFinancial) ? (
            <TouchableOpacity
              onPress={() => toggleGoal(goal.id)}
              style={styles.completionToggle}
              activeOpacity={0.8}
            >
              {goal.completed ? (
                <CheckCircle2 size={24} color={color} />
              ) : (
                <Circle size={24} color={Colors.textLight} />
              )}
            </TouchableOpacity>
          ) : (
             <View style={styles.completionToggle}>
                {goal.completed ? (
                  <CheckCircle2 size={24} color={color} />
                ) : (
                  <Circle size={24} color={Colors.textLight} />
                )}
             </View>
          )}

          <View style={styles.goalContent}>
            <View style={styles.goalHeader}>
              <View style={styles.goalTitleRow}>
                <Text style={[styles.goalTitle, goal.completed && styles.completedText]}>
                  {goal.title}
                </Text>
              </View>
            </View>
            
            {goal.description && (
                <Text style={styles.goalDescription}>{goal.description}</Text>
            )}

            {(isMilestone || isFinancial || goal.progress !== undefined) && (
                <Text style={[styles.progressSummary, goal.completed && styles.completedText]}>
                    {progressText}
                </Text>
            )}
            
            {goal.progress !== undefined && !goal.completed && (
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${goal.progress}%`, backgroundColor: color },
                  ]}
                />
              </View>
            )}

            {(isMilestone || isFinancial) && (
                <ChevronDown
                size={20}
                color={Colors.textLight}
                style={[styles.chevron, isExpanded && styles.chevronExpanded]}
                />
            )}
          </View>
        </TouchableOpacity>

        {isExpanded && (isMilestone || isFinancial) && (
          <View style={styles.expandedContent}>
            {isMilestone && goal.milestones && goal.milestones.length > 0 && (
              <View style={styles.milestonesSection}>
                <Text style={styles.detailHeader}>Milestone Checklist</Text>
                {goal.milestones.map((milestone) => (
                  <TouchableOpacity
                    key={milestone.id}
                    style={styles.milestoneItem}
                    onPress={() => toggleMilestoneInGoal(goal.id, milestone.id)}
                    activeOpacity={0.7}
                  >
                    {milestone.completed ? (
                      <CheckCircle2 size={18} color={color} />
                    ) : (
                      <Circle size={18} color={Colors.textLight} />
                    )}
                    <Text
                      style={[
                        styles.milestoneText,
                        milestone.completed && styles.completedText,
                      ]}
                    >
                      {milestone.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {isFinancial &&
              goal.financialContribution &&
              !goal.completed && (
                <>
                  <Text style={styles.detailHeader}>Financial Contribution</Text>
                  <TouchableOpacity
                    style={[styles.contributeButton, { backgroundColor: color }]}
                    onPress={() => handleContribute(goal)}
                    activeOpacity={0.7}
                  >
            

... [Content truncated at 15000 characters] ...
```

### File: `app\(tabs)\index.tsx`

```tsx
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "@/contexts/AppContext";
import Colors from "../../constants/colors";
import { Heart, Target, Calendar, MapPin, Sparkles, ChevronRight, CheckCircle2, Quote } from "lucide-react-native";
import { Link } from "expo-router";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const { memories, goals, dateIdeas, places } = useApp();
  const insets = useSafeAreaInsets();

  const completedGoals = goals.filter((g) => g.completed).length;
  const completedDates = dateIdeas.filter((d) => d.completed).length;
  const visitedPlaces = places.filter((p) => p.visited).length;

  const topTwoGoals = goals
    .filter((g) => !g.completed && g.category === 'collective') // Filter for collective, incomplete goals
    .sort((a, b) => (b.progress || 0) - (a.progress || 0)) // Sort by progress (optional)
    .slice(0, 2);

  // The statItems array is no longer used for a dedicated section but kept here 
  // in case the metrics are needed elsewhere.
  const statItems = [
    { label: "Memories", icon: Heart, number: memories.length, color: Colors.darkGreen, link: "/memories" },
    { label: "Goals Done", icon: Target, number: `${completedGoals}/${goals.length}`, color: Colors.lightBrown, link: "/goals" },
    { label: "Dates Done", icon: Calendar, number: completedDates, color: Colors.darkGreen, link: "/goals" },
    { label: "Places Visited", icon: MapPin, number: visitedPlaces, color: Colors.lightBrown, link: "/travel" },
  ];

  const renderGoalProgress = (goal: typeof goals[0], color: string) => (
    <View style={styles.goalProgressContainer}>
      <Text style={styles.goalProgressText}>{goal.progress || 0}% Complete</Text>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${goal.progress || 0}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.pastelGreen, Colors.softWhite]}
        style={styles.headerGradient}
      >
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <Text style={styles.greeting}>Welcome Home</Text>
          <Text style={styles.subtitle}>Let's check our progress</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Priority Goals Section */}
        <View style={styles.section}>
          <Link href="/goals" asChild>
            <TouchableOpacity style={styles.sectionHeaderLink} activeOpacity={0.7}>
                <Text style={styles.sectionTitle}>Top Priority Goals</Text>
                <ChevronRight size={20} color={Colors.textLight} />
            </TouchableOpacity>
          </Link>
          <View style={styles.topGoalsGrid}>
            {topTwoGoals.length > 0 ? (
                topTwoGoals.map((goal, index) => (
                    <View key={goal.id} style={[styles.priorityGoalCard, { borderColor: Colors.darkGreen }]}>
                        <View style={styles.goalHeaderRow}>
                            <Target size={20} color={Colors.darkGreen} />
                            <Text style={styles.priorityGoalTitle} numberOfLines={2}>{goal.title}</Text>
                        </View>
                        {renderGoalProgress(goal, Colors.darkGreen)}
                        {goal.description && <Text style={styles.goalDescription} numberOfLines={1}>{goal.description}</Text>}
                    </View>
                ))
            ) : (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No active collective goals! Start planning.</Text>
                </View>
            )}
          </View>
        </View>

        {/* Quick Calendar / Reminder Widget */}
        <View style={styles.section}>
          <Link href="/goals" asChild>
            <TouchableOpacity style={styles.sectionHeaderLink} activeOpacity={0.7}>
                <Text style={styles.sectionTitle}>Upcoming Dates & Reminders</Text>
                <ChevronRight size={20} color={Colors.textLight} />
            </TouchableOpacity>
          </Link>
          <View style={[styles.calendarCard, { backgroundColor: Colors.cream, borderColor: Colors.pastelGreen }]}>
            <View style={styles.calendarHeader}>
                <Calendar size={24} color={Colors.lightBrown} />
                <Text style={styles.calendarTitle}>Today, Nov 12</Text>
            </View>
            <View style={styles.calendarEvents}>
                <Text style={styles.eventText}>No key reminders set.</Text>
                <Text style={styles.eventSubText}>Tap to set your next important date or milestone.</Text>
            </View>
          </View>
        </View>

        {/* Removed "Our History" Stats Section */}

        {/* Quote Card (Revamped) */}
        <View style={styles.quoteBlock}>
            <Quote size={28} color={Colors.lightBrown} style={styles.quoteIcon} />
            <Text style={styles.revampedQuote}>
                &ldquo;In all the world, there is no heart for me like yours.
                In all the world, there is no love for you like mine.&rdquo;
            </Text>
            <Text style={styles.revampedQuoteAuthor}>— Maya Angelou</Text>
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.softWhite,
  },
  headerGradient: {
    paddingTop: 0,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 36,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  sectionHeaderLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingRight: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  // --- PRIORITY GOALS ---
  topGoalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  priorityGoalCard: {
    width: '100%', 
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: Colors.cardBackground,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
  },
  goalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  priorityGoalTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  goalDescription: {
    fontSize: 13,
    color: Colors.textLight,
  },
  goalProgressContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  goalProgressText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.darkGreen,
    marginBottom: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
  },
  emptyState: {
    width: '100%',
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed' as const,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textLight,
  },
  // --- CALENDAR CARD ---
  calendarCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  calendarEvents: {
    paddingLeft: 4,
  },
  eventText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  eventSubText: {
    fontSize: 14,
    color: Colors.textLight,
  },
  // --- STATS GRID (Removed from JSX, kept styles for potential reuse) ---
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: (width - 60) / 2,
    padding: 20,
    borderRadius: 16,
    alignItems: "flex-start",
    gap: 4,
    borderWidth: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textLight,
    fontWeight: '600' as const,
  },
  // --- QUOTE CARD (Revamped) ---
  quoteBlock: {
    marginHorizontal: 24,
    marginBottom: 32,
    padding: 30,
    backgroundColor: Colors.softWhite,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.pastelGreen,
    shadowColor: Colors.darkGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  quoteIcon: {
    position: 'absolute',
    top: 15,
    left: 15,
    opacity: 0.2,
  },
  revampedQuote: {
    fontSize: 18,
    fontStyle: "italic" as const,
    color: Colors.text,
    marginBottom: 12,
    lineHeight: 28,
    paddingTop: 10, // Offset for the icon
    paddingLeft: 10,
  },
  revampedQuoteAuthor: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: "right" as const,
    fontWeight: '600' as const,
  },
});
```

### File: `app\(tabs)\memories.tsx`

```tsx
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "../../contexts/AppContext";
import { useSettings } from "../../contexts/SettingsContext";
import Colors from "../../constants/colors";
import { Plus, Trash2, Edit3, Calendar } from "lucide-react-native"; // Import Calendar icon
import { useState } from "react";
import FormModal, { FormInput, FormButton } from "../../components/FormModal";
import ActionMenu from "../../components/ActionMenu";
import ConfirmDialog from "../../components/ConfirmDialog";
import * as Haptics from "expo-haptics";
import type { Memory } from "../../types";

const { width } = Dimensions.get("window"); // Added for use in styles

export default function MemoriesScreen() {
  const { memories, addMemory, deleteMemory, updateMemory } = useApp();
  const { settings } = useSettings();
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingMemory, setEditingMemory] = useState<Memory | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [actionMenuVisible, setActionMenuVisible] = useState<boolean>(false);
  const [selectedMemoryId, setSelectedMemoryId] = useState<string | null>(null);
  const [anchorPosition, setAnchorPosition] = useState<{ x: number; y: number } | undefined>();
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState<boolean>(false);
  const [memoryToDelete, setMemoryToDelete] = useState<Memory | null>(null);

  const openModal = (memory?: Memory) => {
    if (memory) {
      setEditingMemory(memory);
      setTitle(memory.title);
      setDescription(memory.description || "");
      setDate(memory.date);
      setImageUrl(memory.imageUrl);
    } else {
      setEditingMemory(null);
      setTitle("");
      setDescription("");
      setDate("");
      setImageUrl("");
    }
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!title.trim() || !imageUrl.trim()) return;

    if (editingMemory) {
      updateMemory(editingMemory.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        date: date || new Date().toISOString().split("T")[0],
        imageUrl: imageUrl.trim(),
      });
    } else {
      addMemory({
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim() || undefined,
        date: date || new Date().toISOString().split("T")[0],
        imageUrl: imageUrl.trim(),
      });
    }

    setTitle("");
    setDescription("");
    setDate("");
    setImageUrl("");
    setModalVisible(false);
  };

  const handleLongPress = (memoryId: string, event: any) => {
    if (settings.hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    if (event?.nativeEvent) {
      setAnchorPosition({
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY,
      });
    }
    
    setSelectedMemoryId(memoryId);
    setActionMenuVisible(true);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString; // Fallback for invalid date
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.pastelGreen, Colors.softWhite]}
        style={styles.headerGradient}
      >
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.title}>Our Memories</Text>
              <Text style={styles.subtitle}>{memories.length} moments captured</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => openModal()}
              activeOpacity={0.7}
            >
              <Plus size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          {memories.map((memory) => (
            <TouchableOpacity
              key={memory.id}
              style={styles.memoryCard}
              onLongPress={(e) => handleLongPress(memory.id, e)}
              activeOpacity={0.9}
            >
              <Image source={{ uri: memory.imageUrl }} style={styles.memoryImage} contentFit="cover" />
              <View style={styles.memoryContent}>
                <View style={styles.memoryHeader}>
                  <Text style={styles.memoryTitle}>{memory.title}</Text>
                  <View style={styles.dateContainer}>
                    <Calendar size={14} color={Colors.textLight} />
                    <Text style={styles.memoryDate}>{formatDate(memory.date)}</Text>
                  </View>
                </View>
                {memory.description && (
                  <Text style={styles.memoryDescription}>{memory.description}</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>

      <ActionMenu
        visible={actionMenuVisible}
        anchorPosition={anchorPosition}
        onClose={() => {
          setActionMenuVisible(false);
          setSelectedMemoryId(null);
          setAnchorPosition(undefined);
        }}
        options={
          selectedMemoryId
            ? (() => {
                const memory = memories.find((m) => m.id === selectedMemoryId);
                if (!memory) return [];
                return [
                  {
                    label: "Edit",
                    icon: Edit3,
                    onPress: () => openModal(memory),
                    color: Colors.darkGreen,
                  },
                  {
                    label: "Delete",
                    icon: Trash2,
                    onPress: () => {
                      setMemoryToDelete(memory);
                      setActionMenuVisible(false);
                      setConfirmDeleteVisible(true);
                    },
                    destructive: true,
                  },
                ];
              })()
            : []
        }
      />

      <ConfirmDialog
        visible={confirmDeleteVisible}
        title="Delete Memory"
        message={`Are you sure you want to delete "${memoryToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (memoryToDelete) {
            deleteMemory(memoryToDelete.id);
          }
          setConfirmDeleteVisible(false);
          setMemoryToDelete(null);
        }}
        onCancel={() => {
          setConfirmDeleteVisible(false);
          setMemoryToDelete(null);
        }}
        destructive={true}
      />

      <FormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={editingMemory ? "Edit Memory" : "Add Memory"}
      >
        <FormInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          placeholder="Our amazing day..."
        />
        <FormInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Tell the story..."
          multiline
        />
        <FormInput
          label="Date (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
          placeholder={new Date().toISOString().split("T")[0]}
        />
        <FormInput
          label="Image URL"
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="https://..."
        />
        <FormButton title={editingMemory ? "Save Changes" : "Add Memory"} onPress={handleSave} />
      </FormModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.softWhite,
  },
  headerGradient: {
    paddingTop: 0,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 36,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
  },
  addButton: {
    backgroundColor: Colors.darkGreen,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  list: { // Renamed from grid
    paddingHorizontal: 24,
    gap: 24, // Increased spacing for list items
    paddingBottom: 32,
  },
  memoryCard: {
    width: "100%", // Full width
    borderRadius: 20, // Slightly more rounded corners
    overflow: "hidden",
    backgroundColor: Colors.cardBackground,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, // Reduced shadow for a softer look
    shadowRadius: 8,
    elevation: 3,
  },
  memoryImage: {
    width: "100%",
    height: 200, // Fixed height for a prominent image
  },
  memoryContent: {
    padding: 16, // Padding for the text content
  },
  memoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.cream,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  memoryTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  memoryDate: {
    fontSize: 13,
    color: Colors.textLight,
    fontWeight: "600" as const,
  },
  memoryDescription: {
    fontSize: 15,
    color: Colors.textLight,
    lineHeight: 22,
  },
});
```

### File: `app\(tabs)\settings.tsx`

```tsx
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSettings } from "../../contexts/SettingsContext";
import Colors from "../../constants/colors";
import { Settings as SettingsIcon, Vibrate } from "lucide-react-native";
import * as Haptics from "expo-haptics";

export default function SettingsScreen() {
  const { settings, toggleHapticFeedback } = useSettings();
  const insets = useSafeAreaInsets();

  const handleToggleHaptic = (value: boolean) => {
    if (value) {
      // Give haptic feedback when enabling
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    toggleHapticFeedback();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.pastelGreen, Colors.softWhite]}
        style={styles.headerGradient}
      >
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <SettingsIcon size={28} color={Colors.text} />
              <View>
                <Text style={styles.title}>Settings</Text>
                <Text style={styles.subtitle}>Customize your experience</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={[styles.sectionHeader, { borderLeftColor: Colors.darkGreen }]}>
            <Text style={styles.sectionTitle}>Preferences</Text>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: Colors.darkGreen + "20" }]}>
                <Vibrate size={20} color={Colors.darkGreen} />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Haptic Feedback</Text>
                <Text style={styles.settingDescription}>
                  Feel vibrations when interacting with items
                </Text>
              </View>
            </View>
            <Switch
              value={settings.hapticFeedback}
              onValueChange={handleToggleHaptic}
              trackColor={{ false: Colors.border, true: Colors.darkGreen + "40" }}
              thumbColor={settings.hapticFeedback ? Colors.darkGreen : Colors.textLight}
              ios_backgroundColor={Colors.border}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={[styles.sectionHeader, { borderLeftColor: Colors.lightBrown }]}>
            <Text style={styles.sectionTitle}>About</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Rungano Rwedu</Text>
            <Text style={styles.infoDescription}>
              A couple's app for managing memories, goals, date ideas, and travel plans together.
            </Text>
            <Text style={styles.infoVersion}>Version 1.0.0</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.softWhite,
  },
  headerGradient: {
    paddingTop: 0,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingLeft: 16,
    borderLeftWidth: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  settingItem: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: Colors.textLight,
    lineHeight: 18,
  },
  infoCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 15,
    color: Colors.textLight,
    lineHeight: 22,
    marginBottom: 12,
  },
  infoVersion: {
    fontSize: 13,
    color: Colors.textLight,
    fontWeight: "500" as const,
  },
});


```

### File: `app\(tabs)\travel.tsx`

```tsx
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "../../contexts/AppContext";
import { useSettings } from "../../contexts/SettingsContext";
import Colors from "../../constants/colors";
import { CheckCircle2, Circle, MapPin, Plus, Trash2, Edit3, Globe } from "lucide-react-native";
import { useState } from "react";
import FormModal, { FormInput, FormButton } from "../../components/FormModal";
import ActionMenu from "../../components/ActionMenu";
import ConfirmDialog from "../../components/ConfirmDialog";
import * as Haptics from "expo-haptics";
import type { Place } from "../../types";

export default function TravelScreen() {
  const { places, togglePlace, addPlace, deletePlace, updatePlace } = useApp();
  const { settings } = useSettings();
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [actionMenuVisible, setActionMenuVisible] = useState<boolean>(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [anchorPosition, setAnchorPosition] = useState<{ x: number; y: number } | undefined>();
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState<boolean>(false);
  const [placeToDelete, setPlaceToDelete] = useState<Place | null>(null);

  const openModal = (place?: Place) => {
    if (place) {
      setEditingPlace(place);
      setName(place.name);
      setLocation(place.location);
      setImageUrl(place.imageUrl);
      setNotes(place.notes || "");
    } else {
      setEditingPlace(null);
      setName("");
      setLocation("");
      setImageUrl("");
      setNotes("");
    }
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!name.trim() || !location.trim() || !imageUrl.trim()) return;

    if (editingPlace) {
      updatePlace(editingPlace.id, {
        name: name.trim(),
        location: location.trim(),
        imageUrl: imageUrl.trim(),
        notes: notes.trim() || undefined,
      });
    } else {
      addPlace({
        id: Date.now().toString(),
        name: name.trim(),
        location: location.trim(),
        imageUrl: imageUrl.trim(),
        visited: false,
        notes: notes.trim() || undefined,
      });
    }

    setName("");
    setLocation("");
    setImageUrl("");
    setNotes("");
    setModalVisible(false);
  };

  const handleLongPress = (placeId: string, event: any) => {
    if (settings.hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    if (event?.nativeEvent) {
      setAnchorPosition({
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY,
      });
    }
    
    setSelectedPlaceId(placeId);
    setActionMenuVisible(true);
  };

  const visited = places.filter((p) => p.visited);
  const wishlist = places.filter((p) => !p.visited);
  
  const getColor = (place: Place) => (place.visited ? Colors.darkGreen : Colors.lightBrown);

  const renderPlace = (place: typeof places[0]) => {
    const color = getColor(place);
    
    return (
      <View key={place.id} style={styles.placeCard}>
        <TouchableOpacity
          style={styles.placeContent}
          onLongPress={(e) => handleLongPress(place.id, e)}
          activeOpacity={0.9}
        >
            {/* Left Section: Image/Icon */}
            <View style={styles.cardImageContainer}>
                <Image source={{ uri: place.imageUrl }} style={styles.cardImage} contentFit="cover" />
            </View>

            {/* Center Section: Text Info */}
            <View style={styles.cardCenter}>
                <Text style={styles.placeName}>{place.name}</Text>
                <View style={styles.locationRow}>
                  <MapPin size={14} color={Colors.textLight} />
                  <Text style={styles.placeLocation}>{place.location}</Text>
                </View>
                {place.notes && <Text style={styles.placeNotes} numberOfLines={2}>{place.notes}</Text>}
                {!place.visited && (
                    <View style={styles.statusBadge}>
                        <Globe size={12} color={color} />
                        <Text style={[styles.statusText, { color }]}>Wishlist</Text>
                    </View>
                )}
            </View>
            
            {/* Right Section: Toggle Button */}
            <TouchableOpacity
                style={styles.cardRight}
                onPress={() => {
                  if (settings.hapticFeedback) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                  togglePlace(place.id);
                }}
                activeOpacity={0.7}
            >
              {place.visited ? (
                <CheckCircle2 size={24} color={color} />
              ) : (
                <Circle size={24} color={Colors.textLight} />
              )}
            </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.pastelGreen, Colors.softWhite]}
        style={styles.headerGradient}
      >
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.title}>Our Travels</Text>
              <Text style={styles.subtitle}>
                {visited.length} visited • {wishlist.length} on wishlist
              </Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => openModal()}
              activeOpacity={0.7}
            >
              <Plus size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {wishlist.length > 0 && (
          <View style={styles.section}>
            <View style={[styles.sectionHeader, { borderLeftColor: Colors.lightBrown }]}>
              <Text style={styles.sectionTitle}>Dream Destinations</Text>
            </View>
            <View style={styles.placesList}>
              {wishlist.map((place) => renderPlace(place))}
            </View>
          </View>
        )}

        {visited.length > 0 && (
          <View style={styles.section}>
            <View style={[styles.sectionHeader, { borderLeftColor: Colors.darkGreen }]}>
              <Text style={styles.sectionTitle}>Been There</Text>
            </View>
            <View style={styles.placesList}>
              {visited.map((place) => renderPlace(place))}
            </View>
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>

      <ActionMenu
        visible={actionMenuVisible}
        anchorPosition={anchorPosition}
        onClose={() => {
          setActionMenuVisible(false);
          setSelectedPlaceId(null);
          setAnchorPosition(undefined);
        }}
        options={
          selectedPlaceId
            ? (() => {
                const place = places.find((p) => p.id === selectedPlaceId);
                if (!place) return [];
                const color = getColor(place);
                return [
                  {
                    label: "Edit",
                    icon: Edit3,
                    onPress: () => openModal(place),
                    color: color,
                  },
                  {
                    label: "Delete",
                    icon: Trash2,
                    onPress: () => {
                      setPlaceToDelete(place);
                      setActionMenuVisible(false);
                      setConfirmDeleteVisible(true);
                    },
                    destructive: true,
                  },
                ];
              })()
            : []
        }
      />

      <ConfirmDialog
        visible={confirmDeleteVisible}
        title="Delete Place"
        message={`Are you sure you want to delete "${placeToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (placeToDelete) {
            deletePlace(placeToDelete.id);
          }
          setConfirmDeleteVisible(false);
          setPlaceToDelete(null);
        }}
        onCancel={() => {
          setConfirmDeleteVisible(false);
          setPlaceToDelete(null);
        }}
        destructive={true}
      />

      <FormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={editingPlace ? "Edit Place" : "Add Place"}
      >
        <FormInput
          label="Place Name"
          value={name}
          onChangeText={setName}
          placeholder="Paris, Tokyo, Bali..."
        />
        <FormInput
          label="Location"
          value={location}
          onChangeText={setLocation}
          placeholder="Country or region"
        />
        <FormInput
          label="Image URL"
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="https://..."
        />
        <FormInput
          label="Notes (optional)"
          value={notes}
          onChangeText={setNotes}
          placeholder="Why do you want to visit?"
          multiline
        />
        <FormButton title={editingPlace ? "Save Changes" : "Add Place"} onPress={handleSave} />
      </FormModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.softWhite,
  },
  headerGradient: {
    paddingTop: 0,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 36,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
  },
  addButton: {
    backgroundColor: Colors.darkGreen,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingLeft: 16,
    borderLeftWidth: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  placesList: {
    gap: 12, // Reduced gap between cards
  },
  placeCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  placeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  cardImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.border,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardCenter: {
    flex: 1,
    gap: 4,
  },
  cardRight: {
    padding: 8, // Make the toggle target larger
  },
  placeName: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  placeLocation: {
    fontSize: 14,
    color: Colors.textLight,
    opacity: 0.9,
  },
  placeNotes: {
    fontSize: 14,
    color: Colors.textLight,
    opacity: 0.9,
    marginTop: 4,
    lineHeight: 20,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.cream,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
});
```

### File: `app\(tabs)\_layout.tsx`

```tsx
import { Tabs } from "expo-router";
// Only importing icons for the five chosen tabs
import { Home, Heart, Target, MapPin, Settings } from "lucide-react-native"; 
import React from "react";
import Colors from "../../constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.darkGreen,
        tabBarInactiveTintColor: Colors.textLight,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.softWhite,
          borderTopColor: Colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="memories"
        options={{
          title: "Memories",
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />
      {/* Goals now handles both Goals and Dates content. 
        Dates tab (dates.tsx) is still in the directory but now orphans, accessed via Goals.
      */}
      <Tabs.Screen
        name="goals"
        options={{
          title: "Goals & Plan", // Updated title for clarity
          tabBarIcon: ({ color, size }) => <Target color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="travel"
        options={{
          title: "Travel",
          tabBarIcon: ({ color, size }) => <MapPin color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "More", // Utility tab for Settings and Vision Board navigation
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
        }}
      />
      {/* The 'vision' and 'dates' files must remain in the app/(tabs)/ directory 
        but without a corresponding <Tabs.Screen> entry, they become hidden pages 
        accessible only via deep links or navigation from another screen.
      */}
    </Tabs>
  );
}
```

### File: `app\modals\dates.tsx`

```tsx
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "@/contexts/AppContext"; // Using alias for consistency
import { useSettings } from "../../contexts/SettingsContext";
import Colors from "../../constants/colors";
import { CheckCircle2, Circle, Home as HomeIcon, Mountain, Heart as HeartIcon, Smile, Plus, Trash2, Edit3 } from "lucide-react-native";
import type { DateIdea } from "../../types";
import { useState } from "react";
import FormModal, { FormInput, FormButton } from "../../components/FormModal";
import ActionMenu from "../../components/ActionMenu";
import ConfirmDialog from "../../components/ConfirmDialog";
import * as Haptics from "expo-haptics";

const categoryIcons = {
  cozy: HomeIcon,
  adventure: Mountain,
  romantic: HeartIcon,
  fun: Smile,
};

const categoryColors = {
  cozy: Colors.lightBrown,
  adventure: Colors.darkGreen,
  romantic: Colors.pastelGreen,
  fun: Colors.darkBrown,
};

// NOTE: This component no longer accepts hideHeader or renders its own header/gradient/addButton
export default function DatesScreenContent() {
  const { dateIdeas, toggleDateIdea, addDateIdea, deleteDateIdea, updateDateIdea } = useApp();
  const { settings } = useSettings();
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingDateIdea, setEditingDateIdea] = useState<DateIdea | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<DateIdea["category"]>("romantic");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [actionMenuVisible, setActionMenuVisible] = useState<boolean>(false);
  const [selectedDateIdeaId, setSelectedDateIdeaId] = useState<string | null>(null);
  const [anchorPosition, setAnchorPosition] = useState<{ x: number; y: number } | undefined>();
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState<boolean>(false);
  const [dateIdeaToDelete, setDateIdeaToDelete] = useState<DateIdea | null>(null);

  // Re-define internal functions needed for modals and actions
  const openModal = (dateIdea?: DateIdea) => {
    if (dateIdea) {
      setEditingDateIdea(dateIdea);
      setTitle(dateIdea.title);
      setDescription(dateIdea.description);
      setCategory(dateIdea.category);
      setImageUrl(dateIdea.imageUrl || "");
    } else {
      setEditingDateIdea(null);
      setTitle("");
      setDescription("");
      setCategory("romantic");
      setImageUrl("");
    }
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!title.trim() || !description.trim()) return;

    if (editingDateIdea) {
      updateDateIdea(editingDateIdea.id, {
        title: title.trim(),
        description: description.trim(),
        category,
        imageUrl: imageUrl.trim() || undefined,
      });
    } else {
      addDateIdea({
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        category,
        completed: false,
        imageUrl: imageUrl.trim() || undefined,
      });
    }

    setTitle("");
    setDescription("");
    setCategory("romantic");
    setImageUrl("");
    setModalVisible(false);
  };

  const handleLongPress = (dateIdeaId: string, event: any) => {
    if (settings.hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    if (event?.nativeEvent) {
      setAnchorPosition({
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY,
      });
    }
    
    setSelectedDateIdeaId(dateIdeaId);
    setActionMenuVisible(true);
  };

  const categories: DateIdea["category"][] = ["cozy", "adventure", "romantic", "fun"];

  return (
    <View style={styles.container}>
      
      {/* NO HEADER RENDERED HERE. Only the content is visible. */}
      {/* The ScrollView is also removed, and content is wrapped in a View */}
      <View style={styles.content}> 
        {categories.map((category) => {
          const categoryDates = dateIdeas.filter((d) => d.category === category);
          if (categoryDates.length === 0) return null;

          const IconComponent = categoryIcons[category];
          const color = categoryColors[category];

          return (
            <View key={category} style={styles.section}>
              <View style={[styles.categoryHeader, { borderLeftColor: color }]}>
                <View style={styles.categoryTitleRow}>
                  <IconComponent size={20} color={color} />
                  <Text style={styles.categoryTitle}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                </View>
                <Text style={styles.categoryCount}>
                    {categoryDates.filter(d => d.completed).length}/{categoryDates.length}
                </Text>
              </View>

              {categoryDates.map((dateIdea) => (
                <View key={dateIdea.id} style={styles.dateCard}>
                  <TouchableOpacity
                    style={styles.dateContent}
                    onPress={() => {}}
                    onLongPress={(e) => handleLongPress(dateIdea.id, e)}
                    activeOpacity={0.9}
                  >
                    <View style={styles.cardLeft}>
                        {dateIdea.imageUrl ? (
                            <Image 
                                source={{ uri: dateIdea.imageUrl }}
                                style={styles.cardImage}
                                contentFit="cover"
                            />
                        ) : (
                            <View style={[styles.cardImagePlaceholder, { backgroundColor: color + "20" }]}>
                                <IconComponent size={24} color={color} />
                            </View>
                        )}
                    </View>
                    
                    <View style={styles.cardCenter}>
                        <Text style={[styles.dateTitle, dateIdea.completed && styles.completedText]}>
                            {dateIdea.title}
                        </Text>
                        <Text style={styles.dateDescription} numberOfLines={2}>
                            {dateIdea.description}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.cardRight}
                        onPress={() => {
                            if (settings.hapticFeedback) {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            }
                            toggleDateIdea(dateIdea.id);
                        }}
                        activeOpacity={0.7}
                    >
                      {dateIdea.completed ? (
                        <CheckCircle2 size={24} color={color} />
                      ) : (
                        <Circle size={24} color={Colors.textLight} />
                      )}
                    </TouchableOpacity>

                  </TouchableOpacity>
                </View>
              ))}
            </View>
          );
        })}
        <View style={{ height: 40 }} />
      </View>

      {/* Action Menu and Modals remain here, controlled locally by Dates content */}
      <ActionMenu
        visible={actionMenuVisible}
        anchorPosition={anchorPosition}
        onClose={() => {
          setActionMenuVisible(false);
          setSelectedDateIdeaId(null);
          setAnchorPosition(undefined);
        }}
        options={
          selectedDateIdeaId
            ? (() => {
                const dateIdea = dateIdeas.find((d) => d.id === selectedDateIdeaId);
                if (!dateIdea) return [];
                const catColor = categoryColors[dateIdea.category];
                return [
                  {
                    label: "Edit",
                    icon: Edit3,
                    onPress: () => openModal(dateIdea),
                    color: catColor,
                  },
                  {
                    label: "Delete",
                    icon: Trash2,
                    onPress: () => {
                      setDateIdeaToDelete(dateIdea);
                      setActionMenuVisible(false);
                      setConfirmDeleteVisible(true);
                    },
                    destructive: true,
                  },
                ];
              })()
            : []
        }
      />

      <ConfirmDialog
        visible={confirmDeleteVisible}
        title="Delete Date Idea"
        message={`Are you sure you want to delete "${dateIdeaToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (dateIdeaToDelete) {
            deleteDateIdea(dateIdeaToDelete.id);
          }
          setConfirmDeleteVisible(false);
          setDateIdeaToDelete(null);
        }}
        onCancel={() => {
          setConfirmDeleteVisible(false);
          setDateIdeaToDelete(null);
        }}
        destructive={true}
      />

      <FormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={editingDateIdea ? "Edit Date Idea" : "Add Date Idea"}
      >
        <FormInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          placeholder="Perfect date idea..."
        />
        <FormInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Describe the date..."
          multiline
        />
        <View style={styles.categorySelector}>
          <Text style={styles.categoryLabel}>Category</Text>
          <View style={styles.categoryButtons}>
            {(['cozy', 'adventure', 'romantic', 'fun'] as const).map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  category === cat && styles.categoryButtonActive,
                ]}
                onPress={() => setCategory(cat)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    category === cat && styles.categoryButtonTextActive,
                  ]}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <FormInput
          label="Image URL (optional)"
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="https://..."
        />
        <FormButton title={editingDateIdea ? "Save Changes" : "Add Date Idea"} onPress={handleSave} />
      </FormModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.softWhite,
    // When standalone, this takes full height, but when embedded, the parent ScrollView wraps it
  },
  // Removed headerGradient and header styles
  content: {
    flex: 1,
    paddingTop: 0, // Ensure no extra top padding is applied here
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingLeft: 16,
    borderLeftWidth: 4,
  },
  categoryTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  categoryCount: {
    fontSize: 16,
    color: Colors.textLight,
    fontWeight: "500" as const,
  },
  dateCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dateContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  cardLeft: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardCenter: {
    flex: 1,
    gap: 4,
  },
  cardRight: {
    padding: 8,
  },
  dateTitle: {
    fontSize: 17,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: Colors.textLight,
  },
  dateDescription: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
  },
  categorySelector: {
    marginBottom: 20,
  },
  categoryLabel: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 8,
  },
  categoryButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryButton: {
    flex: 1,
    minWidth: "45%",
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.border,
    alignItems: "center",
  },
  categoryButtonActive: {
    backgroundColor: Colors.darkGreen,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.textLight,
  },
  categoryButtonTextActive: {
    color: "#FFF",
  },
});
```

### File: `app\modals\vision.tsx`

```tsx
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "../../contexts/AppContext";
import { useSettings } from "../../contexts/SettingsContext";
import Colors from "../../constants/colors";
import { Plus, Trash2, Edit3, Sparkles, ImagePlus } from "lucide-react-native";
import { useState } from "react";
import FormModal, { FormInput, FormButton } from "../../components/FormModal";
import ActionMenu from "../../components/ActionMenu";
import ConfirmDialog from "../../components/ConfirmDialog";
import * as Haptics from "expo-haptics";
import type { VisionBoardItem } from "../../types";

export default function VisionScreen() {
  // Correctly importing the new functions
  const { visionBoard, addVisionItem, deleteVisionItem, updateVisionItem } = useApp();
  const { settings } = useSettings();
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<VisionBoardItem | null>(null);
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("Travel");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [actionMenuVisible, setActionMenuVisible] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [anchorPosition, setAnchorPosition] = useState<{ x: number; y: number } | undefined>();
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<VisionBoardItem | null>(null);

  const openModal = (item?: VisionBoardItem) => {
    if (item) {
      setEditingItem(item);
      setTitle(item.title);
      setCategory(item.category);
      setImageUrl(item.imageUrl);
    } else {
      setEditingItem(null);
      setTitle("");
      setCategory("Travel");
      setImageUrl("");
    }
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!title.trim() || !imageUrl.trim()) return;

    if (editingItem) {
      // Corrected to use updateVisionItem
      updateVisionItem(editingItem.id, {
        title: title.trim(),
        category: category.trim(),
        imageUrl: imageUrl.trim(),
      });
    } else {
      addVisionItem({
        id: Date.now().toString(),
        title: title.trim(),
        category: category.trim(),
        imageUrl: imageUrl.trim(),
      });
    }

    setTitle("");
    setCategory("Travel");
    setImageUrl("");
    setModalVisible(false);
  };

  const handleLongPress = (itemId: string, event: any) => {
    if (settings.hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    if (event?.nativeEvent) {
      setAnchorPosition({
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY,
      });
    }
    
    setSelectedItemId(itemId);
    setActionMenuVisible(true);
  };
  
  // Grouping by Category
  const groupedItems = visionBoard.reduce((acc, item) => {
      const cat = item.category || "General";
      if (!acc[cat]) {
          acc[cat] = [];
      }
      acc[cat].push(item);
      return acc;
  }, {} as Record<string, VisionBoardItem[]>);
  
  const sortedCategories = Object.keys(groupedItems).sort();


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.pastelGreen, Colors.softWhite]}
        style={styles.headerGradient}
      >
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.title}>Vision Board</Text>
              <Text style={styles.subtitle}>{visionBoard.length} Dreams Visualized</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => openModal()}
              activeOpacity={0.7}
            >
              <Plus size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {sortedCategories.map((category) => (
          <View key={category} style={styles.section}>
            <View style={[styles.sectionHeader, { borderLeftColor: Colors.lightBrown }]}>
              <Sparkles size={18} color={Colors.lightBrown} />
              <Text style={styles.sectionTitle}>{category}</Text>
            </View>
            <View style={styles.grid}>
              {groupedItems[category].map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.visionCard}
                  onLongPress={(e) => handleLongPress(item.id, e)}
                  activeOpacity={0.9}
                >
                  <Image source={{ uri: item.imageUrl }} style={styles.visionImage} contentFit="cover" />
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.7)"]}
                    style={styles.overlay}
                  >
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardCategory}>{item.category}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>

      <ActionMenu
        visible={actionMenuVisible}
        anchorPosition={anchorPosition}
        onClose={() => {
          setActionMenuVisible(false);
          setSelectedItemId(null);
          setAnchorPosition(undefined);
        }}
        options={
          selectedItemId
            ? (() => {
                const item = visionBoard.find((m) => m.id === selectedItemId);
                if (!item) return [];
                return [
                  {
                    label: "Edit",
                    icon: Edit3,
                    onPress: () => openModal(item),
                    color: Colors.darkGreen,
                  },
                  {
                    label: "Delete",
                    icon: Trash2,
                    onPress: () => {
                      setItemToDelete(item);
                      setActionMenuVisible(false);
                      setConfirmDeleteVisible(true);
                    },
                    destructive: true,
                  },
                ];
              })()
            : []
        }
      />

      <ConfirmDialog
        visible={confirmDeleteVisible}
        title="Delete Vision Item"
        message={`Are you sure you want to delete "${itemToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (itemToDelete) {
            // Corrected to use deleteVisionItem
            deleteVisionItem(itemToDelete.id); 
          }
          setConfirmDeleteVisible(false);
          setItemToDelete(null);
        }}
        onCancel={() => {
          setConfirmDeleteVisible(false);
          setItemToDelete(null);
        }}
        destructive={true}
      />

      <FormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={editingItem ? "Edit Vision Item" : "Add Vision Item"}
      >
        <FormInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          placeholder="Our Dream Vacation..."
        />
        <FormInput
          label="Category (e.g., Home, Travel, Career)"
          value={category}
          onChangeText={setCategory}
          placeholder="Travel"
        />
        <FormInput
          label="Image URL"
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="https://..."
        />
        <FormButton title={editingItem ? "Save Changes" : "Add Vision Item"} onPress={handleSave} />
      </FormModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.softWhite,
  },
  headerGradient: {
    paddingTop: 0,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 36,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
  },
  addButton: {
    backgroundColor: Colors.darkGreen,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  visionCard: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  visionImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    paddingBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFF",
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 12,
    fontWeight: "500" as const,
    color: "#FFF",
    opacity: 0.8,
  },
});
```

### File: `components\ActionMenu.tsx`

```tsx
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { Edit3, Trash2, X } from "lucide-react-native";
import Colors from "../constants/colors";
import React, { useEffect, useRef } from "react";
import * as Haptics from "expo-haptics";
import { useSettings } from "../contexts/SettingsContext";

export interface ActionMenuOption {
  label: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  onPress: () => void;
  color?: string;
  destructive?: boolean;
}

interface ActionMenuProps {
  visible: boolean;
  onClose: () => void;
  options: ActionMenuOption[];
  anchorPosition?: { x: number; y: number };
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const MENU_WIDTH = 250;
const MENU_PADDING = 10;
const ITEM_HEIGHT = 48;
const EDGE_MARGIN = 20; // Minimum margin from screen edges
const MIN_DISTANCE_FROM_ANCHOR = 15; // Minimum space between press point and menu

export default function ActionMenu({ visible, onClose, options, anchorPosition }: ActionMenuProps) {
  const { settings } = useSettings();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    if (visible) {
      if (settings.hapticFeedback) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 150,
          friction: 12,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.95);
    }
  }, [visible, settings.hapticFeedback]);

  const handleOptionPress = (option: ActionMenuOption) => {
    if (settings.hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    option.onPress();
    onClose();
  };

  if (!visible) return null;

  // --- POSITIONING LOGIC ---
  const menuHeight = options.length * ITEM_HEIGHT + MENU_PADDING * 2 + (options.length > 0 ? options.length * 2 : 0);
  
  let menuLeft = EDGE_MARGIN;
  let menuTop = (SCREEN_HEIGHT - menuHeight) / 2;

  if (anchorPosition) {
    const { x: anchorX, y: anchorY } = anchorPosition;

    // 1. Horizontal Position: Determine if there is more space on the left or right of the anchor point.
    // Prefer showing the menu on the side that was *not* pressed for visual separation (e.g., if pressed on the left side of the screen, show menu on the right).
    if (anchorX < SCREEN_WIDTH / 2) {
      // Pressed on left side: Show menu on the right of the anchor.
      menuLeft = anchorX + MIN_DISTANCE_FROM_ANCHOR;
      // Ensure it doesn't push off the right edge. If it does, snap it left.
      if (menuLeft + MENU_WIDTH > SCREEN_WIDTH - EDGE_MARGIN) {
        menuLeft = SCREEN_WIDTH - MENU_WIDTH - EDGE_MARGIN;
      }
    } else {
      // Pressed on right side: Show menu on the left of the anchor.
      menuLeft = anchorX - MENU_WIDTH - MIN_DISTANCE_FROM_ANCHOR;
      // Ensure it doesn't push off the left edge.
      if (menuLeft < EDGE_MARGIN) {
        menuLeft = EDGE_MARGIN;
      }
    }

    // 2. Vertical Position: Center menu's vertical middle near the anchor point.
    menuTop = anchorY - menuHeight / 2;
    
    // Boundary checks (Top and Bottom)
    menuTop = Math.max(EDGE_MARGIN, menuTop);
    menuTop = Math.min(menuTop, SCREEN_HEIGHT - menuHeight - EDGE_MARGIN);
  }


  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[
            styles.overlay,
            { opacity: fadeAnim },
          ]}
        >
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.menu,
                {
                  left: menuLeft,
                  top: menuTop,
                  width: MENU_WIDTH,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <View style={styles.menuContent}>
                {options.map((option, index) => {
                  const IconComponent = option.icon;
                  const color = option.destructive
                    ? "#FF3B30"
                    : option.color || Colors.darkGreen;

                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.menuItem,
                        index < options.length - 1 && styles.menuItemSeparator,
                        { height: ITEM_HEIGHT, paddingHorizontal: 16 }
                      ]}
                      onPress={() => handleOptionPress(option)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.menuItemTextContainer}>
                        <Text style={[styles.menuItemText, { color }]}>
                          {option.label}
                        </Text>
                        {option.destructive && (
                          <Text style={styles.destructiveHint}>This action cannot be undone</Text>
                        )}
                      </View>
                      <View style={[styles.iconContainer, { backgroundColor: color + "15" }]}>
                        <IconComponent size={20} color={color} />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
              
              {Platform.OS === 'android' && (
                <TouchableOpacity onPress={onClose} style={styles.cancelButton} activeOpacity={0.7}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              )}

            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    // Note: Removed centering justification/alignment here, relying solely on absolute positioning
  },
  menu: {
    position: "absolute",
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuContent: {
    paddingVertical: MENU_PADDING,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginVertical: 1,
  },
  menuItemSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 2,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: "600" as const,
  },
  destructiveHint: {
    fontSize: 10,
    color: Colors.textLight,
    fontStyle: "italic",
    marginTop: 2,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: Colors.cream,
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
  }
});
```

### File: `components\ConfirmDialog.tsx`

```tsx
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { AlertTriangle } from "lucide-react-native";
import Colors from "../constants/colors";
import React, { useEffect, useRef } from "react";
import * as Haptics from "expo-haptics";
import { useSettings } from "../contexts/SettingsContext";

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  destructive?: boolean;
}

export default function ConfirmDialog({
  visible,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  destructive = true,
}: ConfirmDialogProps) {
  const { settings } = useSettings();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (visible) {
      if (settings.hapticFeedback) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      }

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);
    }
  }, [visible, settings.hapticFeedback]);

  const handleConfirm = () => {
    if (settings.hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onConfirm();
  };

  const handleCancel = () => {
    if (settings.hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onCancel();
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleCancel}>
      <TouchableWithoutFeedback onPress={handleCancel}>
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.dialog,
                {
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <View style={styles.iconContainer}>
                <View style={[styles.iconCircle, destructive && styles.iconCircleDestructive]}>
                  <AlertTriangle size={24} color={destructive ? "#FF3B30" : Colors.text} />
                </View>
              </View>

              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={handleCancel}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelButtonText}>{cancelText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    destructive ? styles.deleteButton : styles.confirmButton,
                  ]}
                  onPress={handleConfirm}
                  activeOpacity={0.7}
                >
                  <Text style={styles.confirmButtonText}>{confirmText}</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  dialog: {
    backgroundColor: Colors.softWhite,
    borderRadius: 20,
    width: "100%",
    maxWidth: 340,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.border + "40",
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircleDestructive: {
    backgroundColor: "#FF3B30" + "20",
  },
  title: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.text,
    textAlign: "center",
    marginBottom: 8,
  },
  message: {
    fontSize: 15,
    color: Colors.textLight,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: Colors.border,
  },
  confirmButton: {
    backgroundColor: Colors.darkGreen,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#FFF",
  },
});


```

### File: `components\FormModal.tsx`

```tsx
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { X } from "lucide-react-native";
import Colors from "../constants/colors";
import React from "react";

interface FormModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function FormModal({ visible, onClose, title, children }: FormModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalOverlay}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={onClose}
          />
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{title}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView
              style={styles.modalBody}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {children}
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
}

export function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
}: FormInputProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textLight}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
      />
    </View>
  );
}

interface FormButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}

export function FormButton({ title, onPress, variant = "primary" }: FormButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "primary" ? styles.primaryButton : styles.secondaryButton,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.buttonText,
          variant === "primary" ? styles.primaryButtonText : styles.secondaryButtonText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.softWhite,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "90%",
    paddingBottom: Platform.OS === "ios" ? 34 : 24,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: Colors.darkGreen,
  },
  secondaryButton: {
    backgroundColor: Colors.cream,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600" as const,
  },
  primaryButtonText: {
    color: "#FFF",
  },
  secondaryButtonText: {
    color: Colors.text,
  },
});

```

### File: `constants\colors.ts`

```ts
const pastelGreen = "#9AC5B5";
const darkGreen = "#7AA898";
const lightBrown = "#A0826D";
const darkBrown = "#8B6F47";
const cream = "#F5F1E8";
const softWhite = "#FDFCFA";

export default {
  pastelGreen,
  darkGreen,
  lightBrown,
  darkBrown,
  cream,
  softWhite,
  text: "#3D3D3D",
  textLight: "#8B8B8B",
  cardBackground: "#FFFFFF",
  border: "#E8E5DD",
};

```

### File: `contexts\AppContext.tsx`

```tsx
import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback, useMemo } from "react";
import type { Memory, Goal, DateIdea, Place } from "../types"; 

const STORAGE_KEY = "couple_app_data";

interface AppData {
  memories: Memory[];
  goals: Goal[];
  dateIdeas: DateIdea[];
  places: Place[];
}

const initialData: AppData = {
  memories: [
    {
      id: "1",
      imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
      title: "Our First Date",
      date: "2023-01-15",
      description: "Coffee shop downtown",
    },
    {
      id: "2",
      imageUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
      title: "Beach Sunset",
      date: "2023-06-20",
      description: "Perfect evening together",
    },
  ],
  goals: [
    {
      id: "1",
      title: "Save for our dream home",
      completed: false,
      category: "collective",
      progress: 35,
    },
    {
      id: "2",
      title: "Run a 5K together",
      completed: false,
      category: "collective",
      progress: 60,
    },
    {
      id: "3",
      title: "Learn to cook Italian cuisine",
      completed: false,
      category: "hers",
    },
    {
      id: "4",
      title: "Build a woodworking project",
      completed: false,
      category: "mine",
    },
  ],
  dateIdeas: [
    {
      id: "1",
      title: "Movie Night at Home",
      description: "Cozy blankets, popcorn, and our favorite films",
      category: "cozy",
      completed: false,
      imageUrl: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=800",
    },
    {
      id: "2",
      title: "Hiking Adventure",
      description: "Explore a new trail and pack a picnic",
      category: "adventure",
      completed: false,
      imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    },
    {
      id: "3",
      title: "Candlelit Dinner",
      description: "Cook together and enjoy by candlelight",
      category: "romantic",
      completed: false,
      imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800",
    },
  ],
  places: [
    {
      id: "1",
      name: "Paris",
      location: "France",
      imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      visited: false,
    },
    {
      id: "2",
      name: "Santorini",
      location: "Greece",
      imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
      visited: false,
    },
  ],
};

export const [AppProvider, useApp] = createContextHook(() => {
  // --- 1. DEFINE ALL STATE VARIABLES FIRST (USESTATE) ---
  const [memories, setMemories] = useState<Memory[]>(initialData.memories);
  const [goals, setGoals] = useState<Goal[]>(initialData.goals);
  const [dateIdeas, setDateIdeas] = useState<DateIdea[]>(initialData.dateIdeas);
  const [places, setPlaces] = useState<Place[]>(initialData.places);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // --- 2. THEN DEFINE ALL HANDLER FUNCTIONS (USECALLBACK / USEEFFECT) ---

  const loadData = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setMemories(data.memories || initialData.memories);
        setGoals(data.goals || initialData.goals);
        setDateIdeas(data.dateIdeas || initialData.dateIdeas);
        setPlaces(data.places || initialData.places);
      }
    } catch (error) {
      console.log("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveData = useCallback(async (data: Partial<AppData>) => {
    try {
      const currentData = {
        memories,
        goals,
        dateIdeas,
        places,
        ...data,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
    } catch (error) {
      console.log("Error saving data:", error);
    }
  }, [memories, goals, dateIdeas, places]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // --- MEMORY CRUD ---

  const addMemory = useCallback((memory: Memory) => {
    const updated = [memory, ...memories];
    setMemories(updated);
    saveData({ memories: updated });
  }, [memories, saveData]);

  const deleteMemory = useCallback((memoryId: string) => {
    const updated = memories.filter((m) => m.id !== memoryId);
    setMemories(updated);
    saveData({ memories: updated });
  }, [memories, saveData]);

  const updateMemory = useCallback((memoryId: string, updates: Partial<Memory>) => {
    const updated = memories.map((memory) =>
      memory.id === memoryId ? { ...memory, ...updates } : memory
    );
    setMemories(updated);
    saveData({ memories: updated });
  }, [memories, saveData]);

  const reorderMemories = useCallback((newMemories: Memory[]) => {
    setMemories(newMemories);
    saveData({ memories: newMemories });
  }, [saveData]);

  // --- GOAL CRUD ---

  const toggleGoal = useCallback((goalId: string) => {
    const updated = goals.map((goal) =>
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updated);
    saveData({ goals: updated });
  }, [goals, saveData]);

  const addGoal = useCallback((goal: Goal) => {
    const updated = [...goals, goal];
    setGoals(updated);
    saveData({ goals: updated });
  }, [goals, saveData]);

  const updateGoal = useCallback((goalId: string, updates: Partial<Goal>) => {
    const updated = goals.map((goal) =>
      goal.id === goalId ? { ...goal, ...updates } : goal
    );
    setGoals(updated);
    saveData({ goals: updated });
  }, [goals, saveData]);

  const deleteGoal = useCallback((goalId: string) => {
    const updated = goals.filter((g) => g.id !== goalId);
    setGoals(updated);
    saveData({ goals: updated });
  }, [goals, saveData]);

  const reorderGoals = useCallback((newGoals: Goal[]) => {
    setGoals(newGoals);
    saveData({ goals: newGoals });
  }, [saveData]);

  // --- DATE IDEA CRUD ---

  const toggleDateIdea = useCallback((ideaId: string) => {
    const updated = dateIdeas.map((idea) =>
      idea.id === ideaId ? { ...idea, completed: !idea.completed } : idea
    );
    setDateIdeas(updated);
    saveData({ dateIdeas: updated });
  }, [dateIdeas, saveData]);

  const addDateIdea = useCallback((idea: DateIdea) => {
    const updated = [...dateIdeas, idea];
    setDateIdeas(updated);
    saveData({ dateIdeas: updated });
  }, [dateIdeas, saveData]);

  const deleteDateIdea = useCallback((ideaId: string) => {
    const updated = dateIdeas.filter((d) => d.id !== ideaId);
    setDateIdeas(updated);
    saveData({ dateIdeas: updated });
  }, [dateIdeas, saveData]);

  const updateDateIdea = useCallback((ideaId: string, updates: Partial<DateIdea>) => {
    const updated = dateIdeas.map((idea) =>
      idea.id === ideaId ? { ...idea, ...updates } : idea
    );
    setDateIdeas(updated);
    saveData({ dateIdeas: updated });
  }, [dateIdeas, saveData]);

  const reorderDateIdeas = useCallback((newDateIdeas: DateIdea[]) => {
    setDateIdeas(newDateIdeas);
    saveData({ dateIdeas: newDateIdeas });
  }, [saveData]);

  // --- PLACE (TRAVEL) CRUD ---

  const togglePlace = useCallback((placeId: string) => {
    const updated = places.map((place) =>
      place.id === placeId ? { ...place, visited: !place.visited } : place
    );
    setPlaces(updated);
    saveData({ places: updated });
  }, [places, saveData]);

  const addPlace = useCallback((place: Place) => {
    const updated = [...places, place];
    setPlaces(updated);
    saveData({ places: updated });
  }, [places, saveData]);

  const deletePlace = useCallback((placeId: string) => {
    const updated = places.filter((p) => p.id !== placeId);
    setPlaces(updated);
    saveData({ places: updated });
  }, [places, saveData]);

  const updatePlace = useCallback((placeId: string, updates: Partial<Place>) => {
    const updated = places.map((place) =>
      place.id === placeId ? { ...place, ...updates } : place
    );
    setPlaces(updated);
    saveData({ places: updated });
  }, [places, saveData]);

  const reorderPlaces = useCallback((newPlaces: Place[]) => {
    setPlaces(newPlaces);
    saveData({ places: newPlaces });
  }, [saveData]);

  // --- 3. EXPORT VIA useMemo ---
  return useMemo(
    () => ({
      memories,
      goals,
      dateIdeas,
      places,
      isLoading,
      addMemory,
      deleteMemory,
      updateMemory,
      reorderMemories,
      toggleGoal,
      addGoal,
      updateGoal,
      deleteGoal,
      reorderGoals,
      toggleDateIdea,
      addDateIdea,
      deleteDateIdea,
      updateDateIdea,
      reorderDateIdeas,
      togglePlace,
      addPlace,
      deletePlace,
      updatePlace,
      reorderPlaces,
    }),
    [
      memories,
      goals,
      dateIdeas,
      places,
      isLoading,
      addMemory,
      deleteMemory,
      updateMemory,
      reorderMemories,
      toggleGoal,
      addGoal,
      updateGoal,
      deleteGoal,
      reorderGoals,
      toggleDateIdea,
      addDateIdea,
      deleteDateIdea,
      updateDateIdea,
      reorderDateIdeas,
      togglePlace,
      addPlace,
      deletePlace,
      updatePlace,
      reorderPlaces,
    ]
  );
});
```

### File: `contexts\SettingsContext.tsx`

```tsx
import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback, useMemo } from "react";

const SETTINGS_STORAGE_KEY = "couple_app_settings";

interface AppSettings {
  hapticFeedback: boolean;
}

const defaultSettings: AppSettings = {
  hapticFeedback: true,
};

export const [SettingsProvider, useSettings] = createContextHook(() => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadSettings = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setSettings({ ...defaultSettings, ...data });
      }
    } catch (error) {
      console.log("Error loading settings:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveSettings = useCallback(async (newSettings: AppSettings) => {
    try {
      setSettings(newSettings);
      await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.log("Error saving settings:", error);
    }
  }, []);

  const updateSetting = useCallback(
    <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
      const newSettings = { ...settings, [key]: value };
      saveSettings(newSettings);
    },
    [settings, saveSettings]
  );

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return useMemo(
    () => ({
      settings,
      isLoading,
      updateSetting,
      toggleHapticFeedback: () => updateSetting("hapticFeedback", !settings.hapticFeedback),
    }),
    [settings, isLoading, updateSetting]
  );
});


```

### File: `types\index.ts`

```ts
export interface Memory {
  id: string;
  imageUrl: string;
  title: string;
  date: string;
  description?: string;
}

export interface VisionBoardItem {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: "collective" | "hers" | "mine";
  progress?: number;
  type?: "simple" | "milestone" | "financial";
  milestones?: Milestone[];
  financialTarget?: number;
  financialCurrent?: number;
  financialContribution?: number;
  financialContributionType?: "fixed" | "percentage";
}

export interface DateIdea {
  id: string;
  title: string;
  description: string;
  category: "cozy" | "adventure" | "romantic" | "fun";
  completed: boolean;
  imageUrl?: string;
}

export interface Place {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  visited: boolean;
  date?: string;
  notes?: string;
}

```