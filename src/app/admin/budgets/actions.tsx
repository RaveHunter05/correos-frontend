'use server';

import { Budgets, Comments } from '~/types/types';
import apiClient from '~/utils/apiClient';

import { cookies } from 'next/headers';

export async function getBudgets() {
    try {
        const token = cookies().get('access-token')?.value;
        const response = await apiClient.get('api/budgets');
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function getBudgetsByCreatorId(creatorId: string) {
    try {
        const response = await apiClient.get(`api/budgets/user/${creatorId}`);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function getDownloadFileLink(fileName: string) {
    try {
        const response = await apiClient.get(
            `api/filess3/download?fileName=${fileName}`
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

export async function searchBudgets(name: string) {
    try {
        const response = await apiClient.get(`api/budgets/search/${name}`);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

// presigned url
export async function getPresignedUrl(data: Partial<Budgets>) {
    try {
        const response = await apiClient.get(
            `api/filess3?fileName=${data.fileName}`
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

interface FileUploadInterface {
    fileData: FormData;
    url: string;
}

export async function uploadFileS3(data: FileUploadInterface) {
    try {
        const { fileData, url } = data;

        const file = fileData.get('file');

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/octet-stream',
            },
            body: file,
        });

        return response.ok;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function createBudget(data: Partial<Budgets>) {
    try {
        const response = await apiClient.post('api/budgets', data);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function createComment(data: Partial<Comments>) {
    try {
        const response = await apiClient.post('api/comments', data);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function updateBudget(data: Partial<Budgets>) {
    try {
        const { budgetId } = data;

        if (!budgetId) {
            throw new Error('ID de presupuesto no encontrado');
        }

        const response = await apiClient.put(`api/budgets/${budgetId}`, data);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function deleteBudget(data: Partial<Budgets>) {
    try {
        const { budgetId } = data;
        const response = await apiClient.delete(`api/budgets/${budgetId}`);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
