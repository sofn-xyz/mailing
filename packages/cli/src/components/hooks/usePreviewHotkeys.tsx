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
      console.log("HOT", e.key);
      if (e.key === "/") {
        router.push("/");
      } else if (e.key === "m") {
        setIsMobile(true);
      } else if (e.key === "d") {
        setIsMobile(false);
      } else if (e.key === ".") {
        setIsMobile((current) => !current);
      } else if (e.key === "ArrowRight" || e.key === "right") {
        console.log("arrow right iframe");
      } else if (e.key === "ArrowLeft" || e.key === "left") {
        console.log("arrow left ifram");
      }
    },
    [router]
  );
  useHotkeys("m,d,.,left,right,/", handleKey);

  // setTimeout hack, should probably listen for content somehow
  const iframeRef = useCallback(
    (node: HTMLIFrameElement) => {
      if (null === node) return;
      setTimeout(() => {
        const doc = node?.contentWindow?.document;
        doc?.addEventListener("keydown", handleKey);
      }, 1000);
    },
    [handleKey]
  );

  return { iframeRef };
}
