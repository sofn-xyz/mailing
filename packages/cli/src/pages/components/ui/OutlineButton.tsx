import Link from "next/link";

type OutlineButtonProps = {
  text: string;
  href?: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
};

const OutlineButton: React.FC<OutlineButtonProps> = ({
  text,
  href,
  onClick,
  type,
}) => {
  return href ? (
    <Link href={href} legacyBehavior>
      <a className="rounded-xl text-base border border-emerald-700 bg-transparent pt-3 pb-4 px-4 font-bold leading-none text-green-300 hover:border-green-300 ease-in duration-150">
        {text}
      </a>
    </Link>
  ) : (
    <button
      className="rounded-xl text-base border border-emerald-700 bg-transparent pt-3 pb-4 px-4 font-bold leading-none text-green-300 hover:border-green-300 ease-in duration-150"
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default OutlineButton;
