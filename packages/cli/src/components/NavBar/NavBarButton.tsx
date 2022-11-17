import cx from "classnames";
import Link from "next/link";
import { colors } from "../../util/tailwind";

type NavBarButtonProps = {
  active: boolean;
  href: string;
  Icon: React.FC<IconProps>;
  name: string;
};

const NavBar: React.FC<NavBarButtonProps> = ({ active, href, Icon, name }) => {
  return (
    <Link href={href} legacyBehavior>
      <a
        title={name}
        aria-label={name}
        aria-current={active ? "page" : undefined}
        className={cx(
          "transition-transform active:scale-90 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-2xl hover:bg-gray-700",
          {
            "bg-white hover:bg-white": active,
          }
        )}
      >
        <Icon fill={active ? colors.black : colors["slate-500"]} />
      </a>
    </Link>
  );
};

export default NavBar;
