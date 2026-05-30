"use client";

import React from "react";
import { useReactionStore } from "../store/reactionStore";
import FloatingReaction from "./FloatingReaction";

export default function ReactionLayer() {
  const reactions = useReactionStore((state) => state.reactions);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {reactions.map((reaction) => (
        <FloatingReaction
          key={reaction.id}
          id={reaction.id}
          emoji={reaction.emoji}
          x={reaction.x}
          y={reaction.y}
          user={reaction.user}
        />
      ))}
    </div>
  );
}
