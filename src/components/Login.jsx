import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import axios from 'axios';
import toast from "react-hot-toast"
import { useDispatch } from "react-redux";
import { setAuthUser } from '../Redux/userSlice';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const res = await axios.post(`https://chat-app-dev-nnsc.onrender.com/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      navigate("/");
      console.log(res);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: ""
    })
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 w-full">
      {/* Left Side */}
      <div className="md:w-1/2 bg-gray-800 p-8 md:p-12 lg:p-24 flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-white">Welcome Back</h2>
        <p className="mb-6 text-gray-300 text-lg md:text-xl">Login to continue using ChatPro and streamline your communication.</p>
        <p className="text-sm text-gray-400">Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300">
            Sign up
          </Link>
        </p>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 bg-white p-8 md:p-12 lg:p-24 flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Log in to your account</h2>
        <form className="space-y-6" action="" onSubmit={onSubmitHandler} method="POST">
          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input
               value={user.username}
               onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              placeholder='Username' 
              required
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input
              id="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type={showPassword ? "text" : "password"}
              required
              className="w-full pl-10 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
