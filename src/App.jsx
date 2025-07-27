import React, { useState } from 'react';
import RoomLogin from './components/RoomLogin';
import ChatRoom from './components/ChatRoom';

function App() {
  const [room, setRoom] = useState(null);
  const [user, setUser] = useState('');

  const handleJoin = (roomId, userName) => {
    setRoom(roomId);
    setUser(userName);
  };

  const handleLeave = () => {
    setRoom(null);
    setUser('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 text-blue-600">Chat Application</h1>
        
        {room ? (
          <ChatRoom roomId={room} user={user} onLeave={handleLeave} />
        ) : (
          <RoomLogin onJoin={handleJoin} />
        )}
      </div>
    </div>
  );
}

export default App;