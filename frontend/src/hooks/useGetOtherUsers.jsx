import { useEffect } from 'react';
import axios from "axios";
import { setOtherUsers } from '../Redux/userSlice';
import { useDispatch } from 'react-redux';
// import { BASE_URL } from '..';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:5000/api/v1/user`);
                // store
                console.log("other users -> ",res);
                dispatch(setOtherUsers(res.data) || []);
            } catch (error) {
                console.log(error);
                dispatch(setOtherUsers([]));
            }
        }
        fetchOtherUsers();
    }, [dispatch]);

}

export default useGetOtherUsers