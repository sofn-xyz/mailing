import Link from "next/link";
import { useRouter } from "next/router";
import { useHotkeys } from "react-hotkeys-hook";
import { flatten } from "lodash";
import { useCallback } from "react";
import useRoutes from "./useRoutes";

type CompactViewProps = {
  previews: [string, string[]][];
};

const CompactView: React.FC<CompactViewProps> = ({ previews }) => {
  const { routes, current, router } = useRoutes({ previews });
  const { previewFunction, previewClass } = router.query;

  useHotkeys(
    "up, down, left, right",
    (e, handler) => {
      if (handler.key === "up") {
        const next = routes[(current - 1 + routes.length) % routes.length];
        router.replace(next.path, undefined, { shallow: true });
      } else if (handler.key === "down") {
        const next = routes[(current + 1) % routes.length];
        router.replace(next.path, undefined, { shallow: true });
      } else if (handler.key === "right") {
      } else if (handler.key === "left") {
      }
    },
    [routes, current]
  );

  return (
    <div className="focus:outline-2 px-3 py-4" tabIndex={1}>
      Emails
      {previews.map((preview) => (
        <div className="email-group" key={preview[0]}>
          <div className="pl-2">{preview[0]}</div>
          {preview[1].map((pFunction) => (
            <div
              className={`email-container pl-4 ${
                previewFunction === pFunction && previewClass === preview[0]
                  ? " bg-zinc-300"
                  : ""
              }`}
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
          ))}
        </div>
      ))}
      <style jsx>{`
        .active {
          color: white;
        }
      `}</style>
    </div>
  );
};

export default CompactView;
