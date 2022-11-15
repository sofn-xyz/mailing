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
    <div className="relative">
      <div className="absolute -left-100">{showActive && "⊙"}</div>
      <Link
        href={href}
        className={cx("block text-white hover:text-blue-600", className, {
          // "relative -left-4": active,
        })}
        scroll={!!scroll}
        shallow={true}
        aria-selected={isActive}
      >
        {children}
      </Link>
    </div>
  );
}
