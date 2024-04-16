import { Card } from 'antd';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setColumns } from '~/redux/reducers/data/dataSlice';
import { setData } from '~/redux/reducers/data/dataSlice';

type InformType = 'spent' | 'costcenter' | 'general';

const commonTables = [
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

type ExpenseInformsProps = {
    initialDate: string | string[];
    endDate: string | string[];
};

const ExpenseInforms = ({ initialDate, endDate }: ExpenseInformsProps) => {
    const dispatch = useDispatch();
    const getExpensesByType = async (informType: InformType) => {
        try {
            if (!initialDate || !endDate) {
                toast.error('Debe seleccionar una fecha inicial y final');
                return;
            }
            const response = await axios.get(
                `/api/expenses/inform/${informType}/${initialDate}/${endDate}`
            );

            console.log({ response: response.data });
            dispatch(setData(response.data));
            dispatch(setColumns(tableColumns[informType]));
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Toaster />
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