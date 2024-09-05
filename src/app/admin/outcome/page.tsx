'use client';

import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { checkSession } from '~/app/login/actions';
import OutcomeComponent from '~/components/Outcome';
import SidebarComponent from '~/components/Sidebar';
import { NextPageWithLayout } from '~/types/next';

const IncomePage: NextPageWithLayout = () => {
    const router = useRouter();
    useLayoutEffect(() => {
        const sessionInitiated = checkSession();

        if (!sessionInitiated) {
            router.replace('/');
        }
    }, [router]);
    return (
        <div>
            <SidebarComponent>
                <OutcomeComponent />
            </SidebarComponent>
        </div>
    );
};

export default IncomePage;
