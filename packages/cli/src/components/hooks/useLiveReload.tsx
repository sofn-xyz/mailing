/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/

import { useEffect } from "react";
import io from "socket.io-client";

const waitUntilBundleReady = async (bundleId: number) => {
  while (true) {
    const res = await fetch(`/api/bundleId`);
    const json = await res.json();
    if (json.bundleId >= bundleId) {
      return json.bundleId === bundleId;
    }
    console.debug("Waiting for bundle to update", {
      currentBundleId: json.bundleId,
      bundleId,
    });
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
};

export default function useLiveReload(onShouldReload: () => void) {
  useEffect(() => {
    // This is required to make navigating between previews work
    onShouldReload();

    const socket = io();

    socket.on("connect", () => {
      console.debug("Connected to live reload server");
    });

    socket.on("reload", async ({ bundleId }: { bundleId: number }) => {
      console.debug("Reloading...", { bundleId });
      const shouldReload = await waitUntilBundleReady(bundleId);
      if (shouldReload) onShouldReload();
    });

    return function cleanupSocket() {
      socket.off();
      socket.disconnect();
    };
  }, [onShouldReload]);
}
