import Link from "next/link";
import cx from "classnames";

type OutlineButtonProps = {
  text: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  small?: boolean;
};

const OutlineButton: React.FC<OutlineButtonProps> = ({
  text,
  href,
  onClick,
  type,
  small,
}) => {
  const sharedClasses = cx(
    "rounded-2xl border border-emerald-700 bg-transparent font-bold leading-none text-green-300 hover:border-green-300 ease-in duration-150",
    {
      "text-sm pt-2 pb-3 px-3": small,
      "text-base pt-3 pb-4 px-4": !small,
    }
  );
  return href ? (
    <Link href={href} legacyBehavior>
      <a className={sharedClasses}>{text}</a>
    </Link>
  ) : (
    <button className={sharedClasses} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default OutlineButton;
