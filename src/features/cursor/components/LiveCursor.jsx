"use client";

import React from "react";

export default function LiveCursor({ x, y, name, color }) {
  return (
    <div
      className="absolute pointer-events-none select-none transition-[left,top] duration-[80ms] ease-out z-50 flex items-start"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          color: color || "#06b6d4",
        }}
        className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
      >
        <path
          d="M5.5 3.5v14.4c0 .4.4.6.7.3l4-3.7 3.5 6.9c.1.3.4.4.7.2l2.3-1.1c.3-.1.4-.5.2-.8l-3.5-6.9 5.2-.5c.3 0 .5-.4.2-.7L6.2 3.2c-.3-.3-.7 0-.7.3z"
          fill="currentColor"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      <div
        className="ml-2 px-2 py-1 rounded text-[10px] font-semibold text-white whitespace-nowrap shadow-[0_2px_4px_rgba(0,0,0,0.25)] border border-white/10"
        style={{
          backgroundColor: color || "#06b6d4",
        }}
      >
        {name || "Explorer"}
        
      </div>
    </div>
  );
}
