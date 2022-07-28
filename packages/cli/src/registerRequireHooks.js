exports.module = function registerRequireHooks() {
  require("ts-node").register({
    compilerOptions: {
      module: "commonjs",
      jsx: "react",
      moduleResolution: "node",
      skipLibCheck: true,
    },
  });

  require("@babel/register")({
    presets: ["@babel/react", "@babel/preset-env"],
  });
};
