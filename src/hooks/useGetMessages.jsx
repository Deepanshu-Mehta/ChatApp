import { useEffect, useCallback } from 'react'
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from '../Redux/messageSlice';

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const fetchMessages = useCallback(async () => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.get(`https://chat-app-dev-nnsc.onrender.com/api/v1/message/${selectedUser?._id}`);
            dispatch(setMessages(res.data));
        } catch (error) {
            console.log(error);
        }
    }, [selectedUser?._id, dispatch]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);
}

export default useGetMessages;