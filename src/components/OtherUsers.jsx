import React from 'react';
import { useSelector } from 'react-redux';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import OtherUser from './OtherUser';

const OtherUsers = () => {
  useGetOtherUsers();
  const { otherUsers } = useSelector(store => store.user);

  if (!otherUsers || otherUsers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <p>No users available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2">
      {otherUsers.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default OtherUsers;
