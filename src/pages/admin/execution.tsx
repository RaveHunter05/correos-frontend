import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';
import ExecutionComponent from '~/components/Execution';
import SidebarComponent from '~/components/Sidebar';
import { NextPageWithLayout } from '~/types/next';

const CostCentersPage: NextPageWithLayout = () => {
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
                <ExecutionComponent />
            </SidebarComponent>
        </div>
    );
};

export default CostCentersPage;
