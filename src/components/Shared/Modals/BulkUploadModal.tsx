import { UploadOutlined } from '@ant-design/icons';
import { Button, Table, Upload, UploadProps } from 'antd';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

import type { ColumnHeader } from '~/types/types';

import Papa from 'papaparse';
import fileToBase64 from '~/utils/fileToBase64';

interface Interface {
    uploadFunction: (file: string) => Promise<boolean>;
    closeModal: () => void;
}

const BulkUploadModal = ({
    closeModal,
    uploadFunction = async () => false,
}: Interface) => {
    const [uploadFile, setUploadFile] = useState<File | null>(null);

    const [fileData, setFileData] = useState<any[]>([]);

    const [tableColumns, setTableColumns] = useState<ColumnHeader[]>([]);

    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        setLoading(true);
        if (!uploadFile) {
            toast.error('No se ha seleccionado un archivo');
            return;
        }
        const base64File = await fileToBase64(uploadFile);
        const success = await uploadFunction(base64File);
        setLoading(false);
        if (success) {
            toast.success('Datos subidos correctamente');
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
        <div className="flex flex-col items-start justify-between py-4 bg-white dark:bg-gray-800">
            {/* Add CSV file for bulk upload */}

            <Toaster />

            <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>
                    Seleccione archivo CSV
                </Button>
            </Upload>

            {fileData.length > 0 ? (
                <div>
                    <Table dataSource={fileData} columns={tableColumns} />
                </div>
            ) : null}

            <div className="flex flex-row mt-6">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 flex items-center"
                    disabled={!uploadFile}
                    onClick={handleUpload}
                >
                    Agregar
                </button>

                <button
                    className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded mr-2 flex items-center"
                    onClick={closeModal}
                >
                    Cancelar
                </button>

                {loading && (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                )}
            </div>
        </div>
    );
};

export default BulkUploadModal;
