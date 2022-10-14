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
      <div className="container m-auto hover:self-end justify-between items-center hidden md:flex">
        <div>
          <div>Subject: {data.subject ? `"${data.subject}"` : "MISSING"}</div>
          {data.to && <div>To: {data.to}</div>}
          <div>From: {data.from || "MISSING"}</div>
          {data.cc && <div>CC: {data.cc}</div>}
          {data.bcc && <div>BCC: {data.bcc}</div>}
        </div>
        <div className="bg-gray-800 px-7 py-2 rounded-xl flex justify-between items-center text-sm">
          <div>
            This email was intercepted by Mailing because
            <br />
            it was sent with NODE_ENV=development.
          </div>
          <div className="border-gray-500 pl-7 border-r h-[68px] border-dotted"></div>
          <button className="pl-7 pr-5 py-4 bg-none font-bold">
            Force Deliver
          </button>
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
          line-height: 140%;
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
