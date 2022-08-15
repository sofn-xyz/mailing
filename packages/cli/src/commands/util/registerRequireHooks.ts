export default function registerRequireHooks() {
  if (process.env.MM_DEV) return;

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
}
