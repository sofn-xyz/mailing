#!/usr/bin/env node

// This script can be used for quick cli development without compilation steps.

process.env.MM_DEV = 1;
require("@swc/register")({
  jsc: {
    parser: {
      syntax: "typescript",
      tsx: true,
      decorators: true,
    },
    transform: {
      react: {
        runtime: "automatic",
      },
    },
  },
  module: {
    type: "commonjs",
  },
});
require("./index.ts");
