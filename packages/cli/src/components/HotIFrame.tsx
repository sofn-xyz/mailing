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

  return (
    <>
      <div className={`frame ${isMobile ? " mobile" : ""}`}>
        <iframe src={src} srcDoc={srcDoc} ref={iframeRef} />
      </div>
      <style jsx>{`
        .frame {
          margin: auto;
          display: block;
        }
        .mobile.frame {
          padding: 64px 16px 74px;
          max-width: 324px;
          border-radius: 32px;
          margin: 64px auto;
        }
        .mobile iframe {
          height: 568px;
          max-width: 320px;
        }
        iframe {
          width: 100%;
          border: none;
          height: calc(100vh - 65px);
        }
        .mobile,
        .mobile iframe {
          border: 2px solid #ccc;
        }
      `}</style>
    </>
  );
};

export default HotIFrame;
