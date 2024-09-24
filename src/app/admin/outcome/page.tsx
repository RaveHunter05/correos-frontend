'use client';

import { useTransitionRouter } from 'next-view-transitions';
import { useLayoutEffect } from 'react';
import { checkSession } from '~/app/login/actions';
import OutcomeComponent from '~/components/Outcome';
import SidebarComponent from '~/components/Sidebar';
import { NextPageWithLayout } from '~/types/next';

const IncomePage: NextPageWithLayout = () => {
    const router = useTransitionRouter();
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
