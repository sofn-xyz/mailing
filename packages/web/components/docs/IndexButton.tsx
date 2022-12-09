import cx from "classnames";

// this component is a hamburger button that opens the sidebar
// it is used in the top left corner of the docs page

type IndexButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

/**
 * This button is 3 lines stacked on top of each other.
 *                   10px
 * ----------------- 2px
 *                   6px
 * ----------------- 2px
 *                   6px
 * ----------------- 2px
 *                   10px
 */

export default function IndexButton({ isOpen, onClick }: IndexButtonProps) {
  // hamburger button styled with tailwind
  return (
    <button
      className="mr-1.5 sm:mr-0 w-[24px] h-[38px] relative focus:outline-none top-0.5"
      onClick={onClick}
    >
      <span
        className={cx(
          "block absolute left-3 top-[10px] h-[2px] w-6 text-white bg-current transform transition duration-200 ease-in-out",
          {
            "-rotate-45 translate-y-[8px]": isOpen,
          }
        )}
      ></span>
      <span
        className={cx(
          "block absolute left-3 top-[18px] h-[2px] w-6 text-white bg-current transform transition duration-200 ease-in-out",
          {
            "opacity-0": isOpen,
          }
        )}
      ></span>
      <span
        className={cx(
          "block absolute left-3 bottom-[10px] h-[2px] w-6 text-white bg-current transform transition duration-200 ease-in-out",
          {
            "rotate-45 -translate-y-[8px]": isOpen,
          }
        )}
      ></span>
    </button>
  );
}
