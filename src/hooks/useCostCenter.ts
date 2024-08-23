import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

import {
    getCostCenters,
    searchCostCenters,
} from '~/app/admin/costcenters/actions';

import { CostCenters } from '~/types/types';

const useCostCenterData = () => {
    // current data for the hook
    const [costCenterData, setCostCenterData] = useState<CostCenters[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // string to search for
    const [searchTerm, setSearchTerm] = useState<string | null>(null);

    const [toggleRefresh, setToggleRefresh] = useState<boolean>(false);

    // get data (general)
    const getCostCenterData = async (): Promise<CostCenters[]> => {
        try {
            const response = await getCostCenters();

            return response;
        } catch (error) {
            console.log({ error });
            return []; // or handle error accordingly
        }
    };

    const getSearchData = async (name: string): Promise<CostCenters[]> => {
        try {
            const response = await searchCostCenters(name);
            return response;
        } catch (error) {
            console.log({ error });
            return [];
        }
    };

    const handleSearch = (name: string) => {
        setSearchTerm(name);
    };

    useEffect(() => {
        const fetchSearch = debounce(
            async (termToSearch: string): Promise<void> => {
                setLoading(true);
                const data = await getSearchData(termToSearch);
                setCostCenterData(data);
                setLoading(false);
                return;
            },
            400
        );

        const fetchCostCenterData = async (): Promise<void> => {
            setLoading(true);
            const data = await getCostCenterData();
            if (data) {
                setCostCenterData(data);
            }
            setLoading(false);
        };
        if (!searchTerm || searchTerm === '') {
            fetchCostCenterData();
            return;
        }
        fetchSearch(searchTerm);
        return;
    }, [searchTerm]);

    const refreshData = () => {
        setToggleRefresh(!toggleRefresh);
    };

    useEffect(() => {
        const fetchCostCenterData = async (): Promise<void> => {
            setLoading(true);
            const data = await getCostCenterData();
            if (data) {
                setCostCenterData(data);
            }
            setLoading(false);
        };

        fetchCostCenterData();
    }, [toggleRefresh]);

    return {
        data: costCenterData,
        loading,
        handleSearch,
        refreshData,
    };
};

export default useCostCenterData;
