import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { getServices, searchServices } from '~/app/admin/services/actions';
import { Services } from '~/types/types';

const useServiceData = () => {
    // current data for the hook
    const [serviceData, setServiceData] = useState<Services[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // string to search for
    const [searchTerm, setSearchTerm] = useState<string | null>(null);

    const [toggleRefresh, setToggleRefresh] = useState<boolean>(false);

    // get data (general)
    const getServiceData = async (): Promise<Services[]> => {
        try {
            const response = await getServices();
            return response;
        } catch (error) {
            console.error({ error });
            return []; // or handle error accordingly
        }
    };

    const getSearchData = async (service: string): Promise<Services[]> => {
        try {
            const response = await searchServices(service);
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
                setServiceData(data);
                setLoading(false);
                return;
            },
            400
        );

        const fetchServiceData = async (): Promise<void> => {
            setLoading(true);
            const data = await getServiceData();
            if (data) {
                setServiceData(data);
            }
            setLoading(false);
        };
        if (!searchTerm || searchTerm === '') {
            fetchServiceData();
            return;
        }
        fetchSearch(searchTerm);
        return;
    }, [searchTerm]);

    const refreshData = () => {
        setToggleRefresh(!toggleRefresh);
    };

    useEffect(() => {
        const fetchServiceData = async (): Promise<void> => {
            setLoading(true);
            const data = await getServiceData();
            if (data) {
                setServiceData(data);
            }
            setLoading(false);
        };

        fetchServiceData();
    }, [toggleRefresh]);

    return {
        data: serviceData,
        loading,
        handleSearch,
        refreshData,
    };
};

export default useServiceData;
