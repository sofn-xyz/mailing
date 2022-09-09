import React, { useCallback, useState } from "react";
import Header from "./Header";
import HotIFrame from "./HotIFrame";
import MjmlErrors from "./MjmlErrors";
import { hotkeysMap } from "./hooks/usePreviewHotkeys";
import useLiveReload from "./hooks/useLiveReload";
import IndexPane from "./IndexPane/IndexPane";
import CircleLoader from "./CircleLoader";
import { compact } from "lodash";
import usePreviewPath from "./hooks/usePreviewPath";

type Data = {
  preview: ShowPreviewResponseBody;
  previews: [string, string[]][];
};

export type PreviewViewerProps = {
  initialData: Data;
};

async function fetchJson(url: string) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

const PreviewViewer: React.FC<PreviewViewerProps> = ({ initialData }) => {
  const { previewFunction, previewClass } = usePreviewPath();
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [data, setData] = useState<Data>(initialData);
  const [fetching, setFetching] = useState(false);

  const fetchData = useCallback(async () => {
    let url = `/api/previews`;
    if (previewClass && previewFunction) {
      url = `/api/previews/${previewClass}/${previewFunction}`;
    }
    setFetching(true);
    const json = await fetchJson(url);

    setData({
      preview: json,
      previews: json.previews,
    });
    setFetching(false);
  }, [setData, previewClass, previewFunction]);

  useLiveReload(fetchData);

  const { preview, previews } = data || { preview: null, previews: [] };

  return (
    <div>
      <div>
        <div className="left-pane border-dotted border-r border-gray-600">
          <IndexPane previews={previews} />
        </div>
        <div className="right-pane">
          {!!preview?.errors?.length && <MjmlErrors errors={preview?.errors} />}
          {preview?.html && !preview?.errors.length ? (
            <>
              <Header
                title={compact([previewClass, previewFunction]).join(" - ")}
                previewClass={previewClass as string}
                previewFunction={
                  previewFunction ? (previewFunction as string) : undefined
                }
                viewMode={viewMode}
                setViewMode={setViewMode}
                helpContent={
                  <>
                    <div className="title">Hotkeys</div>
                    <div className="hotkey">
                      <span className="character">
                        {hotkeysMap.showPreviews}
                      </span>
                      <span className="description">Jump to previews</span>
                    </div>
                    <div className="hotkey">
                      <span className="character">
                        {hotkeysMap.viewModeNext}
                      </span>
                      <span className="description">Next view mode</span>
                    </div>
                    <div className="hotkey">
                      <span className="character">
                        {hotkeysMap.viewModePrevious}
                      </span>
                      <span className="description">Previous view mode</span>
                    </div>
                    <div className="hotkey">
                      <span className="character">
                        {hotkeysMap.viewModeDesktop}
                      </span>
                      <span className="description">Desktop view</span>
                    </div>
                    <div className="hotkey">
                      <span className="character">
                        {hotkeysMap.viewModeMobile}
                      </span>
                      <span className="description">Mobile view</span>
                    </div>
                    <div className="hotkey">
                      <span className="character">
                        {hotkeysMap.viewModeHTML}
                      </span>
                      <span className="description">HTML view</span>
                    </div>
                  </>
                }
              />
              <HotIFrame
                srcDoc={preview.html}
                viewMode={viewMode}
                setViewMode={setViewMode}
              />
            </>
          ) : (
            <div className="text-2xl grid h-screen place-items-center text-gray-600">
              No preview selected
            </div>
          )}
          {fetching && (
            <div className="loader-position">
              <CircleLoader />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .left-pane,
        .right-pane {
          position: absolute;
          overflow: scroll;
          top: 0;
          bottom: 0;
        }
        .left-pane {
          width: 300px;
          left: 0;
        }
        .right-pane {
          right: 0;
          left: 300px;
          width: calc(100vw - 300px);
        }
        .title {
          padding-bottom: 4px;
        }
        .title,
        .character {
          text-transform: uppercase;
          font-size: 10px;
          line-height: 100%;
        }
        .hotkey {
          font-size: 12px;
          margin: 12px 24px 0 0;
        }
        .character {
          color: #bbb;
          width: 18px;
          height: 18px;
          border: solid 1px #999;
          border-radius: 2px;
          text-align: center;
          margin-right: 8px;
          display: inline-block;
          line-height: 170%;
        }
        .description {
          position: relative;
          top: 1.25px;
        }
        .fetch-indicator {
          z-index: 9999;
          height: 100px;
          width: 100px;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          font-size: 48px;
          background-color: pink;
        }
        .loader-position {
          position: absolute;
          bottom: 24px;
          right: 24px;
        }
      `}</style>
    </div>
  );
};

export default PreviewViewer;
