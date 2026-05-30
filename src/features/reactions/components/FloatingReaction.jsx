"use client";

import React from "react";
import { motion } from "framer-motion";

import { useReactionStore } from "../store/reactionStore";

export default function FloatingReaction({ id, emoji, x, y, user }) {
  const removeReaction = useReactionStore((state) => state.removeReaction);

  const startX = x !== null && x !== undefined ? `${x}%` : "50%";
  const startY = y !== null && y !== undefined ? `${y}%` : "80%";

  const seed = parseInt(id.replace(/[^0-9]/g, "").substring(0, 5) || "0", 10);
  const wobbleX = ((seed % 100) / 100 - 0.5) * 60;
  const travelY = -150 - (seed % 100);

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0,
        x: 0,
        y: 0,
      }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1.3, 1, 0.7],
        x: wobbleX,
        y: travelY,
      }}
      transition={{
        duration: 2.2,
        ease: "easeOut",
      }}
      onAnimationComplete={() => {
        removeReaction(id);
      }}
      style={{
        position: "absolute",
        left: startX,
        top: startY,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 40,
      }}
      className="flex flex-col items-center gap-1 select-none"
    >
      <span className="text-3xl filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
        {emoji}
      </span>
      {user && (
        <span
          className="text-[9px] px-1.5 py-0.5 rounded text-white font-medium border border-white/5 shadow-sm whitespace-nowrap"
          style={{
            backgroundColor: user.color || "#06b6d4",
          }}
        >
          {user.name}
        </span>
      )}
    </motion.div>
  );
}
