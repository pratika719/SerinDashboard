import { useEffect } from "react";
import throttle from "lodash.throttle";
import socket from "@/shared/socket/socketClient";
import { useCursorStore } from "../store/cursorStore";

export const useCursorTracking = (roomId = "landing-page") => {
  const updateCursor = useCursorStore((state) => state.updateCursor);
  const clearCursors = useCursorStore((state) => state.clearCursors);

  useEffect(() => {
    const userId = localStorage.getItem("nexus_user_id");
    const userName = localStorage.getItem("nexus_user_name") || `Explorer_${userId?.substring(0, 8)}`;
    const userColor = localStorage.getItem("nexus_user_color") || "#06b6d4";

    if (!userId) return;

    const handleCursorUpdate = (data) => {
      if (data.userId === userId) return;
      updateCursor(data.userId, data);
    };

    socket.on("cursor:update", handleCursorUpdate);

    const emitCursorMove = throttle((x, y) => {
      socket.emit("cursor:move", {
        roomId,
        userId,
        cursor: {
          x,
          y,
          name: userName,
          color: userColor,
        },
      });
    }, 40);

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      emitCursorMove(x, y);
    };

    const handleMouseLeave = () => {
      emitCursorMove(null, null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      socket.off("cursor:update", handleCursorUpdate);
      emitCursorMove.cancel();

      socket.emit("cursor:move", {
        roomId,
        userId,
        cursor: {
          x: null,
          y: null,
          name: userName,
          color: userColor,
        },
      });
      clearCursors();
    };
  }, [roomId, updateCursor, clearCursors]);
};
