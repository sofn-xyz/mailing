import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import cx from "classnames";
import { useInView } from "react-intersection-observer";

import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [reloadImageRef, reloadImageInView] = useInView();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  });

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
              <div className="flex justify-between items-top pb-32">
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
                <div>
                  <a
                    className="hover:bg-yellow text-base leading-none inline-block"
                    href="https://demo.mailing.run"
                  >
                    Demo
                  </a>
                  <a
                    className="text-black  leading-none ml-4 px-4 h-9 inline-flex items-center rounded-2xl border-2 border-black hover:underline"
                    href="https://github.com/sofn-xyz/mailing"
                    target="blank"
                  >
                    Get Started
                  </a>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row justify-between md:items-center pt-6 pb-12">
                <div className="lg:max-w-[540px] text-left md:text-center lg:text-left">
                  <h1
                    id={styles.headline}
                    className="text-5xl md:text-6xl max-w-lg md:max-w-2xl text-left md:text-center lg:text-left md:mx-auto"
                  >
                    Build emails in React, send from anywhere
                  </h1>
                  <p
                    className="text-2xl leading-snug m-0 pt-4 pb-8 mx-0 md:mx-auto lg:mx-0 max-w-sm md:max-w-xl lg:max-w-sm"
                    id={styles.sub}
                  >
                    An open source email development and analytics tool
                  </p>
                  <div id={styles.cta}>
                    <a
                      className="bg-blue-400 text-black text-xl leading-none px-8 h-16 inline-flex items-center rounded-2xl hover:underline mx-auto"
                      href="https://github.com/sofn-xyz/mailing"
                      target="blank"
                    >
                      Get Started on GitHub
                    </a>
                  </div>
                </div>
                <div
                  className="hidden md:block mt-10 lg:mt-0 sm:mx-0 md:mx-auto lg:ml-6 lg:mr-0"
                  id={styles.img}
                >
                  <Image
                    className="rounded-2xl"
                    width="640"
                    height="427"
                    src="/view-mode-slow@2x.gif"
                    alt="Mailing view modes"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 md:px-12 pt-16 sm:pt-32 pb-16 sm:pb-32">
            <h2 className="text-left sm:text-center text-4xl sm:text-5xl mb-8 sm:mb-16">
              Kind words from the internet
            </h2>
            <div className="max-w-[1032px] mx-auto flex flex-row flex-wrap items-stretch justify-items-stretch">
              <div className="md:basis-1/2 grow pb-3 sm:pb-6">
                <div className="border border-black border-dotted rounded-2xl md:mr-3 p-8 h-full">
                  <div className="flex justify-between items-center">
                    <div className="flex justify-between items-top">
                      <Image
                        width="48"
                        height="48"
                        src="/testimonial-gr@2x.png"
                        alt="Guillermo Rauch"
                      />
                      <div className="ml-3 inline-block place-content-center">
                        <div className="pt-1 -mb-2">Guillermo Rauch</div>
                        <a
                          className="text-xs leading-none hover:underline"
                          href="https://twitter.com/rauchg"
                          target="blank"
                        >
                          @rauchg
                        </a>
                      </div>
                    </div>
                    <a
                      href="https://twitter.com/rauchg/status/1556013344082894848"
                      target="blank"
                    >
                      <Image
                        width="20"
                        height="20"
                        src="/icon-twitter.svg"
                        alt="Twitter icon"
                      />
                    </a>
                  </div>
                  <p className="leading-snug mt-4">
                    This is sublime. Action Mailer-inspired, @nextjs compatible
                    email system. Send emails built with @reactjs components.
                    <br />
                    <br />
                    https://mailing.run
                  </p>
                </div>
              </div>
              <div className="md:basis-1/2 grow pb-3 sm:pb-6">
                <div className="border border-black border-dotted rounded-2xl md:ml-3 p-8 h-full">
                  <div className="flex justify-between items-center">
                    <div className="flex justify-between items-top">
                      <Image
                        width="48"
                        height="48"
                        src="/testimonial-cv@2x.png"
                        alt="Cymen Vig"
                      />
                      <div className="ml-3 inline-block place-content-center">
                        <div className="pt-1 -mb-2">Cymen Vig</div>
                        <a
                          className="text-xs leading-none hover:underline"
                          href="https://github.com/cymen"
                          target="blank"
                        >
                          @cymen
                        </a>
                      </div>
                    </div>
                    <a
                      href="https://github.com/sofn-xyz/mailing/issues/89#issuecomment-1206689044"
                      target="blank"
                    >
                      <Image
                        width="20"
                        height="20"
                        src="/icon-gh@2x.png"
                        alt="GitHub icon"
                      />
                    </a>
                  </div>
                  <p className="leading-snug mt-4">
                    Really happy to find mailing – thank you for sharing it. I
                    was already using MJML but it didn’t fit well in my
                    workflow. I’m excited to be able to use all of that and have
                    the excellent preview capabilities of mailing!
                  </p>
                </div>
              </div>
              <div className="md:basis-1/2 grow pb-3 sm:pb-6">
                <div className="border border-black border-dotted rounded-2xl md:mr-3 p-8 h-full">
                  <div className="flex justify-between items-center">
                    <div className="flex justify-between items-top">
                      <Image
                        width="48"
                        height="48"
                        src="/testimonial-email@2x.png"
                        alt="Email icon"
                      />
                      <div className="ml-3 inline-block place-content-center">
                        <div className="pt-1 -mb-2">Johan</div>
                        <span className="text-xs leading-none ">via email</span>
                      </div>
                    </div>
                  </div>
                  <p className="leading-snug mt-4">
                    Again, thanks for the beautiful development experience
                    mailing brings.
                  </p>
                </div>
              </div>
              <div className="md:basis-1/2 grow pb-3 sm:pb-6">
                <div className="border border-black border-dotted rounded-2xl md:ml-3 p-8 h-full">
                  <div className="flex justify-between items-center">
                    <div className="flex justify-between items-top">
                      <Image
                        width="48"
                        height="48"
                        src="/testimonial-wv@2x.png"
                        alt="Will Viles"
                      />
                      <div className="ml-3 inline-block place-content-center">
                        <div className="pt-1 -mb-2">Will Viles</div>
                        <a
                          className="text-xs leading-none hover:underline"
                          href="https://github.com/willviles"
                          target="blank"
                        >
                          @willviles
                        </a>
                      </div>
                    </div>
                    <a
                      href="https://github.com/sofn-xyz/mailing/issues/163#issuecomment-1241643724"
                      target="blank"
                    >
                      <Image
                        width="20"
                        height="20"
                        src="/icon-gh@2x.png"
                        alt="GitHub icon"
                      />
                    </a>
                  </div>
                  <p className="leading-snug mt-4">
                    Wow, you guys are fast! Thank you{" "}
                    <a
                      href="https:://github.com/alexfarril"
                      target="blank"
                      className="hover:underline"
                    >
                      @alexfarrill
                    </a>{" "}
                    <a
                      href="https://github.com/psugihara"
                      target="blank"
                      className="hover:underline"
                    >
                      @psugihara
                    </a>{" "}
                    for such a speedy fix 👍
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-blue-300 py-24 md:py-44">
            <div className="px-6 md:px-12">
              <div className="max-w-screen-xl mx-auto">
                <h1 className="text-5xl md:text-6xl md:mx-auto lg:mx-0 max-w-lg md:max-w-3xl text-left md:text-center lg:text-left lg:mb-24">
                  A modern stack for rapid email development
                </h1>
                <div className="flex flex-col-reverse lg:flex-row justify-between md:items-center">
                  <div className="flex flex-row flex-wrap items-stretch justify-items-stretch lg:max-w-[500px]">
                    <div className="md:basis-1/2 grow mx-0 md:w-full lg:basis-full md:pr-4 lg:px-0 md:mx-auto lg:mx-0 text-left lg:text-left pb-8 md:pb-12">
                      <p
                        className="text-xl md:text-2xl leading-snug m-0 pb-2 mx-0 md:mx-auto lg:mx-0 max-w-sm md:max-w-xl lg:max-w-sm"
                        id={styles.sub}
                      >
                        ●&nbsp;&nbsp;Templates in your codebase
                      </p>
                      <p className="leading-snug">
                        Mailing installs in your node app so it’s easy to import
                        your existing styles. And, you’ll save a ton of
                        development time with the preview server and live
                        reload.
                      </p>
                    </div>
                    <div className="md:basis-1/2 grow mx-0 md:w-full lg:basis-full md:pl-4 lg:px-0 md:mx-auto lg:mx-0 text-left lg:text-left pb-8 md:pb-12">
                      <p
                        className="text-xl md:text-2xl leading-snug m-0 pb-2 mx-0 md:mx-auto lg:mx-0 max-w-sm md:max-w-xl lg:max-w-sm"
                        id={styles.sub}
                      >
                        ●&nbsp;&nbsp;Super fast development
                      </p>
                      <p className="leading-snug">
                        Mailing’s built on Next. You can use it as a library to
                        send emails directly from JS frameworks (Next.js,
                        RedwoodJS, Remix). There’s also a REST API so you can
                        use your templates from any stack.
                      </p>
                    </div>
                    <div className="md:basis-1/2 grow mx-0 md:w-full lg:basis-full md:pr-4 lg:px-0 md:mx-auto lg:mx-0 text-left lg:text-left pb-8 md:pb-12">
                      <p
                        className="text-xl md:text-2xl leading-snug m-0 pb-2 mx-0 md:mx-auto lg:mx-0 max-w-sm md:max-w-xl lg:max-w-sm"
                        id={styles.sub}
                      >
                        ●&nbsp;&nbsp;Highly compatible emails
                      </p>
                      <p className="leading-snug">
                        Mailing combines the flexibility of React with the
                        efficiency of{" "}
                        <a href="http://mjml.io" target="blank">
                          MJML
                        </a>
                        , so that it’s actually easy to make emails that look
                        good across clients.
                      </p>
                    </div>
                    <div className="md:basis-1/2 grow mx-0 md:w-full lg:basis-full md:pl-4 lg:px-0 md:mx-auto lg:mx-0 text-left lg:text-left pb-8 md:pb-12">
                      <p
                        className="text-xl md:text-2xl leading-snug m-0 pb-2 mx-0 md:mx-auto lg:mx-0 max-w-sm md:max-w-xl lg:max-w-sm"
                        id={styles.sub}
                      >
                        ●&nbsp;&nbsp;Serverless self-hosting
                      </p>
                      <p className="leading-snug">
                        Deploy the mailing preview server to share links with
                        your team and clients. Easy self-hosting means that
                        you’ll always have access and ownership of your precious
                        data.
                      </p>
                    </div>
                  </div>
                  <div
                    ref={reloadImageRef}
                    className={cx(
                      "mt-12 md:mt-20 lg:mt-0 sm:mx-0 md:mx-auto mb-11 sm:mb-16 lg:ml-8 lg:mr-0 transition-opacity duration-500",
                      {
                        "opacity-0": mounted && !reloadImageInView,
                        "opacity-1": reloadImageInView,
                      }
                    )}
                  >
                    <Image
                      width="640"
                      height="360"
                      src="/live-reload-alt@2x.gif"
                      alt="Mailing live reload"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 md:px-12 py-24 md:py-44">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col lg:flex-row justify-between md:items-center">
                <div className="mt-10 lg:mt-0 sm:mx-0 md:mx-auto lg:mr-28 lg:ml-0">
                  <Image
                    width="400"
                    height="387"
                    src="/opensource@2x.png"
                    alt="Mailing open source"
                  />
                </div>
                <div className="max-w-xl text-left md:text-center lg:text-left">
                  <h1 className="text-5xl md:text-6xl mt-8 lg:mt-0 max-w-sm md:max-w-lg text-left md:text-center lg:text-left md:mx-auto">
                    Transparent & open source
                  </h1>
                  <p className="leading-snug m-0 py-8 md:py-10 mx-0 md:mx-auto lg:mx-0 md:max-w-[470px]">
                    Mailing is an open source email development and analytics
                    tool. Our source code is public on GitHub so anyone can read
                    and review it. We want it to outlast us and enthusiastically
                    welcome feedback and contributions from the community.
                  </p>
                  <a
                    className="text-black leading-none px-4 h-9 inline-flex items-center rounded-2xl border-2 border-black hover:underline"
                    href="https://github.com/sofn-xyz/mailing"
                    target="blank"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer>
          <div className="bg-neutral-900 py-6 text-center">
            <Image
              width="25.6"
              height="32"
              src="/mailing-icon-white.svg"
              alt="Mailing icon"
            />
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
