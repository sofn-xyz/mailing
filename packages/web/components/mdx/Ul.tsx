import { ReactNode } from "react";

type UlProps = {
  children: ReactNode | ReactNode[];
};

export default function Ul({ children }: UlProps) {
  return <ul className="pl-5">{children}</ul>;
}
