import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../Redux/messageSlice";

const useGetRealTimeMessage = () => {
    const { socket } = useSelector(store => store.socket);
    const { messages } = useSelector(store => store.message);
    const dispatch = useDispatch();

    const handleNewMessage = useCallback((newMessage) => {
        dispatch(setMessages([...messages, newMessage]));
    }, [dispatch, messages]);

    useEffect(() => {
        socket?.on("newMessage", handleNewMessage);
        return () => socket?.off("newMessage");
    }, [socket, handleNewMessage]);
};

export default useGetRealTimeMessage;