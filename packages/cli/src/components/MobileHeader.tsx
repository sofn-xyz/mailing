import { ReactElement } from "react";
import IconCode from "./icons/IconCode";
import IconMobile from "./icons/IconMobile";
import IconDesktop from "./icons/IconDesktop";
import Image from "next/image";
import cx from "classnames";

type HeaderProps = {
  title: string;
  hamburgerOpen: boolean;
  setHamburgerOpen: (open: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({
  title,
  hamburgerOpen,
  setHamburgerOpen,
}) => {
  return (
    <div className="header">
      <Image
        src="/logo-mark-small.svg"
        width="20"
        height="24"
        alt="Mailing logo mark"
        role="presentation"
      />
      {title}
      <div>
        <nav>
          <button
            className="w-14 h-[53px] relative focus:outline-none"
            onClick={() => setHamburgerOpen(!hamburgerOpen)}
          >
            <span
              className={cx(
                "block absolute left-3 top-[20px] h-[3px] w-7 text-white bg-current transform transition duration-200 ease-in-out",
                {
                  "-rotate-45 translate-y-[5px]": hamburgerOpen,
                }
              )}
            ></span>
            <span
              className={cx(
                "block absolute left-3 bottom-[20px] h-[3px] w-7 text-white bg-current transform  transition duration-200 ease-in-out",
                {
                  "rotate-45 -translate-y-[5px]": hamburgerOpen,
                }
              )}
            ></span>
          </button>
        </nav>
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
