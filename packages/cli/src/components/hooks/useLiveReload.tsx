/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/

import { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

const waitUntilBundleReady = async (bundleId: number) => {
  while (true) {
    const res = await fetch(`/api/bundleId`);
    const json = await res.json();
    if (json.bundleId >= bundleId) {
      return;
    }
    console.debug("Waiting for bundle to update", {
      currentBundleId: json.bundleId,
      bundleId,
    });
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
};

export default function useLiveReload(onShouldReload: () => void) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // This is required to make navigating between previews work
    onShouldReload();

    if (!socketRef.current) {
      socketRef.current = io();
    }
    const socket = socketRef.current;

    socket.on("connect", () => {
      console.debug("Connected to live reload server");
    });

    socket.on("reload", async ({ bundleId }: { bundleId: number }) => {
      console.debug("Reloading...", { bundleId });
      await waitUntilBundleReady(bundleId);
      onShouldReload();
    });

    return function cleanupSocket() {
      socket.off();
    };
  }, [onShouldReload]);
}
