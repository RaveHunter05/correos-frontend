import { NextPageWithLayout } from '~/types/next';
import SidebarComponent from '~/components/Sidebar';
import { useLayoutEffect } from 'react';
import { useRouter } from 'next/router';

const Dashboard: NextPageWithLayout = () => {
    const router = useRouter();
    useLayoutEffect(() => {
        const token = sessionStorage.getItem('auth-token');
        if (!token) {
            router.replace('/');
        }
    }, [router]);

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
