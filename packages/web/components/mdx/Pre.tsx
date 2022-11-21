import { ReactNode } from "react";

type PreProps = {
  children: ReactNode | ReactNode[];
};

export default function Pre({ children }: PreProps) {
  return (
    <span className="not-prose">
      <pre className="px-6 py-5 rounded-3xl hljs overflow-scroll">
        {children}
      </pre>
      <style jsx global>
        {`
          pre code {
            background: transparent !important;
            padding: 0 !important;
            margin: 0 !important;
          }
        `}
      </style>
    </span>
  );
}
