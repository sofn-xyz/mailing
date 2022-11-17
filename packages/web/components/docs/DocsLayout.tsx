import { useRouter } from "next/router";
import { useEffect } from "react";

import "@code-hike/mdx/dist/index.css";
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

  useEffect(() => {
    if (document) {
      document.body.classList.add("bg-black");
    }
    return () => {
      if (document) {
        document.body.classList.remove("bg-black");
      }
    };
  }, []);

  return (
    <div className="bg-black text-gray-400 min-h-screen">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 pb-20">
        <nav className="hidden lg:block fixed z-20 inset-0 top-10 left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto">
          <NavLink href="/docs#0" active={false}>
            <h2 className="text-8xl font-medium mb-4">Docs</h2>
          </NavLink>
          <NavCategory>Basics</NavCategory>
          <NavLink className="pl-4" href="/docs#0" active={router.asPath}>
            What’s Mailing?
          </NavLink>
          <NavLink
            className="pl-4"
            href="/docs#getting-started"
            active={router.asPath}
          >
            Getting started
          </NavLink>
          <NavLink
            className="pl-4"
            href="/docs#developing-with-email-previews"
            active={router.asPath}
          >
            Dev
          </NavLink>
          <NavLink
            className="pl-4"
            href="/docs#sendmail"
            active={router.asPath}
          >
            Send
          </NavLink>
          <NavLink
            className="pl-4"
            href="/docs#testing-emails-with-jest"
            active={router.asPath}
          >
            Testing
          </NavLink>
          <NavLink className="pl-4" href="/docs#cli" active={router.asPath}>
            CLI
          </NavLink>
          <NavLink
            className="pl-4"
            href="/docs/deploy"
            active={router.asPath}
            scroll
          >
            Deploying Mailing
          </NavLink>

          <NavCategory>Platform [beta]</NavCategory>
          <NavLink
            className="pl-4"
            href="/docs/platform#0"
            active={router.asPath}
            scroll
          >
            What’s Platform?
          </NavLink>
          <NavLink
            className="pl-4"
            href="/docs/platform#pricing"
            active={router.asPath}
          >
            Pricing
          </NavLink>
          <NavLink
            className="pl-4"
            href="/docs/platform#getting-started-making-an-api-key"
            active={router.asPath}
          >
            Setup
          </NavLink>
          <NavLink
            className="pl-4"
            href="/docs/lists"
            active={router.asPath}
            scroll
          >
            Lists
          </NavLink>

          <NavCategory>Reference</NavCategory>
          <NavLink
            className="pl-4"
            href="/docs/rest-api"
            active={router.asPath}
          >
            REST API
          </NavLink>

          <NavCategory>etc</NavCategory>
          <NavLink
            className="pl-4"
            href="/docs/templates"
            active={router.asPath}
          >
            Example Templates
          </NavLink>
          <NavLink
            className="pl-4"
            href="/docs/turborepo"
            active={router.asPath}
          >
            Turborepo
          </NavLink>
          <NavCategory>Org</NavCategory>
          <NavLink
            className="pl-4"
            href="/docs/contributing"
            active={router.asPath}
          >
            Contributing
          </NavLink>
          <NavLink
            className="pl-4"
            href="https://discord.gg/fdSzmY46wY"
            active={false}
          >
            Discord
          </NavLink>
        </nav>
        <div className="lg:pl-[19.5rem]">
          <a id="0"></a> {/* anchor for scroll to top */}
          <main className="prose prose-mailing-dark font-medium max-w-3xl mx-auto relative z-20 pt-10 xl:max-w-none">
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
