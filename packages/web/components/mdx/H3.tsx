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
      className="text-xl md:text-2xl lg:text-3xl font-medium pt-20 -mt-20"
    >
      {children}
    </h3>
  );
}
