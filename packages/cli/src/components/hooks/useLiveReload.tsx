import { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

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

    socket.on("reload", () => {
      console.debug("Reloading...");
      onShouldReload();
    });
    return function cleanupSocket() {
      socket.off();
    };
  }, [onShouldReload]);
}
