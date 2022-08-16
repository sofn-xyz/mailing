import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useHotkeys } from "react-hotkeys-hook";

type Options = {
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
};

const hotkeysMap = {
  showPreviews: '/',
  viewModeDesktop: '1',
  viewModeHTML: '3',
  viewModeMobile: '2',
  viewModeNext: ']',
  viewModePrevious: '[',
};

const viewModeOrder: ViewMode[] = ['desktop', 'mobile', 'html']

// Hotkeys for pages showing previews / intercepts
// Listen for hotkeys on the document and the iframe's
// document, so that they still work if iframe has focus.
export default function usePreviewHotkeys({ setViewMode }: Options) {
  const router = useRouter();
  const handleKey = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case hotkeysMap.showPreviews:
        router.push("/");
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
          return viewModeOrder[nextIndex] || viewModeOrder[viewModeOrder.length - 1];
        });
        break;
    }
  }, [router, setViewMode]);
  useHotkeys(Object.values(hotkeysMap).join(','), handleKey);

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

  const textareaRef = useCallback(
    (node: HTMLTextAreaElement) => {
      if (null === node) return;
      node.onkeydown = handleKey;
    },
    [handleKey]
  );

  return { iframeRef, textareaRef };
}
