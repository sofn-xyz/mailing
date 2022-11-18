import { ReactNode } from "react";

type PProps = {
  children: ReactNode | ReactNode[];
};

export default function P({ children }: PProps) {
  return (
    <p className="leading-relaxed font-normal text-blue-300">{children}</p>
  );
}
