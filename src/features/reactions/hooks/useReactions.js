import { useEffect, useCallback } from "react";
import socket from "@/shared/socket/socketClient";
import { useReactionStore } from "../store/reactionStore";

export const useReactions = (roomId = "landing-page") => {
  const addReaction = useReactionStore((state) => state.addReaction);
  const clearReactions = useReactionStore((state) => state.clearReactions);

  useEffect(() => {
    const handleNewReaction = (reaction) => {
      addReaction(reaction);
    };

    socket.on("reaction:new", handleNewReaction);

    return () => {
      socket.off("reaction:new", handleNewReaction);
      clearReactions();
    };
  }, [roomId, addReaction, clearReactions]);

  const sendReaction = useCallback((emoji, x = null, y = null) => {
    const userId = localStorage.getItem("nexus_user_id");
    const userName = localStorage.getItem("nexus_user_name") || `Explorer_${userId?.substring(0, 8)}`;
    const userColor = localStorage.getItem("nexus_user_color") || "#06b6d4";

    if (!userId) return;

    socket.emit("reaction:add", {
      roomId,
      reaction: {
        emoji,
        x,
        y,
        user: {
          id: userId,
          name: userName,
          color: userColor
        }
      }
    });
  }, [roomId]);

  return {
    reactions: useReactionStore((state) => state.reactions),
    sendReaction,
  };
};
