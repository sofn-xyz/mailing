import { useState } from "react";
import HotIFrame from "./HotIFrame";
import Header from "./Header";

type InterceptProps = {
  data?: Intercept;
};

const Intercept: React.FC<InterceptProps> = ({ data }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  if (!data) {
    return <></>; // loading, should be quick bc everything is local
  }

  return (
    <>
      <Header
        title={data.subject || ""}
        setViewMode={setViewMode}
        viewMode={viewMode}
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
      <div className="container">
        <div>Subject: {`"${data.subject}"`}</div>
        <div>To: {data.to}</div>
        <div>From: {data.from}</div>
        <div>CC: {data.cc}</div>
        <div>BCC: {data.bcc}</div>
      </div>
      {data.html && (
        <HotIFrame
          viewMode={viewMode}
          setViewMode={setViewMode}
          srcDoc={data.html}
        />
      )}
      <style jsx>{`
        .container {
          border-bottom: dotted 1px #333;
          padding: 16px 24px;
          margin: auto;
          font-size: 12px;
          line-height: 120%;
        }
        .container > * {
          margin: 4px 0;
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
    </>
  );
};

export default Intercept;
