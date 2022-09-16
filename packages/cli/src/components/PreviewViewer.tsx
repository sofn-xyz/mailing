import React, { useCallback, useState } from "react";
import cx from "classnames";

import Header from "./Header";
import HotIFrame from "./HotIFrame";
import MjmlErrors from "./MjmlErrors";
import { hotkeysMap } from "./hooks/usePreviewHotkeys";
import useLiveReload from "./hooks/useLiveReload";
import IndexPane from "./IndexPane/IndexPane";
import CircleLoader from "./CircleLoader";
import usePreviewPath from "./hooks/usePreviewPath";

import type { PreviewIndexResponseBody } from "../pages/api/previews";
import MobileHeader from "./MobileHeader";

type Data = {
  preview: ShowPreviewResponseBody;
  previews: PreviewIndexResponseBody["previews"];
  previewText: PreviewIndexResponseBody["previewText"];
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
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const fetchPreviews = useCallback(async () => {
    const json = (await fetchJson("/api/previews")) as PreviewIndexResponseBody;
    setData((data: Data) => ({
      ...data,
      ...json,
    }));
  }, [setData]);

  const fetchData = useCallback(async () => {
    // fire this one async, no loader
    fetchPreviews();

    if (!(previewClass && previewFunction)) {
      setData((data: Data) => ({
        ...data,
        preview: { html: "", errors: [] },
      }));
      return;
    }

    setFetching(true);
    const json = await fetchJson(
      `/api/previews/${previewClass}/${previewFunction}`
    );
    setData((data: Data) => ({
      ...data,
      preview: json,
    }));
    setFetching(false);
  }, [setData, previewClass, previewFunction, fetchPreviews]);

  useLiveReload(fetchData);

  const { preview, previews } = data || { preview: null, previews: [] };

  return (
    <div>
      <div>
        <div
          className={cx(
            "left-pane absolute border-dotted border-r border-gray-600 w-full sm:w-[300px] sm:left-0 transition-all z-40 bg-black mt-[52px] sm:mt-0",
            {
              "opacity-100": hamburgerOpen,
              "opacity-0 sm:opacity-100 pointer-events-none sm:pointer-events-auto":
                !hamburgerOpen,
            }
          )}
        >
          <IndexPane previews={previews} previewText={data?.previewText} />
        </div>
        <div className="right-pane sm:left-[300px] sm:w-[calc(100vw-300px)]">
          {!!preview?.errors?.length && <MjmlErrors errors={preview?.errors} />}
          <div className="sm:hidden">
            <MobileHeader
              title={previewFunction || previewClass || "Emails"}
              hamburgerOpen={hamburgerOpen}
              setHamburgerOpen={setHamburgerOpen}
            />
          </div>
          {preview?.html && !preview?.errors.length ? (
            <>
              <div className="hidden sm:block">
                <Header
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
                          <span className="relative -top-1">
                            {hotkeysMap.toggleFullScreen}
                          </span>
                        </span>
                        <span className="description">Toggle full screen</span>
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
              </div>
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
          overflow: scroll;
          top: 0;
          bottom: 0;
        }
        .right-pane {
          position: relative;
          right: 0;
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
