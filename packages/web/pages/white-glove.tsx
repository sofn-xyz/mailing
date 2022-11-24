import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import Link from "next/link";
import KeyButton from "../components/ui/KeyButton";

const Home: NextPage = () => {
  return (
    <div className="bg-black">
      <Head>
        <title>White Glove by Mailing – Beautiful emails made for you</title>
        <meta property="og:title" content="White Glove" />
        <meta
          name="description"
          content="No time for beautiful emails? No problem. We’ll make them for you."
        />
        <meta
          name="keywords"
          content="email, email templates, transactional emails, react, javascript, typescript"
        />
        <meta property="og:url" content="https://mailing.run/white-glove" />
        <meta property="og:image" content="https://mailing.run/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mailing" />
        <meta
          name="twitter:image"
          content="https://mailing.run/og-twitter.jpg"
        />
        <meta
          name="twitter:description"
          content="No time for beautiful emails? No problem. We’ll make them for you."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-black text-white">
        <nav className="mx-auto flex items-center justify-between px-8 py-4 border-b border-gray-500">
          <Link href="/">
            <Image
              src="/mailing-icon-white.svg"
              alt="Mailing"
              width={21}
              height={28}
            />
          </Link>
          <KeyButton small href="https://www.typeform.com">
            Get Started →
          </KeyButton>
        </nav>
      </header>
      <main className="px-10 mx-auto container bg-black min-h-screen text-white">
        <h1 className="text-8xl sm:text-9xl lg:text-[160px]">
          No time for
          <div className="font-serif">beautiful emails?</div>
        </h1>
        <h2 className="text-4xl">No problem. We’ll make them for you.</h2>
        <KeyButton href="https://www.typeform.com">Get Started →</KeyButton>
      </main>
      <footer className="bg-black">
        <Image src="/logo.svg" alt="Mailing logo" width={32} height={32} />
      </footer>
    </div>
  );
};

export default Home;
