import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';
import SidebarComponent from '~/components/Sidebar';
import { NextPageWithLayout } from '~/types/next';

const ManagementPage: NextPageWithLayout = () => {
    const router = useRouter();
    useLayoutEffect(() => {
        const token = sessionStorage.getItem('auth-token');
        if (!token) {
            router.replace('/');
        }
    }, [router]);
    return (
        <div>
            <SidebarComponent>
                <h2> Management </h2>
            </SidebarComponent>
        </div>
    );
};

export default ManagementPage;
