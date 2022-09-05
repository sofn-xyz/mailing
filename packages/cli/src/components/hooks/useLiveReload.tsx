import { useEffect, useRef } from "react";
import { LONG_POLLING_INTERVAL } from "../../commands/util/livereloadUtil";

export default function useLiveReload(onShouldReload: () => void) {
  const vectorClock = useRef(0);

  useEffect(() => {
    onShouldReload();
    if (process.env.NODE_ENV === "production") {
      // we don't actually want live relaoad in production, just fetch
      return;
    }
    async function checkForReload() {
      const shouldReload = await fetch(
        `/should_reload.json?vectorClock=${vectorClock.current}`,
        { headers: { "Content-Type": "application/json" } }
      );
      const json = await shouldReload.json();
      if (json["vectorClock"] > vectorClock.current) {
        vectorClock.current = json["vectorClock"];
        onShouldReload();
        checkForReload();
      }
    }
    const interval = setInterval(checkForReload, LONG_POLLING_INTERVAL);
    checkForReload();
    return () => {
      clearInterval(interval);
    };
  }, [vectorClock]);
}
