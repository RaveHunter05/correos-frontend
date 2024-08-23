import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { Users } from '~/types/types';
import { getUsers } from '~/components/Management/actions';
import { searchUser } from '~/app/admin/management/actions';

const useManagementData = () => {
    // current data for the hook
    const [managementData, setManagementData] = useState<Users[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // string to search for
    const [searchTerm, setSearchTerm] = useState<string | null>(null);

    const [toggleRefresh, setToggleRefresh] = useState<boolean>(false);

    // get data (general)
    const getUsersData = async (): Promise<Users[]> => {
        try {
            const response = await getUsers();
            return response;
        } catch (error) {
            console.log({ error });
            return []; // or handle error accordingly
        }
    };

    const getSearchData = async (email: string): Promise<Users[]> => {
        try {
            const response = await searchUser(email);
            return response;
        } catch (error) {
            console.log({ error });
            return [];
        }
    };

    const handleSearch = (email: string) => {
        setSearchTerm(email);
    };

    useEffect(() => {
        const fetchSearch = debounce(
            async (termToSearch: string): Promise<void> => {
                setLoading(true);
                const data = await getSearchData(termToSearch);
                setManagementData(data);
                setLoading(false);
                return;
            },
            400
        );

        const fetchUsersData = async (): Promise<void> => {
            setLoading(true);
            const data = await getUsersData();
            if (data) {
                setManagementData(data);
            }
            setLoading(false);
        };
        if (!searchTerm || searchTerm === '') {
            fetchUsersData();
            return;
        }
        fetchSearch(searchTerm);
        return;
    }, [searchTerm]);

    const refreshData = () => {
        setToggleRefresh(!toggleRefresh);
    };

    useEffect(() => {
        const fetchUsersData = async (): Promise<void> => {
            setLoading(true);
            const data = await getUsersData();
            if (data) {
                setManagementData(data);
            }
            setLoading(false);
        };

        fetchUsersData();
    }, [toggleRefresh]);

    return {
        managementData,
        loading,
        handleSearch,
        refreshData,
    };
};

export default useManagementData;
