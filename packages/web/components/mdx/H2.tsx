import { useMemo } from "react";
import cx from "classnames";
import { useHydrationFriendlyAsPath } from "../hooks/useHydrationFriendlyAsPath";
import { getAnchor } from "./util/getAnchor";

type H2Props = {
  children: string;
};

export default function H2({ children }: H2Props) {
  const asPath = useHydrationFriendlyAsPath();
  const anchor = useMemo<string>(() => getAnchor(children), [children]);
  const link = `#${anchor}`;

  return (
    <h2 id={anchor} className="pt-20 text-5xl font-medium -mt-6 mb-8">
      <div className="relative">
        <a href={link} className={cx("anchor-link no-underline", {})}>
          {children}
          <span
            className={cx(
              "active-dot text-green-300 pt-[9px] pl-4 absolute top-0 text-3xl -left-[64px]",
              {
                hidden: anchor !== asPath.split("#", 2)[1],
              }
            )}
          >
            ●
          </span>
        </a>
      </div>
    </h2>
  );
}
