import { ReactNode } from "react";

type CodeProps = {
  children: ReactNode | ReactNode[];
};

export default function Code({ children }: CodeProps) {
  return <code className="text-amber-200 font-normal">{children}</code>;
}
