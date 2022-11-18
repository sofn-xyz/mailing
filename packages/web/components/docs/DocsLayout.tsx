import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";

import "@code-hike/mdx/dist/index.css";
import NavLink from "./NavLink";
import IndexButton from "./IndexButton";

function NavCategory({ children }) {
  return (
    <div className="mt-3 text-base font-medium pt-4 pb-1 text-blue-300">
      {children}
    </div>
  );
}

export default function DocsLayout({ children }) {
  const router = useRouter();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  useEffect(() => {
    const bodyClass = "bg-black";
    document?.body.classList.add(bodyClass);
    return function cleanupBodyClass() {
      document?.body.classList.remove(bodyClass);
    };
  }, []);

  return (
    <div className="bg-black text-gray-400 min-h-screen">
      <div className="z-50 bg-black fixed w-full flex justify-between items-middle py-0 text-sm mb-16 px-4 sm:px-8 border-b border-gray-500 text-blue-300 border-dotted">
        <a className="hidden" id="0"></a>
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
              className="hover:underline mr-4 text-sm leading-none inline-block"
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
            "lg:block fixed bg-black w-full z-20 inset-0 top-16 pt-6 left-[max(0px,calc(50%-45rem))] right-auto sm:w-[19.5rem] pb-10 px-8 overflow-y-auto",
            {
              hidden: !hamburgerOpen,
            }
          )}
        >
          <NavCategory>Basics</NavCategory>
          <NavLink href="/docs#0" active={router.asPath}>
            What’s Mailing?
          </NavLink>
          <NavLink href="/docs#getting-started" active={router.asPath}>
            Getting started
          </NavLink>
          <NavLink
            href="/docs#developing-with-email-previews"
            active={router.asPath}
          >
            Dev
          </NavLink>
          <NavLink href="/docs#sendmail" active={router.asPath}>
            Send
          </NavLink>
          <NavLink href="/docs#testing-emails-with-jest" active={router.asPath}>
            Testing
          </NavLink>
          <NavLink href="/docs#cli" active={router.asPath}>
            CLI
          </NavLink>

          <NavCategory>
            Platform{" "}
            <span className="pl-1 text-xs uppercase text-green-300">Beta</span>
          </NavCategory>
          <NavLink href="/docs/platform#0" active={router.asPath} scroll>
            What’s Platform?
          </NavLink>
          <NavLink href="/docs/platform#pricing" active={router.asPath}>
            Pricing
          </NavLink>
          <NavLink href="/docs/platform#setup" active={router.asPath}>
            Setup
          </NavLink>
          <NavLink href="/docs/lists" active={router.asPath} scroll>
            Lists
          </NavLink>

          <NavCategory>Reference</NavCategory>
          <NavLink href="/docs/deploy" active={router.asPath} scroll>
            Deploy
          </NavLink>
          <NavLink href="/docs/rest-api" active={router.asPath}>
            REST API
          </NavLink>

          <NavCategory>Etc.</NavCategory>
          <NavLink href="/docs/templates" active={router.asPath}>
            Example Templates
          </NavLink>
          <NavLink href="/docs/turborepo" active={router.asPath}>
            Turborepo
          </NavLink>
          <NavCategory>Org</NavCategory>
          <NavLink href="/docs/contributing" active={router.asPath}>
            Contributing
          </NavLink>
          <NavLink href="/docs/discord" active={false}>
            Discord
          </NavLink>
        </nav>
        <div className="lg:pl-[20rem]">
          <main className="prose prose-mailing-dark font-medium text-xl max-w-3xl top-16 pt-12 pb-16 relative z-20">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
