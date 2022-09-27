# web

## 0.4.1

### Patch Changes

- d665b9c: bugfix for mailing server build

## 0.4.0

### Minor Changes

- 6e8ac93: New Immersion UI

  - Navigate through template quickly
  - See what preview text might look like in an email client
  - New default templates set a better example for making focused templates vs catch-alls like the deprecated TextEmail
  - Command+"." hotkey for chrome-less viewing

## 0.3.8

### Patch Changes

- fix minification deprecation warnings

## 0.3.7

### Patch Changes

- 2e11ee8: Add minify option to export-previews command

## 0.3.6

### Patch Changes

- set configPath error to debug

## 0.3.5

### Patch Changes

- 9003bed: Don't look for npm root modules, use posix paths always

## 0.3.4

### Patch Changes

- 6c0a488: improve livereload performance and reliability

## 0.3.3

### Patch Changes

- 2b666f0: switch fs.watch to chokidar.watch

## 0.3.2

### Patch Changes

- c87cc5b: remove an additional / from api route (fix #158)
- 3e324e8: - Introduce esbuild for bundling templates to put in .mailing. Previously, we copied the templates, but bundling greatly improves the ability to include modules and resolve paths.
  - Build a feManifest.js that lets the frontend app get the user’s config settings
  - Update tsconfigs to support above changes
  - Fix a bad bug where moduleManifest.js always set templates to `{}` because the function invoked by `filter` had no return value.

## 0.3.1

### Patch Changes

- b87a2ed: bugfix: only treat jsx and tsx files as templates; see #141

## 0.3.0

### Minor Changes

- 5603613: - Introduces .mailing, remote control next app architecture
  - Adds `GET /api/render`
  - Adds `npx mailing server`, `npx mailing server build`, `npx mailing server start`

## 0.2.9

### Patch Changes

- 329e5bf: Removes some logging and updates dependencies

## 0.2.8

### Patch Changes

- collect dev emails to send release notes

## 0.2.7

### Patch Changes

- 5b66bfb: Introduce mailing.config.json
- e1fe04d: swap babel and ts-node template compilation for swc

## 0.2.6

### Patch Changes

- 730fa5e: Add mailing export-previews command

## 0.2.5

### Patch Changes

- header design consistency

## 0.2.4

### Patch Changes

- html view mode; new CLI args; importless react support

## 0.2.3

### Patch Changes

- 4edfafa: remove react imports, use new jsx runtime

## 0.2.2

### Patch Changes

- export render from mailing-core

## 0.2.1

### Patch Changes

- bugfix js support

## 0.2.0

### Minor Changes

- fix build

## 0.1.3

### Patch Changes

- fix generated files in build

## 0.1.2

### Patch Changes

- 6b969f7: font-display block
- b940924: display block font-display
- 44c6177: merge main with react17 support

## 0.1.2-next.2

### Patch Changes

- font-display block

## 0.1.2-next.1

### Patch Changes

- display block font-display

## 0.1.2-next.0

### Patch Changes

- merge main with react17 support

## 0.1.1

### Patch Changes

- react 17 support
