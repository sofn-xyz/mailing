# mailing

## 0.9.14

### Patch Changes

- 054d2569: add processHtml option for minification etc after mjml is converted to html
- Updated dependencies [054d2569]
  - mailing-core@0.9.14

## 0.9.13

### Patch Changes

- 49c9684: Catch errors writing to db in click hook
- Updated dependencies [49c9684]
  - mailing-core@0.9.13

## 0.9.12

### Patch Changes

- 79563b0: Use secureUUID instead of Date.now for intercepts
- Updated dependencies [79563b0]
  - mailing-core@0.9.12

## 0.9.11

### Patch Changes

- (Bump version to 0.9.11)
- Updated dependencies
  - mailing-core@0.9.11

## 0.9.10

### Patch Changes

- a95e941: Use Loading... as the button text on the unsubscribe page
- 4d73bbd: revert page-snap to reduce bundle size
- 302886a: Disable previews by setting an ENV variable: DISABLE_PREVIEWS=1
- 7f6170d: Support email templates with dashes in filename
- Updated dependencies [a95e941]
- Updated dependencies [4d73bbd]
- Updated dependencies [302886a]
  - mailing-core@0.9.10

## 0.9.9

### Patch Changes

- 346fd6bf: Added config object to sendMail route to increase default sizeLimit
- c8cc1ccd: bugfix: allow filenames with -
- 2dc47846: fix hydration error from rendering dates on server
- Updated dependencies [346fd6bf]
- Updated dependencies [c8cc1ccd]
  - mailing-core@0.9.9

## 0.9.8

### Patch Changes

- d870690b: Add new Welcome template to emails.
- Updated dependencies [d870690b]
  - mailing-core@0.9.8

## 0.9.7

### Patch Changes

- c9fafd2: Fix a bug where sendMail did not correctly use anonymousId from mailing config
- 7b57ba0: switch to neutral ui active colors that are unlikely to clash with brand colors in emails
- Updated dependencies [c9fafd2]
- Updated dependencies [7b57ba0]
  - mailing-core@0.9.7

## 0.9.6

### Patch Changes

- 6176419: show subject and preview text in ClientView
- b748ddd: add preview prop for preview/preheader text to BaseLayout
- 164940f: To better help us improve mailing, anonymous analytics now includes the version of mailing and mailing-core that you are using.
- Updated dependencies [6176419]
- Updated dependencies [b748ddd]
- Updated dependencies [164940f]
  - mailing-core@0.9.6

## 0.9.5

### Patch Changes

