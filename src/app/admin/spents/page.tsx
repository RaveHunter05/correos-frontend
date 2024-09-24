'use client';

import { useTransitionRouter } from 'next-view-transitions';
import { useLayoutEffect } from 'react';
import { checkSession } from '~/app/login/actions';
import SidebarComponent from '~/components/Sidebar';
import SpentsComponent from '~/components/Spents';
import { NextPageWithLayout } from '~/types/next';

const IncomePage: NextPageWithLayout = () => {
    const router = useTransitionRouter();
    useLayoutEffect(() => {
        const sessionInitiated = checkSession();

        if (!sessionInitiated) {
            router.push('/');
        }
    }, [router]);
    return (
        <div>
            <SidebarComponent>
                <SpentsComponent />
            </SidebarComponent>
        </div>
    );
};

export default IncomePage;
