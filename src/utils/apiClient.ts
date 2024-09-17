'use server';

import axios, { AxiosInstance } from 'axios';

import { cookies } from 'next/headers';

const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 6000,
    withCredentials: true,
});

apiClient.interceptors.request.use(
    (config) => {
        const accessToken = cookies().get('access-token');

        config.headers.Authorization = `Bearer ${accessToken?.value}`;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
