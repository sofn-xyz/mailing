import Link from "next/link";
import { useHotkeys } from "react-hotkeys-hook";
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
    "up, down, left, right",
    (_e, handler) => {
      if (handler.key === "up") {
        console.log("up");
        up();
      } else if (handler.key === "down") {
        down();
      } else if (handler.key === "left") {
        left();
      } else if (handler.key === "right") {
        right();
      }
    },
    [up, down, left, right]
  );

  let collapseLevel = 999;
  return (
    <div className="focus:outline-2" tabIndex={1}>
      <div className="border-dotted border-b border-gray-600 mb-6 pt-4 pb-3 px-4">
        <Image
          src="/logo-light-header@2x.png"
          width="91"
          height="20"
          alt="mailing logo"
        />
      </div>
      <div className="py-4 px-3">
        {treeRoutes?.map((route, i) => {
          if (route.collapsed && route.level <= collapseLevel) {
            collapseLevel = route.level;
          } else if (route.level === collapseLevel) {
            collapseLevel = 999;
          }
          return route.level > collapseLevel ? (
            <></>
          ) : (
            <div
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
