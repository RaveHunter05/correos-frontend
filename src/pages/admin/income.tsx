import IncomeComponent from '~/src/components/Income';
import SidebarComponent from '~/src/components/Sidebar';
import { NextPageWithLayout } from '~/src/types/next';

const IncomePage: NextPageWithLayout = () => {
    return (
        <div>
            <SidebarComponent>
                <IncomeComponent />
            </SidebarComponent>
        </div>
    );
};

export default IncomePage;
