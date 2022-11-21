import Link from "next/link";
import cx from "classnames";

type NavLinkProps = {
  href: string;
  children: React.ReactNode | React.ReactNode[];
  active: string | false;
  className?: string;
};

export default function DocsLink({
  href,
  children,
  active,
  className,
}: NavLinkProps) {
  const isActive =
    active === href || active === href + "/" || active + "#0" === href;

  return (
    <div className="relative leading-none my-3">
      <Link
        href={href}
        className={cx(
          "hover:text-white inline-block text-base leading-none font-normal",
          className,
          {
            "text-white font-medium": isActive,
            "text-slate-500": !isActive,
          }
        )}
        scroll={!href.includes("#")}
        shallow={true}
        aria-selected={isActive}
      >
        <span
          className={cx("pr-2", {
            "text-green-300": isActive,
            "text-gray-500": !isActive,
          })}
        >
          ●
        </span>
        <span className="hover:underline">{children}</span>
      </Link>
    </div>
  );
}
