import type { AppProps } from "next/app";
import "../reset.css";
import "../globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
