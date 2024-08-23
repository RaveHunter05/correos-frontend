'use server';

import apiClient from '~/utils/apiClient';
import { CostCenters } from '~/types/types';

export async function getCostCenters() {
    try {
        const getCostCenters = async () => {
            const value = await apiClient.get('api/costcenters');
            return value;
        };

        const response = await getCostCenters();
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function createCostCenter(data: Partial<CostCenters>) {
    try {
        const response = await apiClient.post('api/costcenters', data);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export async function updateCostCenter(data: Partial<CostCenters>) {
    try {
        const { costCenterId } = data;
        const response = await apiClient.put(
            `api/costcenters/${costCenterId}`,
            data
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

export async function searchCostCenters(name: string) {
    try {
        const response = await apiClient.get(`api/costcenters/search/${name}`);
        return response.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error.toUpperCase());
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
