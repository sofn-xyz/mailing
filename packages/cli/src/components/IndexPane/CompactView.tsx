import Link from "next/link";
import { useHotkeys } from "react-hotkeys-hook";
import useRoutes from "./useRoutes";
import cx from "classnames";
import usePreviewPath from "../hooks/usePreviewPath";
import { useRouter } from "next/router";

type CompactViewProps = {
  previews: [string, string[]][];
};

const CompactView: React.FC<CompactViewProps> = ({ previews }) => {
  const router = useRouter();
  const { routes, current } = useRoutes({ previews });
  const { previewFunction, previewClass } = usePreviewPath();

  useHotkeys(
    "up, down, left, right",
    (e, handler) => {
      if (!routes || typeof current !== "number") return;

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
      <div
        className={cx({
          "bg-zinc-300 rounded-2xl": !previewFunction && !previewClass,
        })}
      >
        Emails
      </div>
      {previews.map((preview) => (
        <div className="email-group" key={preview[0]}>
          <div
            className={cx("pl-2", {
              "bg-zinc-300 rounded-2xl":
                !previewFunction && previewClass === preview[0],
            })}
          >
            {preview[0]}
          </div>
          {preview[1].map((pFunction) => (
            <div
              className={cx("email-container pl-4", {
                "bg-zinc-300 rounded-2xl":
                  previewFunction === pFunction && previewClass === preview[0],
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
