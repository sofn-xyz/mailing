import cx from "classnames";
import { useCallback, useContext } from "react";

import type { TreeRoute } from "./hooks/usePreviewTree";
import { HamburgerContext } from "../HamburgerContext";

type CompactViewProps = {
  treeRoutes?: TreeRoute[];
  cursor: number;
  navigate: (nextCursor: number | ((current: number) => number)) => void;
  setCollapse: (cursor: number, collapse: boolean) => void;
};

const CompactView: React.FC<CompactViewProps> = ({
  treeRoutes,
  cursor,
  navigate,
  setCollapse,
}) => {
  const { setHamburgerOpen } = useContext(HamburgerContext);

  const handleClick = useCallback(
    (i: number, collapsed: boolean) =>
      (_e: React.MouseEvent<HTMLDivElement>) => {
        setCollapse(i, !collapsed);
        navigate(i);
        if (typeof setHamburgerOpen == "function") {
          setHamburgerOpen(false);
        }
      },
    [navigate, setCollapse, setHamburgerOpen]
  );

  let collapseLevel = 999;
  return (
    <div
      className="py-4 px-3 font-bold text-sm outline-none"
      tabIndex={1}
      role="tree"
    >
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
            className={cx("mb-1 cursor-pointer hover:underline", {
              "pl-2": route.level === 0,
              "pl-6": route.level === 1,
              "pl-[70px] pb-1 pt-1": route.level === 2,
              "bg-active rounded-2xl": i === cursor,
            })}
            onClick={handleClick(i, route.collapsed)}
          >
            {route.level < 2 && (
              <button
                className="py-1 px-3"
                onClick={() => setCollapse(i, !route.collapsed)}
                aria-label={`Toggle ${route.path}`}
              >
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 9 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={cx(
                    "stroke-white inline origin-center arrow transition-transform",
                    {
                      "collapsed -rotate-90 relative -top-px": route.collapsed,
                    }
                  )}
                >
                  <path
                    d="M1.5 1.5L4.5 4.5L7.5 1.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
            {route.displayName}
          </div>
        );
      })}
    </div>
  );
};

export default CompactView;
