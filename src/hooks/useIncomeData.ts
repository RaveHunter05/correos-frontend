import { useState, useEffect } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

export interface Income {
    incomeId: any;
    code: number;
    service: string;
    projectedAmount: number;
    executedAmount: number;
    date: Date;
}

const useIncomeData = () => {
    // current data for the hook
    const [incomeData, setIncomeData] = useState<Income[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // string to search for
    const [searchTerm, setSearchTerm] = useState<string | null>(null);

    const getIncomeData = async (): Promise<Income[]> => {
        try {
            const token = localStorage.getItem('auth-token');
            const response = await axios.get<Income[]>('/api/incomes', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.log({ error });
            return []; // or handle error accordingly
        }
    };

    const getSearchData = async (service: string): Promise<Income[]> => {
        try {
            const token = localStorage.getItem('auth-token');
            const response = await axios.get<Income[]>(
                `/api/incomes/${service}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.log({ error });
            return [];
        }
    };

    const handleSearch = (service: string) => {
        setSearchTerm(service);
    };

    useEffect(() => {
        const fetchSearch = debounce(
            async (termToSearch: string): Promise<void> => {
                setLoading(true);
                const data = await getSearchData(termToSearch);
                setIncomeData(data);
                setLoading(false);
                return;
            },
            400
        );

        const fetchIncomeData = async (): Promise<void> => {
            setLoading(true);
            const data = await getIncomeData();
            if (data) {
                setIncomeData(data);
            }
            setLoading(false);
        };
        if (!searchTerm || searchTerm === '') {
            fetchIncomeData();
            return;
        }
        fetchSearch(searchTerm);
        return;
    }, [searchTerm]);

    return { incomeData, loading, handleSearch };
};

export default useIncomeData;
