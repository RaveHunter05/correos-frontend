import { Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import useModal from '~/hooks/useModal';
import CreateIncomeForm from '../Income/CreateIncomeForm';

export interface IncomeInterface {
    incomeId: any;
    code: Number;
    service: string;
    projectedAmount: number;
    executedAmount: number;
    date: Date;
}

interface Interface {
    data: IncomeInterface[];
}

const IncomesTable = ({ data }: Interface) => {
    const [selectedValues, setSelectedValues] =
        useState<Partial<IncomeInterface> | null>(null);

    const handleEditClick = ({
        incomeId,
        code,
        service,
        projectedAmount,
        executedAmount,
    }: Partial<IncomeInterface>) => {
        setSelectedValues({
            incomeId,
            code,
            service,
            projectedAmount,
            executedAmount,
        });
    };

    useEffect(() => {
        if (selectedValues !== null) {
            openModal();
        }
    }, [selectedValues]);

    const { openModal, ModalWrapper, closeModal } = useModal();

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
            render: (_: any, { projectedAmount }: IncomeInterface) => {
                return <Tag color="green">{projectedAmount}</Tag>;
            },
        },
        {
            title: 'Ejecutado',
            dataIndex: 'executedAmount',
            render: (
                _: any,
                { projectedAmount, executedAmount }: IncomeInterface
            ) => {
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
                    incomeId,
                    code,
                    service,
                    projectedAmount,
                    executedAmount,
                }: IncomeInterface
            ) => {
                return (
                    <CiEdit
                        onClick={() =>
                            handleEditClick({
                                incomeId,
                                code,
                                service,
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
                <CreateIncomeForm
                    toEditValues={selectedValues}
                    closeModal={closeModal}
                />
            </ModalWrapper>
            <Table rowKey="incomeId" dataSource={data} columns={columns} />
        </>
    );
};

export default IncomesTable;
