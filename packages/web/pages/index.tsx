import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <div className="w-full">
        <Head>
          <title>Mailing – Build emails in React, send from anywhere</title>
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
        <main>
          <div className={`${styles.heroContainer} px-6 md:px-12 pt-16 pb-44`}>
            <div className="max-w-screen-xl mx-auto">
              <div className="flex justify-between items-top pb-28">
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
                <a
                  className="hover:bg-yellow text-base leading-none inline-block"
                  href="https://demo.mailing.run"
                >
                  Demo
                </a>
              </div>
              <div className="flex flex-col lg:flex-row justify-between md:items-center">
                <div className="lg:max-w-[540px] text-left md:text-center lg:text-left">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl md:max-w-md text-left md:text-center lg:text-left md:mx-auto">
                    Build emails in React, send from anywhere
                  </h1>
                  <p
                    className="text-2xl leading-snug m-0 pt-4 pb-8 lg:max-w-sm"
                    id={styles.sub}
                  >
                    An open source email development and analytics tool
                  </p>
                  <a
                    className="bg-blue-400 text-black text-xl inline-block leading-none px-8 pt-5 pb-6 rounded-2xl hover:underline mx-auto"
                    href="https://github.com/sofn-xyz/mailing"
                  >
                    Get Started on GitHub
                  </a>
                </div>
                <div className="md:pl-0 mt-10 lg:mt-0 hidden sm:block mx-auto lg:ml-6 lg:mr-0">
                  <Image
                    className="rounded-2xl"
                    width="640"
                    height="427"
                    src="/view-mode@2x.gif"
                    alt="Mailing view modes"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
