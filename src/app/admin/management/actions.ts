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

export async function registerUser(data: Partial<Users>) {
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

export async function searchUser(email: string) {
    try {
        const searchUser = async (data: string): Promise<AxiosResponse> => {
            const value = await apiClient.get(`api/users/email/${email}`);
            return value;
        };

        const response = await searchUser(email);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function deleteUser(userId: number) {
    try {
        const deleteUser = async (data: number): Promise<AxiosResponse> => {
            const value = await apiClient.delete(`api/users/${userId}`);
            return value;
        };

        const response = await deleteUser(userId);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

// change password

export async function changePassword(data: Partial<Users>) {
    try {
        const changePassword = async (
            data: Partial<Users>
        ): Promise<AxiosResponse> => {
            const value = await apiClient.put('changepassword', data);
            return value;
        };

        const response = await changePassword(data);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

// change role

export async function changeRole(data: Partial<Users>) {
    try {
        const changeRole = async (
            data: Partial<Users>
        ): Promise<AxiosResponse> => {
            const value = await apiClient.put('changerole', data);
            return value;
        };

        const response = await changeRole(data);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
