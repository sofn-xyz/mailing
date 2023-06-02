# mailing-core

## 1.0.1

### Patch Changes

- b5249c71: Add subject to /api/render response

## 1.0.0

### Major Changes

- Mailing 1.0.0! Includes @faire/mjml-react as our mjml-react library. IMPORTANT: To upgrade your app you will need to update any references to "mjml-react" to "@faire/mjml-react." If using TypeScript, you will also need to fix any type errors, for example: some properties like "padding," "font-size" and "font-weigtht" no longer accept "number" types and must be converted to "string."

### Minor Changes

- 34d0da4: Use @faire/mjml-react react bindings

### Patch Changes

- a79f937: The auth api should 500 not 401 if there is a database error

## 0.9.15

### Patch Changes

- c4a29b9: Bugfix: mailing should early return if api returns a non 200 code

## 0.9.14

### Patch Changes

- 054d2569: add processHtml option for minification etc after mjml is converted to html

## 0.9.13

### Patch Changes

- 49c9684: Catch errors writing to db in click hook

## 0.9.12

### Patch Changes

- 79563b0: Use secureUUID instead of Date.now for intercepts

## 0.9.11

### Patch Changes

- (Bump version to 0.9.11)

## 0.9.10

### Patch Changes

- a95e941: Use Loading... as the button text on the unsubscribe page
- 4d73bbd: revert page-snap to reduce bundle size
- 302886a: Disable previews by setting an ENV variable: DISABLE_PREVIEWS=1

## 0.9.9

### Patch Changes

- 346fd6bf: Added config object to sendMail route to increase default sizeLimit
- c8cc1ccd: bugfix: allow filenames with -

## 0.9.8

### Patch Changes

- d870690b: Add new Welcome template to emails.

## 0.9.7

### Patch Changes

- c9fafd2: Fix a bug where sendMail did not correctly use anonymousId from mailing config
- 7b57ba0: switch to neutral ui active colors that are unlikely to clash with brand colors in emails

## 0.9.6

### Patch Changes

- 6176419: show subject and preview text in ClientView
- b748ddd: add preview prop for preview/preheader text to BaseLayout
- 164940f: To better help us improve mailing, anonymous analytics now includes the version of mailing and mailing-core that you are using.

## 0.9.5

### Patch Changes

