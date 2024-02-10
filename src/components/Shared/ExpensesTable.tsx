import { Table, Tag } from 'antd';
import { useEffect, useState } from 'react';

import { CiEdit } from 'react-icons/ci';
import useModal from '~/hooks/useModal';
import CreateExpensesForm from '../Outcome/CreateExpensesForm';

export interface Expenses {
    expenseId: any;
    costCenter: string;
    category: string;
    projectedAmount: number;
    executedAmount: number;
    date: Date;
}

interface Interface {
    data: Expenses[];
}

const ExpensesTable = ({ data }: Interface) => {
    const [selectedValues, setSelectedValues] =
        useState<Partial<Expenses> | null>(null);

    const handleEditClick = ({
        expenseId,
        costCenter,
        category,
        projectedAmount,
        executedAmount,
    }: Partial<Expenses>) => {
        setSelectedValues({
            expenseId,
            costCenter,
            category,
            projectedAmount,
            executedAmount,
        });
        openModal();
    };

    const { openModal, ModalWrapper } = useModal();

    const columns = [
        {
            title: 'Centro de Costos',
            dataIndex: 'costCenter',
        },
        { title: 'Categoría', dataIndex: 'category' },
        {
            title: 'Proyectado',
            dataIndex: 'projectedAmount',
            render: (_: any, { projectedAmount }: Expenses) => {
                return <Tag color="green">{projectedAmount}</Tag>;
            },
        },
        {
            title: 'Ejecutado',
            dataIndex: 'executedAmount',
            render: (_: any, { projectedAmount, executedAmount }: Expenses) => {
                const textColor =
                    executedAmount > projectedAmount ? 'red' : 'geekblue';
                return <Tag color={textColor}>{executedAmount}</Tag>;
            },
        },
        {
            title: 'Editar',
            key: '',
            render: (
                _: any,
                {
                    expenseId,
                    costCenter,
                    category,
                    projectedAmount,
                    executedAmount,
                }: Expenses
            ) => {
                return (
                    <CiEdit
                        onClick={() =>
                            handleEditClick({
                                expenseId,
                                costCenter,
                                category,
                                projectedAmount,
                                executedAmount,
                            })
                        }
                        className="text-2xl text-amber-500 rounded-lg cursor-pointer"
                    />
                );
            },
        },
    ];
    return (
        <>
            <ModalWrapper title="Agregar Ingresos">
                <CreateExpensesForm toEditValues={selectedValues}/>
            </ModalWrapper>
            <Table rowKey="expenseId" dataSource={data} columns={columns} />
        </>
    );
};

export default ExpensesTable;
