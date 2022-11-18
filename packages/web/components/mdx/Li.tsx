import { ReactNode } from "react";

type LiProps = {
  children: ReactNode | ReactNode[];
};

export default function Li({ children }: LiProps) {
  return <li className="pl-0 my-2 font-normal">{children}</li>;
}
