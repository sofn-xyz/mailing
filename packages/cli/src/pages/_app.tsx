import type { AppProps } from "next/app";
import "../reset.css";
import "../global.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
