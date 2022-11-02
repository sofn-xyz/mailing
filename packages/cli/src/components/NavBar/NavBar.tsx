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
      {false && (
        <div className="flex flex-col h-screen bg-gray-800">
          <nav className="flex items-center justify-center px-3 flex-col space-y-4 pt-5">
            <NavBarButton
              active={router.route === "/"}
              href="/"
              Icon={IconHome}
              name="Home"
            />
            <NavBarButton
              active={router.route === "/previews/[[...path]]"}
              href="/previews"
              Icon={IconEye}
              name="Previews"
            />
            <NavBarButton
              active={router.route === "/audiences/[[...path]]"}
              href="/audiences"
              Icon={IconAudience}
              name="Audiences"
            />
            <NavBarButton
              active={router.route === "/settings" || router.route === "/login"}
              href="/settings"
              Icon={IconGear}
              name="Settings"
            />
          </nav>
          <div className="flex flex-col items-center justify-center h-full"></div>
        </div>
      )}
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default NavBar;
