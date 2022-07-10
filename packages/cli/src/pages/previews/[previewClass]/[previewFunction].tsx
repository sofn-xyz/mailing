import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../../components/Header";
import usePreviewHotkeys from "../../../components/hooks/usePreviewHotkeys";

const Preview = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const { iframeRef } = usePreviewHotkeys({ setIsMobile });

  const { previewClass, previewFunction } = router.query;

  if (!(previewClass && previewFunction)) {
    return <div>loading</div>;
  }

  const htmlURL = `/preview-html/${previewClass}/${previewFunction}`;

  return (
    <div>
      <Header
        title={`${previewClass} - ${previewFunction}`}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
        helpContent={
          <>
            <span className="title">Hotkeys</span>
          </>
        }
      />
      <iframe ref={iframeRef} title="email-preview-frame" src={htmlURL} />
      <style jsx>{`
        iframe {
          margin-top: 8px;
          height: calc(100vh - 50px);
          width: 100%;
          max-width: ${isMobile ? "320px" : "100%"};
          border: 0;
        }
        .title {
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
};

export default Preview;
