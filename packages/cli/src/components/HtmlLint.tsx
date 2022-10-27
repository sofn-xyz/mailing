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
    <div className="bg-amber-200 text-black absolute left-0 right-0 bottom-0 hidden sm:block text-xs">
      <div
        className={cx("overflow-scroll", {
          "max-h-0": !open,
          "max-h-[80vh] px-4 py-3": open,
        })}
      >
        <ol>
          {htmlLint.map((lint, i) => (
            <li key={`warning${i}`}>
              {i + 1}. {lint.message}
            </li>
          ))}
        </ol>
      </div>
      <div className="flex justify-between px-4 py-3">
        <div className="flex content-center">
          <Image src="/icon-warning.svg" width="16" height="16" alt="Warning" />
          <span className="font-bold pl-3 pr-1">
            {htmlLint.length} HTML lint errors.
          </span>
          Make sure to resolve these before sending this email.
        </div>

        <button onClick={handleOpenToggle}>
          {open ? "Hide errors" : "Show errors"}
        </button>
      </div>
    </div>
  );
};

export default HTMLLint;
