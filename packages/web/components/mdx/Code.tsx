import { ReactNode } from "react";

type CodeProps = {
  children: ReactNode | ReactNode[];
};

export default function Code({ children }: CodeProps) {
  return (
    <span className="not-prose">
      <code className="mono font-normal text-sm not-prose bg-zinc-800 px-2 py-1 mx-0.5 rounded-lg relative top-[-2px] text-green-200">
        {children}
      </code>
    </span>
  );
}
