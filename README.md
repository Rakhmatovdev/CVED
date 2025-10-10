## Commitlint-config-conventional

- build
- chore
- ci
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname
    }
  }
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules
  }
});
```

# TODO: _ refoctoring todos to clean up codebase _

### 1. Directory changes

- [x] move media files to public folder

- [x] create icons directory to store custom icons

- [ ] create pages directory to store each page's elements inside that directory like
  - [ ] apis _ stores services used in directory _
  - [ ] views _ stores view (usually collections of compoennts) in directory. Optionally you can create sub directories for nested route pages _
  - [ ] components _ stores small components for it's directory _
  - [ ] types _ types used in it's directory _
  - [ ] **routes.tsx** _ define pages route in this file _
  - [ ] context _ stores contexts used in this directory _

- [ ] fix config directory
  - [x] move hooks to lib or utils directory

- [ ] create constant directory to store contant datas

### 2. Naming conventions

- [ ] for that files always follow CamelCase convention with capitalized letters
- [ ] for variables follow CamelCase
- [ ] for utils and libraries use kebab-case
- [ ] for directories use small case possibly with one word
- [ ] for search params use snake_case or kebab-case
- [ ] for pages directory directory name should be similar with route path

### 3. Forms

- [ ] use ant design's form handler instead of react hook form this way we don't need to control uncontrolled inputs
- [ ] use ant design's Form provider
