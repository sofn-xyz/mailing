import { useState } from "react";
import HotIFrame from "./HotIFrame";
import Header from "./Header";

type InterceptProps = {
  data?: Intercept;
};

const Intercept: React.FC<InterceptProps> = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);
  if (!data) {
    return <></>; // loading, should be quick bc everything is local
  }

  return (
    <>
      <Header
        title={data.subject}
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
      <div className="container">
        <div>Subject: "{data.subject}"</div>
        <div>To: {data.to}</div>
        <div>From: {data.from}</div>
        <div>CC: {data.cc}</div>
        <div>BCC: {data.bcc}</div>
      </div>
      {data.html && (
        <HotIFrame
          isMobile={isMobile}
          setIsMobile={setIsMobile}
          srcDoc={data.html}
        />
      )}
      <style jsx>{`
        .container {
          border-bottom: solid 1px #ccc;
          padding: 16px 24px;
          margin: auto;
          font-size: 12px;
          line-height: 120%;
        }
        .container > * {
          margin: 4px 0;
        }
      `}</style>
    </>
  );
};

export default Intercept;
