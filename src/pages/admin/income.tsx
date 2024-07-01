import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';
import IncomeComponent from '~/components/Income';
import SidebarComponent from '~/components/Sidebar';
import { NextPageWithLayout } from '~/types/next';

const IncomePage: NextPageWithLayout = () => {
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
                <IncomeComponent />
            </SidebarComponent>
        </div>
    );
};

export default IncomePage;
