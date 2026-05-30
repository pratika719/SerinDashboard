"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function OnlineUsers({ count, users = [] }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
        </div>
        <span className="text-sm font-medium text-cyan-50/90">
          <span className="font-bold text-cyan-400">{count}</span> users exploring live
        </span>
      </div>
      
      <div className="flex -space-x-2 overflow-hidden">
        <AnimatePresence>
          {users.slice(0, 5).map((user, i) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="inline-block h-8 w-8 rounded-full ring-2 ring-black bg-gray-800 flex items-center justify-center text-[10px] font-bold"
              style={{ borderTop: `2px solid ${user.color || '#06b6d4'}` }}
              title={user.name}
            >
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </motion.div>
          ))}
        </AnimatePresence>
        {count > 5 && (
          <div className="inline-block h-8 w-8 rounded-full ring-2 ring-black bg-gray-900 flex items-center justify-center text-[10px] font-medium text-gray-400">
            +{count - 5}
          </div>
        )}
      </div>
    </div>
  );
}