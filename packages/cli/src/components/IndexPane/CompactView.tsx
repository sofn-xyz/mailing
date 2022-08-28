import Link from "next/link";
import { useRouter } from "next/router";

type CompactViewProps = {
  previews: [string, string[]][];
};

const CompactView: React.FC<CompactViewProps> = ({ previews }) => {
  const router = useRouter();
  const { previewClass, previewFunction } = router.query;
  console.log(typeof previewClass, previewClass);
  console.log(typeof previewFunction, previewFunction);

  return (
    <>
      Compact
      {previews.map((preview) => (
        <div className="email-group" key={preview[0]}>
          <h2>{preview[0]}</h2>
          {preview[1].map((pFunction) => (
            <div
              className={`email-container ${
                previewFunction === pFunction && previewClass === preview[0]
                  ? " active"
                  : ""
              }`}
              key={preview[0] + ";" + pFunction}
            >
              <Link
                href={`/previews/${preview[0]}/${pFunction}`}
                shallow
                key={preview[0] + ";" + pFunction}
              >
                <a>
                  {previewFunction === pFunction && previewClass === preview[0]
                    ? " active"
                    : ""}
                  {pFunction}
                  <br />
                  <br />
                </a>
              </Link>
            </div>
          ))}
        </div>
      ))}
      <style jsx>{`
        .active {
        }
      `}</style>
    </>
  );
};

export default CompactView;
