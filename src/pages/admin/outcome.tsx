import OutcomeComponent from '~/src/components/Outcome';
import SidebarComponent from '~/src/components/Sidebar';
import { NextPageWithLayout } from '~/src/types/next';

const IncomePage: NextPageWithLayout = () => {
    return (
        <div>
            <SidebarComponent>
                <OutcomeComponent />
            </SidebarComponent>
        </div>
    );
};

export default IncomePage;
