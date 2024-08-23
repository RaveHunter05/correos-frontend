import { Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import useModal from '~/hooks/useModal';
import CreateIncomeForm from '../Income/CreateIncomeForm';
import dayjs from 'dayjs';
import { Incomes, Users } from '~/types/types';

interface Interface {
    data: Incomes[];
}

const ManagementTable = ({ data }: Interface) => {
    const [selectedValues, setSelectedValues] = useState<Partial<Users> | null>(
        null
    );

    const handleEditClick = ({
        incomeId,
        serviceId,
        costCenterId,
        projectedAmount,
        executedAmount,
    }: Partial<Incomes>) => {
        setSelectedValues({
            incomeId,
            serviceId,
            costCenterId,
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
            title: 'ID',
            dataIndex: ['id'],
        },
        {
            title: 'Nombre',
            dataIndex: ['userName'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            render: (_: any, { date }: Incomes) => {
                return <Tag>{dayjs(date).format('DD/MM/YYYY')}</Tag>;
            },
        },
        {
            title: 'Editar',
            key: '',
            render: (
                _: any,
                {
                    incomeId,
                    serviceId,
                    costCenterId,
                    projectedAmount,
                    executedAmount,
                }: Incomes
            ) => {
                return (
                    <CiEdit
                        onClick={() =>
                            handleEditClick({
                                incomeId,
                                serviceId,
                                costCenterId,
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
            <ModalWrapper title="Editar Ingresos">
                <CreateIncomeForm
                    toEditValues={selectedValues}
                    closeModal={closeModal}
                />
            </ModalWrapper>
            <Table rowKey="incomeId" dataSource={data} columns={columns} />
        </>
    );
};

export default ManagementTable;
