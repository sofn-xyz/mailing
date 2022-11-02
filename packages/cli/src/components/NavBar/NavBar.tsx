import { useRouter } from "next/router";
import NavBarButton from "./NavBarButton";
import IconEye from "../icons/IconEye";
import IconHome from "../icons/IconHome";
import IconGear from "../icons/IconGear";
import IconAudience from "../icons/IconAudience";

type NavBarProps = { children: React.ReactNode };

const NavBar: React.FC<NavBarProps> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex flex-grow">
      <div className="flex flex-col h-screen bg-gray-800">
        <div className="flex items-center justify-center px-3 flex-col space-y-4 pt-5">
          <NavBarButton
            active={router.route === "/"}
            href="/"
            Icon={IconHome}
          />
          <NavBarButton
            active={router.route === "/previews/[[...path]]"}
            href="/previews"
            Icon={IconEye}
          />
          <NavBarButton
            active={router.route === "/audiences/[[...path]]"}
            href="/audiences"
            Icon={IconAudience}
          />
          <NavBarButton
            active={router.route === "/settings" || router.route === "/login"}
            href="/settings"
            Icon={IconGear}
          />
        </div>
        <div className="flex flex-col items-center justify-center h-full"></div>
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default NavBar;
