import { NextPageWithLayout } from '~/src/types/next';
import SidebarComponent from '~/src/components/Sidebar';

const Dashboard: NextPageWithLayout = () => {
    return (
        <div>
            <SidebarComponent>
                <h2>Dashboard</h2>
            </SidebarComponent>
        </div>
    );
};

export default Dashboard;
