import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../../components/Header";
import { useHotkeys } from "react-hotkeys-hook";

const Preview = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Hotkeys
  // Listen for hotkeys on the document and the iframe's
  // document, so that they still work if iframe has focus.
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "/") {
        router.push("/");
      } else if (e.key === "m") {
        setIsMobile(true);
      } else if (e.key === "d") {
        setIsMobile(false);
      } else if (e.key === ".") {
        setIsMobile((current) => !current);
      } else if (e.key === "ArrowRight" || e.key === "right") {
        console.log("arrow right iframe");
      } else if (e.key === "ArrowLeft" || e.key === "left") {
        console.log("arrow left ifram");
      }
    },
    [router]
  );
  useHotkeys("m,d,.,left,right,/", handleKey);
  const iframeRef = useCallback(
    (node: HTMLIFrameElement) => {
      if (null === node) return;
      setTimeout(() => {
        const doc = node?.contentWindow?.document;
        doc?.addEventListener("keydown", handleKey);
      }, 1000); // hack, should probably listen for content
    },
    [handleKey]
  );

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
