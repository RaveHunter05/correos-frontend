import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { Expenses } from '~/types/types';
import { getExpenses, searchExpenses } from '~/app/admin/outcome/actions';

const useExpensesData = () => {
    const [expensesData, setExpensesData] = useState<Expenses[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // string to search for
    const [searchTerm, setSearchTerm] = useState<string | null>(null);

    const [toggleRefresh, setToggleRefresh] = useState<boolean>(false);

    const getExpensesData = async (): Promise<Expenses[]> => {
        try {
            const response = await getExpenses();
            return response;
        } catch (error) {
            console.error({ error });
            return []; // or handle error accordingly
        }
    };

    const getSearchData = async (costcenter: string): Promise<Expenses[]> => {
        try {
            const response = await searchExpenses(costcenter);
            return response;
        } catch (error) {
            console.error({ error });
            return [];
        }
    };

    const handleSearch = (costcenter: string) => {
        setSearchTerm(costcenter);
    };

    useEffect(() => {
        const fetchSearch = debounce(
            async (termToSearch: string): Promise<void> => {
                setLoading(true);
                const data = await getSearchData(termToSearch);
                setExpensesData(data);
                setLoading(false);
                return;
            },
            400
        );
        const fetchExpensesData = async (): Promise<void> => {
            setLoading(true);
            const data = await getExpensesData();
            if (data) {
                setExpensesData(data);
            }
            setLoading(false);
        };

        if (!searchTerm || searchTerm === '') {
            fetchExpensesData();
            return;
        }
        fetchSearch(searchTerm);
    }, [searchTerm]);

    const refreshData = () => {
        setToggleRefresh(!toggleRefresh);
    };

    useEffect(() => {
        const fetchIncomeData = async (): Promise<void> => {
            setLoading(true);
            const data = await getExpensesData();
            if (data) {
                setExpensesData(data);
            }
            setLoading(false);
        };

        fetchIncomeData();
    }, [toggleRefresh]);

    return { expensesData, loading, handleSearch, refreshData };
};

export default useExpensesData;
