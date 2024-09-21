import React from 'react';
import { useSelector } from 'react-redux';
import SendInput from './SendInput';
import Messages from './Messages';

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
  const isOnline = onlineUsers?.includes(selectedUser?._id);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center bg-gray-900 text-white h-full">
        <h1 className="text-4xl font-bold mb-4">Welcome, {authUser?.fullName}!</h1>
        <p className="text-xl">Select a conversation to start chatting.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-900 h-full">
      <div className="bg-gray-800 px-4 py-3 flex items-center space-x-3">
        <div className={`relative ${isOnline ? 'online' : ''}`}>
          <img
            src={selectedUser?.profilePhoto}
            alt={selectedUser?.fullName}
            className="w-10 h-10 rounded-full object-cover"
          />
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>
        <div>
          <p className="font-medium text-white">{selectedUser?.fullName}</p>
          <p className="text-sm text-gray-400">{isOnline ? 'Online' : 'Offline'}</p>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <Messages />
      </div>
      <SendInput />
    </div>
  );
};

export default MessageContainer;