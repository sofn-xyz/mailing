import { useMemo } from "react";
import cx from "classnames";

function getAnchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/[ ]/g, "-");
}

type H2Props = {
  children: string;
  marginClassName?: string;
};

export default function H2({ children, marginClassName }: H2Props) {
  const anchor = useMemo<string>(() => getAnchor(children), [children]);

  return (
    <h2
      id={anchor}
      className={cx(
        "font-serif font-bold text-[84px] md:text-[108px] lg:text-[140px] xl:text-[160px] leading-none",
        marginClassName,
        {
          "mt-36 sm:mt-40 md:mt-48 lg:mt-64 mb-12 sm:mb-[72px] md:mb-[84px] lg:mb-32":
            typeof marginClassName === "undefined",
        }
      )}
    >
      <div className="relative">{children}</div>
    </h2>
  );
}
