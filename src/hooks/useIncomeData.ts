import { useState, useEffect } from 'react';
import axios from 'axios';

interface Income {
    // Define your income interface here
}

const useIncomeData = () => {
    const [incomeData, setIncomeData] = useState<Income[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            setLoading(true);
            const data = await getIncomeData();
            if (data) {
                setIncomeData(data);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    return { incomeData, loading };
};

export default useIncomeData;
