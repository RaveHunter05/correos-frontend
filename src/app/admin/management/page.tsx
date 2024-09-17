'use client';

import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { checkSession } from '~/app/login/actions';
import ManagementComponent from '~/components/Management';
import SidebarComponent from '~/components/Sidebar';
import { NextPageWithLayout } from '~/types/next';

const ManagementPage: NextPageWithLayout = () => {
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
                <ManagementComponent />
            </SidebarComponent>
        </div>
    );
};

export default ManagementPage;
