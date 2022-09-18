import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <div className={`${styles.pageContainer} w-full`}>
        <Head>
          <title>Mailing – Build + test + send emails with React</title>
          <meta property="og:title" content="Mailing" />
          <meta
            name="description"
            content="Build + test + send emails with React"
          />
          <meta
            name="keywords"
            content="email, email templates, transactional emails, react, javascript, typescript"
          />
          <meta property="og:url" content="https://mailing.run" />
          <meta
            property="og:image"
            content="https://mailing.run/og-image.jpg"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Mailing" />
          <meta
            name="twitter:image"
            content="https://mailing.run/og-twitter.jpg"
          />
          <meta
            name="twitter:description"
            content="Build + test + send emails with React"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div
          className={`${styles.bodyContainer} flex justify-start sm:justify-center pt-16 pb-44`}
        >
          <div className="px-6 sm:mx-8">
            <header className="flex justify-between items-top pb-28">
              <div className="brand">
                <span className="hidden sm:block">
                  <Image
                    width="146"
                    height="32"
                    src="/mailing-logo.svg"
                    alt="Mailing logo"
                  />
                </span>
                <span className="sm:hidden">
                  <Image
                    width="25.6"
                    height="32"
                    src="/mailing-icon.svg"
                    alt="Mailing icon"
                  />
                </span>
              </div>
              <nav>
                <a
                  className="hover:bg-yellow text-base leading-none inline-block"
                  href="https://demo.mailing.run"
                >
                  Demo
                </a>
              </nav>
            </header>
            <main className={styles.main}>
              <div className="grid grid-flow-col auto-cols-max">
                <div className="max-w-[440px]">
                  <h1 className="text-4xl sm:text-6xl pt-3">
                    Build emails in React, send from anywhere
                  </h1>
                  <p
                    className="text-2xl leading-snug m-0 pt-4 pb-8 max-w-sm"
                    id={styles.sub}
                  >
                    An open source email development and analytics tool
                  </p>
                  <a
                    className="bg-blue-400 text-black text-xl leading-none px-8 pt-5 pb-6 block rounded-2xl hover:underline absolute sm:static w-100 sm:w-fit right-[24px] bottom-[32px] left-[24px] text-center"
                    href="https://github.com/sofn-xyz/mailing"
                  >
                    Get Started on GitHub
                  </a>
                </div>
                <div className="pl-36">
                  <Image
                    className="rounded-2xl"
                    width="640"
                    height="427"
                    src="/view-mode@2x.gif"
                    alt="Mailing view modes"
                  />
                </div>
              </div>
            </main>
            <footer></footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
