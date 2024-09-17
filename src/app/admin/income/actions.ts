'use server';

import { AxiosResponse } from 'axios';
import { Incomes, UploadIncomes } from '~/types/types';
import apiClient from '~/utils/apiClient';

export async function getIncomes() {
    try {
        const getIncomes = async (): Promise<AxiosResponse> => {
            const value = await apiClient.get('api/incomes');

            return value;
        };

        const response = await getIncomes();
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            console.error({ error });
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            console.error({ error });
            throw new Error(error.message);
        }
    }
}

export async function createIncome(data: Partial<UploadIncomes>) {
    try {
        const postIncome = async (
            data: Partial<Incomes>
        ): Promise<AxiosResponse> => {
            const value = await apiClient.post('api/incomes', data);
            return value;
        };

        const response = await postIncome(data);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function updateIncome(data: Partial<UploadIncomes>) {
    try {
        const { incomeId } = data;
        const putIncome = async (
            data: Partial<Incomes>
        ): Promise<AxiosResponse> => {
            const value = await apiClient.put(`api/incomes/${incomeId}`, data);
            return value;
        };

        const response = await putIncome(data);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function searchIncome(service: string) {
    try {
        const searchIncomes = (service: string): Promise<AxiosResponse> => {
            const value = apiClient.get(`api/incomes/search/${service}`);
            return value;
        };

        const response = await searchIncomes(service);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
