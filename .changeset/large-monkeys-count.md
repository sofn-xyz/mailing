---
"mailing": patch
"mailing-core": patch
"web": patch
---

Upgrade posthog-node to 2.2.3 (2.2.1 would always throw a timeout error and caused the preview server to crash, see #407). Calling posthog shutdown is also now wrapped in a try/catch
