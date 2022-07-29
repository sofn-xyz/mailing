#!/usr/bin/env node

// This script can be used for quick cli development without compilation steps.

process.env.MM_DEV = 1;
require("./registerRequireHooks.js").module();
require("./index.ts");
