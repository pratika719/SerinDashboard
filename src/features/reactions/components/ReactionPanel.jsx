"use client";

import React, { useEffect, useRef } from "react";
import { useReactions } from "../hooks/useReactions";
import Dock from "./DockItem";

const EMOJIS = ["🔥", "❤️", "👏", "🎉", "😂", "😮"];

export default function ReactionPanel({ roomId = "landing-page" }) {
  const { sendReaction } = useReactions(roomId);
  const mousePosRef = useRef({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      mousePosRef.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      ) {
        return;
      }

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= EMOJIS.length) {
        const emoji = EMOJIS[num - 1];
        const { x, y } = mousePosRef.current;
        sendReaction(emoji, x, y);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sendReaction]);

  const handleEmojiClick = (emoji) => {
    const { x, y } = mousePosRef.current;
    sendReaction(emoji, x, y);
  };

  const dockItems = EMOJIS.map((emoji, index) => ({
    icon: <span className="text-2xl select-none filter drop-shadow-sm">{emoji}</span>,
    label: `Press ${index + 1}`,
    onClick: () => handleEmojiClick(emoji),
    className: "hover:scale-110 transition-transform duration-150 active:scale-95"
  }));

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none h-24">
      <Dock
        items={dockItems}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
        className="bg-white/5 border border-white/10 backdrop-blur-md pointer-events-auto shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
      />
    </div>
  );
}
