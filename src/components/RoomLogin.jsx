import React, { useState, useEffect } from 'react';
import { checkRoom, createRoom } from '../services/api';

const RoomLogin = ({ onJoin }) => {
  const [room, setRoom] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    window.document.title = 'Log in'
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!room || !password || !user) {
      setError('All fields are required');
      return;
    }

    try {
      let roomId;
      if (isCreating) {
        const response = await createRoom(room, password);
        roomId = response.data.room_id;
      } else {
        const response = await checkRoom(room, password);
        if (response.data.error) {
          setError(response.data.error);
          return;
        }
        roomId = response.data.room_id;
      }
      
      onJoin(roomId, user);
    } catch (err) {
      setError(err.response?.data?.error || 'Connection error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isCreating ? 'Create Room' : 'Join Room'}
      </h2>
      
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Room Name</label>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter room name"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter room password"
          />
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setIsCreating(!isCreating)}
            className="text-blue-600 hover:text-blue-800"
          >
            {isCreating ? 'Join existing room' : 'Create new room'}
          </button>
          
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isCreating ? 'Create Room' : 'Join Room'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomLogin;