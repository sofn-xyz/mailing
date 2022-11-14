import { useRouter } from "next/router";

import NavLink from "./NavLink";

function NavCategory({ children }) {
  return (
    <div className="mt-3 text-xs uppercase font-semibold text-gray-400">
      {children}
    </div>
  );
}

export default function DocsLayout({ children }) {
  const router = useRouter();

  return (
    <div className="bg-black text-gray-400 min-h-screen">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 pb-20">
        <nav className="hidden lg:block fixed z-20 inset-0 top-10 left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto">
          <NavLink href="/docs#0" active={false}>
            <h2 className="text-2xl font-bold mb-4">Mailing Docs</h2>
          </NavLink>
          <NavCategory>Basics</NavCategory>
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
          <NavLink
            className="pl-5"
            href="/docs#testing-emails-with-jest"
            active={router.asPath === "/docs#testing-emails-with-jest"}
          >
            Testing emails with jest
          </NavLink>
          <NavLink
            className="pl-5"
            href="/docs#cli"
            active={router.asPath === "/docs#cli"}
          >
            CLI
          </NavLink>
          <NavLink
            className="pl-5"
            href="/docs#rest-api"
            active={router.asPath === "/docs#rest-api"}
          >
            REST API
          </NavLink>

          <NavCategory>Platform</NavCategory>
          <NavLink
            className="pl-5"
            href="/docs/deploy"
            active={router.asPath === "/docs/deploy"}
            scroll
          >
            Deploying Mailing
          </NavLink>
          <NavCategory>etc</NavCategory>
          <NavLink
            className="pl-5"
            href="/docs/templates"
            active={router.asPath === "/docs/templates"}
          >
            Templates
          </NavLink>
          <NavLink
            className="pl-5"
            href="/docs/turborepo"
            active={router.asPath === "/docs/turborepo"}
          >
            Turborepo
          </NavLink>
          <NavCategory>org</NavCategory>
          <NavLink
            className="pl-5"
            href="/docs/contributing"
            active={router.asPath === "/docs/contributing"}
          >
            Contributing
          </NavLink>
        </nav>
        <div className="lg:pl-[19.5rem]">
          <a id="0"></a> {/* anchor for scroll to top */}
          <main className="prose prose-mailing-dark max-w-3xl mx-auto relative z-20 pt-10 xl:max-w-none">
            <div className="float-right z-40">
              <NavLink href="/" active={false} scroll>
                Home
              </NavLink>
            </div>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
