import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';

const HomePage = () => {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    }
  }, [authUser, navigate]);

  if (!authUser) return null;

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gray-900 w-screen">
      <div className="w-full sm:w-80 h-24 sm:h-full">
        <Sidebar />
      </div>
      <div className="flex-1 h-[calc(100vh-6rem)] sm:h-full">
        <MessageContainer />
      </div>
    </div>
  );
};

export default HomePage;