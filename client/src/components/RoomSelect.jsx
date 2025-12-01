import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PREDEFINED_ROOMS = ['general', 'coding', 'design', 'random'];

function RoomSelect({ username, onEnterRoom }) {
  const [room, setRoom] = useState('');
  const [customRoom, setCustomRoom] = useState('');

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="p-6"
    >
      <h2 className="text-white text-xl font-semibold">
        Hello, <span className="text-accent">{username}</span>
      </h2>
      <p className="text-slate-300 mt-1">Pick a room or create one:</p>

      {/* Suggested Rooms */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {PREDEFINED_ROOMS.map((r) => (
          <div
            key={r}
            onClick={() => onEnterRoom(r)}
            className="cursor-pointer p-4 rounded-lg bg-slate-800/40 border border-slate-700 hover:border-accent transition"
          >
            <h3 className="text-white font-medium capitalize">{r}</h3>
            <p className="text-slate-400 text-xs">Public Room</p>
          </div>
        ))}
      </div>

      {/* Custom Room */}
      <div className="mt-6">
        <input
          value={customRoom}
          onChange={(e) => setCustomRoom(e.target.value)}
          placeholder="Create custom room"
          className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
        />

        <div className="flex justify-end mt-3">
          <button
            onClick={() => customRoom.trim() && onEnterRoom(customRoom.trim())}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white"
          >
            Create & Join
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default RoomSelect;
