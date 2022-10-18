import { ReactElement } from "react";
import IconCode from "./icons/IconCode";
import IconMobile from "./icons/IconMobile";
import IconDesktop from "./icons/IconDesktop";
import Image from "next/image";
import cx from "classnames";

import Tooltip from "./Tooltip";
import PreviewSender from "./PreviewSender";

const white = "#E4EBFA";
const gray = "#333";

type HeaderProps = {
  previewFunction?: string;
  previewClass?: string;
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
  previous?: string;
  next?: string;
  helpContent: ReactElement;
};

const Header: React.FC<HeaderProps> = ({
  previewFunction,
  previewClass,
  viewMode,
  setViewMode,
  helpContent,
}) => {
  return (
    <div className="header">
      <div className="flex-1">{/* NECESSARY FOR LAYOUT */}</div>
      <div className="segmented-control-container">
        <div className="segmented-control">
          <button
            className={cx("desktop cursor-pointer hover:bg-gray-700", {
              active: viewMode === "desktop",
            })}
            onClick={() => setViewMode("desktop")}
          >
            <IconDesktop fill={viewMode === "desktop" ? gray : white} />
          </button>
          <button
            className={cx("mobile cursor-pointer hover:bg-gray-700", {
              active: viewMode === "mobile",
            })}
            onClick={() => setViewMode("mobile")}
          >
            <IconMobile fill={"mobile" === viewMode ? gray : white} />
          </button>
          <button
            className={cx("html cursor-pointer hover:bg-gray-700", {
              active: viewMode === "html",
            })}
            onClick={() => setViewMode("html")}
          >
            <IconCode fill={"html" === viewMode ? gray : white} />
          </button>
        </div>
      </div>
      <div className="buttons-container space-x-2">
        <Tooltip
          trigger={(show, setShow) => (
            <button
              className="help cursor-pointer hover:bg-gray-700"
              onClick={() => setShow((current) => !current)}
            >
              {show ? (
                <Image
                  key="icon-close"
                  src="/icon-close.svg"
                  width="36"
                  height="30"
                  alt="Close icon"
                  title="Close"
                />
              ) : (
                <Image
                  key="icon-question"
                  src="/icon-question.svg"
                  width="36"
                  height="24"
                  alt="Close icon"
                  title="Close"
                />
              )}
            </button>
          )}
          content={helpContent}
        />
        {!process.env.NEXT_PUBLIC_STATIC && previewFunction && previewClass && (
          <Tooltip
            trigger={(show, setShow) => (
              <button
                className="send cursor-pointer hover:bg-gray-700"
                onClick={() => setShow((current) => !current)}
              >
                {show ? (
                  <Image
                    key="icon-close"
                    src="/icon-close.svg"
                    width="36"
                    height="30"
                    alt="Close icon"
                    title="Close"
                  />
                ) : (
                  <Image
                    key="icon-send"
                    src="/icon-send.svg"
                    width="15"
                    height="13"
                    alt="Send icon"
                    title="Send a preview"
                  />
                )}
              </button>
            )}
            content={
              <PreviewSender
                previewFunction={previewFunction}
                previewClass={previewClass}
              />
            }
          />
        )}
      </div>
      <style jsx>{`
        .header {
          height: 52px;
          border-bottom: 1px dotted #333;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
        }
        .buttons-container {
          display: flex;
          align-items: center;
          flex-direction: row;
          justify-content: right;
        }
        .buttons-container,
        .segmented-control-container {
          flex: 1;
        }
        .index {
          display: inline-block;
        }
        .segmented-control-container {
          text-align: center;
        }
        .segmented-control {
          display: inline-flex;
          align-items: center;
        }

        button {
          height: 36px;
          border: 1px dotted #333;
          transition: background-color, box-shadow 200ms ease-out;
          text-align: center;
        }

        a {
          transition: background-color, transform 200ms ease-out;
        }

        button:active {
          box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.5);
        }
        a:active {
          transform: translateY(2px);
        }
        .buttons-container {
          text-align: end;
        }
        .desktop,
        .mobile,
        .html {
          width: 59px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .desktop {
          border-right: none;
          border-top-left-radius: 16px;
          border-bottom-left-radius: 16px;
        }
        .html {
          border-left: none;
          border-top-right-radius: 16px;
          border-bottom-right-radius: 16px;
        }
        .active {
          background: #b8ceff;
          border-color: transparent;
        }
        .help,
        .send {
          width: 36px;
          border-radius: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        @media (max-width: 768px) {
          .segmented-control-container,
          .help {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;
