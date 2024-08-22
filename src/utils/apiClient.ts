'use server';

import axios, { AxiosInstance } from 'axios';

import { cookies } from 'next/headers';

const baseURL = 'http://localhost:5148/api/';

const apiClient: AxiosInstance = axios.create({
    baseURL,
    timeout: 6000,
});

apiClient.interceptors.request.use(
    (config) => {
        const accessToken = cookies().get('auth-token');

        if (accessToken) {
            if (config.headers) config.headers.token = accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
