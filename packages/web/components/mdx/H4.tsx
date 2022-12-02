import { Children, useMemo } from "react";
import { getAnchor } from "./util/getAnchor";

type H4Props = {
  children: string;
};

export default function H4({ children }: H4Props) {
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
    <h4
      id={anchor}
      className="text-sm md:text-sm lg:text-lg uppercase text-gray-400 font-medium pt-20 -mt-16"
    >
      {children}
    </h4>
  );
}
