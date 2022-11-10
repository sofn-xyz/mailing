import { useEffect, useRef } from "react";
import { LONG_POLLING_INTERVAL } from "../../commands/util/livereloadUtil";
import { error } from "../../util/log";

export default function useLiveReload(onShouldReload: () => void) {
  const vectorClock = useRef(0);

  useEffect(() => {
    onShouldReload();
    if (process.env.NODE_ENV === "production") {
      // we don't actually want live reload in production, just fetch
      return;
    }
    const abortController = new AbortController();
    async function checkForReload() {
      let shouldReload;
      try {
        abortController.abort();
        shouldReload = await fetch(
          `/should_reload.json?vectorClock=${vectorClock.current}`,
          {
            headers: { "Content-Type": "application/json" },
            signal: abortController.signal,
          }
        );
      } catch (e: any) {
        // allow for abortController to kill the request
        if (/AbortError/.test(e?.message)) return;
        if (
          e?.message === "Load failed" &&
          document.location.href.includes("localhost")
        ) {
          window.alert(
            "Lost connection to the local server. Please make sure mailing is running in your terminal."
          );
          return;
        }
        // otherwise, just log the error and try again
        error("useLiveReload:", e);
        checkForReload();
        return;
      }
      if (shouldReload?.status !== 200) {
        checkForReload();
        return;
      }
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
      abortController.abort();
      clearInterval(interval);
    };
  }, [vectorClock, onShouldReload]);
}
