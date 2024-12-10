'use client';

import { NextPage } from 'next';
import { useTransitionRouter } from 'next-view-transitions';
import { useLayoutEffect } from 'react';
import { checkSession } from '~/app/login/actions';
import PersonalBudgetComponent from '~/components/PersonalBudget';
import SidebarComponent from '~/components/Sidebar';
import { NextPageWithLayout } from '~/types/next';

const PersonalBudget: NextPageWithLayout = () => {
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
                <PersonalBudgetComponent />
            </SidebarComponent>
        </div>
    );
};

export default PersonalBudget;
