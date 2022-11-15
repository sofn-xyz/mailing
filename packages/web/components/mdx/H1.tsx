import { ReactNode } from "react";

type H1Props = {
  children: ReactNode | ReactNode[];
};

export default function H2({ children }: H1Props) {
  return <h1 className="text-3xl md:text-7xl lg:text-8xl">{children}</h1>;
}
