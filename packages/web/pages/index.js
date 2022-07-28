import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <div className={`${styles.pageContainer} w-screen h-screen bg-cover`}>
        <Head>
          <title>Mailing – Build + test + send emails with React</title>
          <meta
            name="description"
            content="Build + test + send emails with React"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="w-full overflow-hidden absolute">
          <div className={`${styles.tickerWrap} w-full`}>
            <div
              className={`${styles.tickerMove} inline-block uppercase text-xs`}
            >
              <div
                className={`${styles.tickerItem}  p-0 inline-block leading-none`}
              >
                Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source&nbsp;&nbsp;·&nbsp;&nbsp;Free&nbsp;&nbsp;·&nbsp;&nbsp;Open
                Source
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.bodyContainer} flex justify-start sm:justify-center items-left sm:items-center py-10`}
        >
          <div className="px-6 sm:mx-8 max-w-5xl w-full">
            <header className="flex justify-between items-top pt-20 sm:pt-0 pb-20">
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
                  className="underline hover:bg-yellow text-base leading-none inline-block"
                  href="https://demo.mailing.run"
                >
                  Default Templates
                </a>
              </nav>
            </header>
            <main className={styles.main}>
              <h1 className="text-4xl sm:text-7xl 2xl:text-8xl m-0 max-w-xs sm:max-w-3xl ">
                Build + test + send emails with React
              </h1>
              <p
                className="text-2xl leading-normal sm:text-4xl 2xl:text-5xl  m-0 pt-5 pb-10 2xl:pt-7 2xl:pb-16"
                id={styles.sub}
              >
                Polished, lightweight emails
                <br />
                in your app & design system
              </p>
              <a
                className="bg-black text-white text-xl sm:text-3xl 2xl:text-4xl leading-none px-12 pt-5 pb-6 block rounded-sm hover:underline absolute sm:static w-100 sm:w-fit right-[24px] bottom-[48px] left-[24px] text-center"
                href="https://github.com/successor-software/mailing"
              >
                View on GitHub
              </a>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
