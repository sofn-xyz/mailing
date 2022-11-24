import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";

import NavLink from "./NavLink";
import IndexButton from "./IndexButton";
import { useHydrationFriendlyAsPath } from "../mdx/hooks/useHydrationFriendlyAsPath";

function NavCategory({ children }) {
  return (
    <div className="mt-3 text-base font-medium pt-4 pb-0 text-white">
      {children}
    </div>
  );
}

export default function DocsLayout({ children }) {
  const asPath = useHydrationFriendlyAsPath();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  useEffect(() => {
    setHamburgerOpen(false);
  }, [asPath]);

  return (
    <div className="bg-black text-gray-400 min-h-screen">
      <div className="z-50 bg-black fixed w-full flex justify-between items-middle py-0 text-sm mb-16 px-4 sm:px-6 border-b border-gray-500 text-blue-300 border-dotted">
        <div className="brand flex flex-col justify-center py-4">
          <Link href="/">
            <span className="hidden sm:block">
              <Image
                width="110"
                height="24"
                src="/mailing-logo.svg"
                alt="Mailing logo"
                className="invert"
              />
            </span>
            <span className="sm:hidden">
              <Image
                width="19"
                height="24"
                src="/mailing-icon.svg"
                alt="Mailing icon"
                className="invert"
              />
            </span>
          </Link>
        </div>
        <div className="hidden sm:flex flex-col justify-center">
          <div>
            <Link
              className="underline mr-4 text-sm leading-none inline-block"
              href="/docs"
            >
              Docs
            </Link>
            <a
              className="hover:underline mr-4 text-sm leading-none inline-block"
              href="https://discord.gg/fdSzmY46wY"
              target="blank"
            >
              Discord
            </a>
            <a
              className="hover:underline mr-4 text-sm leading-none inline-block"
              href="https://demo.mailing.run"
            >
              Demo
            </a>
            <a
              className="text-sm leading-none hover:underline"
              href="https://github.com/sofn-xyz/mailing"
              target="blank"
            >
              GitHub
            </a>
          </div>
        </div>
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
            "lg:block fixed bg-black w-full z-20 inset-0 top-12 left-0 right-auto sm:w-72 pb-10 px-6 overflow-y-auto border-r border-gray-500  border-dotted",
            {
              hidden: !hamburgerOpen,
            }
          )}
        >
          <Link href="/docs">
            <h3 className="text-white text-2xl pt-7 -mb-2">Docs</h3>
          </Link>
          <button className="hidden search border text-sm bg-gray-800 border-gray-800 text-slate-500 hover:text-blue w-full transition-all duration-300 text-left rounded-md px-2 pt-1 pb-[5px]">
            <svg
              className="fill-slate-500 transition-all duration-300 inline -mt-[3px] mr-2"
              width="14"
              height="13.5"
              viewBox="0 0 14 13.5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.45006 9.47688C8.63839 10.2818 7.52112 10.7789 6.28772 10.7789C3.80728 10.7789 1.79649 8.76816 1.79649 6.28772C1.79649 3.80728 3.80728 1.79649 6.28772 1.79649C8.76816 1.79649 10.7789 3.80728 10.7789 6.28772C10.7789 7.36243 10.4015 8.34897 9.77187 9.12199C9.71705 9.15678 9.66517 9.19808 9.61734 9.24591C9.54779 9.31546 9.49203 9.39359 9.45006 9.47688ZM10.2617 11.1606C9.1786 12.045 7.7951 12.5754 6.28772 12.5754C2.81511 12.5754 0 9.76033 0 6.28772C0 2.81511 2.81511 0 6.28772 0C9.76033 0 12.5754 2.81511 12.5754 6.28772C12.5754 7.60455 12.1706 8.82684 11.4787 9.83693L14.1086 12.4668C14.4594 12.8176 14.4594 13.3863 14.1086 13.7371C13.7578 14.0879 13.189 14.0879 12.8383 13.7371L10.2617 11.1606Z"
              />
            </svg>
            Quick search
            <svg
              className="inline mt-[5px] float-right"
              width="20"
              height="10"
              viewBox="0 0 20 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.91403 5.83597H7.16403V3.836H7.91403C8.86401 3.836 9.66406 3.03602 9.66406 2.08597C9.66406 1.13591 8.86409 0.335938 7.91403 0.335938C6.96406 0.335938 6.16409 1.13591 6.16409 2.08597V2.83597H4.16412L4.16403 2.08597C4.16403 1.13591 3.36406 0.335938 2.41409 0.335938C1.46403 0.335938 0.664062 1.13591 0.664062 2.08597C0.664062 3.03594 1.46403 3.83591 2.41409 3.83591H3.16409V5.83588L2.41409 5.83597C1.46403 5.83597 0.664062 6.63594 0.664062 7.58591C0.664062 8.53597 1.46403 9.33594 2.41409 9.33594C3.36406 9.33594 4.16412 8.53597 4.16412 7.58591L4.16404 6.83591H6.16401V7.58591C6.16401 8.53588 6.96398 9.33594 7.91404 9.33594C8.86401 9.33594 9.66407 8.53597 9.66407 7.58591C9.66407 6.63594 8.8641 5.83597 7.91404 5.83597L7.91403 5.83597ZM7.16403 2.08597C7.16403 1.68594 7.51409 1.33597 7.91403 1.33597C8.31406 1.33597 8.66403 1.68594 8.66403 2.08597C8.66403 2.48591 8.31406 2.83597 7.91403 2.83597H7.16403V2.08597ZM3.16418 7.58583C3.16418 7.98585 2.81412 8.33583 2.41418 8.33583C2.01415 8.33583 1.66418 7.98585 1.66418 7.58583C1.66418 7.18588 2.01415 6.83583 2.41418 6.83583H3.16418V7.58583ZM2.41418 2.83597C2.01415 2.83597 1.66418 2.48591 1.66418 2.08597C1.66418 1.68594 2.01415 1.33597 2.41418 1.33597C2.81412 1.33597 3.16418 1.68594 3.16418 2.08597V2.83597H2.41418ZM4.16412 5.83597V3.836H6.16409V5.83597H4.16412ZM7.91412 8.33583C7.51409 8.33583 7.16412 7.98585 7.16412 7.58583V6.83583H7.91412C8.31415 6.83583 8.66412 7.1858 8.66412 7.58583C8.66412 7.98585 8.31415 8.33583 7.91412 8.33583Z"
                fill="#7B7E85"
              />
              <path
                d="M15.8762 4.52405L19.3682 0.456055H17.6402L14.5202 4.26005H14.4962V0.456055H13.0562V9.00006H14.4962V4.88405H14.5202L17.8202 9.00006H19.6802L15.8762 4.52405Z"
                fill="#7B7E85"
              />
            </svg>
          </button>
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
            Example templates
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
        </nav>
        <div className="lg:pl-[10rem]">
          <a id="0"></a>
          <main className="lg:pl-[10rem] overflow-scroll prose prose-mailing-dark font-medium text-xl max-w-4xl px-12 pt-12 pb-16 relative">
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
