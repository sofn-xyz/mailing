import { ReactNode } from "react";
import Link from "next/link";
import cx from "classnames";

type KeyButtonProps = {
  href: string;
  className?: string;
  children: ReactNode | ReactNode[];
  small?: boolean;
};

export default function KeyButton({
  children,
  href,
  className,
  small,
}: KeyButtonProps) {
  return (
    <Link
      href={href}
      draggable={false}
      className={cx(
        "relative inline-flex rounded-2xl bg-emerald-700 text-center font-bold text-black mt-1",
        className
      )}
    >
      <div
        className={cx(
          "hover:scale-9 -translate-y-2 -translate-x-2 transform rounded-2xl bg-green-200 transition-all duration-100 hover:-translate-y-1 hover:-translate-x-1 active:-translate-y-0 active:-translate-x-0 active:bg-green-100",
          {
            "text-lg px-8 pt-4 pb-3": small,
            "text-4xl px-16 pt-8 pb-7": !small,
          }
        )}
      >
        {children}
      </div>
    </Link>
  );
}
