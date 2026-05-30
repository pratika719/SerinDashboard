import { create } from "zustand";

export const useCursorStore = create((set) => ({
  cursors: {},
  updateCursor: (userId, cursorData) =>
    set((state) => {
      if (
        cursorData.x === null ||
        cursorData.y === null ||
        cursorData.x === undefined ||
        cursorData.y === undefined ||
        cursorData.removed
      ) {
        const nextCursors = { ...state.cursors };
        delete nextCursors[userId];
        return { cursors: nextCursors };
      }
      return {
        cursors: {
          ...state.cursors,
          [userId]: {
            ...state.cursors[userId],
            ...cursorData,
          },
        },
      };
    }),
  removeCursor: (userId) =>
    set((state) => {
      const nextCursors = { ...state.cursors };
      delete nextCursors[userId];
      return { cursors: nextCursors };
    }),
  clearCursors: () => set({ cursors: {} }),
}));
