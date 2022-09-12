import Image from "next/image";
import { ChangeEvent, useState } from "react";
import useHotkeys from "@reecelucas/react-use-hotkeys";

import ClientView from "./ClientView";
import CompactView from "./CompactView";
import { usePreviewTree } from "./hooks/usePreviewTree";

type IndexPaneProps = {
  previews?: [string, string[]][];
};

const IndexPane: React.FC<IndexPaneProps> = ({ previews }) => {
  const [compact, setCompact] = useState(true);
  const { up, down, left, right, treeRoutes, cursor, navigate, setCollapse } =
    usePreviewTree(previews || [], { leavesOnly: !compact });

  useHotkeys(
    ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "],
    (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        up();
      } else if (e.key === "ArrowDown") {
        down();
      } else if (compact && e.key === "ArrowLeft") {
        left();
      } else if (compact && e.key === "ArrowRight") {
        right();
      } else if (compact && e.key === " " && treeRoutes) {
        setCollapse(cursor, !treeRoutes[cursor].collapsed);
      }
    }
  );

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setCompact((current) => !current);
  };

  const showNullState =
    !previews ||
    previews.length === 0 ||
    (previews.length === 2 &&
      previews[0][0] === "TextEmail" &&
      previews[1][0] === "Welcome" &&
      !process.env.NEXT_PUBLIC_STATIC);

  const view = compact ? (
    <CompactView
      treeRoutes={treeRoutes}
      cursor={cursor}
      navigate={navigate}
      setCollapse={setCollapse}
    />
  ) : (
    <ClientView treeRoutes={treeRoutes} cursor={cursor} navigate={navigate} />
  );

  return (
    <>
      <div className="border-dotted border-b border-gray-600 pt-4 pb-3 px-4">
        <Image
          src="/logo-light-header@2x.png"
          width="91"
          height="20"
          alt="mailing logo"
        />
        <label className="toggle">
          <input
            type="checkbox"
            aria-label="Show compact view"
            onChange={handleToggle}
            checked={compact}
          />
        </label>
      </div>
      {showNullState && (
        <div className="null-sub">
          Build new email templates in <span className="code">emails</span>. Add
          previews to <span className="code">emails/previews</span> and they’ll
          appear below.
        </div>
      )}
      {previews?.map ? view : "Loading"}
    </>
  );
};

export default IndexPane;
