'use server';

import apiClient from '~/utils/apiClient';
import { AxiosResponse } from 'axios';

import dayjs from 'dayjs';

import { Spents } from '~/types/types';

export async function getSpents() {
    try {
        const getSpents = async (): Promise<AxiosResponse> => {
            const value = await apiClient.get('api/spents');
            return value;
        };

        const response = await getSpents();
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function createSpent(data: Partial<Spents>) {
    try {
        const postSpent = async (
            data: Partial<Spents>
        ): Promise<AxiosResponse> => {
            const date = dayjs(new Date()).format('YYYY-MM-DD');
            const newDate = { ...data, date };
            const value = await apiClient.post('api/spents', newDate);
            return value;
        };

        const response = await postSpent(data);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function updateSpent(data: Partial<Spents>) {
    try {
        const { spentId } = data;
        const date = dayjs(new Date()).format('YYYY-MM-DD');
        const newData = { ...data, date };
        const putSpent = async (
            data: Partial<Spents>
        ): Promise<AxiosResponse> => {
            const value = await apiClient.put(`api/spents/${spentId}`, data);
            return value;
        };

        const response = await putSpent(newData);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function searchSpent(denomination: string) {
    try {
        const response = await apiClient.get(
            `api/spents/search/${denomination}`
        );
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