- b341b96: Upgrade posthog-node to 2.2.3 (2.2.1 would always throw a timeout error and caused the preview server to crash, see #407). Calling posthog shutdown is also now wrapped in a try/catch

## 0.9.4

### Patch Changes

- 8579d0f6: fix: svgs were sometimes intercepting clicks
- e155434d: fix: prevent intercept error when from is object

## 0.9.3

### Patch Changes

- Improves sendMail errors and /api/sendMail. Adds analytics to the dev server.

## 0.9.2

### Patch Changes

- /api/render now supports api key authentication if REQUIRE_API_KEY is set in your environment

## 0.9.1

### Patch Changes

- 1c2444d: Improvements to the preview send UI

## 0.9.0

### Minor Changes

- add beta Lists, Members, unsubscribe functionality

## 0.8.19

### Patch Changes

- 217e98d: Fix livereload for M1 macs

## 0.8.18

### Patch Changes

- 31e98b3: add support for async preview functions

## 0.8.17

### Patch Changes

- dc02ed3: fix intercept force deliver

## 0.8.15

### Patch Changes

- e94f966: bugfix for force delivery from intercepts #316

## 0.8.14

### Patch Changes

- 22834e4: fix next 13 errors
- e7627ac: remove unused images, fix test file ignores

## 0.8.13

### Patch Changes

- 034af17: switch JSDOM to node-html-parser for 3x faster email text generation
- dd6f635: export-previews lints, halts on error unless no-lint is passed

## 0.8.12

### Patch Changes

- 01631b0: bugfix for crash when adding blank preview file

## 0.8.11

### Patch Changes

- a7fcab4: fix bug in linter where mailto and tel would be considered relative urls

## 0.8.10

### Patch Changes

- f3f7aef: add html linting for relative and localhost images and links

## 0.8.9

### Patch Changes

- aa0bab5: add lint step for templates
- 0c843d4: fix layout bugs

## 0.8.8

### Patch Changes

- 008e5c7: add typing to sendMail return value
- 638a7e8: /api/render now supports POST

## 0.8.7

### Patch Changes

- 243d4e2: bugfix assert for node 14 compatibility

## 0.8.6

### Patch Changes

- 3214dbb: bugfix for header layout

## 0.8.5

### Patch Changes

- 2d5a1c1: Add sendMail to the mailing cli

## 0.8.4

### Patch Changes

- 39262d1: bump nodemailer, typescript
- add feature for force delivering an intercepted email

## 0.8.3

### Patch Changes

- 815ae3d: bugfix for issues with changing preview names #237

## 0.8.2

### Patch Changes

- 689cada: Now you can deploy your mailing project to production by running `mailing deploy`. Also fixes a setting for darkmode

## 0.8.1

### Patch Changes

- d665b9c: bugfix for mailing server build

## 0.8.0

### Minor Changes

- 6e8ac93: New Immersion UI

  - Navigate through template quickly
  - See what preview text might look like in an email client
  - New default templates set a better example for making focused templates vs catch-alls like the deprecated TextEmail
  - Command+"." hotkey for chrome-less viewing

## 0.7.9

### Patch Changes

- fix minification deprecation warnings

## 0.7.8

### Patch Changes

- 2e11ee8: Add minify option to export-previews command

## 0.7.7

### Patch Changes

- set configPath error to debug

## 0.7.6

### Patch Changes

- 9003bed: Don't look for npm root modules, use posix paths always

## 0.7.5

### Patch Changes

- Anonymous telemetry in core

## 0.7.4

### Patch Changes

- 6c0a488: improve livereload performance and reliability
- 8b980fc: Introduce anonymous telemetry to help us prioritize development

## 0.7.3

### Patch Changes

- 2b666f0: switch fs.watch to chokidar.watch

## 0.7.2

### Patch Changes

- c87cc5b: remove an additional / from api route (fix #158)
- 3e324e8: - Introduce esbuild for bundling templates to put in .mailing. Previously, we copied the templates, but bundling greatly improves the ability to include modules and resolve paths.
  - Build a feManifest.js that lets the frontend app get the user’s config settings
  - Update tsconfigs to support above changes
  - Fix a bad bug where moduleManifest.js always set templates to `{}` because the function invoked by `filter` had no return value.

## 0.7.1

### Patch Changes

- b87a2ed: bugfix: only treat jsx and tsx files as templates; see #141

## 0.7.0

### Minor Changes

- 5603613: - Introduces .mailing, remote control next app architecture
  - Adds `GET /api/render`
  - Adds `npx mailing server`, `npx mailing server build`, `npx mailing server start`

## 0.6.10

### Patch Changes

- 329e5bf: Removes some logging and updates dependencies

## 0.6.9

### Patch Changes

- collect dev emails to send release notes

## 0.6.8

### Patch Changes

- 5b66bfb: Introduce mailing.config.json
- e1fe04d: swap babel and ts-node template compilation for swc

## 0.6.7

### Patch Changes

- 730fa5e: Add mailing export-previews command

## 0.6.5

### Patch Changes

- header design consistency

## 0.6.4

### Patch Changes

- html view mode; new CLI args; importless react support

## 0.6.3

### Patch Changes

- 4edfafa: remove react imports, use new jsx runtime

## 0.6.2

### Patch Changes

- export render from mailing-core

## 0.6.1

### Patch Changes

- bugfix js support

## 0.6.0

### Minor Changes

- fix build

## 0.5.1

### Patch Changes

- fix generated files in build

## 0.5.0

### Minor Changes

- bump mailing-core version

## 0.4.12

### Patch Changes

- 6b969f7: font-display block
- b940924: display block font-display
- 44c6177: merge main with react17 support

## 0.4.12-next.2

### Patch Changes

- font-display block

## 0.4.12-next.1

### Patch Changes

- display block font-display

## 0.4.12-next.0

### Patch Changes

- merge main with react17 support

## 0.4.11

### Patch Changes

- react 17 support

## 0.4.10

### Patch Changes

- add README.md to cli package

## 0.4.9

### Patch Changes

- add readme

## 0.4.8

### Patch Changes

- update repo links

## 0.4.7

### Patch Changes

- better link for transport configuration; update dependencies

## 0.4.6

### Patch Changes

- skip hard reload on file change

## 0.4.5

### Patch Changes

- theme.ts

## 0.4.4

### Patch Changes

- show errors in preview, add theme.ts

## 0.4.3

### Patch Changes

- remove js support

## 0.4.2

### Patch Changes

- null state text

## 0.4.1

### Patch Changes

- bug fixes; new templates

## 0.4.0

### Minor Changes

- 7ecee1e: ensure .next directory is included

## 0.3.1

### Patch Changes

- reload dependencies when emails are reloaded
- f8114a8: release candidate; needs tests

## 0.3.0

### Minor Changes

- 398c129: mostly working

## 0.2.0

### Minor Changes

- alpha alpha release
