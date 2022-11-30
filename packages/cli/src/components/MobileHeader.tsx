import { useContext } from "react";
import cx from "classnames";
import { HamburgerContext } from "./HamburgerContext";
import LogoMarkSmall from "./icons/LogoMarkSmall";

type MobileHeaderProps = {
  title: string;
};

const MobileHeader: React.FC<MobileHeaderProps> = ({ title }) => {
  const { hamburgerOpen, setHamburgerOpen } = useContext(HamburgerContext);

  return (
    <div className="header">
      <LogoMarkSmall />
      {title}
      <div>
        <nav>
          <button
            className="w-14 h-[52px] relative focus:outline-none"
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
                "block absolute left-3 bottom-[20px] h-[3px] w-7 text-white bg-current transform transition duration-200 ease-in-out",
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

export default MobileHeader;
