import { useEffect } from "react";
import { LONG_POLLING_INTERVAL } from "../../commands/preview/server/livereload";

export default function useLiveReload(onShouldReload: () => void) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      onShouldReload();
      return;
    }
    async function checkForReload() {
      const shouldReload = await fetch("/should_reload.json");
      const json = await shouldReload.json();
      let interval = setInterval(checkForReload, LONG_POLLING_INTERVAL);
      if (json["shouldReload"]) {
        onShouldReload();
        clearInterval(interval);
        interval = setInterval(checkForReload, LONG_POLLING_INTERVAL);
      }
    }
    let interval = setInterval(checkForReload, LONG_POLLING_INTERVAL);
    onShouldReload();
    return () => {
      clearInterval(interval);
    };
  }, [onShouldReload]);
}
