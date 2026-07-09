// Resolves the major version of the `next` package the current project uses.
// Returns 0 if it can't be determined. Used to decide whether to opt the
// .mailing preview app out of Turbopack (the default bundler on Next >= 16),
// which can't follow some of the app's dynamic requires. See gh#504.
export default function nextMajorVersion(): number {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nextPkg = require(require.resolve("next/package.json", {
      paths: [process.cwd()],
    }));
    return parseInt(String(nextPkg.version).split(".")[0], 10) || 0;
  } catch {
    return 0;
  }
}
