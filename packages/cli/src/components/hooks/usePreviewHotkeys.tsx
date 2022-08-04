import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useHotkeys } from "react-hotkeys-hook";

type Options = {
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
};

// Hotkeys for pages showing previews / intercepts
// Listen for hotkeys on the document and the iframe's
// document, so that they still work if iframe has focus.
export default function usePreviewHotkeys({ setViewMode }: Options) {
  const router = useRouter();
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "/") {
        router.push("/");
      } else if (e.key === "m") {
        setViewMode("mobile");
      } else if (e.key === "h") {
        setViewMode("html");
      } else if (e.key === "d") {
        setViewMode("desktop");
      } else if (e.key === ".") {
        setViewMode((current) =>
          current === "desktop"
            ? "mobile"
            : current === "mobile"
            ? "html"
            : "desktop"
        );
      } else if (e.key === "ArrowRight" || e.key === "right") {
      } else if (e.key === "ArrowLeft" || e.key === "left") {
      }
    },
    [router, setViewMode]
  );
  useHotkeys("m,d,h,.,left,right,/", handleKey);

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
