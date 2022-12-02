import { ReactNode } from "react";
import cx from "classnames";

type PreProps = {
  children: ReactNode | ReactNode[];
  reducePadding: boolean;
};

export default function Pre({ children, reducePadding }: PreProps) {
  return (
    <span className="not-prose">
      <pre
        className={cx(
          "rounded-3xl hljs overflow-scroll py-5",
          reducePadding ? "px-0" : "px-6"
        )}
      >
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
