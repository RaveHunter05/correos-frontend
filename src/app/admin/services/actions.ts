'use server';

import apiClient from '~/utils/apiClient';

import { Services } from '~/types/types';

export async function getServices() {
    try {
        const response = await apiClient.get('api/services');
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function createService(data: Partial<Services>) {
    try {
        const response = await apiClient.post('api/services', data);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

// this is needed because it doesn't accept complicated data like File, so we need a base64 string, then convert it to a buffer
export async function bulkCreateServices(data: string) {
    try {
        const base64ContentArray = data.split(',');
        const base64String = base64ContentArray[1];

        const fileBuffer = Buffer.from(base64String, 'base64');

        const bodyFormData = new FormData();

        bodyFormData.append(
            'file',
            new Blob([fileBuffer], { type: 'text/csv' })
        );
        const response = await apiClient.post(
            'api/services/bulk',
            bodyFormData
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

export async function updateService(data: Partial<Services>) {
    try {
        const { serviceId } = data;
        const response = await apiClient.put(`api/services/${serviceId}`, data);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function searchServices(name: string) {
    try {
        const response = await apiClient.get(
            `http://localhost:5148/api/services/search/${name}`
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
