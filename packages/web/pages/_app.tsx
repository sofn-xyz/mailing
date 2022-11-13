import type { AppProps } from "next/app";
import { MDXProvider } from "@mdx-js/react";
import { Analytics } from "@vercel/analytics/react";
import { useRouter } from "next/router";

import MDXComponents from "../components/MDXComponents";
import DocsLayout from "../components/DocsLayout";
import BlogLayout from "../components/BlogLayout";
import DefaultLayout from "../components/DefaultLayout";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  // Determine if we're rendering /docs or /blog
  const router = useRouter();
  const isDocs = router.pathname.startsWith("/docs");
  const isBlog = router.pathname.startsWith("/blog");

  let Layout = DefaultLayout;
  if (isDocs) {
    Layout = DocsLayout;
  } else if (isBlog) {
    Layout = BlogLayout;
  }

  return (
    <MDXProvider components={MDXComponents}>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </MDXProvider>
  );
}

export default MyApp;
