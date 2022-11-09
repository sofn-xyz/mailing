import cx from "classnames";
import usePreviewHotkeys from "./hooks/usePreviewHotkeys";

type HotIFrameProps = {
  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
  srcDoc: string;
};

const HotIFrame: React.FC<HotIFrameProps> = ({
  viewMode,
  setViewMode,
  srcDoc,
}) => {
  const { iframeRef, fullScreen } = usePreviewHotkeys({
    setViewMode,
  });

  return (
    <>
      {viewMode === "html" ? (
        <textarea
          className={cx("code-container mono bg-black h-full", {
            "fixed top-0 left-0 right-0 bottom-0 z-50": fullScreen,
          })}
          readOnly
          value={srcDoc}
        ></textarea>
      ) : (
        <div
          className={cx("h-full", {
            "fixed top-0 left-0 right-0 bottom-0 z-50 bg-black": fullScreen,
            "py-16": viewMode === "mobile",
          })}
        >
          <div
            className={cx("frame m-auto", {
              "bg-[white] h-full": viewMode !== "mobile",
              "mobile bg-gray-800": viewMode === "mobile",
            })}
          >
            <iframe
              className={cx("bg-[white] h-full", {
                "fixed top-0 left-0 right-0 bottom-0 z-50":
                  fullScreen && viewMode !== "mobile",
              })}
              srcDoc={srcDoc}
              ref={iframeRef}
            />
          </div>
        </div>
      )}
      <style jsx>{`
        .mobile.frame {
          padding: 64px 16px 74px;
          border-radius: 32px;
          max-height: 807px;
          max-width: 409px;
        }
        .mobile iframe {
          height: 667px;
          max-width: 375px;
          background-color: white;
        }
        iframe {
          vertical-align: top;
          width: 100%;
          border: none;
        }
        .mobile {
          border: 1px dotted #333;
        }
        .code-container {
          font-size: 10px;
          white-space: pre-wrap;
          padding: 16px;
          outline: none;
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

export default HotIFrame;