- b341b96: Upgrade posthog-node to 2.2.3 (2.2.1 would always throw a timeout error and caused the preview server to crash, see #407). Calling posthog shutdown is also now wrapped in a try/catch
- Updated dependencies [b341b96]
  - mailing-core@0.9.5

## 0.9.4

### Patch Changes

- 8579d0f6: fix: svgs were sometimes intercepting clicks
- e155434d: fix: prevent intercept error when from is object
- Updated dependencies [8579d0f6]
- Updated dependencies [e155434d]
  - mailing-core@0.9.4

## 0.9.3

### Patch Changes

- Improves sendMail errors and /api/sendMail. Adds analytics to the dev server.
- Updated dependencies
  - mailing-core@0.9.3

## 0.9.2

### Patch Changes

- /api/render now supports api key authentication if REQUIRE_API_KEY is set in your environment
- Updated dependencies
  - mailing-core@0.9.2

## 0.9.1

### Patch Changes

- 1c2444d: Improvements to the preview send UI
- Updated dependencies [1c2444d]
  - mailing-core@0.9.1

## 0.9.0

### Minor Changes

- add beta Lists, Members, unsubscribe functionality

### Patch Changes

- Updated dependencies
  - mailing-core@0.9.0

## 0.8.19

### Patch Changes

- 217e98d: Fix livereload for M1 macs
- Updated dependencies [217e98d]
  - mailing-core@0.8.19

## 0.8.18

### Patch Changes

- 31e98b3: add support for async preview functions
- Updated dependencies [31e98b3]
  - mailing-core@0.8.18

## 0.8.17

### Patch Changes

- dc02ed3: fix intercept force deliver
- Updated dependencies [dc02ed3]
  - mailing-core@0.8.17

## 0.8.15

### Patch Changes

- e94f966: bugfix for force delivery from intercepts #316
- Updated dependencies [e94f966]
  - mailing-core@0.8.15

## 0.8.14

### Patch Changes

- 22834e4: fix next 13 errors
- e7627ac: remove unused images, fix test file ignores
- Updated dependencies [22834e4]
- Updated dependencies [e7627ac]
  - mailing-core@0.8.14

## 0.8.13

### Patch Changes

- 034af17: switch JSDOM to node-html-parser for 3x faster email text generation
- dd6f635: export-previews lints and halts on error unless --no-lint is passed
- Updated dependencies [034af17]
- Updated dependencies [dd6f635]
  - mailing-core@0.8.13

## 0.8.12

### Patch Changes

- 01631b0: bugfix for crash when adding blank preview file
- Updated dependencies [01631b0]
  - mailing-core@0.8.12

## 0.8.11

### Patch Changes

- a7fcab4: fix bug in linter where mailto and tel would be considered relative urls
- Updated dependencies [a7fcab4]
  - mailing-core@0.8.11

## 0.8.10

### Patch Changes

- f3f7aef: add html linting for relative and localhost images and links
- Updated dependencies [f3f7aef]
  - mailing-core@0.8.10

## 0.8.9

### Patch Changes

- aa0bab5: add lint step for templates
- 0c843d4: fix layout bugs
- Updated dependencies [aa0bab5]
- Updated dependencies [0c843d4]
  - mailing-core@0.8.9

## 0.8.8

### Patch Changes

- 008e5c7: add typing to sendMail return value
- 638a7e8: /api/render now supports POST
- Updated dependencies [008e5c7]
- Updated dependencies [638a7e8]
  - mailing-core@0.8.8

## 0.8.7

### Patch Changes

- 243d4e2: bugfix assert for node 14 compatibility
- Updated dependencies [243d4e2]
  - mailing-core@0.8.7

## 0.8.6

### Patch Changes

- 3214dbb: bugfix for header layout
- Updated dependencies [3214dbb]
  - mailing-core@0.8.6

## 0.8.5

### Patch Changes

- 2d5a1c1: Add sendMail to the mailing cli
- Updated dependencies [2d5a1c1]
  - mailing-core@0.8.5

## 0.8.4

### Patch Changes

- 39262d1: bump nodemailer, typescript
- add feature for force delivering an intercepted email
- Updated dependencies [39262d1]
- Updated dependencies
  - mailing-core@0.8.4

## 0.8.3

### Patch Changes

- 815ae3d: bugfix for issues with changing preview names #237
- Updated dependencies [815ae3d]
  - mailing-core@0.8.3

## 0.8.2

### Patch Changes

- 689cada: Now you can deploy your mailing project to production by running `mailing deploy`. Also fixes a setting for darkmode
- Updated dependencies [689cada]
  - mailing-core@0.8.2

## 0.8.1

### Patch Changes

- d665b9c: bugfix for mailing server build
- Updated dependencies [d665b9c]
  - mailing-core@0.8.1

## 0.8.0

### Minor Changes

- 6e8ac93: New Immersion UI

  - Navigate through template quickly
  - See what preview text might look like in an email client
  - New default templates set a better example for making focused templates vs catch-alls like the deprecated TextEmail
  - Command+"." hotkey for chrome-less viewing

### Patch Changes

- Updated dependencies [6e8ac93]
  - mailing-core@0.8.0

## 0.7.9

### Patch Changes

- fix minification deprecation warnings
- Updated dependencies
  - mailing-core@0.7.9

## 0.7.8

### Patch Changes

- 2e11ee8: Add minify option to export-previews command
- Updated dependencies [2e11ee8]
  - mailing-core@0.7.8

## 0.7.7

### Patch Changes

- set configPath error to debug
- Updated dependencies
  - mailing-core@0.7.7

## 0.7.6

### Patch Changes

- 9003bed: Don't look for npm root modules, use posix paths always
- Updated dependencies [9003bed]
  - mailing-core@0.7.6

## 0.7.5

### Patch Changes

- 65cfe73: Fix #163 by updating the "externals" option passed to esbuild to include more possible node_modules directories.

## 0.7.4

### Patch Changes

- 6c0a488: improve livereload performance and reliability
- 8b980fc: Introduce anonymous telemetry to help us prioritize development
- Updated dependencies [6c0a488]
- Updated dependencies [8b980fc]
  - mailing-core@0.7.4

## 0.7.3

### Patch Changes

- 2b666f0: switch fs.watch to chokidar.watch
- Updated dependencies [2b666f0]
  - mailing-core@0.7.3

## 0.7.2

### Patch Changes

- c87cc5b: remove an additional / from api route (fix #158)
- 3e324e8: - Introduce esbuild for bundling templates to put in .mailing. Previously, we copied the templates, but bundling greatly improves the ability to include modules and resolve paths.
  - Build a feManifest.js that lets the frontend app get the user’s config settings
  - Update tsconfigs to support above changes
  - Fix a bad bug where moduleManifest.js always set templates to `{}` because the function invoked by `filter` had no return value.
- Updated dependencies [c87cc5b]
- Updated dependencies [3e324e8]
  - mailing-core@0.7.2

## 0.7.1

### Patch Changes

- b87a2ed: bugfix: only treat jsx and tsx files as templates; see #141
- Updated dependencies [b87a2ed]
  - mailing-core@0.7.1

## 0.7.0

# New Architecture: Remote Control Next App

In Mailing v0.7 we’re making an update to the module architecture that allows us to add a lot of features we’ve been wanting. The new architecture unlocks the ability to deploy your mailing app to a public web address with a simple `git push`. This is the single biggest update to `mailing` since its inception and we’re incredibly excited by the possibilities it unlocks.

### Introducing .mailing

The `.mailing` directory now contains a vanilla Next.js app with all of the preview UI you see when you use mailing. It lives in the root of your project. When you edit templates and previews in your emails directory, these get synced into the .mailing app and reload live. In development, `mailing` runs the Next.js app in dev mode and syncs in changes to your emails.

_Caution: Please add .mailing to your .gitignore. Users should never edit .mailing directly. As framework authors we want to be able to improve mailing and ship big improvements without breaking user code. When the mailing CLI is run, it makes sure that the files in `.mailing` are up to date by ensuring the package.json version of your current install matches the version of mailing in your node_modules. If it doesn’t match, we update the `.mailing` install before booting the app._

### Deployment: server CLI commands

Just like any other next app, `.mailing` can be bundled for production and hosted in serverful or serverless environments. You can deploy to any host that can run a Next.js app.

`npx mailing server build` builds the next app in `.mailing`

`npx mailing server start` starts the next app built in `.mailing/.next`

`npx mailing server` builds and starts it

### New APIs

We’ve heard from several users that you’d like to be able to use mailing’s fun email development environment from projects that are not written in JavaScript or TypeScript. Other users want to include their emails as a dedicated package in a monorepo.

`GET /api/render` takes a template name and props and returns your rendered HTML ready to be sent. [Example](https://demo.mailing.run/api/render?templateName=Welcome.tsx&props=%7B%22name%22%3A%22peter%22%7D)

`GET /api/previews` returns the list of previews. [Example](https://demo.mailing.run/api/previews)

`GET /api/previews/[previewClass]/[previewFunction]` returns the rendered preview. [Example](https://demo.mailing.run/api/previews)

### On shoulders of giants

This would not be possible without the work of the Next.js team. We’re incredibly grateful for the carefully crafted open source framework they’ve put together and are excited to extend its capability even further with mailing.

### What’s next?

- Get feedback, squash bugs, polish
- Password protection for your previews and APIs
- `/api/send` will take template name, props, and sendMail options to actually send email (but we need password protection to keep spammers away)

### Minor Changes

- 5603613: - Introduces .mailing, remote control next app architecture
  - Adds `GET /api/render`
  - Adds `npx mailing server`, `npx mailing server build`, `npx mailing server start`

### Patch Changes

- Updated dependencies [5603613]
  - mailing-core@0.7.0

## 0.6.10

### Patch Changes

- 329e5bf: Removes some logging and updates dependencies
- Updated dependencies [329e5bf]
  - mailing-core@0.6.10

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

- 7abe072: fix broken images
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

## 0.5.2

### Patch Changes

- fix generated files in build

## 0.5.1

### Patch Changes

- d108bfa: improve error logging in case mailing port is taken

## 0.5.0

### Minor Changes

- 3fcf28c: js support

### Patch Changes

- 213e254: js support
- 6b969f7: font-display block
- afefbc2: js support
- b940924: display block font-display
- 44c6177: merge main with react17 support

## 0.5.0-next.5

### Patch Changes

- font-display block

## 0.5.0-next.4

### Patch Changes

- display block font-display

## 0.5.0-next.3

### Patch Changes

- merge main with react17 support

## 0.5.0-next.2

### Patch Changes

- js support

## 0.5.0-next.2

### Minor Changes

- js support

## 0.4.11-next.0

### Patch Changes

- js support

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
