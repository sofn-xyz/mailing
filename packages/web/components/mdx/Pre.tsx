import { ReactNode } from "react";

type PreProps = {
  children: ReactNode | ReactNode[];
};

export default function Pre({ children }: PreProps) {
  return (
    <span className="not-prose">
      <pre className="px-3 py-5 rounded hljs overflow-scroll">{children}</pre>
    </span>
  );
}
