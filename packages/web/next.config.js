/** @type {import('next').NextConfig} */

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // use @mdx-js/react so we can style mdx components
    // see: https://nextjs.org/docs/advanced-features/using-mdx
    providerImportSource: "@mdx-js/react",
  },
});

module.exports = withMDX({
  reactStrictMode: true,
  swcMinify: true,
  // Append the default value with md extensions
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
});
