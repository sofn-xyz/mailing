import Link from "next/link";
import Image from "next/image";

type HeaderProps = {
  rightButton?: React.ReactNode;
};

export default function Header({ rightButton }: HeaderProps) {
  return (
    <header className="sticky bg-black text-white top-0 z-10 transition-all duration-1000">
      <nav className="mx-auto h-[59px] lg:h-[79px] px-5 sm:px-8 flex items-center justify-between border-b border-gray-500 border-dotted">
        <Link href="/" className="flex-1">
          <Image
            src="/lockup-sans-serif.svg"
            alt="Mailing"
            width={128}
            height={28}
            priority
            className="hidden md:block"
          />
          <Image
            src="/mailing-icon-white.svg"
            alt="Mailing"
            width={21}
            height={28}
            priority
            className="md:hidden"
          />
        </Link>
        <ul>
          <li className="inline px-2">
            <a href="https://discord.gg/fdSzmY46wY" className="inline-block">
              <Image
                src="/discord-icon.png"
                alt="Discord"
                width={16}
                height={12}
                className="opacity-60 hover:opacity-100 transition-opacity inline -mt-0.5"
              />
            </a>
          </li>
          <li className="inline px-1.5">
            <a
              href="https://github.com/sofn-xyz/mailing"
              className="inline-block"
            >
              <Image
                src="/gh-icon.png"
                alt="GitHub"
                width={14}
                height={14}
                className="opacity-60 hover:opacity-100 transition-opacity inline -mt-0.5"
              />
            </a>
          </li>
          <li className="inline px-1.5">
            <Link
              href="/docs"
              className="text-slate-300 hover:text-white inline-block transition-all"
            >
              Docs
            </Link>
          </li>
          <li className="inline px-1.5">
            <Link
              href="/docs/templates"
              className="text-slate-300 hover:text-white inline-block transition-all"
            >
              Demos
            </Link>
          </li>
          <li className="hidden sm:inline px-1.5">
            <Link
              href="white-glove"
              className="text-slate-300 hover:text-white inline-block transition-all"
            >
              White Glove
            </Link>
          </li>
        </ul>
        <div className="flex-1 flex justify-end">{rightButton}</div>
      </nav>
    </header>
  );
}
