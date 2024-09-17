'use client';

import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { checkSession } from '~/app/login/actions';
import ExecutionComponent from '~/components/Execution';
import SidebarComponent from '~/components/Sidebar';
import { NextPageWithLayout } from '~/types/next';

const CostCentersPage: NextPageWithLayout = () => {
    const router = useRouter();
    useLayoutEffect(() => {
        const sessionInitiated = checkSession();

        if (!sessionInitiated) {
            router.push('/');
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
