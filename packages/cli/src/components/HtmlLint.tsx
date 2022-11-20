import { useState } from "react";
import cx from "classnames";
import IconWarning from "./icons/IconWarning";

type HTMLLintProps = {
  htmlLint: HtmlLintError[];
};

const HTMLLint: React.FC<HTMLLintProps> = ({ htmlLint }) => {
  const [open, setOpen] = useState(false);

  const handleOpenToggle = () => {
    setOpen((current) => !current);
  };

  return (
    <div className="bg-transparent text-black hidden sm:block text-xs relative">
      <div
        aria-hidden={!open}
        className={cx(
          "overflow-scroll text-amber-200 bg-gray-800 transition-transform origin-bottom z-0 absolute max-h-[80vh] bottom-[40px] left-0 right-0",
          {
            "pointer-events-none translate-y-full ": !open,
            "translate-y-0 px-4 py-6": open,
          }
        )}
      >
        <ol className="font-mono">
          {htmlLint.map((lint, i) => (
            <li key={`warning${i}`}>
              {i + 1}. {lint.message}
            </li>
          ))}
        </ol>
      </div>

      <button
        className="bg-amber-200 flex justify-between px-4 py-3 w-full z-10 relative"
        onClick={handleOpenToggle}
        aria-label="toggle html lint details"
      >
        <div className="flex content-center">
          <IconWarning />
          <span className="font-bold pl-2 pr-1">
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
      </button>
    </div>
  );
};

export default HTMLLint;
