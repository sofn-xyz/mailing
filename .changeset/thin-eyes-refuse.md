---
"mailing": patch
"mailing-core": patch
"web": patch
---

- Introduce esbuild for bundling templates to put in .mailing. Previously, we copied the templates, but bundling greatly improves the ability to include modules and resolve paths.
- Build a feManifest.js that lets the frontend app get the user’s config settings
- Update tsconfigs to support above changes
- Fix a bad bug where moduleManifest.js always set templates to `{}` because the function invoked by `filter` had no return value.
