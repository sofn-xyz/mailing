import { debounce, flatten } from "lodash";
import { NextRouter, useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type TreeRoute = {
  collapsed: boolean;
  previewClass?: string;
  previewFunction?: string;
  displayName: string;
  path: string;
  level: number;
};

const safeReplaceState = debounce(
  (router: NextRouter | null, path: string) => {
    try {
      router?.replace(path, undefined, { shallow: true });
    } catch (e) {
      // Debounce should be avoiding this error, but catch just in case:
      // SecurityError: Attempt to use history.replaceState() more than 100 times per 30 seconds
      console.error("safeReplaceState error", e);
    }
  },
  500,
  { leading: true, trailing: true }
);

const findParent = (treeRoutes: TreeRoute[], cursor: number): number => {
  if (cursor === 0) return 0;
  const currentRoute = treeRoutes[cursor];
  let res = cursor - 1;
  while (res > 0 && treeRoutes[res].level >= currentRoute.level) res--;
  return res;
};

// this hook handles navigation around the previewTree including collapsing
// the canonical state of the tree is in memory for speed
// periodically flush the current node's url to browser
export function usePreviewTree(previews: [string, string[]][]): {
  cursor: number;
  up: () => void;
  down: () => void;
  left: () => void;
  right: () => void;
  treeRoutes?: TreeRoute[];
} {
  // const { previewFunction, previewClass } = usePreviewPath();
  const router = useRouter();
  const [cursor, setCursor] = useState(0);
  const [treeRoutes, setTreeRoutes] = useState<TreeRoute[] | undefined>(
    undefined
  );

  const routes = useMemo(() => {
    const flat: TreeRoute[] = flatten([
      {
        displayName: "Emails",
        path: "/previews",
        level: 0,
        collapsed: false,
      },
      ...previews.map((p) => [
        {
          displayName: p[0],
          previewClass: p[0],
          path: `/previews/${p[0]}`,
          level: 1,
          collapsed: false,
        },
        ...(p[1].map((previewFunction) => ({
          displayName: previewFunction,
          previewClass: p[0],
          previewFunction,
          path: `/previews/${p[0]}/${previewFunction}`,
          level: 2,
          collapsed: false,
        })) as TreeRoute[]),
      ]),
    ]);
    setTreeRoutes((tr) =>
      flat.map((r, i) => ({
        ...r,
        collapsed: tr ? tr[i]?.collapsed : false,
      }))
    );
    return flat;
  }, [previews]);

  useEffect(() => {
    if (cursor === -1) return;
    safeReplaceState(router, routes[cursor]?.path);
  }, [cursor]);

  /* Navigation callbacks */
  const navigate = useCallback(
    (nextCursor: number | ((current: number) => number)) => {
      const next =
        typeof nextCursor === "number" ? nextCursor : nextCursor(cursor);
      if (typeof nextCursor === "number") {
        safeReplaceState(router, routes[nextCursor]?.path);
        setCursor(nextCursor);
      } else {
        setCursor((currentCursor) => {
          const v = nextCursor(currentCursor);
          safeReplaceState(router, routes[v]?.path);
          return v;
        });
      }
    },
    [setCursor, routes, router]
  );

  const up = useCallback(() => {
    if (!treeRoutes) return;
    // find next uncollapsed route up
    let next = cursor;
    do {
      next = (next - 1 + treeRoutes.length) % treeRoutes.length;
    } while (treeRoutes[findParent(treeRoutes, next)].collapsed);
    navigate(next);
  }, [treeRoutes, cursor, navigate]);

  const down = useCallback(() => {
    if (!treeRoutes) return;
    const currentRoute = treeRoutes[cursor];
    const nextIndex = (cursor + 1) % treeRoutes.length;
    if (currentRoute.collapsed) {
      const nextAtLevel = treeRoutes
        .slice(nextIndex)
        .findIndex((r) => r.level === currentRoute.level);
      navigate((c) =>
        nextAtLevel > -1 ? (nextAtLevel + c + 1) % treeRoutes.length : 0
      );
    } else {
      navigate(nextIndex);
    }
  }, [treeRoutes, cursor, navigate]);

  const left = useCallback(() => {
    if (!treeRoutes) return;
    const route = treeRoutes[cursor];
    const hasChildren = treeRoutes[cursor + 1]?.level > route.level;
    if (!route.collapsed && hasChildren) {
      // collapse
      setTreeRoutes((currentTreeRoutes) =>
        currentTreeRoutes?.map((r, i) =>
          cursor === i ? { ...route, collapsed: true } : r
        )
      );
    } else {
      // go to parent
      navigate(findParent(treeRoutes, cursor));
    }
  }, [treeRoutes, cursor, navigate]);

  const right = useCallback(() => {
    if (!treeRoutes) return;
    const route = treeRoutes[cursor];
    const hasChildren = treeRoutes[cursor + 1]?.level > route.level;
    if (!hasChildren) return;
    setTreeRoutes((currentTreeRoutes) =>
      currentTreeRoutes?.map((r, i) =>
        cursor === i ? { ...route, collapsed: false } : r
      )
    );
  }, [treeRoutes, cursor, navigate]);

  return {
    cursor,
    up,
    down,
    left,
    right,
    treeRoutes,
  };
}
