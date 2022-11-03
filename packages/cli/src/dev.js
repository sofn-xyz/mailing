#!/usr/bin/env node

// This script can be used for quick cli development without compilation steps.

// Make stack traces really big!
Error.stackTraceLimit = Infinity;

process.env.MM_DEV = 1;

require("esbuild-register/dist/node").register();
require("./index.ts");
