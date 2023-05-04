# web

## 1.0.0-next.0

### Major Changes

- 1eb74ff7: Use @faire/mjml-react react bindings

### Patch Changes

- Updated dependencies [1eb74ff7]
  - mailing-core@1.0.0-next.0

## 0.4.23

### Patch Changes

- c4a29b9: Bugfix: mailing should early return if api returns a non 200 code
- Updated dependencies [c4a29b9]
  - mailing-core@0.9.15

## 0.4.22

### Patch Changes

- 054d2569: add processHtml option for minification etc after mjml is converted to html
- Updated dependencies [054d2569]
  - mailing-core@0.9.14

## 0.4.21

### Patch Changes

- 49c9684: Catch errors writing to db in click hook
- Updated dependencies [49c9684]
  - mailing-core@0.9.13

## 0.4.20

### Patch Changes

- 79563b0: Use secureUUID instead of Date.now for intercepts
- Updated dependencies [79563b0]
  - mailing-core@0.9.12

## 0.4.19

### Patch Changes

- (Bump version to 0.9.11)
- Updated dependencies
  - mailing-core@0.9.11

## 0.4.18

### Patch Changes

- a95e941: Use Loading... as the button text on the unsubscribe page
- 302886a: Disable previews by setting an ENV variable: DISABLE_PREVIEWS=1
- Updated dependencies [a95e941]
- Updated dependencies [4d73bbd]
- Updated dependencies [302886a]
  - mailing-core@0.9.10

## 0.4.17

### Patch Changes

- c8cc1ccd: bugfix: allow filenames with -
- 2dc47846: fix hydration error from rendering dates on server
- Updated dependencies [346fd6bf]
- Updated dependencies [c8cc1ccd]
  - mailing-core@0.9.9

## 0.4.16

### Patch Changes

- c9fafd2: Fix a bug where sendMail did not correctly use anonymousId from mailing config
- Updated dependencies [c9fafd2]
- Updated dependencies [7b57ba0]
  - mailing-core@0.9.7

## 0.4.15

### Patch Changes

- 164940f: To better help us improve mailing, anonymous analytics now includes the version of mailing and mailing-core that you are using.
- Updated dependencies [6176419]
- Updated dependencies [b748ddd]
- Updated dependencies [164940f]
  - mailing-core@0.9.6

## 0.4.14

### Patch Changes

- b341b96: Upgrade posthog-node to 2.2.3 (2.2.1 would always throw a timeout error and caused the preview server to crash, see #407). Calling posthog shutdown is also now wrapped in a try/catch
- Updated dependencies [b341b96]
  - mailing-core@0.9.5

## 0.4.13

### Patch Changes

- Improves sendMail errors and /api/sendMail. Adds analytics to the dev server.
- Updated dependencies
  - mailing-core@0.9.3

## 0.4.12

### Patch Changes

- /api/render now supports api key authentication if REQUIRE_API_KEY is set in your environment
- Updated dependencies
  - mailing-core@0.9.2

## 0.4.11

### Patch Changes

- 1c2444d: Improvements to the preview send UI
- Updated dependencies [1c2444d]
  - mailing-core@0.9.1

## 0.4.10

### Patch Changes

- Updated dependencies
  - mailing-core@0.9.0

## 0.4.9

### Patch Changes

- e94f966: bugfix for force delivery from intercepts #316

## 0.4.8

### Patch Changes

- 22834e4: fix next 13 errors

## 0.4.7

### Patch Changes

- 638a7e8: /api/render now supports POST

## 0.4.6

### Patch Changes

- 3214dbb: bugfix for header layout

## 0.4.5

### Patch Changes

- 2d5a1c1: Add sendMail to the mailing cli

## 0.4.4

### Patch Changes

- 39262d1: bump nodemailer, typescript
- add feature for force delivering an intercepted email

## 0.4.3

### Patch Changes

- 815ae3d: bugfix for issues with changing preview names #237

## 0.4.2

### Patch Changes

- 689cada: Now you can deploy your mailing project to production by running `mailing deploy`. Also fixes a setting for darkmode

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
