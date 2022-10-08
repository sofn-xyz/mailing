import esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

esbuild.build({
  entryPoints: ["src/index.ts"],
  outdir: "dist/esm",
  bundle: true,
  sourcemap: true,
  minify: true,
  splitting: true,
  format: "esm",
  target: "esnext",
  plugins: [nodeExternalsPlugin()],
});

esbuild.build({
  entryPoints: ["src/index.ts"],
  outdir: "dist/cjs",
  bundle: true,
  sourcemap: true,
  minify: true,
  format: "cjs",
  target: "esnext",
  plugins: [nodeExternalsPlugin()],
});
