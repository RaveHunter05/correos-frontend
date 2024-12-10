import { Card } from 'antd';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { expensesInform } from '~/app/admin/execution/actions';
import {
    setColumns,
    setInformTableHeaders,
} from '~/redux/reducers/data/dataSlice';
import { setData } from '~/redux/reducers/data/dataSlice';

type InformType = 'spent' | 'costcenter' | 'general';

const commonTables = [
    {
        title: 'Ejecutado',
        dataIndex: 'executed',
    },
    { title: 'Proyectado', dataIndex: 'projected' },
    {
        title: 'Absoluta',
        dataIndex: 'absolute',
    },
    { title: '%', dataIndex: 'percentual' },
];

const tableColumns = {
    spent: [
        {
            title: 'cod gasto',
            dataIndex: ['spentInfo', 'category'],
        },
        {
            title: 'descripción',
            dataIndex: ['spentInfo', 'denomination'],
        },
        ...commonTables,
    ],
    costcenter: [
        {
            title: 'Código de oficina',
            dataIndex: ['costCenterInfo', 'code'],
        },
        {
            title: 'Oficinas Postales',
            dataIndex: ['costCenterInfo', 'name'],
        },
        ...commonTables,
    ],
    general: [
        {
            title: 'cod gasto',
            dataIndex: ['spentInfo', 'category'],
        },
        {
            title: 'descripción',
            dataIndex: ['spentInfo', 'denomination'],
        },
        {
            title: 'Código de oficina',
            dataIndex: ['costCenterInfo', 'code'],
        },
        {
            title: 'Oficinas Postales',
            dataIndex: ['costCenterInfo', 'name'],
        },
        ...commonTables,
    ],
};

const commonTableHeaders = [
    { label: 'Ejecutado', key: 'executed' },
    { label: 'Proyectado', key: 'projected' },
    { label: 'Absoluta', key: 'absolute' },
    { label: '%', key: 'percentual' },
];

const informTableHeaders = {
    spent: [
        { label: 'cod gasto', key: 'spentInfo.category' },
        { label: 'descripción', key: 'spentInfo.denomination' },
        ...commonTableHeaders,
    ],
    costcenter: [
        { label: 'Código de oficina', key: 'costCenterInfo.code' },
        { label: 'Oficinas Postales', key: 'costCenterInfo.name' },
        ...commonTableHeaders,
    ],
    general: [
        { label: 'cod gasto', key: 'spentInfo.category' },
        { label: 'descripción', key: 'spentInfo.denomination' },
        { label: 'Código de oficina', key: 'costCenterInfo.code' },
        { label: 'Oficinas Postales', key: 'costCenterInfo.name' },
        ...commonTableHeaders,
    ],
};

type ExpenseInformsProps = {
    initialDate: string[] | string;
    endDate: string[] | string;
};

const ExpenseInforms = ({ initialDate, endDate }: ExpenseInformsProps) => {
    const dispatch = useDispatch();
    const getExpensesByType = async (informType: InformType) => {
        try {
            if (!initialDate || !endDate) {
                toast.error('Debe seleccionar una fecha inicial y final');
                return;
            }
            const response = await expensesInform({
                informType,
                initialDate,
                endDate,
            });

            dispatch(setData(response));
            dispatch(setColumns(tableColumns[informType]));
            dispatch(setInformTableHeaders(informTableHeaders[informType]));
            return response;
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <Card>
                <Card.Grid
                    className="cursor-pointer"
                    onClick={() => getExpensesByType('spent')}
                >
                    Egresos por rubro
                </Card.Grid>
                <Card.Grid
                    className="cursor-pointer"
                    onClick={() => getExpensesByType('costcenter')}
                >
                    Egresos por centro
                </Card.Grid>
                <Card.Grid
                    className="cursor-pointer"
                    onClick={() => getExpensesByType('general')}
                >
                    Egresos general
                </Card.Grid>
            </Card>
        </>
    );
};

export default ExpenseInforms;
