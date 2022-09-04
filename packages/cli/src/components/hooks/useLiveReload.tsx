import { useEffect, useState } from "react";
import { LONG_POLLING_INTERVAL } from "../../commands/util/livereloadUtil";

export default function useLiveReload(onShouldReload: () => void) {
  const [vectorClock, setVectorClock] = useState(0);
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      // we don't actually want live relaoad in production, just fetch
      onShouldReload();
      return;
    }
    async function checkForReload() {
      const shouldReload = await fetch("/should_reload.json");
      const json = await shouldReload.json();
      console.log("hello", json);
      if (json["vectorClock"]) {
        onShouldReload();

        // restart the interval
        clearInterval(interval);
        interval = setInterval(checkForReload, LONG_POLLING_INTERVAL);
        checkForReload(); // leading edge
      }
    }
    let interval = setInterval(checkForReload, LONG_POLLING_INTERVAL);
    onShouldReload();
    return () => {
      clearInterval(interval);
    };
  }, [onShouldReload]);
}
