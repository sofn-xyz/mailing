import Link from "next/link";
import { ReactElement, useState } from "react";

type HeaderProps = {
  title: string;
  isMobile: boolean;
  setIsMobile: (boolean) => void;
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
  const [showHelpContent, setShowHelpContent] = useState(false);

  return (
    <div id="header">
      <Link href="/">
        <a id="index">Index</a>
      </Link>
      <div id="email">{title}</div>
      <div id="utilities">
        <button id="desktop" onClick={() => setIsMobile(false)}>
          Desktop
        </button>
        <button id="mobile" onClick={() => setIsMobile(true)}>
          Mobile
        </button>
        <button id="help" onClick={() => setShowHelpContent(true)}>
          ?
        </button>
      </div>
      <style jsx>{`
        #header {
          height: 64px;
          border-bottom: solid 1px #ccc;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 32px;
          -webkit-font-smoothing: antialiased;
        }
        #index {
          font-size: 14px;
        }
        button {
          background: #fff;
          height: 40px;
          font-size: 12px;
          border: solid 1px #ccc;
          padding: 12px;
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
          border-radius: 100%;
          width: 40px;
          margin-left: 12px;
        }
      `}</style>
    </div>
  );
};

export default Header;
