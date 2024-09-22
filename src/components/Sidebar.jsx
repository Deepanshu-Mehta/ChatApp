import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search, LogOut, Menu, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setMessages } from '../Redux/messageSlice';
import OtherUsers from './OtherUsers';
import { setAuthUser, setOtherUsers, setSelectedUser } from '../Redux/userSlice';

const Sidebar = () => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { otherUsers } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`https://chat-app-dev-nnsc.onrender.com/api/v1/user/logout`);
      navigate('/login');
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setMessages(null));
      dispatch(setOtherUsers(null));
      dispatch(setSelectedUser(null));
    } catch (error) {
      console.log(error);
      toast.error('Logout failed. Please try again.');
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find((user) => 
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error('User not found!');
    }
  };

  return (
    <div className="bg-gray-800 h-full">
      <div className="sm:hidden flex justify-between items-center p-4">
        <h1 className="text-white text-xl font-bold">ChatPro</h1>
        <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      <div className={`
         ${isOpen ? 'block' : 
        'hidden'} sm:block h-full`}>
        <div className="p-4">
          <form 
          onSubmit={searchSubmitHandler} 
          className="flex items-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Search..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        <div className="flex-grow overflow-y-auto h-[calc(100%-8rem)] sm:h-[calc(100%-10rem)]">
          <OtherUsers />
        </div>

        <div className="p-4">
          <button
            onClick={logoutHandler}
            className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;