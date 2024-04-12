import { Card } from 'antd';
import axios from 'axios';
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

const ExpenseInforms = () => {
    const dispatch = useDispatch();
    const getExpensesByType = async (informType: InformType) => {
        try {
            const year = 1;
            const months = [1, 2, 3];
            const response = await axios.get(
                `/api/expenses/inform/${informType}/${year}/${months}`
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
