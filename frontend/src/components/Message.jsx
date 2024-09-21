import React from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const Message = ({ message }) => {
  const { authUser, selectedUser } = useSelector(store => store.user);
  const isOwnMessage = message?.senderId === authUser?._id;

  const senderName = isOwnMessage ? authUser?.fullName : selectedUser?.fullName;
  const senderPhoto = isOwnMessage ? authUser?.profilePhoto : selectedUser?.profilePhoto;

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-end space-x-2 ${isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <img
          src={senderPhoto}
          alt={senderName}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className={`max-w-[70%] ${isOwnMessage ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'} rounded-lg px-4 py-2`}>
          <p>{message?.message}</p>
          <p className="text-xs mt-1 text-gray-400">
            {format(new Date(message?.createdAt), 'HH:mm')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;