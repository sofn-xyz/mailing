import type { AppProps } from "next/app";
import { HamburgerProvider } from "../components/HamburgerContext";
import "../styles/globals.css";

export default function Mailing({ Component, pageProps }: AppProps) {
  return (
    <HamburgerProvider>
      <Component {...pageProps} />;
    </HamburgerProvider>
  );
}
