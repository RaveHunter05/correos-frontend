import axios, { AxiosInstance } from 'axios';

const apiClients: AxiosInstance = axios.create({
    baseURL: 'localhost:3000/api/v1/',
});

export default apiClients;
