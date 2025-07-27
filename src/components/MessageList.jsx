import React, { useEffect, useRef } from 'react';
import Message from './Message';

const MessageList = ({ messages, currentUser, onDelete }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 rounded-lg">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No messages yet. Be the first to send a message!
        </div>
      ) : (
        messages.map((message) => (
          <Message 
            key={message.id} 
            message={message} 
            currentUser={currentUser}
            onDelete={onDelete}
          />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;