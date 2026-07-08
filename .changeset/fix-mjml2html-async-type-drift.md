---
"mailing-core": patch
"mailing": patch
---

Fix a build break against current `mjml` typings. `@types/mjml` pulls `@types/mjml-core` via a `*` range, which now resolves to v5 where `mjml2html` is typed as async (`Promise<MJMLParseResults>`). Because mailing pins `mjml@^4` (synchronous at runtime), the mismatched types caused `next build` of the generated `.mailing` app to fail type-checking. The render helpers now assert the awaited (unwrapped) return type — a no-op when the resolved types are already synchronous — so builds succeed regardless of which `@types/mjml-core` version resolves.
