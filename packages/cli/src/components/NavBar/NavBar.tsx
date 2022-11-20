import { useRouter } from "next/router";
import NavBarButton from "./NavBarButton";
import IconEye from "../icons/IconEye";
import IconHome from "../icons/IconHome";
import IconGear from "../icons/IconGear";
import IconAudience from "../icons/IconAudience";
import LogoMark from "../icons/LogoMark";

type NavBarProps = { children: React.ReactNode };

const NavBar: React.FC<NavBarProps> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex flex-grow">
      <nav className="flex px-3 flex-col space-y-4 py-5 h-screen content-between items-center justify-between border-dotted border-r border-gray-600">
        {process.env.HOME_FEATURE_FLAG && (
          <NavBarButton
            active={router.route === "/"}
            href="/"
            Icon={IconHome}
            name="Home"
          />
        )}
        <NavBarButton
          active={router.route === "/previews/[[...path]]"}
          href="/previews"
          Icon={IconEye}
          name="Previews"
        />
        <NavBarButton
          active={router.route === "/audiences"}
          href="/audiences"
          Icon={IconAudience}
          name="Audiences"
        />
        <NavBarButton
          active={router.route === "/settings"}
          href="/settings"
          Icon={IconGear}
          name="Settings"
        />
        <div className="flex-grow flex-1" />
        <LogoMark />
      </nav>
      <div className="flex-grow h-screen overflow-y-scroll">{children}</div>
    </div>
  );
};

export default NavBar;
