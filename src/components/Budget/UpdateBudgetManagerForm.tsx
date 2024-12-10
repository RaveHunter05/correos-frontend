import React, { useState } from 'react';
import { Field, Formik, Form } from 'formik';
import * as yup from 'yup';

import { ApprovalStatus, Budgets } from '~/types/types';

import { UploadOutlined } from '@ant-design/icons';
import { Button, Typography, Upload, UploadProps } from 'antd';
import { approvalStatusMap } from '~/constants/constants';
import {
    createComment,
    getPresignedUrl,
    updateBudget,
    uploadFileS3,
} from '~/app/admin/budgets/actions';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { changeData } from '~/redux/reducers/data/dataSlice';

import Papa from 'papaparse';

interface Interface {
    budget: Budgets;
    closeModal: () => void;
}

const UpdateBudgetManagerForm: React.FC<Interface> = ({
    budget,
    closeModal,
}) => {
    const dispatch = useDispatch();

    const initialValues: Budgets = { ...budget };

    const [uploadFile, setUploadFile] = useState<File | null>(null);

    const [fileData, setFileData] = useState<any[]>([]);

    const handleSubmit = async () => {
        try {
            if (!uploadFile) {
                toast.error('No se ha seleccionado un archivo');
                return;
            }

            const { url: presignedUrl, hashName } = await getPresignedUrl({
                fileName: uploadFile.name,
            });

            const fileData = new FormData();

            fileData.set('file', uploadFile);

            toast.promise(
                uploadFileS3({
                    fileData,
                    url: presignedUrl,
                }),
                {
                    loading: 'Subiendo archivo...',
                    success: 'Archivo subido correctamente',
                    error: 'Error al subir archivo',
                }
            );

            const updateObject: Partial<Budgets> = {
                ...budget,
                budgetId: budget.budgetId,
                fileName: hashName,
                fileUrl: presignedUrl,
                fileSize: uploadFile.size,
                approvalStatus: ApprovalStatus.Pending,
            };

            toast.promise(updateBudget({ ...updateObject }), {
                loading: 'Actualizando presupuesto...',
                success: 'Presupuesto actualizado correctamente',
                error: 'Error al actualizar presupuesto',
            });
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(changeData());
            closeModal();
        }
    };

    const handleChange = () => {
        if (!uploadFile) {
            toast.error('No se ha seleccionado un archivo');
            return;
        }
        Papa.parse(uploadFile, {
            complete: (result) => {
                setFileData(result.data);
            },
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
        });

        return true;
    };

    const uploadProps: UploadProps = {
        accept: '.csv',
        multiple: false,
        beforeUpload: (file) => {
            if (file.type == 'text/csv') {
                toast.success('Archivo seleccionado');
                setUploadFile(file);
                return true;
            }

            toast.error('El archivo debe ser de tipo CSV');
            return false;
        },
        onChange: handleChange,
    };

    return (
        <>
            <div>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, errors, touched }) => (
                        <Form>
                            <div className="flex flex-col space-y-4">
                                {budget.approvalStatus ===
                                    ApprovalStatus.Rejected && (
                                    <div className="flex flex-col">
                                        <Typography.Text>
                                            <strong>
                                                Estado de Presupuesto:
                                            </strong>
                                        </Typography.Text>
                                        <Typography.Text>
                                            {
                                                approvalStatusMap[
                                                    budget.approvalStatus
                                                ]
                                            }
                                        </Typography.Text>
                                        <Typography.Text className="mt-3">
                                            <strong>
                                                Enviar Corrección de Presupuesto
                                            </strong>
                                        </Typography.Text>
                                        <Upload {...uploadProps}>
                                            <Button icon={<UploadOutlined />}>
                                                Seleccione archivo CSV
                                            </Button>
                                        </Upload>

                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mt-4 flex items-center"
                                        >
                                            Enviar Corrección
                                        </button>
                                    </div>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default UpdateBudgetManagerForm;
