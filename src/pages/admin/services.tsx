import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';
import ServiceComponent from '~/components/Services';
import SidebarComponent from '~/components/Sidebar';
import { NextPageWithLayout } from '~/types/next';

const IncomePage: NextPageWithLayout = () => {
    const router = useRouter();
    useLayoutEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            router.replace('/');
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
