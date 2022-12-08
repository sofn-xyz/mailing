import React, { useCallback, useState, useContext } from "react";
import cx from "classnames";

import Header from "./Header";
import HotIFrame from "./HotIFrame";
import MjmlErrors from "./MjmlErrors";
import { hotkeysMap } from "./hooks/usePreviewHotkeys";
import useLiveReload from "./hooks/useLiveReload";
import IndexPane from "./IndexPane/IndexPane";
import CircleLoader from "./CircleLoader";
import usePreviewPath from "./hooks/usePreviewPath";
import { HamburgerContext } from "./HamburgerContext";

import type { PreviewIndexResponseBody } from "../pages/api/previews";
import MobileHeader from "./MobileHeader";
import HTMLLint from "./HtmlLint";

type Data = {
  preview: ShowPreviewResponseBody;
  previews: PreviewIndexResponseBody["previews"];
  previewInfo: PreviewIndexResponseBody["previewInfo"];
};

export type PreviewViewerProps = {
  initialData: Data;
};

async function fetchJson(url: string) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
  });
  return response.status === 200 ? response.json() : {};
}

const PreviewViewer: React.FC<PreviewViewerProps> = ({ initialData }) => {
  const { previewFunction, previewClass } = usePreviewPath();
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [data, setData] = useState<Data>(initialData);
  const [fetching, setFetching] = useState(false);
  const { hamburgerOpen } = useContext(HamburgerContext);

  const fetchPreviews = useCallback(async () => {
    const json = (await fetchJson("/api/previews")) as PreviewIndexResponseBody;
    setData((data: Data) => ({
      ...data,
      ...json,
    }));
  }, [setData]);

  const fetchData = useCallback(async () => {
    // fire this one async, no loader
    await fetchPreviews();

    if (!(previewClass && previewFunction)) {
      setData((data: Data) => ({
        ...data,
        preview: { html: "", errors: [], htmlLint: [] },
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
  const linterVisible = !!preview?.htmlLint?.length;

  return (
    <div className="h-screen flex">
      <div
        className={cx(
          "left-pane absolute sm:relative border-dotted border-r border-gray-600 w-full sm:w-[300px] min-w-[300px] transition-all z-40 bg-black mt-[52px] sm:mt-0",
          {
            "opacity-100": hamburgerOpen,
            "opacity-0 sm:opacity-100 pointer-events-none sm:pointer-events-auto":
              !hamburgerOpen,
          }
        )}
      >
        <IndexPane previews={previews} previewInfo={data?.previewInfo} />
      </div>
      <div className="right-pane h-full flex flex-col flex-grow">
        {!!preview?.errors?.length && <MjmlErrors errors={preview?.errors} />}
        <div className="sm:hidden">
          <MobileHeader title={previewFunction || previewClass || "Emails"} />
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
                  <div
                    className="text-xs w-[190px] space-y-2"
                    aria-label="hotkeys"
                  >
                    <div className="hotkey flex justify-between">
                      <span className="description">Toggle compact view</span>
                      <span className="character">{"`"}</span>
                    </div>
                    <div className="hotkey flex justify-between">
                      <span className="description">Desktop view</span>
                      <span className="character">
                        {hotkeysMap.viewModeDesktop}
                      </span>
                    </div>
                    <div className="hotkey flex justify-between">
                      <span className="description">Mobile view</span>
                      <span className="character">
                        {hotkeysMap.viewModeMobile}
                      </span>
                    </div>
                    <div className="hotkey flex justify-between">
                      <span className="description">HTML view</span>
                      <span className="character">
                        {hotkeysMap.viewModeHTML}
                      </span>
                    </div>
                    <div className="hotkey flex justify-between">
                      <span className="description">Next view mode</span>
                      <span className="character">
                        {hotkeysMap.viewModeNext}
                      </span>
                    </div>
                    <div className="hotkey flex justify-between">
                      <span className="description">Previous view mode</span>
                      <span className="character">
                        {hotkeysMap.viewModePrevious}
                      </span>
                    </div>
                    <div className="hotkey flex justify-between">
                      <span className="description">Toggle full screen</span>
                      <div>
                        <span className="character">&#8984;</span>
                        <span className="character">
                          {hotkeysMap.toggleFullScreen.split("+")[1]}
                        </span>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
            <div className="flex-1">
              <HotIFrame
                srcDoc={preview.html}
                viewMode={viewMode}
                setViewMode={setViewMode}
              />
            </div>
            {linterVisible && <HTMLLint htmlLint={preview.htmlLint} />}
          </>
        ) : (
          <div className="text-2xl grid h-screen place-items-center text-gray-600">
            No preview selected
          </div>
        )}
        {fetching && (
          <div
            className={cx(
              "absolute right-6 dark:stroke-black",
              linterVisible ? "bottom-16" : "bottom-6"
            )}
          >
            <CircleLoader />
          </div>
        )}
      </div>
      <style jsx>{`
        .left-pane,
        .right-pane {
          overflow: scroll;
          top: 0;
          bottom: 0;
        }
        .character {
          text-transform: uppercase;
          line-height: 100%;
          color: #bbb;
          width: 24px;
          height: 24px;
          border: solid 1px #999;
          border-radius: 2px;
          text-align: center;
          margin-left: 8px;
          display: inline-block;
          line-height: 170%;
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
      `}</style>
    </div>
  );
};

export default PreviewViewer;
