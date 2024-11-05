import {
    Collapse,
    CollapseProps,
    DatePicker,
    Skeleton,
    Typography,
} from 'antd';
import type { DatePickerProps } from 'antd';
import IncomeInforms from '../Income/Informs';
import ExpenseInforms from '../Outcome/Informs';
import { FaFileCsv } from 'react-icons/fa6';
import InformsTable from '../Shared/InformsTable';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux';
import { useEffect, useState } from 'react';

import { toast } from 'react-hot-toast';

import { CSVLink } from 'react-csv';
import { IoMdAdd } from 'react-icons/io';

const ExecutionComponent = () => {
    const tableData = useSelector((state: RootState) => state.data.tableData);

    const [loadingStyles, setLoadingStyles] = useState<boolean>(true);
    const tableColumns = useSelector(
        (state: RootState) => state.data.tableColumns
    );

    const informTableHeaders = useSelector(
        (state: RootState) => state.data.informTableHeaders
    );

    const [initialDate, setInitialDate] = useState<string | string[]>('');
    const [endDate, setEndDate] = useState<string | string[]>('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingStyles(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Ingresos',
            children: (
                <IncomeInforms initialDate={initialDate} endDate={endDate} />
            ),
        },
        {
            key: '2',
            label: 'Egresos',
            children: (
                <ExpenseInforms initialDate={initialDate} endDate={endDate} />
            ),
        },
    ];

    const handleInitialDate: DatePickerProps['onChange'] = (
        date,
        dateString
    ) => {
        setInitialDate(dateString);
        return;
    };

    const handleFinalDate: DatePickerProps['onChange'] = (date, dateString) => {
        setEndDate(dateString);
        return;
    };
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-10">
            {/* Title */}
            <h1 className="text-3xl font-bold dark:text-white mb-4 underline">
                Ejecución
            </h1>
            {loadingStyles ? (
                <Skeleton />
            ) : (
                <div>
                    <section className="w-100 flex items-start flex-wrap">
                        <div className="flex flex-row space-x-4 mr-auto mb-2">
                            <div className="w-40 mr-8">
                                <p> Seleccione fecha inicial: </p>
                                <DatePicker onChange={handleInitialDate} />
                            </div>

                            <div className="w-40 mr-8">
                                <p> Seleccione fecha final: </p>
                                <DatePicker onChange={handleFinalDate} />
                            </div>
                        </div>

                        <button
                            type="button"
                            className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded mr-2 flex items-center"
                        >
                            <IoMdAdd
                                className="mr-1"
                                style={{ fontSize: '1.2rem' }}
                            />
                            Generar Reporte
                        </button>
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2 flex items-center"
                            onClick={() => {}}
                        >
                            <FaFileCsv
                                className="mr-1"
                                style={{
                                    fontSize: '1.2rem',
                                    color: '#fff !important',
                                }}
                            />
                            <CSVLink
                                data={tableData}
                                headers={informTableHeaders}
                                onClick={() => {
                                    if (tableData.length === 0) {
                                        toast.error(
                                            'No hay datos para exportar'
                                        );
                                        return false;
                                    }
                                    toast.success(
                                        'Datos exportados correctamente'
                                    );
                                    return true;
                                }}
                            >
                                Exportar Informe
                            </CSVLink>
                        </button>
                    </section>
                    <Typography.Title level={4} className="mt-4">
                        Seleccione uno de los siguientes informes
                    </Typography.Title>

                    <section className="mt-8 flex space-x-4">
                        <Collapse
                            className="w-80"
                            items={items}
                            defaultActiveKey={['1']}
                            onChange={() => {}}
                        />
                        <InformsTable
                            dataSource={tableData}
                            columns={tableColumns}
                        />
                    </section>
                </div>
            )}
        </div>
    );
};

export default ExecutionComponent;
