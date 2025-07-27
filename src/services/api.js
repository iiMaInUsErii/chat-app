import axios from 'axios';
import REACT_APP_API_URL from '../../env'

const api = axios.create({
  baseURL: REACT_APP_API_URL,
  withCredentials: true,
});

export const checkRoom = (room, password) => 
  api.post('/api/check_room', { room, password });

export const createRoom = (room, password) =>
  api.post('/api/create_room', { room, password });

export const getMessages = (roomId) => 
  api.get('/api/messages', { params: { room_id: roomId } });

export const sendMessage = (roomId, user, text) => 
  api.post('/api/send_message', { room_id: roomId, user, text });

export const deleteMessage = (messageId, user) => 
  api.post('/api/delete_message', { message_id: messageId, user });

export const uploadFile = (roomId, userName, file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('room_id', roomId);
  formData.append('user_name', userName);
  
  return api.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};