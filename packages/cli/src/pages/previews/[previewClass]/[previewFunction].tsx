import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../../components/Header";
import HotIFrame from "../../../components/HotIFrame";
import MjmlErrors from "../../../components/MjmlErrors";
import { GetStaticProps, NextPage } from "next";
import { hotkeysMap } from "../../../components/hooks/usePreviewHotkeys";
import useLiveReload from "../../../components/hooks/useLiveReload";
import { render } from "../../../util/mjml";
import {
  getPreviewComponent,
  previewTree,
} from "../../../util/moduleManifestUtil";
import CircleLoader from "../../../components/CircleLoader";

type Params = { previewClass: string; previewFunction: string };

export const getStaticPaths = async () => {
  let paths: {
    params: Params;
  }[] = [];

  const previews: [string, string[]][] = previewTree();

  previews.forEach((previewClass) => {
    paths = paths.concat(
      previewClass[1].map((previewFunction) => ({
        params: {
          previewClass: previewClass[0],
          previewFunction,
        },
      }))
    );
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { previewFunction, previewClass } = context.params as Params;
  const component = getPreviewComponent(previewClass, previewFunction);

  const initialData = render(component);

  return {
    props: { initialData },
    revalidate: 1,
  };
};

const Preview = ({ initialData }: { initialData: ShowPreviewResponseBody }) => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [data, setData] = useState<ShowPreviewResponseBody | null>(initialData);
  const [fetching, setFetching] = useState(false);
  const fetchData = useCallback(async () => {
    setFetching(true);
    const response = await fetch(`/api${document.location.pathname}`);
    const json = await response.json();
    setData(json);
    setFetching(false);
  }, [setData, setFetching]);
  useLiveReload(fetchData);

  const { previewClass, previewFunction } = router.query;

  if (!(previewClass && previewFunction)) {
    return <></>;
  }

  return (
    <div>
      <Header
        title={`${previewClass} - ${previewFunction}`}
        previewClass={previewClass as string}
        previewFunction={previewFunction as string}
        viewMode={viewMode}
        setViewMode={setViewMode}
        helpContent={
          <>
            <div className="title">Hotkeys</div>
            <div className="hotkey">
              <span className="character">{hotkeysMap.showPreviews}</span>
              <span className="description">Jump to previews</span>
            </div>
            <div className="hotkey">
              <span className="character">{hotkeysMap.viewModeNext}</span>
              <span className="description">Next view mode</span>
            </div>
            <div className="hotkey">
              <span className="character">{hotkeysMap.viewModePrevious}</span>
              <span className="description">Previous view mode</span>
            </div>
            <div className="hotkey">
              <span className="character">{hotkeysMap.viewModeDesktop}</span>
              <span className="description">Desktop view</span>
            </div>
            <div className="hotkey">
              <span className="character">{hotkeysMap.viewModeMobile}</span>
              <span className="description">Mobile view</span>
            </div>
            <div className="hotkey">
              <span className="character">{hotkeysMap.viewModeHTML}</span>
              <span className="description">HTML view</span>
            </div>
          </>
        }
      />
      {fetching && (
        <div className="loader-position">
          <CircleLoader />
        </div>
      )}
      {!!data?.errors.length && <MjmlErrors errors={data.errors} />}
      {data?.html && !data?.errors.length && (
        <HotIFrame
          srcDoc={data.html}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      )}

      <style jsx>{`
        iframe {
          margin-top: 8px;
          height: calc(100vh - 50px);
          width: 100%;
          max-width: ${viewMode === "mobile" ? "320px" : "100%"};
          border: 0;
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

export default Preview;
