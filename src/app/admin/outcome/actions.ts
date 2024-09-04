'use server';

import { AxiosResponse } from 'axios';
import { Expenses, UploadExpenses } from '~/types/types';
import apiClient from '~/utils/apiClient';

export async function getExpenses() {
    try {
        const response = await apiClient.get('api/expenses');
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function createExpense(data: Partial<UploadExpenses>) {
    try {
        const postExpense = async (
            data: Partial<Expenses>
        ): Promise<AxiosResponse> => {
            const value = await apiClient.post('api/expenses', data);
            return value;
        };

        const response = await postExpense(data);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function updateExpense(data: Partial<UploadExpenses>) {
    try {
        const { expenseId } = data;
        const putExpense = async (
            data: Partial<Expenses>
        ): Promise<AxiosResponse> => {
            const value = await apiClient.put(
                `api/expenses/${expenseId}`,
                data
            );
            return value;
        };

        const response = await putExpense(data);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function searchExpenses(costcenter: string) {
    try {
        if (typeof costcenter === 'string') {
            let response;

            const searchExpenses = (
                costcenter: string
            ): Promise<AxiosResponse> => {
                const value = apiClient.get(
                    `api/expenses/search/${costcenter}`
                );
                return value;
            };
            response = await searchExpenses(costcenter);
            return response.data;
        }
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
