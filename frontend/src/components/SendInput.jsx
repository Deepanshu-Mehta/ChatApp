import React, { useState } from 'react';
import { Send } from 'lucide-react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../Redux/messageSlice';
import { BASE_URL } from "../index";

const SendInput = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(store => store.user);
  const { messages } = useSelector(store => store.message);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/message/send/${selectedUser?._id}`,
        { message },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      dispatch(setMessages([...messages, res?.data?.newMessage]));
      setMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form 
    onSubmit={onSubmitHandler} 
    className="px-4 py-3 bg-gray-700">
      <div className="relative">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
          className="w-full px-4 py-2 pr-12 bg-gray-600 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600 focus:outline-none"
        >
          <Send className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
};

export default SendInput;