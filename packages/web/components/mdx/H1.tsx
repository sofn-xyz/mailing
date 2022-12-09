import { ReactNode } from "react";
import { useHydrationFriendlyAsPath } from "../hooks/useHydrationFriendlyAsPath";
import cx from "classnames";

type H1Props = {
  children: ReactNode | ReactNode[];
};

export default function H1({ children }: H1Props) {
  const asPath = useHydrationFriendlyAsPath();

  return (
    <h1 className="text-8xl mt-5 mb-5 font-medium pb-2 relative">
      <span
        className={cx(
          "active-dot text-green-300 pl-4 absolute top-12 text-3xl -left-[64px]",
          {
            hidden: asPath.includes("#"),
          }
        )}
      >
        ●
      </span>
      {children}
    </h1>
  );
}
