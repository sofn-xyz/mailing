import React from "react";
import usePreviewHotkeys from "./hooks/usePreviewHotkeys";

type HotIFrameProps = {
  isMobile: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  src?: string;
  srcDoc?: string;
};

const HotIFrame: React.FC<HotIFrameProps> = ({
  isMobile,
  setIsMobile,
  src,
  srcDoc,
}) => {
  const { iframeRef } = usePreviewHotkeys({ setIsMobile });

  console.log(isMobile);
  return (
    <>
      <iframe src={src} srcDoc={srcDoc} ref={iframeRef} />
      <style jsx>{`
        iframe {
          width: ${isMobile ? "320px" : "100%"};
        }
      `}</style>
    </>
  );
};

export default HotIFrame;
