import Link from "next/link";

export default function DocsLayout({ children }) {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 bg-black text-white">
      <nav className="hidden lg:block fixed z-20 inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto">
        <ul>
          <li>
            <Link href="/docs/GETTING_STARTED">Getting Started</Link>
          </li>
          <li>
            <Link href="/docs/DEPLOY">Deploy</Link>
          </li>
          <li>
            <Link href="/docs/CONTIBUTING">Contributing</Link>
          </li>
        </ul>
      </nav>
      <div className="lg:pl-[19.5rem]">
        <main className="max-w-3xl mx-auto relative z-20 pt-10 xl:max-w-none">
          {children}
        </main>
      </div>
    </div>
  );
}
