import axios from 'axios';
import { getToken } from '../utils/common';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
