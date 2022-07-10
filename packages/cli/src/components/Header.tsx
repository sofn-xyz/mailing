import { ReactElement } from "react";
import Link from "next/link";

import Tooltip from "./Tooltip";
import PreviewSender from "./PreviewSender";

type HeaderProps = {
  title: string;
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
  previous?: string;
  next?: string;
  helpContent: ReactElement;
};

const Header: React.FC<HeaderProps> = ({
  title,
  isMobile,
  setIsMobile,
  previous,
  next,
  helpContent,
}) => {
  return (
    <div id="header">
      <Link href="/">
        <a id="index">
          <span>Index</span>
        </a>
      </Link>
      <div id="email-container">
        <div id="current">{title}</div>
      </div>
      <div id="utilities">
        <button id="desktop" onClick={() => setIsMobile(false)}>
          <span>Desktop</span>
        </button>
        <button id="mobile" onClick={() => setIsMobile(true)}>
          Mobile
        </button>
        <Tooltip
          trigger={(show, setShow) => (
            <button id="help" onClick={() => setShow(true)}>
              {show ? "x" : "?"}
            </button>
          )}
          content={helpContent}
        />
        <Tooltip
          trigger={(show, setShow) => (
            <button id="send" onClick={() => setShow(true)}>
              {show ? (
                "x"
              ) : (
                <img
                  src="https://s3.amazonaws.com/lab.campsh.com/Group+141%402x.png"
                  height="12"
                  width="12"
                />
              )}
            </button>
          )}
          content={<PreviewSender />}
        />
      </div>
      <style jsx>{`
        #header {
          height: 64px;
          border-bottom: solid 1px #ccc;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 22px 0 24px;
          -webkit-font-smoothing: antialiased;
        }
        #index {
          font-size: 14px;
        }
        #email-container,
        #utilities,
        #index {
          flex: 1;
        }
        button {
          background: #fff;
          height: 40px;
          font-size: 12px;
          border: solid 1px #ccc;
          padding: 12px;
          transition: background-color, box-shadow 200ms ease-out;
          line-height: 1;
        }
        a {
          transition: background-color, transform 200ms ease-out;
        }
        a:hover span,
        button:hover {
          cursor: pointer;
          background: #ffff75;
        }
        button:active {
          box-shadow: inset 0 0 12px #9e9e00;
        }
        a:active {
          transform: translateY(2px);
        }
        #email-container {
          text-align: center;
        }
        #current {
          font-size: 14px;
        }
        #utilities {
          text-align: end;
        }
        #desktop {
          margin-right: 0;
          border-right: none;
          border-top-left-radius: 2px;
          border-bottom-left-radius: 2px;
        }
        #mobile {
          margin-right: 0;
          margin-left: 0;
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
        }
        #help {
          margin-right: 6px;
          margin-left: 8px;
        }
        #help,
        #send {
          width: 40px;
          border-radius: 100%;
        }
        #send {
          margin: 0;
        }
        #send img {
          position: relative;
          top: 1px;
        }
        @media (max-width: 768px) {
          #desktop,
          #mobile,
          #help {
            display: none;
          }
          #email-container {
            flex: 6;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;
