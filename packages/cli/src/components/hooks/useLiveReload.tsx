/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/

import { useEffect } from "react";
import io from "socket.io-client";

const waitUntilBundleReady = async (bundleId: number) => {
  while (true) {
    const res = await fetch(`/api/bundleId`);
    const json = await res.json();
    if (json.bundleId === bundleId) {
      return;
    }
    console.log("waiting for bundleId", bundleId, "current", json.bundleId);
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
};

export default function useLiveReload(
  onShouldReload: (bundleId: number) => void
) {
  useEffect(() => {
    const socket = io();

    socket.on("connect", () => {
      console.info("Connected to live reload server");
    });

    socket.on("reload", async ({ bundleId }: { bundleId: number }) => {
      console.info("Reloading...", { bundleId });
      await waitUntilBundleReady(bundleId);
      onShouldReload(bundleId);
    });
  }, [onShouldReload]);
}
