'use server';

import { AxiosResponse } from 'axios';
import { Users } from '~/types/types';
import apiClient from '~/utils/apiClient';

export async function getUsers() {
    try {
        const getUsers = async (): Promise<AxiosResponse> => {
            const value = await apiClient.get('api/users');

            console.log({ value });
            return value;
        };

        const response = await getUsers();
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            console.log({ error });
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            console.log({ error });
            throw new Error(error.message);
        }
    }
}

export async function createUser(data: Partial<Users>) {
    try {
        const postUser = async (
            data: Partial<Users>
        ): Promise<AxiosResponse> => {
            const value = await apiClient.post('register', data);
            return value;
        };

        const response = await postUser(data);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function updatePassword(data: Partial<Users>) {
    try {
        const { email } = data;
        const putUser = async (
            data: Partial<Users>
        ): Promise<AxiosResponse> => {
            const value = await apiClient.put(`changepassword`, data);
            return value;
        };

        const response = await putUser(data);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
