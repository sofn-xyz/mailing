import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useHydrationFriendlyAsPath = () => {
  const { asPath } = useRouter();
  const [ssr, setSsr] = useState(true);

  useEffect(() => {
    setSsr(false);
  }, []);

  return ssr ? asPath.split("#", 1)[0] : asPath;
};
