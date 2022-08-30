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
