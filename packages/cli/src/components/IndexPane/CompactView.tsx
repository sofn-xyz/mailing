import Link from "next/link";

type CompactViewProps = {
  previews: [string, string[]][];
};

const CompactView: React.FC<CompactViewProps> = ({ previews }) => {
  return (
    <>
      Compact
      {previews.map((preview) => (
        <div className="email-group" key={preview[0]}>
          <h2>{preview[0]}</h2>
          {preview[1].map((previewFunction) => (
            <div className="email-container" key={previewFunction}>
              <Link
                key={previewFunction}
                href={`/previews/${preview[0]}/${previewFunction}`}
              >
                <a className="email">{previewFunction}</a>
              </Link>
            </div>
          ))}
        </div>
      ))}
      <style jsx>{`
        .frame {
          margin: auto;
          display: block;
        }
        .mobile.frame {
          padding: 64px 16px 74px;
          max-width: 324px;
          border-radius: 32px;
          margin: 64px auto;
        }
        .mobile iframe {
          height: 568px;
          max-width: 320px;
        }
        iframe {
          width: 100%;
          border: none;
          height: calc(100vh - 65px);
        }
        .mobile,
        .mobile iframe {
          border: 1px dotted #333;
        }
        .code-container {
          font-size: 10px;
          white-space: pre-wrap;
          padding: 16px;
          outline: none;
          height: calc(100vh - 65px);
          width: 100%;
          resize: none;
        }
        @media (prefers-color-scheme: dark) {
          .code-container {
            white-space: pre-wrap;
            color: white;
            background: #212121;
          }
        }
      `}</style>
    </>
  );
};

export default CompactView;
