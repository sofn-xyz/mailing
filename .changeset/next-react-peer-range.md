---
"mailing": minor
---

Update peer dependency ranges to the last two major versions of the frameworks mailing supports: `next@^15 || ^16` and `react`/`react-dom@^18 || ^19` (previously `next@^12–14`, `react@^17–18`). This removes peer-dependency warnings for projects on current Next.js and React, which the e2e matrix now exercises.
