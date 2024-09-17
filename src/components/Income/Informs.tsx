import { Card } from 'antd';
import { Toaster, toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { incomeInform } from '~/app/admin/execution/actions';
import {
    setColumns,
    setInformTableHeaders,
} from '~/redux/reducers/data/dataSlice';
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

const commonTableHeaders = [
    { label: 'Absoluta', key: 'absolute' },
    { label: '%', key: 'percentual' },
];

const tableHeaders = {
    service: [
        { label: 'Código', key: 'serviceInfo.code' },
        { label: 'Servicio', key: 'serviceInfo.name' },
        ...commonTableHeaders,
    ],
    costcenter: [
        { label: 'Código', key: 'costCenterInfo.code' },
        { label: 'Oficinas Postales', key: 'costCenterInfo.name' },
        ...commonTableHeaders,
    ],
    general: [
        { label: 'Código de servicio', key: 'serviceInfo.code' },
        { label: 'Servicio', key: 'serviceInfo.name' },
        { label: 'Código de oficina', key: 'costCenterInfo.code' },
        { label: 'Oficinas Postales', key: 'costCenterInfo.name' },
        ...commonTableHeaders,
    ],
};

type IncomeInformsType = {
    initialDate: Date | string;
    endDate: Date | string;
};

const IncomeInforms = ({ initialDate, endDate }: IncomeInformsType) => {
    const dispatch = useDispatch();
    const getIncomesByType = async (informType: InformType) => {
        try {
            if (!initialDate || !endDate) {
                toast.error('Debe seleccionar una fecha inicial y final');
                return;
            }

            const response = await incomeInform({
                informType,
                initialDate,
                endDate,
            });
            dispatch(setData(response));
            dispatch(setColumns(tableColumns[informType]));
            dispatch(setInformTableHeaders(tableHeaders[informType]));
            return response;
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <Toaster />
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
