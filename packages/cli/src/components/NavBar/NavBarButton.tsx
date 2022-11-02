import Image from "next/image";
import cx from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";

type NavBarButtonProps = {
  active: boolean;
  children: React.ReactNode;
  href: string;
};

const NavBar: React.FC<NavBarButtonProps> = ({ children, active, href }) => {
  return (
    <Link href={href}>
      <a
        className={cx(
          "transition-transform active:scale-90 h-9 w-9 flex items-center justify-center rounded-2xl",
          {
            "bg-gray-500 fill-red-100 stroke-red-500": active,
          }
        )}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavBar;
