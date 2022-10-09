import React, { useCallback, useState } from "react";
import useHotkeys from "@reecelucas/react-use-hotkeys";

type Options = {
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
};

export const hotkeysMap = {
  escapeFullScreen: "Escape",
  toggleFullScreen: "Meta+.",
  viewModeDesktop: "1",
  viewModeHTML: "3",
  viewModeMobile: "2",
  viewModeNext: "]",
  viewModePrevious: "[",
};

const viewModeOrder: ViewMode[] = ["desktop", "mobile", "html"];

// Hotkeys for pages showing previews / intercepts
// Listen for hotkeys on the document and the iframe's
// document, so that they still work if iframe has focus.
export default function usePreviewHotkeys({ setViewMode }: Options) {
  const [fullScreen, setFullScreen] = useState(false);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case hotkeysMap.escapeFullScreen:
          setFullScreen(false);
          break;
        case ".":
          if (!e.metaKey) break;
          setFullScreen((current) => !current);
          break;
        case hotkeysMap.viewModeDesktop:
          setViewMode("desktop");
          break;
        case hotkeysMap.viewModeHTML:
          setViewMode("html");
          break;
        case hotkeysMap.viewModeMobile:
          setViewMode("mobile");
          break;
        case hotkeysMap.viewModeNext:
          setViewMode((viewMode) => {
            const nextIndex = viewModeOrder.indexOf(viewMode) + 1;
            return viewModeOrder[nextIndex] || viewModeOrder[0];
          });
          break;
        case hotkeysMap.viewModePrevious:
          setViewMode((viewMode) => {
            const nextIndex = viewModeOrder.indexOf(viewMode) - 1;
            return (
              viewModeOrder[nextIndex] ||
              viewModeOrder[viewModeOrder.length - 1]
            );
          });
          break;
      }
    },
    [setViewMode]
  );
  useHotkeys(Object.values(hotkeysMap), handleKey);

  const iframeRef = useCallback(
    (node: HTMLIFrameElement) => {
      if (null === node) return;
      node.onload = function onLoad() {
        const doc = node?.contentWindow?.document;
        doc?.addEventListener("keydown", handleKey);
      };
    },
    [handleKey]
  );

  return { iframeRef, fullScreen };
}
