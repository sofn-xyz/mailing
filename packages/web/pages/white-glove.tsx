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
        <nav className="mx-auto flex items-center justify-between px-5 py-3 sm:px-8 sm:py-4 border-b border-gray-500 border-dotted">
          <Link href="/">
            <Image
              src="/mailing-icon-white.svg"
              alt="Mailing"
              width={21}
              height={28}
            />
          </Link>
          <span className="text-lg sm:text-2xl font-bold font-serif text-amber-200">
            White Glove
          </span>
          <KeyButton
            target="_blank"
            small
            href="https://www.typeform.com"
            className="hidden lg:inline-block"
          >
            Get Started <span className="font-serif font-bold">→</span>
          </KeyButton>
          <Link
            target="_blank"
            href="https://www.typeform.com"
            className="lg:hidden text-green-200"
          >
            Start <span className="font-serif font-bold">→</span>
          </Link>
        </nav>
      </header>
      <main className="px-5 sm:px-8 md:px-16 mx-auto container bg-black min-h-screen text-white">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[160px] mt-24">
          No time for
          <div className="font-serif font-bold text-green-200">
            beautiful emails?
          </div>
        </h1>
        <h2 className="text-3xl md:text-4xl lg:text-5xl mt-8">
          No problem. We’ll make them for you.
        </h2>
        <div className="flex justify-end mt-16">
          <KeyButton href="https://www.typeform.com">
            Get Started <span className="font-serif font-bold">→</span>
          </KeyButton>
        </div>
      </main>
      <footer className="bg-black">
        <Image src="/logo.svg" alt="Mailing logo" width={32} height={32} />
      </footer>
    </div>
  );
};

export default Home;
