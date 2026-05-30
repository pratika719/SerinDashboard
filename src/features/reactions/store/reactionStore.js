import { create } from "zustand";

export const useReactionStore = create((set) => ({
  reactions: [],
  addReaction: (reaction) =>
    set((state) => {
      const nextReactions = [...state.reactions, reaction];
      if (nextReactions.length > 100) {
        nextReactions.shift();
      }
      return { reactions: nextReactions };
    }),
  removeReaction: (id) =>
    set((state) => ({
      reactions: state.reactions.filter((r) => r.id !== id),
    })),
  clearReactions: () => set({ reactions: [] }),
}));
