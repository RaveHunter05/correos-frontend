import { Collapse, CollapseProps, DatePicker, Typography } from 'antd';
import type { DatePickerProps } from 'antd';
import IncomeInforms from '../Income/Informs';
import ExpenseInforms from '../Outcome/Informs';
import { FaFileCsv } from 'react-icons/fa6';
import InformsTable from '../Shared/InformsTable';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux';
import { useState } from 'react';

import { CSVLink } from 'react-csv';

const ExecutionComponent = () => {
    const tableData = useSelector((state: RootState) => state.data.tableData);
    const tableColumns = useSelector(
        (state: RootState) => state.data.tableColumns
    );

    const informTableHeaders = useSelector(
        (state: RootState) => state.data.informTableHeaders
    );

    const [initialDate, setInitialDate] = useState<string | string[]>('');
    const [endDate, setEndDate] = useState<string | string[]>('');

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
            <section className="w-100 flex items-start justify-between">
                <div className="flex flex-row space-x-4">
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
                    <CSVLink data={tableData} headers={informTableHeaders}>
                        Exportar
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
                <InformsTable dataSource={tableData} columns={tableColumns} />
            </section>
        </div>
    );
};

export default ExecutionComponent;
