import cx from "classnames";

// this component is a hamburger button that opens the sidebar
// it is used in the top left corner of the docs page

type IndexButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function IndexButton({ isOpen, onClick }: IndexButtonProps) {
  // hamburger button styled with tailwind
  return (
    <button
      className="w-14 h-[52px] relative focus:outline-none"
      onClick={onClick}
    >
      <span
        className={cx(
          "block absolute left-3 top-[20px] h-[3px] w-7 text-white bg-current transform transition duration-200 ease-in-out",
          {
            "-rotate-45 translate-y-[5px]": isOpen,
          }
        )}
      ></span>
      <span
        className={cx(
          "block absolute left-3 bottom-[20px] h-[3px] w-7 text-white bg-current transform transition duration-200 ease-in-out",
          {
            "rotate-45 -translate-y-[4px]": isOpen,
          }
        )}
      ></span>
    </button>
  );
}
