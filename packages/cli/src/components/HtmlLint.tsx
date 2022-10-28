import { useState } from "react";
import Image from "next/image";
import cx from "classnames";

type HTMLLintProps = {
  htmlLint: HtmlLintError[];
};

const HTMLLint: React.FC<HTMLLintProps> = ({ htmlLint }) => {
  const [open, setOpen] = useState(false);

  const handleOpenToggle = () => {
    setOpen((current) => !current);
  };

  return (
    <div className="bg-amber-200 text-black hidden sm:block text-xs relative">
      <div
        className="flex justify-between px-4 py-3 cursor-pointer"
        onClick={handleOpenToggle}
      >
        <div className="flex content-center">
          <Image src="/icon-warning.svg" width="16" height="16" alt="Warning" />
          <span className="font-bold pl-3 pr-1">
            {htmlLint.length} HTML lint errors.
          </span>
          Make sure to resolve these before sending this email.
        </div>

        <div className="relative">
          <svg
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cx(
              "inline origin-center arrow transition-transform stroke-gray-800",
              {
                "-rotate-180 relative -top-px": open,
                collapsed: !open,
              }
            )}
          >
            <path
              d="M1.5 1.5L4.5 4.5L7.5 1.5"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <div
        className={cx(
          "overflow-scroll bg-gray-800 text-amber-200 transition-transform absolute top-0 right-0 left-0 -z-10",
          {
            "translate-y-0": !open,
            "max-h-[80vh] px-4 py-6 -translate-y-full": open,
          }
        )}
      >
        <ol>
          {htmlLint.map((lint, i) => (
            <li key={`warning${i}`}>
              {i + 1}. {lint.message}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default HTMLLint;
