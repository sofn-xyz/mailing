import cx from "classnames";

import type { PreviewIndexResponseBody } from "../../pages/api/previews";
import type { TreeRoute } from "./hooks/usePreviewTree";

type ClientViewProps = {
  treeRoutes?: TreeRoute[];
  cursor: number;
  navigate: (nextCursor: number | ((current: number) => number)) => void;
  previewText?: PreviewIndexResponseBody["previewText"];
};

const ClientView: React.FC<ClientViewProps> = ({
  treeRoutes,
  cursor,
  navigate,
  previewText,
}) => {
  return (
    <>
      <div className="py-4 px-3 text-sm" tabIndex={1} role="listbox">
        {treeRoutes?.map((route, i) => {
          const isCursor = i === cursor;
          return route.level !== 2 ? null : (
            <div
              key={route.path}
              role="option"
              aria-selected={isCursor}
              className={cx("pt-4", {
                "pl-1": route.level === 2,
                "bg-blue text-black rounded-2xl -mt-[2px] mb-[2px]": isCursor,
              })}
            >
              <div
                className={cx("pb-4 mx-3 border-b border-dotted", {
                  "border-white": !isCursor,
                  "border-transparent": isCursor,
                })}
              >
                <div className="font-bold">{route.previewClass}</div>
                <div className="py-[2px]">{route.previewFunction}</div>
                <div
                  className={cx("line-clamp-2", {
                    "text-gray-300": !isCursor,
                    "text-gray-600": isCursor,
                  })}
                >
                  {previewText && previewText[route.path]}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ClientView;
