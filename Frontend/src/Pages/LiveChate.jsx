import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const socket = io('http://localhost:5000'); // Adjust the URL if needed

const LiveChat = () => {
  const { register, handleSubmit, reset } = useForm();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch chat history
    const fetchChats = async () => {
      const response = await axios.get('http://localhost:5000/chats');
      setMessages(response.data);
    };

    fetchChats();

    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [msg, ...prevMessages]);
    });

    return () => {
      socket.off('chat message'); 
    };
  }, []);

  const onSubmit = (data) => {
    const UserName = JSON.parse(localStorage.getItem('user'))
    const message = { username: UserName, message: data.message }; // Replace 'User' with actual username
    socket.emit('chat message', message);
    reset();
  };

  return (
    <div className="pt-16 max-[800px]:pt-13 flex flex-col items-center dark:bg-[#121212] transition duration-300 min-h-screen">
      <div className="w-full max-w-[600px] bg-white dark:bg-[#1e1e1f] transition duration-300 ounded-lg shadow-md p-4">
        <div className="h-[400px] overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <div key={index} className="p-2 border-b dark:border-gray-700 dark:text-white transition ">
              <strong>{msg.username}: </strong>{msg.message}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex">
          <input
            type="text"
            {...register('message', { required: true })}
            className="flex-grow p-2 border rounded-l-lg focus:outline-none dark:bg-[#3a3a3c] dark:border-[#3a3a3c] dark:text-white"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default LiveChat;