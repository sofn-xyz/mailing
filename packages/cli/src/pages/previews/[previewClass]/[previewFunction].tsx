import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../../components/Header";
import HotIFrame from "../../../components/HotIFrame";
import MjmlErrors from "../../../components/MjmlErrors";
import { GetStaticProps } from "next";

type Params = { previewClass: string; previewFunction: string };

export const getStaticPaths = async () => {
  let paths: {
    params: Params;
  }[] = [];

  if (process.env.NEXT_PUBLIC_STATIC) {
    const res = await fetch("http://localhost:3883/previews.json");
    const previews: [string, string[]][] = await res.json();

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
  }

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { previewFunction, previewClass } = context.params as Params;
  const res = await fetch(
    `http://localhost:3883/previews/${previewClass}/${previewFunction}.json`
  );
  const initialData = await res.json();

  return {
    props: { initialData },
    revalidate: 1,
  };
};

const Preview = ({ initialData }: { initialData: ShowPreviewResponseBody }) => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [data, setData] = useState<ShowPreviewResponseBody | null>(
    process.env.NEXT_PUBLIC_STATIC ? initialData : null
  );

  useEffect(() => {
    // TODO: exit if not in dev

    const fetchPreview = async () => {
      const response = await fetch(`${document.location.pathname}.json`);
      setData(await response.json());
    };

    const interval = window.setInterval(async function checkForReload() {
      const shouldReload = await fetch("/should_reload.json");
      const json = await shouldReload.json();
      if (json["shouldReload"]) {
        fetchPreview();
      }
    }, 1200);

    fetchPreview();

    return () => {
      window.clearInterval(interval);
    };
  }, []);

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
              <span className="character">/</span>
              <span className="description">Jump to previews</span>
            </div>
            <div className="hotkey">
              <span className="character">.</span>
              <span className="description">Toggle view mode</span>
            </div>
            <div className="hotkey">
              <span className="character">D</span>
              <span className="description">Desktop view</span>
            </div>
            <div className="hotkey">
              <span className="character">M</span>
              <span className="description">Mobile view</span>
            </div>
            <div className="hotkey">
              <span className="character">H</span>
              <span className="description">HTML view</span>
            </div>
          </>
        }
      />
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
      `}</style>
    </div>
  );
};

export default Preview;
