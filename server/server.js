const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// In-memory store: { roomName: { socketId: { username } } }
const rooms = {};

io.on('connection', (socket) => {
  console.log('socket connected:', socket.id);

  socket.on('join-room', ({ room, username }, callback) => {
    socket.join(room);
    socket.data.username = username;
    socket.data.room = room;

    rooms[room] = rooms[room] || {};
    rooms[room][socket.id] = { username };

    // notify users in room about updated userlist
    const users = Object.values(rooms[room]).map(u => u.username);
    io.to(room).emit('room-users', users);

    // welcome message to this user
    socket.emit('message', {
      from: 'system',
      text: `Welcome ${username} — you joined ${room}.`,
      ts: Date.now()
    });

    // notify others
    socket.to(room).emit('message', {
      from: 'system',
      text: `${username} has joined the room.`,
      ts: Date.now()
    });

    callback && callback({ ok: true });
  });

  socket.on('send-message', ({ room, text }) => {
    const username = socket.data.username || 'Unknown';
    const msg = { from: username, text, ts: Date.now() };
    io.to(room).emit('message', msg);
  });

  socket.on('disconnect', () => {
    const room = socket.data.room;
    const username = socket.data.username;
    if (room && rooms[room]) {
      delete rooms[room][socket.id];
      const users = Object.values(rooms[room]).map(u => u.username);
      io.to(room).emit('room-users', users);
      socket.to(room).emit('message', {
        from: 'system',
        text: `${username} left the room.`,
        ts: Date.now()
      });
      if (Object.keys(rooms[room]).length === 0) {
        delete rooms[room];
      }
    }
    console.log('socket disconnected:', socket.id);
  });

  // optional: create-room (server side can accept new rooms)
  socket.on('create-room', ({ roomName }, cb) => {
    rooms[roomName] = rooms[roomName] || {};
    cb && cb({ ok: true });
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Socket server running on :${PORT}`));
