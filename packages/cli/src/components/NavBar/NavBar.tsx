import Image from "next/image";
import cx from "classnames";
import { useRouter } from "next/router";
import NavBarButton from "./NavBarButton";

type NavBarProps = { children: React.ReactNode };

const NavBar: React.FC<NavBarProps> = ({ children }) => {
  const router = useRouter();
  console.log("routeR:", router.route);

  return (
    <div className="flex flex-grow">
      <div className="flex flex-col h-screen bg-gray-800">
        <div className="flex items-center justify-center h-20 px-3 flex-col space-y-4">
          <NavBarButton active={router.route === "/"} href="/">
            <Image
              draggable={false}
              src="/nav-icons/house.svg"
              alt="Home"
              width={24}
              height={24}
            />
          </NavBarButton>
          <NavBarButton
            active={router.route === "/previews/[[...path]]"}
            href="/previews"
          >
            <Image
              draggable={false}
              src="/nav-icons/eye.svg"
              alt="Previews"
              width={24}
              height={24}
            />
          </NavBarButton>
        </div>
        <div className="flex flex-col items-center justify-center h-full"></div>
      </div>
      <div className="flex-grow">{children}</div>
      <style jsx>{``}</style>
    </div>
  );
};

export default NavBar;
