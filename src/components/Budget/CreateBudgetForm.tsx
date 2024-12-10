import { Button, Table, Typography, Upload, UploadProps } from 'antd';
import { Formik, Field, Form } from 'formik';
import { UploadOutlined } from '@ant-design/icons';

import Papa from 'papaparse';

import * as yup from 'yup';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Budgets, BudgetType, ColumnHeader } from '~/types/types';

import {
    createBudget,
    getPresignedUrl,
    uploadFileS3,
} from '~/app/admin/budgets/actions';

// to avoid re render
const budgetTypes: { [key: string]: string } = {
    Income: 'Ingreso',
    Outcome: 'Egreso',
    Generic: 'Genérico',
};

interface Interface {
    closeModal: () => void;
}

const CreateBudgetForm: React.FC<Interface> = ({ closeModal }) => {
    const [tableColumns, setTableColumns] = useState<ColumnHeader[]>([]);
    const [fileData, setFileData] = useState<any[]>([]);

    const [loading, setLoading] = useState(false);

    const [uploadFile, setUploadFile] = useState<File | null>(null);

    const [initialValues, setInitialValues] = useState<Partial<Budgets>>({
        title: '',
        description: '',
        budgetType: BudgetType.Income,
    });

    const handleSubmit = async ({
        title,
        budgetType,
        description,
    }: Partial<Budgets>) => {
        if (!uploadFile) {
            toast.error('No se ha seleccionado un archivo');
            return;
        }

        try {
            const { url: presignedUrl, hashName } = await getPresignedUrl({
                fileName: uploadFile.name,
            });

            setLoading(true);

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

            toast.promise(
                createBudget({
                    title,
                    budgetType: budgetType?.toString(),
                    description,
                    fileName: hashName,
                    fileUrl: presignedUrl,
                    fileSize: uploadFile.size,
                }),
                {
                    loading: 'Creando presupuesto...',
                    success: 'Presupuesto creado correctamente',
                    error: 'Error al crear el presup',
                }
            );
        } catch (error) {
            toast.error('Error al crear el presupuesto');
            setLoading(false);
        } finally {
            setLoading(false);
            // clean form
            setInitialValues({
                title: '',
                description: '',
                budgetType: BudgetType.Income,
            });

            setUploadFile(null);
            setFileData([]);
            setTableColumns([]);
            closeModal();
        }
    };

    const BudgetSchema = yup.object().shape({
        title: yup.string().required('El título es requerido'),
        description: yup.string().required('La descripción es requerida'),
        budgetType: yup
            .string()
            .required('El tipo de presupuesto es requerido'),
    });

    const handleChange = () => {
        if (!uploadFile) {
            toast.error('No se ha seleccionado un archivo');
            return;
        }
        Papa.parse(uploadFile, {
            complete: (result) => {
                const columns = Object.keys(result?.data[0]);

                if (columns.length === 0) {
                    toast.error('Archivo vacío');
                    return;
                }

                const tableColumns = columns.map((columns) => {
                    return {
                        title: columns,
                        dataIndex: columns,
                    };
                });

                setTableColumns(tableColumns);
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
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={BudgetSchema}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="space-y-4 my-2 flex flex-col mt-4">
                            <section className="flex flex-col">
                                <Typography.Text className="font-bold text-blue-500">
                                    Título
                                </Typography.Text>
                                <Field
                                    type="text"
                                    placeholder="Título"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="title"
                                />
                                {errors.title && touched.title && (
                                    <div>
                                        <span className="text-red-500 text-xs font-bold">
                                            {errors.title}
                                        </span>
                                    </div>
                                )}
                            </section>

                            <section className="flex flex-col">
                                <Typography.Text className="font-bold text-blue-500">
                                    Descripción
                                </Typography.Text>
                                <Field
                                    type="text"
                                    placeholder="Descripción"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="description"
                                    as="textarea"
                                />
                                {errors.description && touched.description && (
                                    <div>
                                        <span className="text-red-500 text-xs font-bold">
                                            {errors.description}
                                        </span>
                                    </div>
                                )}
                            </section>

                            <section className="flex flex-col">
                                <Typography.Text className="font-bold text-blue-500">
                                    Tipo de Presupuesto
                                </Typography.Text>

                                <Field
                                    as="select"
                                    placeholder="Tipo de Presupuesto"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="budgetType"
                                >
                                    {Object.keys(budgetTypes).map((x) => (
                                        <option key={x} value={x}>
                                            {budgetTypes[x]}
                                        </option>
                                    ))}
                                </Field>

                                {errors.budgetType && touched.budgetType && (
                                    <div>
                                        <span className="text-red-500 text-xs font-bold">
                                            {errors.budgetType}
                                        </span>
                                    </div>
                                )}
                            </section>

                            <section className="flex flex-col">
                                <Typography.Text className="font-bold text-blue-500">
                                    Archivo Presupuesto
                                </Typography.Text>
                                <Upload {...uploadProps}>
                                    <Button icon={<UploadOutlined />}>
                                        Seleccione archivo CSV
                                    </Button>
                                </Upload>
                            </section>

                            {fileData.length > 0 ? (
                                <div>
                                    <Table
                                        dataSource={fileData}
                                        columns={tableColumns}
                                    />
                                </div>
                            ) : null}

                            <div className="space-y-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={uploadFile ? false : true}
                                >
                                    Enviar A Revisión
                                    {loading && (
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateBudgetForm;
