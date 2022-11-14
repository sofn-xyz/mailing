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
      className={cx("block hover:text-blue-600", className, {
        "text-blue": active,
        "text-white": !active,
      })}
      scroll={!!scroll}
      shallow={true}
    >
      {children}
    </Link>
  );
}
