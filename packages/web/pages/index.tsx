import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import KeyButton from "../components/homepage/KeyButton";
import H2 from "../components/homepage/H2";
import Li from "../components/homepage/Li";
import ExampleCard from "../components/homepage/ExampleCard";
import Social from "../components/homepage/Social";
import { Arrow } from "../components/homepage/Arrow";
import CircleJar from "../components/homepage/CircleJar";
import Header from "../components/Header";

const WhiteGlove: NextPage = () => {
  return (
    <div className="bg-black">
      <Head>
        <title>Mailing – Add email to your React app</title>
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
        <meta property="og:image" content="https://mailing.run/og-image.jpg" />
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
      <Header
        rightButton={
          <>
            <div className="flex-1 text-right hidden lg:inline-block">
              <KeyButton small href="/docs#getting-started">
                Get Started
                <Arrow />
              </KeyButton>
            </div>
            <Link
              href="/docs#getting-started"
              className="lg:hidden text-green-200 flex-1 text-right"
            >
              Start
              <Arrow />
            </Link>
          </>
        }
      />
      <main className="px-5 sm:px-16 xl:px-0 bg-black min-h-screen text-white">
        <div className="max-w-[1440px] mx-auto xl:px-8 text-left sm:text-center">
          <h1 className="text-[84px] sm:text-8xl md:text-[108px] lg:text-[140px] font-serif font-bold text-white  mt-24 leading-[0.9] max-w-[840px] mx-auto">
            Add email to your React app
          </h1>
          <div className="text-lg sm:text-2xl md:text-3xl mt-8 max-w-2xl mx-auto leading-[1.4]">
            An open source tool for developing and sending compatible,
            consistent emails from any app
          </div>
        </div>
        <Image
          src="/homepage/previewer-screenshot.png"
          width={1024}
          height={743}
          alt="Mailing previewer screenshot"
          className="mx-auto rounded-2xl border-2 border-gray-800 mt-12 sm:mt-20 md:mt-24"
          priority
        />
        <div className="mx-auto max-w-6xl">
          <H2>How it works</H2>
          <div className="sm:ml-16 xl:ml-36 2xl:ml-48">
            <Li
              title="Add Mailing to your app"
              description="Mailing adds an emails directory to your Node app. Email templates go in here and can import shared constants, images, and components. Templates stay under source control with the rest of your code."
              index={1}
              prepend={<CircleJar index={0} />}
            />
            <Li
              title="Develop emails in React"
              description="Built-in MJML-React support means you can make templates compatible across email clients without thinking about table layout. The Mailing preview server gives you hot reload as you develop."
              index={2}
              prepend={<CircleJar index={1} />}
            />
            <Li
              title="Send with any transport"
              description={
                <>
                  Mailing is transport agnostic. The sendMail function renders
                  React MJML templates to HTML and sends them to your mailing
                  list subscribers. This function is built with Nodemailer, so
                  you can pass in any options that Nodemailer supports.
                </>
              }
              index={3}
              prepend={<CircleJar index={2} />}
            />
          </div>
        </div>
        <div>
          <div className="text-left sm:text-center md:text-right max-w-[230px] sm:max-w-full lg:max-w-sm">
            <H2>Simple dev</H2>
          </div>
          <div>
            <Image
              src="/homepage/fynn-screenshot.png"
              width={480}
              height={681}
              alt="Fynn email screenshot"
              className="rounded-2xl"
            />
            <Image
              src="/homepage/fynn-code-sample.png"
              width={681}
              height={345}
              alt="Fynn email screenshot"
              className="rounded-2xl"
            />
          </div>
          <div className="text-left max-w-[442px]">
            <h3 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.2]">
              Collaborative
            </h3>
            <div className="text-base md:text-lg lg:text-xl mt-8 sm:mt-4 md:mt-8 max-w-md">
              Self-hosted previews and analytics help your team stay on the same
              page. When everyone can easily see the live emails and their
              analytics, product and design QA are a breeze.
            </div>
          </div>
          <div className="text-left max-w-[442px]">
            <h3 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.2]">
              Open source
            </h3>
            <div className="text-base md:text-lg lg:text-xl mt-8 sm:mt-4 md:mt-8 max-w-md">
              We made Mailing an open source tool because we want to build
              software that outlasts our company, and because we love to get
              regular input and contributions from the community.
            </div>
          </div>
          <div className="text-left max-w-[442px]">
            <h3 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.2]">
              Zero lock-in
            </h3>
            <div className="text-base md:text-lg lg:text-xl mt-8 sm:mt-4 md:mt-8 max-w-md">
              The Mailing dev environment is free. If you send emails with the
              sendMail function, you’ll have the option to use paid features
              like unsubscribe preferences and email analytics. If not, simply
              export the HTML or use the React templates.
            </div>
          </div>
        </div>
        <div className="bg-black flex mx-auto flex-col text-center container">
          <H2>Demo templates</H2>
          <div className="text-left flex flex-wrap justify-center">
            <ExampleCard name="lancey" />
            <ExampleCard name="mailing" />
            <ExampleCard name="bbeam" />
            <ExampleCard name="fynn" />
            <ExampleCard name="thoughtfulPost" />
          </div>
        </div>
        <div className="text-center mt-16 sm:mt-40 md:mt-48 lg:mt-64">
          <Image
            src="/homepage/demo-theme.png"
            width={440}
            height={600}
            alt="Mailing demo theme"
            className="rounded-2xl inline-block lg:hidden xl:inline-block align-middle"
          />
          <Image
            src="/homepage/demo-theme-skinny.png"
            width={360}
            height={600}
            alt="Mailing demo theme"
            className="rounded-2xl hidden lg:inline-block xl:hidden  align-middle"
          />
          <div className="inline-block align-middle text-left lg:ml-[84px] xl:ml-24 2xl:ml-32 ">
            <h3 className="font-serif font-bold text-5xl md:text-[60px] lg:text-[72px]">
              Customize a<br />
              demo template
            </h3>
            <div className="text-base md:text-lg lg:text-xl mt-8 sm:mt-4 md:mt-8 max-w-md">
              Change a handful of constants to make any of these starter
              templates your own. If you need design system updates down the
              line, it’ll be easy to collaborate with designers and to keep your
              email and app experiences consistent.
            </div>
            <a
              href="https://github.com/sofn-xyz/mailing"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-400 text-2xl lg:text-3xl mt-6 md:mt-8 inline-block "
            >
              Get Started
              <span className="font-serif font-bold">&nbsp;&nbsp;→</span>
            </a>
          </div>
        </div>
        <div>
          <div className="max-w-sm text-left sm:max-w-full sm:text-right lg:max-w-sm lg:text-left">
            <H2>Kind words</H2>
          </div>
          <Social name="cymen" />
          <Social name="steven" />
          <Social name="will" />
          <Social name="guillermo" />
          <Social name="johan" />
          <Social name="sidi" />
        </div>
      </main>
      <footer className="bg-black flex justify-end mt-64 pb-24 mr-5 sm:mr-8 md:mr-16 xl:mr-24 2xl:mr-32">
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
