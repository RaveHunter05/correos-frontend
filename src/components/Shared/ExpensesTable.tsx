import { Table } from 'antd';
import { useState } from 'react';

interface ExpensesInterface {
    incomeId: any;
    constCenter: String;
    category: String;
    projectedAmount: number;
    executedAmount: number;
    date: Date;
}

interface Interface {
    data: ExpensesInterface[];
}

const ExpensesTable = ({ data }: Interface) => {
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
            title: 'Centro de Costos',
            dataIndex: 'costCenter',
        },
        {
            title: 'Categoría',
            dataIndex: 'category',
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
                rowKey="expenseId"
                dataSource={data}
                columns={columns}
            />
        </>
    );
};

export default ExpensesTable;
