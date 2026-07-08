---
"mailing-core": patch
"mailing": patch
---

Make the generated `.mailing` preview build resilient to upstream toolchain drift.

- The render helpers (`mailing-core` and `mailing`) now assert the awaited (unwrapped) return type of `mjml2html`. `@types/mjml` pulls `@types/mjml-core` via a `*` range, which now resolves to v5 where `mjml2html` is typed as async (`Promise<MJMLParseResults>`); since mailing pins `mjml@^4` (synchronous at runtime), the mismatched types broke `next build` type-checking. The assertion is a no-op when the resolved types are already synchronous.
- `next build` of the `.mailing` app type-checks any imported `node_modules` `.ts` source, so third-party packages that ship broken or too-modern TypeScript (e.g. `iron-session`'s raw `next/index.ts`, or a newer `@types/node` than the resolved compiler can parse) failed the build. Type errors are now ignored for end users during that build (kept on for mailing's own dev via `MM_DEV`), mirroring the existing `eslint.ignoreDuringBuilds`.
