import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import useModal from '~/hooks/useModal';
import { Budgets } from '~/types/types';
import ReviewBudget from '../Budget/ReviewBudget';
import { approvalStatusMap, budgetTypeMap } from '~/constants/constants';
import ApprovalStatusComponent from './ApprovalStatusComponent';

interface Interface {
    data: Budgets[];
}

const BudgetsTable = ({ data }: Interface) => {
    const [selectedValues, setSelectedValues] = useState<Budgets | null>(null);

    useEffect(() => {
        if (selectedValues !== null) {
            openModal();
        }
    }, [selectedValues]);

    const { openModal, ModalWrapper, closeModal } = useModal();

    const columns = [
        {
            title: 'ID',
            dataIndex: 'budgetId',
        },
        {
            title: 'Título',
            dataIndex: 'title',
        },
        {
            title: 'Tipo',
            dataIndex: 'budgetType',
            render: (budgetType: string) => {
                return budgetTypeMap[budgetType];
            },
        },
        {
            title: 'Nombre de Archivo',
            dataIndex: 'fileName',
            render: (fileName: string) => {
                return <p className="text-blue-500">{fileName.slice(-15)}</p>;
            },
        },
        {
            title: 'Tamaño',
            dataIndex: 'fileSize',
            render: (size: number) => {
                return `${size} KB`;
            },
        },
        {
            title: 'Estado',
            dataIndex: 'approvalStatus',
            render: (status: string) => (
                <ApprovalStatusComponent status={status} />
            ),
        },
        {
            title: 'Revisar',
            key: '',
            render: (record: Budgets) => (
                <FaEye
                    onClick={() => {
                        setSelectedValues(record);
                    }}
                    className="cursor-pointer text-blue-500"
                />
            ),
        },
    ];
    return (
        <>
            {selectedValues && (
                <ModalWrapper title="Revisión Presupuesto">
                    <ReviewBudget
                        budget={selectedValues}
                        closeModal={closeModal}
                    />
                </ModalWrapper>
            )}
            <Table rowKey="budgetId" dataSource={data} columns={columns} />
        </>
    );
};

export default BudgetsTable;
