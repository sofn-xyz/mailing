import { useState, useMemo, createContext } from "react";

type HamburgerContextProps = {
  hamburgerOpen: boolean;
  setHamburgerOpen: (open: boolean) => void;
};

export const HamburgerContext = createContext<HamburgerContextProps>({
  hamburgerOpen: false,
  setHamburgerOpen: () => {},
});

type HamburgerProviderProps = {
  children: React.ReactNode;
};

export function HamburgerProvider({ children }: HamburgerProviderProps) {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const value = useMemo(
    () => ({ hamburgerOpen, setHamburgerOpen }),
    [hamburgerOpen]
  );

  return (
    <HamburgerContext.Provider value={value}>
      {children}
    </HamburgerContext.Provider>
  );
}
