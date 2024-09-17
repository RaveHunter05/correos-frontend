import { Switch, Table } from 'antd';
import { useState } from 'react';
import useModal from '~/hooks/useModal';

import { useDispatch } from 'react-redux';
import { changeData } from '~/redux/reducers/data/dataSlice';

import { Users } from '~/types/types';

import { CiEdit } from 'react-icons/ci';
import { IoKeyOutline } from 'react-icons/io5';

import {
    changePassword,
    disableUser,
    enableUser,
} from '~/app/admin/management/actions';
import { Toaster, toast } from 'react-hot-toast';
import UpdateUserForm from '../Management/UpdateUserForm';
import useConfirmModal from '~/hooks/useConfirmModal';
import generatePassword from '~/utils/generatePassword';
import { CSVLink } from 'react-csv';
import { FaFileCsv } from 'react-icons/fa';

interface Interface {
    data: Users[];
}

const ManagementTable = ({ data }: Interface) => {
    const [selectedValues, setSelectedValues] = useState<Partial<Users> | null>(
        null
    );

    const {
        ModalWrapper: ModalConfirmWrapper,
        closeModal: closeConfirmModal,
        openModal: openConfirmModal,
    } = useConfirmModal();

    const handleEditClick = async ({
        id,
        email,
        userName,
        role,
    }: Partial<Users>) => {
        const assignNewValues = async ({
            id,
            email,
            userName,
            role,
        }: Partial<Users>) => {
            setSelectedValues({
                id,
                email,
                userName,
                role,
            });
        };

        await assignNewValues({ id, email, userName, role });
        openModal();
    };

    const handleNewPasswordModal = async ({
        id,
        email,
        userName,
        role,
    }: Partial<Users>) => {
        try {
            const assignNewValues = async ({
                id,
                email,
                userName,
                role,
            }: Partial<Users>) => {
                setSelectedValues({
                    id,
                    email,
                    userName,
                    role,
                });
            };
            await assignNewValues({ id, email, userName, role });
            openConfirmModal();
        } catch (error) {
            if (typeof error === 'string') {
                throw new Error(error);
            } else if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    };

    const handleNewPassword = async (email: string) => {
        try {
            const newPassword = generatePassword(12);
            const response = await changePassword({
                email,
                newPassword,
            });
            if (response) {
                toast.custom(() => (
                    <div className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 flex flex-col p-3">
                        <p className="font-bold text-gray-500">
                            Contraseña generada correctamente
                        </p>

                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2 flex items-center mt-4"
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
                                data={[{ email, newPassword }]}
                                headers={['email', 'newPassword']}
                                filename="newPassword.csv"
                            >
                                Descargar
                            </CSVLink>
                        </button>
                    </div>
                ));
            }
            return response.data;
        } catch (error) {
            if (typeof error === 'string') {
                throw new Error(error);
            } else if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    };

    const dispatch = useDispatch();

    const handleDisableUser = async (data: Partial<Users>) => {
        try {
            if (data.isActive && data.id) {
                toast.promise(disableUser(data.id), {
                    loading: 'Deshabilitando usuario',
                    success: 'Usuario deshabilitado',
                    error: 'Error al deshabilitar usuario',
                });
            }
            if (!data.isActive && data.id) {
                toast.promise(enableUser(data.id), {
                    loading: 'Habilitando usuario',
                    success: 'Usuario habilitado',
                    error: 'Error al habilitar usuario',
                });
            }
        } finally {
            dispatch(changeData());
        }
    };

    const { openModal, ModalWrapper, closeModal } = useModal();

    const columns = [
        {
            title: 'Nombre',
            dataIndex: ['userName'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Roles',
            dataIndex: 'role',
        },
        {
            title: 'Editar',
            key: '',
            align: 'center' as 'center',
            render: (_: any, { id, userName, email, role }: Users) => {
                return (
                    <div className="flex justify-center">
                        <CiEdit
                            onClick={() =>
                                handleEditClick({
                                    id,
                                    userName,
                                    email,
                                    role,
                                })
                            }
                            className="text-2xl text-blue-500 rounded-lg cursor-pointer"
                        />
                    </div>
                );
            },
        },
        {
            title: 'Generar Contraseña',
            key: '',
            align: 'center' as 'center',
            render: (_: any, { id, userName, email, role }: Users) => {
                return (
                    <div className="flex justify-center">
                        <IoKeyOutline
                            className="text-lg text-amber-500 rounded-lg cursor-pointer"
                            onClick={() =>
                                handleNewPasswordModal({
                                    id,
                                    userName,
                                    email,
                                    role,
                                })
                            }
                        />
                    </div>
                );
            },
        },
        {
            title: 'Deshabilitar',
            render: (_: any, { id, isActive }: Users) => {
                return (
                    <div key={id}>
                        <Switch
                            checked={isActive}
                            onChange={() => handleDisableUser({ id, isActive })}
                        />
                    </div>
                );
            },
        },
    ];
    return (
        <>
            <Toaster />
            <ModalConfirmWrapper
                title="Generar Contraseña"
                question={
                    '¿Estás seguro que quieres asignar al usuario ' +
                    selectedValues?.userName +
                    ' una nueva contraseña?'
                }
                confirmText="Generar"
                cancelText="Cancelar"
                onConfirm={() => {
                    handleNewPassword(selectedValues?.email || '');
                    closeConfirmModal();
                }}
            />

            <ModalWrapper title="Editar Usuario">
                {selectedValues && (
                    <UpdateUserForm
                        data={selectedValues}
                        closeModal={closeModal}
                    />
                )}
            </ModalWrapper>
            <Table rowKey="incomeId" dataSource={data} columns={columns} />
        </>
    );
};

export default ManagementTable;
