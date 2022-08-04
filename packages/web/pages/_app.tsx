import type { AppProps } from 'next/app'
import { MDXProvider } from "@mdx-js/react";

import "../styles/globals.css";
import MDXComponents from "../components/MDXComponents";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={MDXComponents}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp;
