'use client';

import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import ServiceComponent from '~/components/Services';
import SidebarComponent from '~/components/Sidebar';
import { checkSession } from '~/lib/cookies';
import { NextPageWithLayout } from '~/types/next';

const IncomePage: NextPageWithLayout = () => {
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
                <ServiceComponent />
            </SidebarComponent>
        </div>
    );
};

export default IncomePage;
