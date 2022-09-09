import { flatten } from "lodash";
import { useEffect, useState } from "react";
import usePreviewPath from "../hooks/usePreviewPath";

export type Route = {
  previewClass?: string;
  previewFunction?: string;
  displayName?: string;
  path: string;
};

export default function useRoutes({
  previews,
}: {
  previews: [string, string[]][];
  withTemplates?: boolean;
}) {
  const { previewClass, previewFunction } = usePreviewPath();
  const [routes, setRoutes] = useState<Route[] | null>(null);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    const flat: Route[] = flatten([
      {
        displayName: "Emails",
        path: "/previews",
      },
      ...previews.map((p) => [
        {
          previewClass: p[0],
          path: `/previews/${p[0]}`,
        },
        ...(p[1].map((previewFunction) => ({
          previewClass: p[0],
          previewFunction,
          path: `/previews/${p[0]}/${previewFunction}`,
        })) as Route[]),
      ]),
    ]);
    const idx = flat.findIndex(
      (p) =>
        p.previewClass === previewClass && p.previewFunction === previewFunction
    );

    setRoutes(flat);
    setCurrent(idx);
  }, [previews, setRoutes, setCurrent, previewClass, previewFunction]);

  return { routes, current };
}
