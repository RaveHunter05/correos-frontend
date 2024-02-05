import { useState, useEffect } from 'react';
import axios from 'axios';

interface Expenses {
    // Define your expenses interface here
}

const useExpensesData = () => {
    const [expensesData, setExpensesData] = useState<Expenses[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getExpensesData = async (): Promise<Expenses[]> => {
        try {
            const token = localStorage.getItem('auth-token');
            const response = await axios.get<Expenses[]>('/api/expenses', {
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
            const data = await getExpensesData();
            if (data) {
                setExpensesData(data);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    return { expensesData, loading };
};

export default useExpensesData;
