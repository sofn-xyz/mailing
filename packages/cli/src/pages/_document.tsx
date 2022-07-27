import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=block"
          rel="stylesheet"
        />
        {/* Special characters in the text field... */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=block&text=%E2%97%8F;&#10003;&subset=latin"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
