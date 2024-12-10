import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import {
    getBudgets,
    getBudgetsByCreatorId,
    searchBudgets,
} from '~/app/admin/budgets/actions';

import { Budgets } from '~/types/types';

const useBudgetsData = (createdById?: string) => {
    // current data for the hook
    const [budgetData, setBudgetData] = useState<Budgets[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [searchTerm, setSearchTerm] = useState<string | null>(null);

    const [toggleRefresh, setToggleRefresh] = useState<boolean>(false);

    // get data (general)
    const getBudgetData = async (): Promise<Budgets[]> => {
        try {
            const response = await getBudgets();
            return response;
        } catch (error) {
            console.error({ error });
            return []; // or handle error accordingly
        }
    };

    const getBydgetByCreatorId = async (
        creatorId: string
    ): Promise<Budgets[]> => {
        try {
            const response = await getBudgetsByCreatorId(creatorId);
            return response;
        } catch (error) {
            console.error({ error });
            return [];
        }
    };

    const getSearchData = async (budget: string): Promise<Budgets[]> => {
        try {
            const response = await searchBudgets(budget);
            return response;
        } catch (error) {
            console.error({ error });
            return [];
        }
    };

    const handleSearch = (budget: string) => {
        setSearchTerm(budget);
    };

    useEffect(() => {
        const fetchSearch = debounce(
            async (termToSearch: string): Promise<void> => {
                setLoading(true);
                const data = await getSearchData(termToSearch);
                setBudgetData(data);
                setLoading(false);
                return;
            },
            400
        );

        const fetchBudgetData = async (): Promise<void> => {
            setLoading(true);
            const data = await getBudgetData();
            if (data) {
                setBudgetData(data);
            }
            setLoading(false);
        };
        if (!searchTerm || searchTerm === '') {
            fetchBudgetData();
            return;
        }

        fetchSearch(searchTerm);
        return;
    }, [searchTerm]);

    const refreshData = () => {
        setToggleRefresh(!toggleRefresh);
    };

    useEffect(() => {
        if (createdById) {
            const fetchBudgetDataByCreatorId = async (): Promise<void> => {
                setLoading(true);
                const data = await getBydgetByCreatorId(createdById);
                if (data) {
                    setBudgetData(data);
                }
                setLoading(false);
            };

            fetchBudgetDataByCreatorId();
        }
    }, [createdById]);

    useEffect(() => {
        if (createdById) {
            const fetchBudgetDataByCreatorId = async (): Promise<void> => {
                setLoading(true);
                const data = await getBydgetByCreatorId(createdById);
                if (data) {
                    setBudgetData(data);
                }
                setLoading(false);
            };

            fetchBudgetDataByCreatorId();
        } else {
            const fetchBudgetData = async (): Promise<void> => {
                setLoading(true);
                const data = await getBudgetData();
                if (data) {
                    setBudgetData(data);
                }
                setLoading(false);
            };

            fetchBudgetData();
        }
    }, [toggleRefresh, createdById]);

    return {
        data: budgetData,
        loading,
        handleSearch,
        refreshData,
    };
};

export default useBudgetsData;
