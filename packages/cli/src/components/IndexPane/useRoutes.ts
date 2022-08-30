import { flatten } from "lodash";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export type Route = {
  previewClass: string;
  previewFunction: string;
  path: string;
};

export default function useRoutes({
  previews,
}: {
  previews: [string, string[]][];
}) {
  const router = useRouter();
  const { previewClass, previewFunction } = router.query;
  const [routes, setRoutes] = useState<Route[]>(null);
  const [current, setCurrent] = useState<number>(null);

  useEffect(() => {
    const flat = flatten(
      previews.map((p) =>
        p[1].map((previewFunction) => ({
          previewClass: p[0],
          previewFunction,
          path: `/previews/${p[0]}/${previewFunction}`,
        }))
      )
    );
    const idx = flat.findIndex(
      (p) =>
        p.previewClass === previewClass && p.previewFunction === previewFunction
    );

    setRoutes(flat);
    setCurrent(idx);
  }, [previews, setRoutes, setCurrent]);

  return { routes, current, router };
}
