import Link from "next/link";
import cx from "classnames";
import { useEffect, useState } from "react";

type NavLinkProps = {
  href: string;
  children: React.ReactNode | React.ReactNode[];
  active: string | false;
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
  const isActive = active === href || active === href + "/";
  const [showActive, setShowActive] = useState(false);

  useEffect(() => {
    if (isActive && !showActive) {
      setShowActive(true);
    } else if (showActive && !isActive) {
      setShowActive(false);
    }
  }, [isActive, showActive]);

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
        scroll={!!scroll}
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
