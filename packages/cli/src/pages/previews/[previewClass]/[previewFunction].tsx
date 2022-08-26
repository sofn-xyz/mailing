import React, {
  JSXElementConstructor,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
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

  const preview = render(component);

  return {
    props: { initialData: { preview, previews: previewTree() } },
    revalidate: 1,
  };
};

type Data = {
  preview: ShowPreviewResponseBody;
  previews: [string, string[]][];
};

type PreviewProps = {
  initialData: Data;
};

async function fetchJson(url: string) {
  const response = await fetch(url);
  return await response.json();
}

const Preview: NextPage<PreviewProps> = ({ initialData }) => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [data, setData] = useState<Data | null>(initialData);
  const fetchData = useCallback(async () => {
    const json = await Promise.all([
      fetchJson(`/api/${document.location.pathname}`),
      fetchJson("/api/previews"),
    ]);
    setData({
      preview: json[0],
      previews: json[1],
    });
  }, [setData]);
  useLiveReload(fetchData);

  const navigateTo = useCallback(
    (previewClass, previewFunction) => {
      console.log(previewClass, previewFunction);
    },
    [router]
  );

  const { previewClass, previewFunction } = router.query;
  const { preview, previews } = data;

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
      <div className="left-pane">{JSON.stringify(previews)}</div>
      <div className="right-pane">
        {!!preview?.errors.length && <MjmlErrors errors={preview?.errors} />}
        {preview?.html && !preview?.errors.length && (
          <HotIFrame
            srcDoc={preview.html}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        )}
      </div>

      <style jsx>{`
        .left-pane {
          height: calc(100vh - 65px);
          display: inline-block;
          max-width: 300px;
          vertical-align: top;
        }
        .right-pane {
          display: inline-block;
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
      `}</style>
    </div>
  );
};

export default Preview;
