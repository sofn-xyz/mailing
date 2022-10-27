import { useState } from "react";
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
    <div className="bg-amber-200 text-black px-4 py-2 absolute left-0 right-0 bottom-0">
      <div
        className={cx("overflow-scroll", {
          "max-h-0": !open,
          "max-h-[80vh]": open,
        })}
      >
        <ol>
          {htmlLint.map((lint, i) => (
            <li key={`warning${i}`}>
              {lint.line}: {lint.message}
              <br />
              <code>{lint.context}</code>
              <br />
              <br />
            </li>
          ))}
        </ol>
      </div>
      <div>
        <span className="bold">HTML lint errors</span>
        Make sure to resolve these before sending this email
        <button onClick={handleOpenToggle}>
          {open ? "Hide errors" : "Show errors"}
        </button>
      </div>
    </div>
  );
};

export default HTMLLint;
