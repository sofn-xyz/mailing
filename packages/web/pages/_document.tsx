import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html data-theme="dark">
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/qqd8jtb.css" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
