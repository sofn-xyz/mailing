import Link from "next/link";
import useHotkeys from "@reecelucas/react-use-hotkeys";
import cx from "classnames";
import { useRouter } from "next/router";
import Image from "next/image";

import { usePreviewTree } from "./hooks/usePreviewTree";

type CompactViewProps = {
  previews: [string, string[]][];
};

const CompactView: React.FC<CompactViewProps> = ({ previews }) => {
  const { up, down, left, right, treeRoutes, cursor } =
    usePreviewTree(previews);

  useHotkeys(
    ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
    (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        up();
      } else if (e.key === "ArrowDown") {
        down();
      } else if (e.key === "ArrowLeft") {
        left();
      } else if (e.key === "ArrowRight") {
        right();
      }
    }
  );

  let collapseLevel = 999;
  return (
    <div className="focus:outline-2">
      <div className="border-dotted border-b border-gray-600 mb-6 pt-4 pb-3 px-4">
        <Image
          src="/logo-light-header@2x.png"
          width="91"
          height="20"
          alt="mailing logo"
        />
      </div>
      <div className="py-4 px-3" tabIndex={1} role="tree">
        {treeRoutes?.map((route, i) => {
          if (route.collapsed && route.level <= collapseLevel) {
            collapseLevel = route.level;
          } else if (route.level === collapseLevel) {
            collapseLevel = 999;
          }
          return route.level > collapseLevel ? null : (
            <div
              key={route.path}
              role="treeitem"
              aria-expanded={!route.collapsed}
              aria-selected={i === cursor}
              className={cx({
                "pl-3": route.level === 0,
                "pl-4": route.level === 1,
                "pl-6": route.level === 2,
                "bg-blue text-black rounded-2xl": i === cursor,
              })}
            >
              {route.displayName}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompactView;
