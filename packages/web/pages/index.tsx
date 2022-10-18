import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import cx from "classnames";
import { useInView } from "react-intersection-observer";

import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

const IN_VIEW_OPTIONS = {
  threshold: 0.5,
  triggerOnce: true,
  fallbackInView: true,
};

const Home: NextPage = () => {
  const [osImageRef, osImageInView] = useInView(IN_VIEW_OPTIONS);
  const [localhostImageRef, localhostImageInView] = useInView(IN_VIEW_OPTIONS);
  const [reloadImageRef, reloadImageInView] = useInView(IN_VIEW_OPTIONS);
  const [testimonialsRef, testimonialsInView] = useInView({
    ...IN_VIEW_OPTIONS,
    threshold: 0.2,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="w-full dark:text-white">
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
          <div
            className={`${styles.heroContainer} bg-[url('/index-bg@2x.jpg')] dark:bg-[url('/hero-bg_dark@2x.jpg')] px-6 md:px-12 pt-16 pb-44`}
          >
            <div className="max-w-screen-xl mx-auto">
              <div className="flex justify-between items-top pb-32">
                <div className="brand">
                  <span className="hidden sm:block">
                    <Image
                      width="146"
                      height="32"
                      src="/mailing-logo.svg"
                      alt="Mailing logo"
                      className="dark:invert"
                    />
                  </span>
                  <span className="sm:hidden">
                    <Image
                      width="25.6"
                      height="32"
                      src="/mailing-icon.svg"
                      alt="Mailing icon"
                      className="dark:invert"
                    />
                  </span>
                </div>
                <div>
                  <a
                    className="hover:underline mr-4 text-base leading-none inline-block"
                    href="https://discord.gg/fdSzmY46wY"
                    target="blank"
                  >
                    Discord
                  </a>
                  <a
                    className="hover:underline text-base leading-none inline-block"
                    href="https://demo.mailing.run"
                  >
                    Demo
                  </a>
                  <a
                    className="text-black dark:text-white leading-none ml-4 px-4 h-9 inline-flex items-center rounded-2xl border-2 border-black dark:border-white hover:underline"
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
                    className="text-2xl leading-snug m-0 pt-4 pb-8 mx-0 md:mx-auto lg:mx-0"
                    id={styles.sub}
                  >
                    An open source email development tool
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
                  className="relative hidden md:block mt-10 lg:mt-0 sm:mx-0 md:mx-auto lg:ml-6 lg:mr-0"
                  id={styles.img}
                >
                  <Image
                    className="rounded-2xl"
                    width="640"
                    height="427"
                    src="/view-mode-01@2x.jpg"
                    alt="Mailing view mode desktop"
                  />
                  <div className={`${styles.img1} absolute top-0`}>
                    <Image
                      className="rounded-2xl"
                      width="640"
                      height="427"
                      src="/view-mode-02@2x.jpg"
                      alt="Mailing view mode mobile"
                    />
                  </div>
                  <div className={`${styles.img2} absolute top-0`}>
                    <Image
                      className="rounded-2xl"
                      width="640"
                      height="427"
                      src="/view-mode-03@2x.jpg"
                      alt="Mailing view mode HTML"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-24 md:py-44  dark:bg-neutral-900 -mt-px">
            <div className="px-6 md:px-12">
              <div className="max-w-screen-xl mx-auto">
                <h1 className="text-5xl md:text-6xl md:mx-auto lg:mx-0 max-w-lg md:max-w-3xl text-left md:text-center lg:text-left lg:mb-24">
                  A modern stack for rapid email development
                </h1>
                <div className="flex flex-col-reverse lg:flex-row justify-between md:items-center">
                  <div className="flex flex-row flex-wrap items-stretch justify-items-stretch lg:max-w-[500px]">
                    <div className="md:basis-1/2 grow mx-0 md:w-full lg:basis-full md:pr-2 lg:px-0 md:mx-auto lg:mx-0 text-left md:text-center lg:text-left pb-8 md:pb-12">
                      <p className="text-xl md:text-2xl leading-snug m-0 pb-2 mx-0 md:mx-auto lg:mx-0 max-w-sm md:max-w-xl lg:max-w-sm">
                        ●&nbsp;&nbsp;Super fast development
                      </p>
                      <p className="leading-snug">
                        Mailing installs in your node app so it’s easy to import
                        your existing styles. And, you’ll save a ton of
                        development time with the preview server and live
                        reload.
                      </p>
                    </div>
                    <div className="md:basis-1/2 grow mx-0 md:w-full lg:basis-full md:pl-2 lg:px-0 md:mx-auto lg:mx-0 text-left md:text-center lg:text-left pb-8 md:pb-12">
                      <p className="text-xl md:text-2xl leading-snug m-0 pb-2 mx-0 md:mx-auto lg:mx-0 max-w-sm md:max-w-xl lg:max-w-sm">
                        ●&nbsp;&nbsp;Templates in your codebase
                      </p>
                      <p className="leading-snug">
                        Use Mailing as a library to send emails directly from JS
                        frameworks (Next.js, RedwoodJS, Remix). There’s also a
                        REST API so you can use your templates from any stack.
                      </p>
                    </div>
                    <div className="md:basis-1/2 grow mx-0 md:max-w-[450px] lg:basis-full md:px-0 md:mx-auto lg:mx-0 text-left md:text-center lg:text-left pb-8 md:pb-12">
                      <p className="text-xl md:text-2xl leading-snug m-0 pb-2 mx-0 md:mx-auto lg:mx-0 max-w-sm md:max-w-xl lg:max-w-sm">
                        ●&nbsp;&nbsp;Highly compatible emails
                      </p>
                      <p className="leading-snug">
                        Mailing combines the flexibility of React with the
                        efficiency of{" "}
                        <a href="http://mjml.io" target="blank" rel="noopener">
                          MJML
                        </a>
                        , so that it’s actually easy to make emails that look
                        good across clients.
                      </p>
                    </div>
                  </div>
                  <div
                    ref={reloadImageRef}
                    className={cx(
                      "mt-12 md:mt-20 lg:mt-0 sm:mx-0 md:mx-auto mb-10 md:mb-16 lg:ml-8 lg:mr-0 transition-all duration-700",
                      {
                        "opacity-0 scale-95 translate-x-8":
                          mounted && !reloadImageInView,
                        "opacity-1 scale-100 translate-x-0": reloadImageInView,
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
          <div className="bg-blue-300 py-24 md:py-44 dark:bg-[url('/local-bg_dark@2x.jpg')] bg-cover">
            <div className="px-6 md:px-12">
              <div className="mx-auto">
                <h1 className="text-5xl md:text-6xl md:mx-auto lg:mx-0 text-left md:text-center">
                  Not just localhost
                </h1>
                <div
                  ref={localhostImageRef}
                  className={cx(
                    "pt-14 md:pt-20 sm:mx-0 md:mx-auto mb-12 md:mb-20 md:px-0 text-center transition-all duration-700",
                    {
                      "opacity-0": mounted && !localhostImageInView,
                      "opacity-1": localhostImageInView,
                    }
                  )}
                >
                  <span className="border-4 border-solid border-gray-800 rounded-3xl inline-flex overflow-hidden">
                    <Image
                      width="720"
                      height="405"
                      src="/expanded-view@2x.jpg"
                      alt="Mailing expanded view"
                    />
                  </span>
                </div>

                <div className="flex flex-row flex-wrap items-stretch justify-items-stretch w-full justify-center">
                  <div className="md:basis-1/2 grow mx-0 pr-0 lg:px-3 md:mx-auto lg:mx-0 text-left md:text-center md:max-w-[430px] pb-8 md:pb-12">
                    <p className="text-xl md:text-2xl leading-snug m-0 pb-2 mx-0 md:mx-auto lg:mx-0 max-w-sm]">
                      ●&nbsp;&nbsp;Share your previews
                    </p>
                    <p className="leading-snug">
                      Deploy your mailing preview server to share links with
                      your team and clients at your domain.
                    </p>
                  </div>
                  <div className="md:basis-1/2 grow mx-0 md:mx-auto lg:mx-0 text-left lg:px-3 md:text-center md:max-w-[430px] pb-8 md:pb-12">
                    <p className="text-xl md:text-2xl leading-snug m-0 pb-2 mx-0 md:mx-auto lg:mx-0 max-w-sm]">
                      ●&nbsp;&nbsp;Render via API
                    </p>
                    <p className="leading-snug">
                      Use the preview server’s REST API to render and send
                      templates from any environment – not just Node apps.
                    </p>
                  </div>
                  <div className="md:basis-1/2 grow mx-0 pl-0 lg:px-3 md:mx-auto lg:mx-0 text-left md:text-center md:max-w-[430px] pb-8 md:pb-12">
                    <p className="text-xl md:text-2xl leading-snug m-0 pb-2 mx-0 md:mx-auto lg:mx-0 max-w-sm]">
                      ●&nbsp;&nbsp;Deploy anywhere
                    </p>
                    <p className="leading-snug">
                      Deploy to Vercel in a few clicks or use the mailing CLI to
                      output a Next.js app that you can host anywhere.
                    </p>
                  </div>
                </div>
                <div className="text-left md:text-center mt-2 md:mt-8">
                  <a
                    className="text-black dark:text-white text-xl leading-none px-4 h-9 inline-flex items-center rounded-2xl border-2 border-black dark:border-white hover:underline"
                    href="https://github.com/sofn-xyz/mailing/blob/main/docs/DEPLOY.md"
                    target="blank"
                  >
                    Learn More about Deployment
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="dark:bg-neutral-900">
            <div
              ref={testimonialsRef}
              className={cx(
                "px-6 md:px-12 pt-16 sm:pt-32 pb-16 sm:pb-32 transition-all duration-700",
                {
                  "opacity-0 translate-y-12": mounted && !testimonialsInView,
                  "opacity-1 translate-y-0": testimonialsInView,
                }
              )}
            >
              <h2 className="text-left sm:text-center text-5xl mb-12 sm:mb-16">
                Kind words from the internet
              </h2>
              <div className="max-w-[1032px] mx-auto flex flex-row flex-wrap items-stretch justify-items-stretch">
                <div className="md:basis-1/2 grow pb-3 sm:pb-6">
                  <div className="border border-black dark:border-neutral-700 border-dotted rounded-2xl md:mr-3 p-8 h-full">
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
                            className="text-xs leading-none hover:underline inline-block"
                            href="https://twitter.com/rauchg"
                            target="blank"
                            rel="noopener"
                          >
                            @rauchg
                          </a>
                        </div>
                      </div>
                      <a
                        href="https://twitter.com/rauchg/status/1556013344082894848"
                        target="blank"
                        className="dark:invert dark:opacity-75"
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
                      This is sublime.
                      <br />
                      <br /> Action Mailer-inspired,{" "}
                      <a
                        href="https://twitter.com/nextjs"
                        target="blank"
                        rel="noopener"
                        className="hover:underline text-blue-600 dark:text-blue-400 inline-block"
                      >
                        @nextjs
                      </a>{" "}
                      compatible email system. Send emails built with{" "}
                      <a
                        href="https://twitter.com/reactjs"
                        target="blank"
                        rel="noopener"
                        className="hover:underline inline-block text-blue-600 dark:text-blue-400"
                      >
                        @reactjs
                      </a>{" "}
                      components.
                      <br />
                      <br />
                      <a
                        href="https://mailing.run"
                        target="blank"
                        rel="noopener"
                        className="hover:underline text-blue-600 dark:text-blue-400 inline-block"
                      >
                        mailing.run
                      </a>
                    </p>
                  </div>
                </div>
                <div className="md:basis-1/2 grow pb-3 sm:pb-6">
                  <div className="border border-black dark:border-neutral-700 border-dotted rounded-2xl md:ml-3 p-8 h-full">
                    <div className="flex justify-between items-center">
                      <div className="flex justify-between items-top">
                        <Image
                          width="48"
                          height="48"
                          src="/testimonial-st@2x.png"
                          alt="Steven Tey"
                        />
                        <div className="ml-3 inline-block place-content-center">
                          <div className="pt-1 -mb-2">Steven Tey</div>
                          <a
                            className="text-xs leading-none hover:underline inline-block"
                            href="https://twitter.com/steventey"
                            target="blank"
                            rel="noopener"
                          >
                            @steventey
                          </a>
                        </div>
                      </div>
                      <a
                        href="https://twitter.com/steventey/status/1579471673325408257"
                        target="blank"
                        className="dark:invert dark:opacity-75"
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
                      Spent the weekend creating some transactional emails for{" "}
                      <a
                        href="https://twitter.com/dubdotsh"
                        target="blank"
                        rel="noopener"
                        className="hover:underline inline-block text-blue-600 dark:text-blue-400"
                      >
                        @dubdotsh
                      </a>{" "}
                      with{" "}
                      <a
                        href="https://mailing.run"
                        target="blank"
                        rel="noopener"
                        className="hover:underline inline-block text-blue-600 dark:text-blue-400"
                      >
                        mailing.run
                      </a>{" "}
                      – it’s a gamechanger 🤯
                      <br />
                      <br />✅ Develop & preview emails with{" "}
                      <a
                        href="https://twitter.com/nextjs"
                        target="blank"
                        rel="noopener"
                        className="hover:underline text-blue-600 dark:text-blue-400 inline-block"
                      >
                        @nextjs’
                      </a>{" "}
                      fast refresh
                      <br />
                      ✅ Intercept emails & show a preview in localhost
                      <br />✅ One-click deploy your email previews to
                    </p>
                  </div>
                </div>
                <div className="md:basis-1/2 grow pb-3 sm:pb-6">
                  <div className="border border-black dark:border-neutral-700 border-dotted rounded-2xl md:mr-3 p-8 h-full">
                    <div className="flex justify-between items-center">
                      <div className="flex justify-between items-top">
                        <Image
                          width="48"
                          height="48"
                          src="/testimonial-sd@2x.png"
                          alt="Sidi Dev"
                        />
                        <div className="ml-3 inline-block place-content-center">
                          <div className="pt-1 -mb-2">Sidi Dev</div>
                          <a
                            className="text-xs leading-none hover:underline inline-block"
                            href="https://twitter.com/@sidi_jeddou_dev"
                            target="blank"
                            rel="noopener"
                          >
                            @sidi_jeddou_dev
                          </a>
                        </div>
                      </div>
                      <a
                        href="https://twitter.com/sidi_jeddou_dev/status/1579928272347230208"
                        target="blank"
                        className="dark:invert dark:opacity-75"
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
                      After I checked out{" "}
                      <a
                        href="https://mailing.run"
                        target="blank"
                        rel="noopener"
                        className="hover:underline inline-block text-blue-600 dark:text-blue-400"
                      >
                        mailing.run
                      </a>{" "}
                      I liked it so much, and the best thing is how to deploy it
                      on vercel, I decided to use it to build a newsletter
                      script for{" "}
                      <a
                        href="https://twitter.com/float_ui"
                        target="blank"
                        rel="noopener"
                        className="hover:underline text-blue-600 dark:text-blue-400 inline-block"
                      >
                        @float_ui
                      </a>{" "}
                      😍
                    </p>
                  </div>
                </div>
                <div className="md:basis-1/2 grow pb-3 sm:pb-6">
                  <div className="border border-black dark:border-neutral-700 border-dotted rounded-2xl md:ml-3 p-8 h-full">
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
                            className="text-xs leading-none hover:underline inline-block"
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
                        className="dark:invert dark:opacity-75"
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
                      workflow. I’m excited to be able to use all of that and
                      have the excellent preview capabilities of mailing!
                    </p>
                  </div>
                </div>
                <div className="md:basis-1/2 grow pb-3 sm:pb-6">
                  <div className="border border-black dark:border-neutral-700 border-dotted rounded-2xl md:mr-3 p-8 h-full">
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
                          <span className="text-xs leading-none ">
                            via email
                          </span>
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
                  <div className="border border-black dark:border-neutral-700 border-dotted rounded-2xl md:ml-3 p-8 h-full">
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
                            className="text-xs leading-none hover:underline inline-block"
                            href="https://github.com/willviles"
                            target="blank"
                            rel="nooopener"
                          >
                            @willviles
                          </a>
                        </div>
                      </div>
                      <a
                        href="https://github.com/sofn-xyz/mailing/issues/163#issuecomment-1241643724"
                        target="blank"
                        className="dark:invert dark:opacity-75"
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
                        rel="noopener"
                        className="hover:underline inline-block text-blue-600 dark:text-blue-400"
                      >
                        @alexfarrill
                      </a>{" "}
                      <a
                        href="https://github.com/psugihara"
                        target="blank"
                        rel="noopener"
                        className="hover:underline inline-block text-blue-600 dark:text-blue-400"
                      >
                        @psugihara
                      </a>{" "}
                      for such a speedy fix 👍
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 px-6 md:px-12 py-24 md:py-44 dark:bg-[url('/local-bg_dark@2x.jpg')] bg-cover">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col lg:flex-row justify-between md:items-center">
                <div
                  ref={osImageRef}
                  className={cx(
                    "block mt-10 lg:mt-0 sm:mx-0 md:mx-auto lg:mr-28 lg:ml-0 transition-all duration-700",
                    {
                      "opacity-0": mounted && !osImageInView,
                      "opacity-1": osImageInView,
                    }
                  )}
                >
                  <span className="hidden dark:block">
                    <Image
                      width="400"
                      height="387"
                      src="/os_dark@2x.png"
                      alt="Mailing open source"
                    />
                  </span>
                  <span className="dark:hidden">
                    <Image
                      width="400"
                      height="387"
                      src="/opensource@2x.png"
                      alt="Mailing open source"
                    />
                  </span>
                </div>
                <div className="max-w-xl text-left md:text-center lg:text-left">
                  <h1 className="text-5xl md:text-6xl mt-8 lg:mt-0 max-w-sm md:max-w-lg text-left md:text-center lg:text-left md:mx-auto">
                    Transparent & open source
                  </h1>
                  <p className="leading-snug m-0 py-8 md:py-10 mx-0 md:mx-auto lg:mx-0 md:max-w-[470px]">
                    Mailing is an open source email development tool. Our{" "}
                    <a
                      href="https://discord.gg/fdSzmY46wY"
                      target="blank"
                      rel="noopener"
                      className="hover:underline inline-block text-blue-600 dark:text-blue-400"
                    >
                      Discord
                    </a>{" "}
                    is public and source code is public on{" "}
                    <a
                      href="https://github.com/sofn-xyz/mailing"
                      target="blank"
                      rel="noopener"
                      className="hover:underline inline-block text-blue-600 dark:text-blue-400"
                    >
                      GitHub
                    </a>{" "}
                    so anyone can read and review it. We want Mailing to outlast
                    us and we love feedback and contributions from the
                    community.
                  </p>
                  <a
                    className="text-black dark:text-white text-xl leading-none px-4 h-9 inline-flex items-center rounded-2xl border-2 border-black dark:border-white hover:underline"
                    href="https://discord.gg/fdSzmY46wY"
                    target="blank"
                  >
                    Join the Discord
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer>
          <div className="bg-neutral-900 py-6 text-center">
            <Image
              width="19.2"
              height="24"
              src="/mailing-icon-white.svg"
              alt="Mailing icon"
              className="dark:opacity-75"
            />
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
