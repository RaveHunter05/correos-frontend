'use client';

import { NextPageWithLayout } from '~/types/next';
import SidebarComponent from '~/components/Sidebar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { checkSession } from '~/app/login/actions';

const Dashboard: NextPageWithLayout = () => {
    const router = useRouter();

    useEffect(() => {
        const sessionInitiated = checkSession();

        if (!sessionInitiated) {
            router.push('/');
        }
    }, []);

    // redirect is there's no session cookie
    return (
        <div>
            <SidebarComponent>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-10">
                    <h1 className="text-3xl font-bold dark:text-white mb-4 underline">
                        Dashboard
                    </h1>
                </div>
            </SidebarComponent>
        </div>
    );
};

export default Dashboard;
