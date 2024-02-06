import { Table, Tag } from 'antd';
import { useState } from 'react';

export interface Expenses {
    incomeId: any;
    constCenter: string;
    category: string;
    projectedAmount: number;
    executedAmount: number;
    date: Date;
}

interface Interface {
    data: Expenses[];
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
            render: (_, { executedAmount }) => {
                return <Tag color="green">{executedAmount}</Tag>;
            },
        },
        {
            title: 'Ejecutado',
            dataIndex: 'executedAmount',
            render: (_, { projectedAmount, executedAmount }) => {
                const textColor =
                    executedAmount > projectedAmount ? 'red' : 'geekblue';
                return <Tag color={textColor}>{executedAmount}</Tag>;
            },
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
