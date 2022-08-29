import type { AppProps } from "next/app";
import "../styles/reset.css";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="bg-orange">
        <Component {...pageProps} />
      </div>
    </>
  );
}
