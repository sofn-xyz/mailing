import { ReactNode } from "react";
import Link from "next/link";
import cx from "classnames";
import { InferProps } from "prop-types";

type KeyButtonProps = InferProps<HTMLAnchorElement> & {
  href: string;
  className?: string;
  children: ReactNode | ReactNode[];
  small?: boolean;
};

export default function KeyButton({
  children,
  className,
  small,
  ...anchorProps
}: KeyButtonProps) {
  return (
    <Link
      draggable={false}
      className={cx(
        "relative inline-flex rounded-2xl bg-emerald-700 text-center text-black",
        className
      )}
      {...anchorProps}
    >
      <div
        className={cx(
          "hover:scale-9 transform rounded-2xl bg-green-200 transition-all active:bg-green-100",
          {
            "duration-300 text-lg px-4 pt-2 pb-[10px] -translate-y-1 -translate-x-1 hover:-translate-y-0.5 hover:-translate-x-0.5 active:-translate-y-0 active:-translate-x-0":
              small,
            "duration-500 text-3xl md:text-4xl px-8 md:px-16 pt-5 pb-6 md:pt-7 md:pb-8 leading-none -translate-y-2 -translate-x-2 hover:-translate-y-1 hover:-translate-x-1 active:-translate-y-0 active:-translate-x-0":
              !small,
          }
        )}
      >
        {children}
      </div>
    </Link>
  );
}
