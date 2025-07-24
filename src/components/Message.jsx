import React from 'react';
import { FaTrash } from 'react-icons/fa';

const Message = ({ message, currentUser, onDelete }) => {
  const isCurrentUser = message.user === currentUser;
  const date = new Date(message.time * 1000);
  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`mb-3 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
          isCurrentUser 
            ? 'bg-blue-500 text-white rounded-br-none' 
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        <div className="flex justify-between items-start mb-1">
          <span className="font-bold">{message.user}</span>
          <span className="text-xs opacity-80 ml-2">{timeString}</span>
        </div>
        <div className="flex justify-between items-end">
          <p>{message.text}</p>
          {isCurrentUser && (
            <button 
              onClick={() => onDelete(message.id)}
              className="ml-2 text-white opacity-70 hover:opacity-100 transition"
              aria-label="Delete message"
            >
              <FaTrash size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;