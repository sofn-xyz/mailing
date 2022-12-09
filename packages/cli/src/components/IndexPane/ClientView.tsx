import cx from "classnames";

import type { PreviewIndexResponseBody } from "../../pages/api/previews";
import type { TreeRoute } from "./hooks/usePreviewTree";

type ClientViewProps = {
  treeRoutes?: TreeRoute[];
  cursor: number;
  navigate: (nextCursor: number | ((current: number) => number)) => void;
  previewInfo?: PreviewIndexResponseBody["previewInfo"];
};

const ClientView: React.FC<ClientViewProps> = ({
  treeRoutes,
  cursor,
  navigate,
  previewInfo,
}) => {
  return (
    <div className="py-4 px-3 text-sm outline-none" tabIndex={1} role="listbox">
      <h2 className="font-bold text-2xl pt-4 pb-4 mx-3 border-b border-dotted border-gray-600">
        Emails
      </h2>
      {treeRoutes?.map((route, i) => {
        if (!previewInfo) return null;
        const data = previewInfo[route.path];
        const previewText = data?.previewText;
        const subject = data?.subject;

        const isCursor = i === cursor;
        return route.level !== 2 ? null : (
          <div
            key={route.path}
            role="option"
            aria-selected={isCursor}
            aria-label={`${route.previewClass} - ${route.previewFunction}`}
            className={cx("rounded-2xl cursor-pointer", {
              "pl-1": route.level === 2,
              "bg-active text-white -mt-px pt-px": isCursor,
              "hover:bg-neutral-900 hover:-mt-px hover:pt-px": !isCursor,
            })}
            onClick={() => navigate(i)}
          >
            <div
              className={cx("py-4 mx-3 border-b border-dotted", {
                "border-gray-600 hover:border-transparent": !isCursor,
                "border-transparent": isCursor,
              })}
            >
              <div className="font-bold">
                {route.previewClass} / {route.previewFunction}
              </div>
              <div className="pb-px">{subject}</div>
              <div className="line-clamp-2 leading-tight text-gray-300">
                {previewText}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClientView;
