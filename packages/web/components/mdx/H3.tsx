import { ReactNode } from "react";

type H3Props = {
  children: ReactNode | ReactNode[];
};

export default function H3({ children }: H3Props) {
  return (
    <h3 className="text-lg md:text-xl lg:text-2xl font-medium">{children}</h3>
  );
}
