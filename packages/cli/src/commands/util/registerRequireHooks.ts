/* eslint-disable @typescript-eslint/no-var-requires */
export default function registerRequireHooks() {
  if (process.env.MM_ENV === "test" || process.env.MM_ENV === "development")
    return;
  require("esbuild-register/dist/node").register({
    jsx: "automatic",
    target: "node14",
  });
}
