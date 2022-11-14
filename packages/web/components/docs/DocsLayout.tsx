import { useRouter } from "next/router";
import { useEffect } from "react";

import NavLink from "./NavLink";

export default function DocsLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    console.log("router", router.asPath);
  }, [router.asPath]);

  return (
    <div className="max-w-8xl min-h-full mx-auto px-4 sm:px-6 md:px-8 bg-black text-white">
      <nav className="hidden lg:block fixed z-20 inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto">
        <NavLink href="/docs#0" active={/\/docs\/?(#0)?$/.test(router.asPath)}>
          <h2 className="text-2xl font-bold mb-4">Mailing Docs</h2>
        </NavLink>
        <span className="text-gray-400">Basics</span>
        <NavLink
          className="pl-5"
          href="/docs#setup"
          active={router.asPath === "/docs#setup"}
        >
          Setup
        </NavLink>
        <NavLink
          className="pl-5"
          href="/docs#developing-with-email-previews"
          active={router.asPath === "/docs#developing-with-email-previews"}
        >
          Email previews
        </NavLink>
        <NavLink href="/docs/deploy" active={router.asPath === "/docs/deploy"}>
          Deploying Mailing
        </NavLink>
        <NavLink
          href="/docs/contributing"
          active={router.asPath === "/docs/contributing"}
        >
          Contributing
        </NavLink>
        <NavLink
          href="/docs/turborepo"
          active={router.asPath === "/docs/turborepo"}
        >
          Turborepo
        </NavLink>
      </nav>
      <div className="lg:pl-[19.5rem] relative">
        <div className="top-10 right-20 float-right relative z-40">
          <NavLink href="/" active={false} scroll>
            Home
          </NavLink>
        </div>
        <a id="0"></a> {/* anchor for scroll to top */}
        <main className="prose prose-mailing-dark max-w-3xl mx-auto relative z-0 py-10 xl:max-w-none">
          {children}
        </main>
      </div>
    </div>
  );
}
