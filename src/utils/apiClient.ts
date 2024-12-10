'use server';

import axios, { AxiosInstance } from 'axios';

import { cookies } from 'next/headers';

const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        Accept: 'application/json',
    },
    timeout: 6000,
    withCredentials: true,
});

apiClient.interceptors.request.use(
    (config) => {
        const accessToken = cookies().get('access-token')?.value;

        config.headers.Authorization = `Bearer ${accessToken}`;

        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        } else {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
