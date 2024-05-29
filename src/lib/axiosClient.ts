import axios from 'axios';
import env from '@/lib/env';

const axiosClient = axios.create({
    baseURL: env.VITE_API_URL,
});

export default axiosClient;