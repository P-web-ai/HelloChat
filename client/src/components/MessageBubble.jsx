import React from 'react';
import { motion } from 'framer-motion';

function MessageBubble({ msg, isOwn }) {
  const time = new Date(msg.ts).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'justify-end' : ''}`}
    >
      <div
        className={`${
          isOwn
            ? 'bg-gradient-to-br from-primary to-accent text-white'
            : 'bg-slate-800 text-slate-200'
        } max-w-[70%] p-3 rounded-xl my-2`}
      >
        <div className="text-xs text-slate-300 mb-1">
          {isOwn ? 'You' : msg.from}{' '}
          <span className="text-[10px] ml-2">{time}</span>
        </div>
        <div className="text-sm">{msg.text}</div>
      </div>
    </motion.div>
  );
}

export default MessageBubble;
