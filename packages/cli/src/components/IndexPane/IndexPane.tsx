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
    <CompactView previews={previews} />
  ) : (
    <ClientView previews={previews} />
  );

  return (
    <>
      <label>
        <input type="checkbox" onChange={handleToggle} checked={compact} />
      </label>
      {previews ? view : "Loading"}

      <style jsx>{`
        .frame {
          margin: auto;
          display: block;
        }
      `}</style>
    </>
  );
};

export default IndexPane;
