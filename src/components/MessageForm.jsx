import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import FileUpload from './FileUpload';

const MessageForm = ({ onSubmit, roomId, user }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  const handleFileUpload = (fileData) => {
    // Можно добавить уведомление о загрузке файла
    console.log('File uploaded:', fileData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 m-1">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-0"
          placeholder="Type your message..."
        />
        <FileUpload roomId={roomId} user={user} onUpload={handleFileUpload} />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default MessageForm;