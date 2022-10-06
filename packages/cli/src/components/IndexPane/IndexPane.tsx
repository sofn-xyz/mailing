import Image from "next/image";
import { ChangeEvent, useState } from "react";
import useHotkeys from "@reecelucas/react-use-hotkeys";

import ClientView from "./ClientView";
import CompactView from "./CompactView";
import { usePreviewTree } from "./hooks/usePreviewTree";

import type { PreviewIndexResponseBody } from "../../pages/api/previews";

type IndexPaneProps = {
  previews?: PreviewIndexResponseBody["previews"];
  previewText?: PreviewIndexResponseBody["previewText"];
  setHamburgerOpen?: (open: boolean) => void;
};

const IndexPane: React.FC<IndexPaneProps> = ({
  previews,
  previewText,
  setHamburgerOpen,
}) => {
  const [compact, setCompact] = useState(true);
  const { up, down, left, right, treeRoutes, cursor, navigate, setCollapse } =
    usePreviewTree(previews || [], { leavesOnly: !compact });

  useHotkeys(
    ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "`"],
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
      } else if (e.key === "`") {
        setCompact((current) => !current);
      }
    }
  );

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setCompact((current) => !current);
  };

  const view = compact ? (
    <CompactView
      treeRoutes={treeRoutes}
      cursor={cursor}
      navigate={navigate}
      setCollapse={setCollapse}
      setHamburgerOpen={setHamburgerOpen}
    />
  ) : (
    <ClientView
      treeRoutes={treeRoutes}
      cursor={cursor}
      navigate={navigate}
      previewText={previewText}
    />
  );

  return (
    <>
      <div className="border-dotted border-b border-gray-600 pt-4 px-4 h-[52px] hidden sm:block">
        <Image
          src="/logo-light-header@2x.png"
          width="91"
          height="20"
          alt="mailing logo"
        />
        <label className="toggle float-right text-sm cursor-pointer">
          Compact view
          <div
            id="toggle-compact-view"
            className="ml-2 w-5 h-[12px] relative inline-block top-[5px]"
          >
            <input
              type="checkbox"
              aria-label="Show compact view"
              onChange={handleToggle}
              checked={compact}
              className="ml-2 opacity-0 w-0 h-0"
            />
            <span className="slider bg-[#333] duration-[400ms] rounded-2xl absolute top-0 left-0 right-[-2px] bottom-0"></span>
          </div>
        </label>
      </div>

      {previews?.map ? view : "Loading"}
      <style jsx>{`
        #toggle-compact-view .slider:before {
          position: absolute;
          content: "";
          height: 8px;
          width: 8px;
          top: 2px;
          left: 2px;
          background-color: #666;
          transition: 0.15s ease;
          border-radius: 16px;
        }

        #toggle-compact-view input:checked + .slider {
          background-color: #e4ebfa;
        }

        #toggle-compact-view input:checked + .slider:before {
          background-color: #000;
          transform: translateX(10px);
        }
      `}</style>
    </>
  );
};

export default IndexPane;
