'use server';

import apiClient from '~/utils/apiClient';

interface IncomeInterface {
    informType: string;
    initialDate: Date | string;
    endDate: Date | string;
}

export async function incomeInform(data: IncomeInterface) {
    const { informType, initialDate, endDate } = data;
    try {
        if (!initialDate || !endDate) {
            throw new Error('Dates are required');
        }

        const response = await apiClient.get(
            `api/incomes/month/${informType}/${initialDate}/${endDate}`
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

export async function expensesInform(data: IncomeInterface) {
    const { informType, initialDate, endDate } = data;
    try {
        const response = await apiClient.get(
            `api/expenses/month/${informType}/${initialDate}/${endDate}`
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
