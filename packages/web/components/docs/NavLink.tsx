import Link from "next/link";
import cx from "classnames";

type NavLinkProps = {
  href: string;
  children: React.ReactNode | React.ReactNode[];
  active: boolean;
  className?: string;
  scroll?: boolean;
};

export default function DocsLink({
  href,
  children,
  active,
  className,
  scroll,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cx("block text-blue-500 hover:text-blue-600", className, {
        "text-blue-600": active,
      })}
      scroll={!!scroll}
    >
      {children}
    </Link>
  );
}
