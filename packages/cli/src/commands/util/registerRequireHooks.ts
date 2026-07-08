/* eslint-disable @typescript-eslint/no-var-requires */
export default function registerRequireHooks() {
  if (process.env.MM_DEV) return;
  require("esbuild-register/dist/node").register({
    jsx: "automatic",
    target: "node14",
    // Force JSX to transpile. Next.js and Remix scaffold a tsconfig with
    // `jsx: "preserve"`, which esbuild-register reads and passes to esbuild as
    // tsconfigRaw where (on our esbuild version) it wins over the `jsx` option
    // above — leaving raw JSX that Node can't parse ("Unexpected token '<'")
    // when loading email templates. Overriding tsconfigRaw forces the automatic
    // runtime. tsconfig path aliases are resolved separately by esbuild-register,
    // so this does not affect module resolution. See gh#504.
    tsconfigRaw: { compilerOptions: { jsx: "react-jsx" } },
  });
}
