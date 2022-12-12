import { ReactNode } from "react";
import Link from "next/link";
import cx from "classnames";
import { InferProps } from "prop-types";

type KeyButtonProps = InferProps<HTMLAnchorElement> & {
  href: string;
  className?: string;
  children: ReactNode | ReactNode[];
  small?: boolean;
  color?: "green" | "gray" | "blue";
  full?: boolean;
};

export default function KeyButton({
  children,
  className,
  small,
  color = "blue",
  full,
  ...anchorProps
}: KeyButtonProps) {
  return (
    <Link
      draggable={false}
      className={cx("relative inline-flex rounded-2xl text-center", className, {
        "bg-emerald-700 text-black": color === "green",
        "bg-gray-600 text-white": color === "gray",
        "bg-blue-400 text-black": color === "blue",
        "w-full": full,
      })}
      {...anchorProps}
    >
      <div
        className={cx("hover:scale-9 transform rounded-2xl transition-all", {
          "duration-300 text-lg px-4 pt-2 pb-[10px] -translate-y-1 -translate-x-1 hover:-translate-y-0.5 hover:-translate-x-0.5 active:-translate-y-0 active:-translate-x-0":
            small,
          "duration-500 text-xl px-8 md:px-16 pt-4 pb-5 leading-none -translate-y-1 -translate-x-1 hover:-translate-y-0.5 hover:-translate-x-0.5 active:-translate-y-0 active:-translate-x-0":
            !small,
          "bg-white active:bg-emerald-700": color === "green",
          "bg-black active:bg-gray-600 border border-gray-600":
            color === "gray",
          "bg-white active:bg-blue-300": color === "blue",
          "w-full": full,
        })}
      >
        {children}
      </div>
    </Link>
  );
}
