import { io } from 'socket.io-client';

const SERVER = import.meta.env.VITE_SERVER_URL || 'http://localhost:4000';

// create socket instance but do NOT auto-connect
export const socket = io(SERVER, {
  autoConnect: false,
});
