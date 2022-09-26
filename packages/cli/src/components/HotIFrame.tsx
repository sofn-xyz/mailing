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
          className={cx("code-container mono text-black", {
            "fixed top-0 left-0 right-0 bottom-0 z-50 h-full": fullScreen,
            "h-[calc(100vh-53px)]": !fullScreen,
          })}
          readOnly
          value={srcDoc}
        ></textarea>
      ) : (
        <div
          className={cx({
            "fixed top-0 left-0 right-0 bottom-0 z-50 h-full bg-black":
              fullScreen,
          })}
        >
          <div
            className={cx("frame", {
              mobile: viewMode === "mobile",
            })}
          >
            <iframe
              className={cx("bg-neutral-50", {
                "fixed top-0 left-0 right-0 bottom-0 z-50 h-full":
                  fullScreen && viewMode !== "mobile",
                "h-[calc(100vh-53px)]": !fullScreen,
              })}
              srcDoc={srcDoc}
              ref={iframeRef}
            />
          </div>
        </div>
      )}
      <style jsx>{`
        .frame {
          margin: auto;
        }
        .mobile.frame {
          padding: 64px 16px 74px;
          max-width: 352px;
          border-radius: 32px;
          margin: 64px auto;
          background-color: #252525;
        }
        .mobile iframe {
          height: 568px;
          max-width: 320px;
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
