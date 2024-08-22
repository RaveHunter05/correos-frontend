'use client';

import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import SidebarComponent from '~/components/Sidebar';
import { checkSession } from '~/lib/cookies';
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
                <h2> Management </h2>
            </SidebarComponent>
        </div>
    );
};

export default ManagementPage;
