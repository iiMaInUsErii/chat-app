import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import { getMessages, sendMessage, deleteMessage } from '../services/api';

const ChatRoom = ({ roomId, user, onLeave }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMessages = async () => {
    try {
      const response = await getMessages(roomId);
      setMessages(response.data.messages);
      setLoading(false);
    } catch (err) {
      setError('Failed to load messages');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Обновление каждые 3 сек
    
    return () => clearInterval(interval);
  }, [roomId]);

  const handleSend = async (text) => {
    try {
      await sendMessage(roomId, user, text);
      fetchMessages(); // Обновляем сообщения после отправки
    } catch (err) {
      setError('Failed to send message');
    }
  };

  const handleDelete = async (messageId) => {
    try {
      await deleteMessage(messageId, user);
      setMessages(messages.filter(msg => msg.id !== messageId));
    } catch (err) {
      setError('Failed to delete message');
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading messages...</div>;
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Room: {roomId}</h2>
        <button
          onClick={onLeave}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Leave Room
        </button>
      </div>
      
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      
      <div className="flex flex-col flex-1 bg-white rounded-lg shadow-lg p-4">
        <MessageList 
          messages={messages} 
          currentUser={user} 
          onDelete={handleDelete} 
        />
        
        <div className="mt-4">
          <MessageForm user={user} roomId={roomId} onSubmit={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;