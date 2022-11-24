import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import cx from "classnames";

import KeyButton from "../components/ui/KeyButton";
import H2 from "../components/white-glove/H2";
import Subheading from "../components/white-glove/Subheading";

const Arrow = () => <span className="font-serif font-bold">→</span>;

const WhiteGlove: NextPage = () => {
  const [hideHeaderRef, hideHeaderRefInView] = useInView();

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
      <header
        className={cx(
          "sticky bg-black text-white top-0 z-10 transition-all duration-1000",
          {
            "-top-full": hideHeaderRefInView,
          }
        )}
      >
        <nav className="mx-auto flex items-center justify-between px-5 py-3 sm:px-8 sm:py-4 border-b border-gray-500 border-dotted">
          <Link href="/">
            <Image
              src="/mailing-icon-white.svg"
              alt="Mailing"
              width={21}
              height={28}
            />
          </Link>
          <span className="text-lg sm:text-[44px] font-bold font-serif leading-snug text-amber-200 relative -top-1">
            White Glove
          </span>
          <KeyButton
            target="_blank"
            small
            href="https://www.typeform.com"
            className="hidden lg:inline-block"
          >
            Get Started&nbsp;&nbsp;
            <Arrow />
          </KeyButton>
          <Link
            target="_blank"
            href="https://www.typeform.com"
            className="lg:hidden text-green-200"
          >
            Start&nbsp;&nbsp;
            <Arrow />
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
        <div className="text-3xl md:text-4xl lg:text-5xl mt-8 sm:mt-12">
          No problem, we’ll make them for you.
        </div>
        <div className="flex justify-end mt-16">
          <KeyButton href="https://www.typeform.com">
            Get Started&nbsp;&nbsp;
            <Arrow />
          </KeyButton>
        </div>
        <H2>How it works</H2>
        <H2>Examples</H2>
        <Subheading>
          White Glove templates are responsive and compatible across major email
          clients.
        </Subheading>
        <H2>Pricing</H2>
        <Subheading>
          Pricing includes design and development and is discounted for launch –
          while supplies last.
        </Subheading>
        <div className="text-center">
          <H2>Limited time</H2>
          <Subheading className="mx-auto">
            White Glove is the easiest way to get custom, quality email
            templates. But don’t delay – it’s only available for a limited time.
          </Subheading>
          <KeyButton href="https://www.typeform.com" className="mt-20">
            Get Started&nbsp;&nbsp;
            <Arrow />
          </KeyButton>
        </div>
      </main>
      <footer
        className="bg-black flex justify-center py-40"
        ref={hideHeaderRef}
      >
        <Link href="/">
          <Image
            src="/mailing-icon-white.svg"
            alt="Mailing"
            width={21}
            height={28}
          />
        </Link>{" "}
      </footer>
    </div>
  );
};

export default WhiteGlove;
