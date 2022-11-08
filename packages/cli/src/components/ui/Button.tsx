import Link from "next/link";
import cx from "classnames";

type ButtonProps = {
  text: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  small?: boolean;
  white?: boolean;
  full?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  text,
  href,
  onClick,
  type,
  small,
  white,
  full,
}) => {
  const sharedClasses = cx(
    "rounded-2xl border-transparent font-bold leading-none text-black ease-in duration-150",
    {
      "text-sm pt-2 pb-3 px-3": small,
      "text-base pt-3 pb-4 px-4": !small,
      "bg-white": white,
      "bg-blue": !white,
      "w-full": full,
      "": !full,
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

export default Button;
