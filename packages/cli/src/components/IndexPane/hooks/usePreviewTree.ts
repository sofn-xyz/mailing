import { debounce, flatten } from "lodash";
import { NextRouter, useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";

export type TreeRoute = {
  collapsed: boolean;
  previewClass?: string;
  previewFunction?: string;
  displayName: string;
  path: string;
  level: number;
};

const safeReplaceState = debounce((router: NextRouter | null, path: string) => {
  try {
    void router?.replace(path, undefined, { shallow: true });
  } catch (e) {
    // Debounce should be avoiding this error, but catch just in case:
    // SecurityError: Attempt to use history.replaceState() more than 100 times per 30 seconds
    console.error("safeReplaceState error", e);
  }
}, 200);

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
export function usePreviewTree(
  previews: [string, string[]][],
  options: { leavesOnly?: boolean } = {}
): {
  cursor: number;
  up: () => void;
  down: () => void;
  left: () => void;
  right: () => void;
  navigate: (nextCursor: number | ((current: number) => number)) => void;
  setCollapse: (cursor: number, collapse: boolean) => void;
  treeRoutes?: TreeRoute[];
} {
  const router = useRouter();
  const [cursor, setCursor] = useState(-1); // sets after previewFunction and previewClass load in?
  const [treeRoutes, setTreeRoutes] = useState<TreeRoute[] | undefined>(
    undefined
  );
  const { leavesOnly } = options;

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
    if (cursor !== -1 || !treeRoutes) return;
    const path = router.asPath.split("?")[0];
    const idx = treeRoutes.findIndex((route) => route.path === path);
    if (idx >= 0) setCursor(idx);
  }, [router.asPath, cursor, treeRoutes]);

  useEffect(() => {
    const [path, qs] = router.asPath.split("?");
    if (cursor === -1 || path === routes[cursor]?.path) return;
    safeReplaceState(
      router,
      qs ? `${routes[cursor]?.path}?${qs}` : routes[cursor]?.path
    );
  }, [cursor, router, routes]);

  /* Navigation callbacks */
  const navigate = useCallback(
    (nextCursor: number | ((current: number) => number)) => {
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
    } while (
      next !== cursor &&
      (leavesOnly
        ? treeRoutes[next].level !== 2
        : treeRoutes[findParent(treeRoutes, next)].collapsed)
    );
    navigate(next);
  }, [treeRoutes, cursor, navigate, leavesOnly]);

  const down = useCallback(() => {
    if (!treeRoutes) return;
    // find next uncollapsed route down
    let next = cursor;
    do {
      next = (next + 1) % treeRoutes.length;
    } while (
      next !== cursor &&
      (leavesOnly
        ? treeRoutes[next].level !== 2
        : treeRoutes[findParent(treeRoutes, next)].collapsed)
    );
    navigate(next);
  }, [treeRoutes, cursor, navigate, leavesOnly]);

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
  }, [treeRoutes, cursor]);

  const goToNearestLeaf = useCallback(() => {
    if (cursor === -1 || !treeRoutes) return;
    if (treeRoutes && treeRoutes[cursor].level !== 2) down();
  }, [treeRoutes, cursor, down]);

  useEffect(() => {
    if (leavesOnly) goToNearestLeaf();
  }, [leavesOnly, goToNearestLeaf]);

  const setCollapse = useCallback(
    (cursor: number, collapse: boolean) => {
      setTreeRoutes((tr) =>
        tr?.map((r, i) => ({
          ...r,
          collapsed: i === cursor ? collapse : r.collapsed,
        }))
      );
    },
    [setTreeRoutes]
  );

  return {
    cursor,
    up,
    down,
    left,
    right,
    navigate,
    setCollapse,
    treeRoutes: cursor > -1 ? treeRoutes : [],
  };
}
