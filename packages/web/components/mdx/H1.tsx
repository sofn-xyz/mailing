import { ReactNode } from "react";

type H1Props = {
  children: ReactNode | ReactNode[];
};

export default function H1({ children }: H1Props) {
  return <h1 className="text-8xl mt-16 mb-5 font-medium py-2">{children}</h1>;
}
