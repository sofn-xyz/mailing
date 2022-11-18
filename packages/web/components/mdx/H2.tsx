import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
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
  const router = useRouter();
  const anchor = useMemo<string>(() => getAnchor(children), [children]);
  const link = `#${anchor}`;
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (router.asPath.split("#")[1] === anchor) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [router.asPath, anchor]);

  return (
    <h2 id={anchor} className="text-4xl font-medium -mt-20 pt-28">
      <a href={link} className={cx("anchor-link no-underline", {})}>
        {children}
        {active && (
          <span className="text-green-300 pt-[5px] pl-4 absolute text-2xl -left-[52px]">
            ●
          </span>
        )}
      </a>
    </h2>
  );
}
