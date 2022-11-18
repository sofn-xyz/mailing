import type { AppProps } from "next/app";
import { MDXProvider } from "@mdx-js/react";
import { Analytics } from "@vercel/analytics/react";
import { useRouter } from "next/router";

import MDXComponents from "../components/mdx/MDXComponents";
import DocsLayout from "../components/docs/DocsLayout";
import BlogLayout from "../components/BlogLayout";
import DefaultLayout from "../components/DefaultLayout";

import { Fira_Code as Mono } from "@next/font/google";

const mono = Mono({
  weight: "400",
  variable: "--font-mono",
});

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
      <span className={`${mono.variable} font-sans`}>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </span>
    </MDXProvider>
  );
}

export default MyApp;
