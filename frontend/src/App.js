import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from './components/HomePage';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSocket } from './Redux/socketSlice';
// import { io } from 'socket.io-client';
// import { setOnlineUsers } from './Redux/userSlice';

const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/signup",
    element:< Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  },

])

function App() {
  // const {authUser} = useSelector(store=>store.user);
  // const {socket} = useSelector(store=>store.socket);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (authUser) {
  //     const socketio = io(`${process.env.REACT_APP_API_URL}`, {
  //       query: {
  //         userId: authUser._id
  //       }
  //     });
  //     dispatch(setSocket(socketio));
  
  //     socketio?.on('getOnlineUsers', (onlineUsers) => {
  //       dispatch(setOnlineUsers(onlineUsers))
  //     });
  //     return () => socketio.close();
  //   } else {
  //     if (socket) {
  //       socket.close();
  //       dispatch(setSocket(null));
  //     }
  //   }
  // }, [authUser, dispatch, socket]);
  return (
    <div className="h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
    </div>

  );
}

export default App;
