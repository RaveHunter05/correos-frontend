import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';
import SidebarComponent from '~/components/Sidebar';
import SpentsComponent from '~/components/Spents';
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
                <SpentsComponent />
            </SidebarComponent>
        </div>
    );
};

export default IncomePage;
