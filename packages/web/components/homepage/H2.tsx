import { useMemo } from "react";
import cx from "classnames";

function getAnchor(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/[ ]/g, "-");
}

type H2Props = {
  children: string;
};

export default function H2({ children }: H2Props) {
  const anchor = useMemo<string>(() => getAnchor(children), [children]);
  const link = `#${anchor}`;

  return (
    <h2
      id={anchor}
      className="font-serif font-bold text-[84px] md:text-[108px] lg:text-[140px] xl:text-[160px] mt-36 sm:mt-40 md:mt-48 lg:mt-64 mb-12 sm:mb-[72px] md:mb-[84px] lg:mb-32 leading-none"
    >
      <div className="relative">
        <a href={link} className={cx("anchor-link no-underline", {})}>
          {children}
        </a>
      </div>
    </h2>
  );
}
