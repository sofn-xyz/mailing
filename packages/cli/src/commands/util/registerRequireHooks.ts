export default function registerRequireHooks() {
  if (process.env.MM_DEV) return;
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
}
