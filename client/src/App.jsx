import React, { useState } from 'react';
import JoinScreen from './components/JoinScreen';
import RoomSelect from './components/RoomSelect';
import ChatRoom from './components/ChatRoom';

function App() {
  const [stage, setStage] = useState('join'); // join → rooms → chat
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-transparent">
      <div className="w-full max-w-5xl bg-slate-900/60 rounded-2xl backdrop-blur-md border border-slate-700 shadow-lg overflow-hidden">
        
        {stage === 'join' && (
          <JoinScreen
            onNext={(name) => {
              setUsername(name);
              setStage('rooms');
            }}
          />
        )}

        {stage === 'rooms' && (
          <RoomSelect
            username={username}
            onEnterRoom={(roomName) => {
              setRoom(roomName);
              setStage('chat');
            }}
          />
        )}

        {stage === 'chat' && (
          <ChatRoom
            username={username}
            room={room}
            onLeave={() => setStage('rooms')}
          />
        )}

      </div>
    </div>
  );
}

export default App;
