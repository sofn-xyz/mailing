import { ReactNode } from "react";

type H1Props = {
  children: ReactNode | ReactNode[];
};

export default function H1({ children }: H1Props) {
  return <h1 className="text-6xl mb-10 font-medium">{children}</h1>;
}
