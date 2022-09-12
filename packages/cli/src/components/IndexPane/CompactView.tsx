import cx from "classnames";

import type { TreeRoute } from "./hooks/usePreviewTree";

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
  let collapseLevel = 999;
  return (
    <div className="focus:outline-2">
      <div className="py-4 px-3 font-bold text-sm" tabIndex={1} role="tree">
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
              className={cx("pb-1 pt-1 mb-1", {
                "pl-2": route.level === 0,
                "pl-6": route.level === 1,
                "pl-12": route.level === 2,
                "bg-blue text-black rounded-2xl": i === cursor,
              })}
              onClick={() => navigate(i)}
            >
              {route.level < 2 && (
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 9 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={cx(
                    "inline origin-center arrow transition-transform mr-3",
                    {
                      "stroke-black": i === cursor,
                      "stroke-white": i !== cursor,
                      "collapsed -rotate-90 relative -top-[1px]":
                        route.collapsed,
                    }
                  )}
                  onClick={() => setCollapse(i, !route.collapsed)}
                >
                  <path
                    d="M1.5 1.5L4.5 4.5L7.5 1.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
              {route.displayName}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompactView;
