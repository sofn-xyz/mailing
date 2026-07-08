---
"mailing-core": patch
"mailing": patch
---

Make the generated `.mailing` preview build resilient to upstream toolchain drift.

- The render helpers (`mailing-core` and `mailing`) now assert the awaited (unwrapped) return type of `mjml2html`. `@types/mjml` pulls `@types/mjml-core` via a `*` range, which now resolves to v5 where `mjml2html` is typed as async (`Promise<MJMLParseResults>`); since mailing pins `mjml@^4` (synchronous at runtime), the mismatched types broke `next build` type-checking. The assertion is a no-op when the resolved types are already synchronous.
- `next build` of the `.mailing` app type-checks any imported `node_modules` `.ts` source, so third-party packages that ship broken or too-modern TypeScript (e.g. `iron-session`'s raw `next/index.ts`, or a newer `@types/node` than the resolved compiler can parse) failed the build. Type errors are now ignored for end users during that build (kept on for mailing's own dev via `MM_DEV`), mirroring the existing `eslint.ignoreDuringBuilds`.
- `export-previews` failed with `SyntaxError: Unexpected token '<'` in projects whose tsconfig sets `jsx: "preserve"` (e.g. Next.js and Remix scaffolds): esbuild-register passed that through and left JSX untranspiled when loading email templates. The require hook now overrides `tsconfigRaw` to force the automatic JSX runtime.
- Loading previews failed with `ReferenceError: require is not defined` in ESM projects (`"type": "module"`, e.g. Remix's JavaScript template): esbuild-register's CommonJS require-hook rewrote `.js` files to `require(...)`, which throws once Node executes them as ESM. In ESM projects the hook now only handles `.ts`/`.tsx`/`.jsx` and leaves `.js` to Node.
- Building the `.mailing` app failed under Next 16, which defaults `next build` to Turbopack — its static analysis can't follow the preview app's dynamic requires (e.g. the generated Prisma client), causing `EBADF`/NFT errors. The build now passes `--webpack` on Next >= 15 (older Next builds with webpack by default).
