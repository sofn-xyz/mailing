import type { AppProps } from "next/app";
import type { User } from "../../prisma/generated/client";
import Head from "next/head";
import { HamburgerProvider } from "../components/HamburgerContext";
import NavBar from "../components/NavBar/NavBar";
import "../styles/globals.css";
import PosthogScript from "../components/PosthogScript";

export default function Mailing({
  Component,
  pageProps,
}: AppProps<{ user?: User }>) {
  return (
    <HamburgerProvider>
      <Head>
        <PosthogScript />
        <title>Mailing</title>
      </Head>
      {pageProps.user ? (
        <NavBar>
          <Component {...pageProps} />
        </NavBar>
      ) : (
        <Component {...pageProps} />
      )}
    </HamburgerProvider>
  );
}
