import Link from "next/link";
import { useRouter } from "next/router";
import { useHotkeys } from "react-hotkeys-hook";
import { flatten } from "lodash";

type CompactViewProps = {
  previews: [string, string[]][];
};

const CompactView: React.FC<CompactViewProps> = ({ previews }) => {
  // const useState()
  const router = useRouter();
  const { previewClass, previewFunction } = router.query;
  // previewClass = previewClass.toString();

  useHotkeys("up, down, left, right", (e, handler) => {
    // console.log("ok", handler.key);
    if (handler.key === "up") {
      // const flat = flatten(flatten(previews));
      // const next =
      //   flat[(flat.indexOf(previewFunction?.toString() || previewClass) - 1) % flat.length];
      // console.log(next);
    } else if (handler.key === "down") {
    } else if (handler.key === "right") {
    } else if (handler.key === "left") {
    }
  });

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
