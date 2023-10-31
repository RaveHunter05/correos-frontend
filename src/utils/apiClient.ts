import axios, { AxiosInstance } from 'axios';

const baseURL = 'http://localhost:5148';

const apiClients: AxiosInstance = axios.create({
    baseURL,
});

export default apiClients;
