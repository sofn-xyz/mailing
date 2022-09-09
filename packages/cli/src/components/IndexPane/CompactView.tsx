import Link from "next/link";
import { useHotkeys } from "react-hotkeys-hook";
import cx from "classnames";
import { useRouter } from "next/router";
import Image from "next/image";

import useRoutes from "./useRoutes";
import usePreviewPath from "../hooks/usePreviewPath";
import { useState } from "react";

type CompactViewProps = {
  previews: [string, string[]][];
};

function previewPath(previewClass?: string, previewFunction?: string) {
  let path = "/previews";
  if (previewClass) path += `/${previewClass}`;
  if (previewFunction) path += `/${previewFunction}`;
  return path;
}

const CompactView: React.FC<CompactViewProps> = ({ previews }) => {
  const router = useRouter();
  const { routes, current } = useRoutes({ previews });
  const { previewFunction, previewClass } = usePreviewPath();
  const [collapsed, setCollapsed] = useState<string[]>([]);

  useHotkeys(
    "up, down, left, right",
    (_e, handler) => {
      if (!routes || typeof current !== "number") return;

      if (handler.key === "up") {
        let next = routes[(current - 1 + routes.length) % routes.length];
        while (
          next.previewClass &&
          next.previewFunction &&
          collapsed.includes(next.previewClass)
        )
          next =
            routes[(routes.indexOf(next) - 1 + routes.length) % routes.length];
        router.replace(next.path, undefined, { shallow: true });
      } else if (handler.key === "down") {
        let next = routes[(current + 1) % routes.length];
        while (
          next.previewClass &&
          next.previewFunction &&
          collapsed.includes(next.previewClass)
        )
          next = routes[(routes.indexOf(next) + 1) % routes.length];
        router.replace(next.path, undefined, { shallow: true });
      } else if (handler.key === "right") {
        const route = routes[current];
        setCollapsed((c) => c.filter((p) => p !== route.previewClass));
      } else if (handler.key === "left") {
        const route = routes[current];
        if (!route.previewClass) return;
        setCollapsed((c) => {
          const nextCollapsed = c.concat([route.previewClass!]);

          // go up
          let next = routes[(current - 1 + routes.length) % routes.length];
          while (
            next.previewClass &&
            next.previewFunction &&
            nextCollapsed.includes(next.previewClass)
          )
            next =
              routes[
                (routes.indexOf(next) - 1 + routes.length) % routes.length
              ];
          router.replace(next.path, undefined, { shallow: true });

          return nextCollapsed;
        });
      }
    },
    [routes, current, router.asPath, collapsed]
  );

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
        <div
          className={cx("pl-2", {
            "bg-blue text-black rounded-2xl": !previewFunction && !previewClass,
          })}
        >
          Emails
        </div>
        {previews.map((preview) => (
          <div className="email-group" key={preview[0]}>
            <div
              className={cx("pl-3", {
                "bg-blue text-black rounded-2xl":
                  !previewFunction && previewClass === preview[0],
              })}
            >
              {preview[0]}
            </div>
            {collapsed.includes(preview[0]) ? (
              <></>
            ) : (
              preview[1].map((pFunction) => (
                <div
                  className={cx("email-container pl-6", {
                    "bg-blue text-black rounded-2xl":
                      previewFunction === pFunction &&
                      previewClass === preview[0],
                  })}
                  key={preview[0] + ";" + pFunction}
                >
                  <Link
                    href={`/previews/${preview[0]}/${pFunction}`}
                    shallow
                    key={preview[0] + ";" + pFunction}
                  >
                    <a>{pFunction}</a>
                  </Link>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompactView;
