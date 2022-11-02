import type { AppProps } from "next/app";
import Head from "next/head";
import { HamburgerProvider } from "../components/HamburgerContext";
import NavBar from "../components/NavBar/NavBar";
import "../styles/globals.css";

export default function Mailing({ Component, pageProps }: AppProps) {
  return (
    <HamburgerProvider>
      <Head>
        <title>Mailing</title>
      </Head>
      <NavBar>
        <Component {...pageProps} />
      </NavBar>
    </HamburgerProvider>
  );
}
