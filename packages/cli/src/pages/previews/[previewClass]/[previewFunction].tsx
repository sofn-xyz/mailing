import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../../components/Header";
import HotIFrame from "../../../components/HotIFrame";
import { string } from "yargs";

const Preview = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState<ShowPreviewResponseBody | null>(null);

  useEffect(() => {
    const interval = window.setInterval(async function checkForReload() {
      const shouldReload = await fetch("/should_reload.json");
      const json = await shouldReload.json();
      if (json["shouldReload"]) {
        window.location.reload();
      }
    }, 1200);

    const fetchPreview = async () => {
      const response = await fetch(`${document.location.pathname}.json`);
      setData(await response.json());
    };
    fetchPreview();

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const { previewClass, previewFunction } = router.query;

  if (!(previewClass && previewFunction)) {
    return <div>loading</div>;
  }

  return (
    <div>
      <Header
        title={`${previewClass} - ${previewFunction}`}
        previewClass={previewClass as string}
        previewFunction={previewFunction as string}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
        helpContent={
          <>
            <div className="title">Hotkeys</div>
            <div className="hotkey">
              <span className="character">/</span>
              <span className="description">Jump to Index</span>
            </div>
            <div className="hotkey">
              <span className="character">.</span>
              <span className="description">Toggle desktop/mobile view</span>
            </div>
          </>
        }
      />
      {data?.html && !data?.errors && (
        <HotIFrame
          srcDoc={data.html}
          isMobile={isMobile}
          setIsMobile={setIsMobile}
        />
      )}
      {data?.errors && JSON.stringify(data.errors)}
      <style jsx>{`
        iframe {
          margin-top: 8px;
          height: calc(100vh - 50px);
          width: 100%;
          max-width: ${isMobile ? "320px" : "100%"};
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
          margin: 12px 8px 0 0;
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
