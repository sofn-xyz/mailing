import { useEffect } from "react";
import io from "Socket.IO-client";

export default function useLiveReload(onShouldReload: () => void) {
  useEffect(() => {
    const socket = io();

    socket.on("connect", () => {
      console.info("Connected to live reload server");
    });

    socket.on("reload", () => {
      console.info("Reloading...");
      onShouldReload();
    });
  }, [onShouldReload]);
}
