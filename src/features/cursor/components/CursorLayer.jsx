"use client";

import React from "react";
import { useCursorStore } from "../store/cursorStore";
import LiveCursor from "./LiveCursor";
import { useCursorTracking } from "../hooks/useCursorTracking";

export default function CursorLayer({ roomId = "landing-page" }) {
  useCursorTracking(roomId);

  const cursors = useCursorStore((state) => state.cursors);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {Object.entries(cursors).map(([userId, cursorData]) => {
        
        if (
          cursorData.x === null ||
          cursorData.y === null ||
          cursorData.x === undefined ||
          cursorData.y === undefined
        ) {
          return null;
        }

        return (
          <LiveCursor
            key={userId}
            x={cursorData.x}
            y={cursorData.y}
            name={cursorData.name}
            color={cursorData.color}
          />
        );
      })}
    </div>
  );
}
