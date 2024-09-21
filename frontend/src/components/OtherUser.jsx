import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../Redux/userSlice';

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector(store => store.user);
  const isOnline = onlineUsers?.includes(user._id);

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };
  

  return (
    <div
      onClick={() => selectedUserHandler(user)}
      className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 ${
        selectedUser?._id === user?._id ? 'bg-blue-600 text-white': 'hover:bg-gray-700 text-gray-300'}`}>
      <div className={`relative ${isOnline ? 'online' : ''}`}>
        <img
          src={user?.profilePhoto}
          alt={user?.fullName}
          className="w-10 h-10 rounded-full object-cover"
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        )}
      </div>
      <div className="flex-1">
        <p className="font-medium">{user?.fullName}</p>
      </div>
    </div>
  );
};

export default OtherUser;