import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

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
    <h2 id={anchor} className="text-3xl">
      <a href={link} className="anchor-link no-underline">
        {active && "|"} {children}
      </a>
    </h2>
  );
}
