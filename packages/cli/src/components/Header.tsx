import { ReactElement } from "react";
import IconCode from "./icons/IconCode";
import IconMobile from "./icons/IconMobile";
import IconDesktop from "./icons/IconDesktop";
import Image from "next/image";
import cx from "classnames";

import Tooltip from "./Tooltip";
import PreviewSender from "./PreviewSender";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.js";

const { theme } = resolveConfig(tailwindConfig);
const white = theme?.colors?.white;

type HeaderProps = {
  title: string;
  previewFunction?: string;
  previewClass?: string;
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
  previous?: string;
  next?: string;
  helpContent: ReactElement;
};

const Header: React.FC<HeaderProps> = ({
  title,
  previewFunction,
  previewClass,
  viewMode,
  setViewMode,
  helpContent,
}) => {
  return (
    <div className="header">
      <div className="path"></div>
      <div className="segmented-control-container">
        <div className="segmented-control">
          <button
            className={cx("desktop cursor-pointer hover:bg-gray-700", {
              active: viewMode === "desktop",
            })}
            onClick={() => setViewMode("desktop")}
          >
            <IconDesktop fill={viewMode === "desktop" ? "#333" : white} />
          </button>
          <button
            className={cx("mobile", { active: viewMode === "mobile" })}
            onClick={() => setViewMode("mobile")}
          >
            <IconMobile fill={"mobile" === viewMode ? "#333" : white} />
          </button>
          <button
            className={cx("html", { active: viewMode === "html" })}
            onClick={() => setViewMode("html")}
          >
            <IconCode fill={white} />
          </button>
        </div>
      </div>
      <div className="buttons-container">
        <Tooltip
          trigger={(show, setShow) => (
            <button
              className="help"
              onClick={() => setShow((current) => !current)}
            >
              {show ? (
                <Image
                  src="/icon-close.svg"
                  width="10"
                  height="10"
                  alt="Close icon"
                  title="Close"
                />
              ) : (
                <Image
                  src="/icon-question.svg"
                  width="8"
                  height="12"
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
                className="send"
                onClick={() => setShow((current) => !current)}
              >
                {show ? (
                  <Image
                    src="/icon-close.svg"
                    width="10"
                    height="10"
                    alt="Close icon"
                    title="Close"
                  />
                ) : (
                  <Image
                    src="/icon-send.svg"
                    width="14.43"
                    height="14"
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
        .segmented-control-container,
        .path {
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
        .help {
          margin: 0 8px 0 0;
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
