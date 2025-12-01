import React, { useEffect, useState, useRef } from 'react';
import { socket } from '../utils/socket';
import MessageBubble from './MessageBubble';
import UserList from './UserList';
import { motion } from 'framer-motion';

function ChatRoom({ username, room, onLeave }) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [text, setText] = useState('');
  const messagesRef = useRef();

  useEffect(() => {
    socket.connect();

    socket.emit('join-room', { room, username }, () => {});

    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('room-users', (list) => setUsers(list));

    return () => {
      socket.off('message');
      socket.off('room-users');
      socket.disconnect();
    };
  }, [room, username]);

  useEffect(() => {
    if (messagesRef.current)
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  const send = () => {
    if (!text.trim()) return;
    socket.emit('send-message', { room, text: text.trim() });
    setText('');
  };

  return (
    <div className="grid grid-cols-12">
      {/* Chat Section */}
      <div className="col-span-9 p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold text-lg">#{room}</h3>
            <p className="text-slate-300 text-sm">
              Logged in as <span className="text-accent">{username}</span>
            </p>
          </div>
          <button
            onClick={onLeave}
            className="px-3 py-1 rounded bg-slate-700 text-white hover:bg-slate-600"
          >
            Leave
          </button>
        </div>

        <div
          ref={messagesRef}
          className="flex-1 overflow-auto p-4 rounded-lg bg-slate-800/30 border border-slate-700"
        >
          {messages.map((m, i) => (
            <MessageBubble key={i} msg={m} isOwn={m.from === username} />
          ))}
        </div>

        <div className="flex gap-3 items-center mt-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Write a message..."
            className="flex-1 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={send}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white"
          >
            Send
          </motion.button>
        </div>
      </div>

      {/* Sidebar Users */}
      <div className="col-span-3 border-l border-slate-700 bg-slate-900/20">
        <UserList users={users} />
      </div>
    </div>
  );
}

export default ChatRoom;
