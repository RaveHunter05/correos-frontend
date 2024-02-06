import { Table } from 'antd';
import { useState } from 'react';

interface IncomeInterface {
    incomeId: any;
    code: Number;
    service: string;
    projectedAmount: string;
    executedAmount: string;
    date: Date;
}

interface Interface {
    data: IncomeInterface[];
}

const SharedTable = ({ data }: Interface) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns = [
        {
            title: 'Código',
            dataIndex: 'code',
        },
        {
            title: 'Servicio',
            dataIndex: 'service',
        },
        {
            title: 'Proyectado',
            dataIndex: 'projectedAmount',
        },
        {
            title: 'Ejecutado',
            dataIndex: 'executedAmount',
        },
    ];
    return (
        <>
            <Table
                rowSelection={rowSelection}
                rowKey="incomeId"
                dataSource={data}
                columns={columns}
            />
        </>
    );
};

export default SharedTable;
