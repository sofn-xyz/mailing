import Link from "next/link";
import { ChangeEvent, useState } from "react";
import ClientView from "./ClientView";
import CompactView from "./CompactView";

type IndexPaneProps = {
  previews?: [string, string[]][];
};

const IndexPane: React.FC<IndexPaneProps> = ({ previews }) => {
  const [compact, setCompact] = useState(true);

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setCompact((current) => !current);
  };

  const showNullState =
    !previews ||
    previews.length === 0 ||
    (previews.length === 2 &&
      previews[0][0] === "TextEmail.tsx" &&
      previews[1][0] === "Welcome.tsx" &&
      !process.env.NEXT_PUBLIC_STATIC);

  const view = compact ? (
    <CompactView previews={previews!} />
  ) : (
    <ClientView previews={previews!} />
  );

  return (
    <>
      <label className="toggle">
        <input type="checkbox" onChange={handleToggle} checked={compact} />
      </label>
      {showNullState && (
        <div className="null-sub">
          Build new email templates in <span className="code">emails</span>. Add
          previews to <span className="code">emails/previews</span> and they’ll
          appear below.
        </div>
      )}
      {previews?.map ? view : "Loading"}

      <style jsx>{`
        .toggle {
          float: right;
          position: relative;
        }
      `}</style>
    </>
  );
};

export default IndexPane;
