import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const image = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/pageSnap`;
  const description = "Powered by Mailing";
  return (
    <Html>
      <Head>
        <meta property="og:title" content="Email templates" />
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="email, email templates, transactional emails, react, javascript, typescript"
        />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_VERCEL_URL} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Email templates" />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/fih5ejy.css" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
