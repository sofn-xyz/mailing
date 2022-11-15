import theme from "shiki/themes/nord.json" assert { type: "json" };
import { remarkCodeHike } from "@code-hike/mdx";
import gfm from "remark-gfm";
import nextMDX from "@next/mdx";

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [[remarkCodeHike, { theme, showCopyButton: true }], gfm],
    rehypePlugins: [],
    // use @mdx-js/react so we can style mdx components
    // see: https://nextjs.org/docs/advanced-features/using-mdx
    providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Append the default value with md extensions
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

export default withMDX(nextConfig);
