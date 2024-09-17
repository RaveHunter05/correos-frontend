import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { Incomes } from '~/types/types';
import { getIncomes, searchIncome } from '~/app/admin/income/actions';

const useIncomeData = () => {
    // current data for the hook
    const [incomeData, setIncomeData] = useState<Incomes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // string to search for
    const [searchTerm, setSearchTerm] = useState<string | null>(null);

    const [toggleRefresh, setToggleRefresh] = useState<boolean>(false);

    // get data (general)
    const getIncomeData = async (): Promise<Incomes[]> => {
        try {
            const response = await getIncomes();
            return response;
        } catch (error) {
            console.error({ error });
            return []; // or handle error accordingly
        }
    };

    const getSearchData = async (service: string): Promise<Incomes[]> => {
        try {
            const response = await searchIncome(service);
            return response;
        } catch (error) {
            console.error({ error });
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

    const refreshData = () => {
        setToggleRefresh(!toggleRefresh);
    };

    useEffect(() => {
        const fetchIncomeData = async (): Promise<void> => {
            setLoading(true);
            const data = await getIncomeData();
            if (data) {
                setIncomeData(data);
            }
            setLoading(false);
        };

        fetchIncomeData();
    }, [toggleRefresh]);

    return {
        incomeData,
        loading,
        handleSearch,
        refreshData,
    };
};

export default useIncomeData;
