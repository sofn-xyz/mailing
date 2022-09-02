import { useEffect } from "react";
import { LONG_POLLING_INTERVAL } from "../../commands/preview/server/livereload";

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
    }, LONG_POLLING_INTERVAL);
    onShouldReload();
    return () => {
      clearInterval(interval);
    };
  }, [onShouldReload]);
}
