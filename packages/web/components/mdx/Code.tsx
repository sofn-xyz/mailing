import { ReactNode } from "react";

type CodeProps = {
  children: ReactNode | ReactNode[];
};

export default function Code({ children }: CodeProps) {
  return (
    <span className="not-prose">
      <code className="mono text-amber-200 font-normal text-base">
        {children}
      </code>
    </span>
  );
}
