import React from 'react';
import { FaTrash, FaFileAlt, FaFileImage, FaFilePdf } from 'react-icons/fa';
import REACT_APP_API_URL from '../../env'

const Message = ({ message, currentUser, onDelete }) => {
  const isCurrentUser = message.user === currentUser;
  const isFile = message.is_file === 1;
  const date = new Date(message.time * 1000);
  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const ext = (message.text).split(".")[(message.text).split(".").length - 1].toLowerCase()

  const getFileIcon = (filename) => {
  if (['png', 'jpg', 'jpeg', 'gif'].includes(ext)) return <FaFileImage className="mr-1" />;
  if (ext === 'pdf') return <FaFilePdf className="mr-1" />;
  return <FaFileAlt className="mr-1" />;
  };

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
        
        {isFile ? (
          <div className="flex items-center">
            {['png', 'jpg', 'jpeg', 'gif'].includes(ext) && (
              <div className="mt-2">
                <img 
                  src={REACT_APP_API_URL + `/uploads/${message.text}`} 
                  alt={message.text}
                  className="max-w-full h-auto rounded"
                />
              </div>
            ) || <div>
              {getFileIcon(message.text)}
              <a 
                href={REACT_APP_API_URL + `/uploads/${message.text}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {message.text}
              </a>
            </div>}
          </div>
        ) : (
          <div className="flex justify-between items-end">
            <p>{message.text}</p>
            {isCurrentUser && (
              <button 
                onClick={() => onDelete(message.id)}
                className="ml-2 text-white opacity-70 hover:opacity-100 transition"
              >
                <FaTrash size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;