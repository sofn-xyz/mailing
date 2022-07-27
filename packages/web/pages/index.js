import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mailing – Build + test + send emails with React</title>
        <meta
          name="description"
          content="Build + test + send emails with React"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="px-6 sm:px-12 max-w-6xl m-auto">
        <header className="flex justify-between items-center pt-32 pb-24">
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
              className="underline hover:bg-yellow text-base sm:text-xl leading-none"
              href="demo.mailing.run"
            >
              Examples
            </a>
          </nav>
        </header>
        <main className={styles.main}>
          <h1 className="text-5xl sm:text-8xl m-0 max-w-xs sm:max-w-3xl">
            Build + test + send emails with React
          </h1>
          <p className="text-2xl leading:snug sm:text-5xl sm:leading-snug m-0 max-w-xs sm:max-w-xl pt-6 sm:pt-8 pb-16">
            Polished, lightweight emails in your app & design system
          </p>
          <a
            className="bg-black text-white sm:text-3xl text-2xl leading-none px-12 py-6 inline-block rounded-sm hover:underline"
            href="https://github.com/successor-software/mailing"
          >
            View on GitHub
          </a>
        </main>
      </div>
    </div>
  );
}
