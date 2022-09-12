import useHotkeys from "@reecelucas/react-use-hotkeys";
import cx from "classnames";

import type { TreeRoute } from "./hooks/usePreviewTree";

type ClientViewProps = {
  treeRoutes?: TreeRoute[];
  cursor: number;
};

const ClientView: React.FC<ClientViewProps> = ({ treeRoutes, cursor }) => {
  return (
    <>
      <div className="py-4 px-3 font-bold text-sm" tabIndex={1} role="listbox">
        {treeRoutes?.map((route, i) => {
          return route.level !== 2 ? null : (
            <div
              key={route.path}
              role="option"
              aria-selected={i === cursor}
              className={cx("pb-1 pt-1 mb-1", {
                "pl-1": route.level === 2,
                "bg-blue text-black rounded-2xl": i === cursor,
              })}
            >
              {route.displayName}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ClientView;
