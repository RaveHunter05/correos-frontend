import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';
import CostCentersComponent from '~/components/CostCenters';
import SidebarComponent from '~/components/Sidebar';
import { NextPageWithLayout } from '~/types/next';

const CostCentersPage: NextPageWithLayout = () => {
    const router = useRouter();
    useLayoutEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            router.replace('/');
        }
    }, [router]);
    return (
        <div>
            <SidebarComponent>
                <CostCentersComponent />
            </SidebarComponent>
        </div>
    );
};

export default CostCentersPage;
