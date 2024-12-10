import { approvalStatusMap, colorMap } from '~/constants/constants';
import { ApprovalStatus } from '~/types/types';

import clsx from 'clsx';

interface Interface {
    status: ApprovalStatus | string;
}

const ApprovalStatusComponent: React.FC<Interface> = ({ status }) => {
    const color = colorMap[status as ApprovalStatus] || 'yellow';
    const label = approvalStatusMap[status as ApprovalStatus] || 'Pendiente';

    return (
        <>
            <span
                className={clsx(
                    'text-black',
                    'px-2',
                    'py-1',
                    'rounded-full',
                    `bg-${color}-300`
                )}
            >
                {label}
            </span>
        </>
    );
};

export default ApprovalStatusComponent;
