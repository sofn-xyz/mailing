import { useState } from "react";
import { hotkeysMap } from "./hooks/usePreviewHotkeys";
import Header from "./Header";
import HotIFrame from "./HotIFrame";

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
        setViewMode={setViewMode}
        viewMode={viewMode}
        helpContent={
          <div className="text-xs w-[190px] space-y-2" aria-label="hotkeys">
            <div className="hotkey flex justify-between">
              <span className="description">Desktop view</span>
              <span className="character">{hotkeysMap.viewModeDesktop}</span>
            </div>
            <div className="hotkey flex justify-between">
              <span className="description">Mobile view</span>
              <span className="character">{hotkeysMap.viewModeMobile}</span>
            </div>
            <div className="hotkey flex justify-between">
              <span className="description">HTML view</span>
              <span className="character">{hotkeysMap.viewModeHTML}</span>
            </div>
            <div className="hotkey flex justify-between">
              <span className="description">Next view mode</span>
              <span className="character">{hotkeysMap.viewModeNext}</span>
            </div>
            <div className="hotkey flex justify-between">
              <span className="description">Previous view mode</span>
              <span className="character">{hotkeysMap.viewModePrevious}</span>
            </div>
            <div className="hotkey flex justify-between">
              <span className="description">Toggle full screen</span>
              <div>
                <span className="character">&#8984;</span>
                <span className="character">
                  {hotkeysMap.toggleFullScreen.split("+")[1]}
                </span>
              </div>
            </div>
          </div>
        }
      />
      <div className="container flex m-auto hover:self-end align-baseline justify-between">
        <div>
          <div>Subject: {data.subject ? `"${data.subject}"` : "MISSING"}</div>
          {data.to && <div>To: {data.to}</div>}
          <div>From: {data.from || "MISSING"}</div>
          {data.cc && <div>CC: {data.cc}</div>}
          {data.bcc && <div>BCC: {data.bcc}</div>}
        </div>
        <div className="bg-gray-800 px-4 py-6 rounded-xl flex justify-between align-middle">
          <div className="max-w-[300px] px-4 border-gray-500 border-r">
            This email was intercepted by Mailing because it was sent with
            NODE_ENV=development.
          </div>
          <div className="px-4">Force deliver</div>
        </div>
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
          font-size: 12px;
          line-height: 120%;
        }
        .character {
          text-transform: uppercase;
          line-height: 100%;
        }
        .character {
          color: #bbb;
          width: 24px;
          height: 24px;
          border: solid 1px #999;
          border-radius: 2px;
          text-align: center;
          margin-left: 8px;
          display: inline-block;
          line-height: 180%;
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
