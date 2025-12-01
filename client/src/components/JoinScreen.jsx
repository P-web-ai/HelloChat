import React, { useState } from 'react';
import { motion } from 'framer-motion';

function JoinScreen({ onNext }) {
  const [name, setName] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
          C
        </div>
        <div>
          <h1 className="text-white text-2xl font-semibold">Welcome to Chatter</h1>
          <p className="text-slate-300 text-sm">Enter a display name to continue</p>
        </div>
      </div>

      <div className="mt-8">
        <input
          className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none"
          placeholder="Your display name (e.g. Shikhar)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end mt-4">
          <button
            onClick={() => name.trim() && onNext(name.trim())}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-medium shadow"
          >
            Continue
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default JoinScreen;
