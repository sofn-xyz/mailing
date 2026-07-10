/* eslint-disable @typescript-eslint/no-var-requires */
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

// Whether the current project is an ES module package ("type": "module" in
// package.json, as scaffolded by e.g. Remix). In that case Node loads `.js`
// files as ESM itself.
function isEsmProject(): boolean {
  try {
    const pkgPath = resolve(process.cwd(), "package.json");
    if (!existsSync(pkgPath)) return false;
    return JSON.parse(readFileSync(pkgPath, "utf8")).type === "module";
  } catch {
    return false;
  }
}

export default function registerRequireHooks() {
  if (process.env.MM_DEV) return;

  const options: Record<string, unknown> = {
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
  };

  // In ESM projects Node loads `.js` files as ESM on its own. Routing them
  // through esbuild-register's CommonJS require-hook rewrites them to
  // `require(...)`, which then throws "require is not defined" once Node runs
  // the transpiled output as ESM. Only hook the extensions Node can't load
  // natively (`.ts`/`.tsx`/`.jsx`) and leave `.js`/`.mjs`/`.cjs` to Node. See gh#504.
  if (isEsmProject()) {
    options.extensions = [".ts", ".tsx", ".jsx"];
  }

  require("esbuild-register/dist/node").register(options);
}
