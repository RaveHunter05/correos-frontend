import { ApprovalStatus } from '~/types/types';

const colorMap: Record<ApprovalStatus, string> = {
    0: 'yellow',
    1: 'green',
    2: 'red',
};

const approvalStatusMap: { [key: string]: string } = {
    0: 'Pendiente',
    1: 'Aprobado',
    2: 'Rechazado',
};

const budgetTypeMap: { [key: string]: string } = {
    0: 'Ingreso',
    1: 'Egreso',
    2: 'General',
};

export { colorMap, approvalStatusMap, budgetTypeMap };
