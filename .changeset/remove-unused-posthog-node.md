---
"mailing-core": patch
---

Remove the unused `posthog-node` dependency. It was never imported (the CLI's analytics provider uses `node-fetch` directly), and dropping it removes the vulnerable transitive `axios@0.27` (CVE-2023-45857) from the tree.
