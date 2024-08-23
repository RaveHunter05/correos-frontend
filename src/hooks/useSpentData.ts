import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { Spents } from '~/types/types';

import { getSpents, searchSpent } from '~/app/admin/spents/actions';

const useSpentData = () => {
    const [spentsData, setSpentsData] = useState<Spents[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // string to search for
    const [searchTerm, setSearchTerm] = useState<string | null>(null);

    const [toggleRefresh, setToggleRefresh] = useState<boolean>(false);

    const getSpentsData = async (): Promise<Spents[]> => {
        try {
            const response = await getSpents();
            console.log({ response });
            return response;
        } catch (error) {
            console.log({ error });
            return []; // or handle error accordingly
        }
    };

    const getSearchData = async (denomination: string): Promise<Spents[]> => {
        try {
            const response = await searchSpent(denomination);
            return response;
        } catch (error) {
            console.log({ error });
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
                setSpentsData(data);
                setLoading(false);
                return;
            },
            400
        );
        const fetchSpentssData = async (): Promise<void> => {
            setLoading(true);
            const data = await getSpentsData();
            if (data) {
                setSpentsData(data);
            }
            setLoading(false);
        };

        if (!searchTerm || searchTerm === '') {
            fetchSpentssData();
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
            const data = await getSpentsData();
            if (data) {
                setSpentsData(data);
            }
            setLoading(false);
        };

        fetchIncomeData();
    }, [toggleRefresh]);

    return { data: spentsData, loading, handleSearch, refreshData };
};

export default useSpentData;
