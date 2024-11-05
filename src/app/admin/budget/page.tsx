'use client';

import { useTransitionRouter } from 'next-view-transitions';
import { useLayoutEffect } from 'react';
import { checkSession } from '~/app/login/actions';
import BudgetComponent from '~/components/Budget';
import SidebarComponent from '~/components/Sidebar';
import { NextPageWithLayout } from '~/types/next';

const BudgetPage: NextPageWithLayout = () => {
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
                <BudgetComponent />
            </SidebarComponent>
        </div>
    );
};

export default BudgetPage;
