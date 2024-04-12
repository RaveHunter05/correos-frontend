import { Button, Card } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setColumns } from '~/redux/reducers/data/dataSlice';
import { setData } from '~/redux/reducers/data/dataSlice';

type InformType = 'service' | 'costcenter' | 'general';

const commonTables = [
    {
        title: 'Absoluta',
        dataIndex: 'absolute',
    },
    { title: '%', dataIndex: 'percentual' },
];

const tableColumns = {
    service: [
        {
            title: 'código',
            dataIndex: ['serviceInfo', 'code'],
        },
        {
            title: 'Servicio',
            dataIndex: ['serviceInfo', 'name'],
        },
        ...commonTables,
    ],
    costcenter: [
        {
            title: 'código',
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
            title: 'Código de servicio',
            dataIndex: ['serviceInfo', 'code'],
        },
        {
            title: 'Servicio',
            dataIndex: ['serviceInfo', 'name'],
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

const IncomeInforms = () => {
    const dispatch = useDispatch();
    const getIncomesByType = async (informType: InformType) => {
        try {
            const year = 1;
            const months = [1, 2, 3];
            const response = await axios.get(
                `/api/incomes/inform/${informType}/${year}/${months}`
            );
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
                    onClick={() => getIncomesByType('service')}
                >
                    Ingresos por servicio
                </Card.Grid>
                <Card.Grid
                    className="cursor-pointer"
                    onClick={() => getIncomesByType('costcenter')}
                >
                    Ingresos por centro de costos
                </Card.Grid>
                <Card.Grid
                    className="cursor-pointer"
                    onClick={() => getIncomesByType('general')}
                >
                    Ingresos general
                </Card.Grid>
            </Card>
        </>
    );
};

export default IncomeInforms;
