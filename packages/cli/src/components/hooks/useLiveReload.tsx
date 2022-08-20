import { useEffect } from "react";

export default function useLiveReload(onShouldReload: () => void) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      onShouldReload();
      return;
    }
    const interval = window.setInterval(async function checkForReload() {
      const shouldReload = await fetch("/should_reload.json");
      const json = await shouldReload.json();
      if (json["shouldReload"]) {
        onShouldReload();
      }
    }, 1200);
    onShouldReload();
    return () => {
      clearInterval(interval);
    };
  }, [onShouldReload]);
}
