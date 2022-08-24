# mailing

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

`GET /api/render` takes a template name and props and returns your rendered HTML ready to be sent. Example: [link]

`GET /api/previews` returns the list of previews. Example: [link]

`GET /api/previews/[previewClass]/[previewFunction]` returns the list of previews. Example: [link]


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
