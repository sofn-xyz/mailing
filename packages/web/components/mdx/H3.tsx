import { Children, useMemo } from "react";
import { getAnchor } from "./util/getAnchor";

type H3Props = {
  children: string;
};

export default function H3({ children }: H3Props) {
  const anchor = useMemo<string>(
    () =>
      getAnchor(
        Children.map(children, (child) =>
          "string" === typeof child ? child : null
        ).join("-")
      ),
    [children]
  );

  return (
    <h3
      id={anchor}
      className="text-lg md:text-xl lg:text-2xl font-medium pt-20"
    >
      {children}
    </h3>
  );
}
