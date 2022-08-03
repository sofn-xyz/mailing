#!/usr/bin/env node

// This script can be used for quick cli development without compilation steps.

process.env.MM_DEV = 1;
require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    jsx: "react-jsx",
    moduleResolution: "node",
    skipLibCheck: true,
  },
});

require("@babel/register")({
  presets: [
    [
      "@babel/react",
      {
        runtime: "automatic",
      },
    ],
    "@babel/preset-env",
  ],
  compact: false,
});
require("./index.ts");
