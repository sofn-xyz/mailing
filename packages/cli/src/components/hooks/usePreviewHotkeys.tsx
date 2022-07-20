import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useHotkeys } from "react-hotkeys-hook";

type Options = {
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
};

// Hotkeys for pages showing previews / intercepts
// Listen for hotkeys on the document and the iframe's
// document, so that they still work if iframe has focus.
export default function usePreviewHotkeys({ setIsMobile }: Options) {
  const router = useRouter();
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "/") {
        router.push("/");
      } else if (e.key === "m") {
        setIsMobile(true);
      } else if (e.key === "d") {
        setIsMobile(false);
      } else if (e.key === ".") {
        setIsMobile((current) => !current);
      } else if (e.key === "ArrowRight" || e.key === "right") {
      } else if (e.key === "ArrowLeft" || e.key === "left") {
      }
    },
    [router]
  );
  useHotkeys("m,d,.,left,right,/", handleKey);

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

  return { iframeRef };
}
