module.exports = {
  eslint: {
    ignoreDuringBuilds: !process.env.MM_DEV,
  },
  typescript: {
    // The generated .mailing app is an email-preview server, not a type-check
    // gate for the user's whole dependency tree. `next build` type-checks any
    // imported node_modules .ts source, so third-party packages that ship
    // broken/modern TypeScript (e.g. iron-session's raw next/index.ts, or a
    // newer @types/node than the resolved compiler can parse) would fail the
    // build. Skip type errors here for end users (kept on for mailing's own dev
    // via MM_DEV), mirroring eslint.ignoreDuringBuilds above. See gh#504.
    ignoreBuildErrors: !process.env.MM_DEV,
  },
};
