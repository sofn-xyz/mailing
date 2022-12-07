import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";
import { DocSearch } from "@docsearch/react";
import KeyButton from "../homepage/KeyButton";
import { Arrow } from "../homepage/Arrow";

import "@docsearch/css";

import NavLink from "./NavLink";
import IndexButton from "./IndexButton";
import { useHydrationFriendlyAsPath } from "../hooks/useHydrationFriendlyAsPath";

function NavCategory({ children }) {
  return (
    <div className="mt-3 text-base font-medium pt-4 pb-0 text-white">
      {children}
    </div>
  );
}

const SEARCH_APP_ID = "CP5PC48V2V";
const SEARCH_API_KEY = "96b6544a43429d3d06503a77bade784b";

export default function DocsLayout({ children }) {
  const asPath = useHydrationFriendlyAsPath();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  useEffect(() => {
    setHamburgerOpen(false);
  }, [asPath]);

  return (
    <div className="bg-black text-gray-400 min-h-screen">
      <Head>
        <link
          rel="preconnect"
          href={`https://${SEARCH_APP_ID}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
        <title>Docs – Mailing</title>
      </Head>
      <div className="z-50 bg-black fixed w-full flex py-0 text-sm mb-16 px-4 sm:px-6 md:px-8 border-b border-gray-500 border-dotted text-blue-300 ">
        <nav className="mx-auto flex items-center justify-between py-3 sm:py-4 w-full">
          <Link href="/" className="flex-1">
            <Image
              src="/lockup-sans-serif.svg"
              alt="Mailing"
              width={128}
              height={28}
              className="hidden sm:block"
            />
            <Image
              src="/mailing-icon-white.svg"
              alt="Mailing"
              width={21}
              height={28}
              className="sm:hidden"
            />
          </Link>
          <ul className="text-base">
            <li className="inline px-2">
              <a
                href="https://discord.gg/fdSzmY46wY"
                className="text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Image
                  src="/discord-icon.png"
                  alt="Discord"
                  width={16}
                  height={12}
                  className="opacity-70 hover:opacity-100 transition-opacity inline -mt-0.5"
                />
              </a>
            </li>
            <li className="inline px-1.5">
              <a
                href="https://github.com/sofn-xyz/mailing"
                className="text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Image
                  src="/gh-icon.png"
                  alt="GitHub"
                  width={14}
                  height={14}
                  className="opacity-70 hover:opacity-100 transition-opacity inline -mt-0.5"
                />
              </a>
            </li>
            <li className="inline px-1.5">
              <Link
                href="docs"
                className="text-white underline transition-colors"
              >
                Docs
              </Link>
            </li>
            <li className="inline px-1.5">
              <Link
                href="/docs/templates"
                className="text-slate-300 hover:text-blue-400 transition-colors"
              >
                Demos
              </Link>
            </li>
            <li className="hidden sm:inline px-1.5">
              <Link
                href="white-glove"
                className="text-slate-300 hover:text-blue-400 transition-colors"
              >
                White Glove
              </Link>
            </li>
          </ul>
          <div className="flex-1 text-right hidden lg:inline-block">
            <KeyButton
              target="_blank"
              small
              href="https://github.com/sofn-xyz/mailing"
            >
              Get Started
              <Arrow />
            </KeyButton>
          </div>
          <Link
            target="_blank"
            href="https://github.com/sofn-xyz/mailing"
            className="lg:hidden text-green-200 flex-1 text-right"
          >
            Start
            <Arrow />
          </Link>
        </nav>

        <div className="sm:hidden flex flex-col justify-center">
          <IndexButton
            isOpen={hamburgerOpen}
            onClick={() => setHamburgerOpen((v) => !v)}
          />
        </div>
      </div>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 pb-20">
        <nav
          className={cx(
            "lg:block fixed bg-black w-full z-20 inset-0 top-12 left-0 right-auto sm:w-72 pb-10 px-7 overflow-y-auto border-r border-gray-500  border-dotted",
            {
              hidden: !hamburgerOpen,
            }
          )}
        >
          <Link href="/docs">
            <h3 className="text-white text-2xl pt-14">Docs</h3>
          </Link>
          <div className="mt-6 -mb-2 border-gray-800 text-slate-500 hover:text-blue">
            <DocSearch
              appId={SEARCH_APP_ID}
              indexName="mailing"
              apiKey={SEARCH_API_KEY}
            />
          </div>

          <NavCategory>Basics</NavCategory>
          <NavLink href="/docs#whats-mailing" active={asPath}>
            What’s Mailing?
          </NavLink>
          <NavLink href="/docs#getting-started" active={asPath}>
            Getting started
          </NavLink>
          <NavLink href="/docs#developing-with-email-previews" active={asPath}>
            Previews
          </NavLink>
          <NavLink href="/docs#testing-emails-with-jest" active={asPath}>
            Testing
          </NavLink>
          <NavLink href="/docs#cli" active={asPath}>
            CLI
          </NavLink>
          <NavLink href="/docs/deploy" active={asPath}>
            Deploy
          </NavLink>

          <NavCategory>
            Platform{" "}
            <span className="pl-1 text-xs uppercase text-green-300">Beta</span>
          </NavCategory>
          <NavLink href="/docs/platform#whats-platform" active={asPath}>
            What’s Platform?
          </NavLink>
          <NavLink href="/docs/platform#pricing" active={asPath}>
            Pricing
          </NavLink>
          <NavLink href="/docs/platform#setup" active={asPath}>
            Setup
          </NavLink>
          <NavLink href="/docs/lists" active={asPath}>
            Lists
          </NavLink>

          <NavCategory>Reference</NavCategory>

          <NavLink href="/docs/sending-email" active={asPath}>
            Sending email
          </NavLink>
          <NavLink href="/docs/rest-api" active={asPath}>
            REST API
          </NavLink>
          <NavLink href="/docs/templates" active={asPath}>
            Demo templates
          </NavLink>
          <NavLink href="/docs/turborepo" active={asPath}>
            Turborepo
          </NavLink>

          <NavCategory>Org</NavCategory>
          <NavLink href="/docs/contributing" active={asPath}>
            Contributing
          </NavLink>
          <NavLink href="/docs/discord" active={asPath}>
            Discord
          </NavLink>
          <NavLink href="/white-glove" active={asPath}>
            White Glove
          </NavLink>
        </nav>
        <div className="lg:pl-[10rem]">
          <a id="0"></a>
          <main className="lg:pl-[10rem] overflow-scroll prose prose-mailing-dark font-medium text-xl max-w-4xl px-2 md:px-12 pt-12 pb-16 relative">
            {children}
          </main>
        </div>
      </div>
      <style jsx>{`
        .search:hover svg {
          fill: #b8ceff;
        }
        button:active {
          transform: translateY(2px);
        }
      `}</style>

      <style global jsx>{`
        /* must be global for first-of-type to work on children */
        .prose h2:first-of-type {
          margin-top: -18rem;
          padding-top: 20rem;
        }

        .prose :where(thead):not(:where([class~="not-prose"] *)) {
          border-top-color: #666;
          border-top-width: 1px;
        }
        .prose :where(thead):not(:where([class~="not-prose"] *)),
        .prose :where(tbody tr):not(:where([class~="not-prose"] *)) {
          border-bottom-color: rgb(85 85 85);
          border-bottom-style: dotted;
        }
        .prose :where(tbody tr:last-child):not(:where([class~="not-prose"] *)) {
          border-bottom-width: 1px;
        }
        .prose :where(tbody td, tfoot td):not(:where([class~="not-prose"] *)) {
          font-size: 14px;
          border-bottom-width: 0;
        }
        .prose :where(thead th):not(:where([class~="not-prose"] *)) {
          font-size: 10px;
          color: #a5aab4;
          text-transform: uppercase;
          padding-top: 12px;
        }
      `}</style>
    </div>
  );
}
