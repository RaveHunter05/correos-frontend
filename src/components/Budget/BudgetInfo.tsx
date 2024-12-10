import { Card, Tooltip } from 'antd';
import React from 'react';
import { Budgets } from '~/types/types';
import ApprovalStatusComponent from '../Shared/ApprovalStatusComponent';
import { getDownloadFileLink } from '~/app/admin/budgets/actions';
import { FaFileDownload } from 'react-icons/fa';
import { budgetTypeMap } from '~/constants/constants';

interface Interface {
    budget: Budgets;
}

const BudgetInfo: React.FC<Interface> = ({ budget }) => {
    const handleDownloadFile = async (fileName: string) => {
        try {
            const { url } = await getDownloadFileLink(fileName);

            //go to the link in a new tab
            window.open(url, '_blank');
        } catch (error) {
            if (typeof error === 'string') {
                throw new Error(error.toUpperCase());
            } else if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    };
    return (
        <>
            <Card title="Información Presupuesto" className="bg-blue-300">
                <div>
                    <h3 className="text-base font-semibold text-white">
                        Titulo
                    </h3>
                    <span className="px-2 py-1 rounded-full bg-white border-black">
                        {budget.title}
                    </span>
                </div>

                <div className="mt-4">
                    <h3 className="text-base font-semibold text-white">
                        Creador
                    </h3>

                    <span className="px-2 py-1 rounded-full bg-white border-black">
                        {budget.createdByName}
                    </span>
                </div>

                <div className="mt-4">
                    <h3 className="text-base font-semibold text-white">
                        Descripción
                    </h3>

                    <span className="px-2 py-1 rounded-full bg-white border-black">
                        {budget.description}
                    </span>
                </div>
                <div className="mt-4">
                    <h3 className="text-base font-semibold text-white">
                        Tipo de Presupuesto
                    </h3>

                    <span className="px-2 py-1 rounded-full bg-white border-black">
                        {budgetTypeMap[budget.budgetType]}
                    </span>
                </div>
                <div className="mt-4">
                    <h3 className="text-base font-semibold text-white">
                        Nombre de Archivo
                    </h3>
                    <div className="flex items-center">
                        <span className="px-2 py-1 rounded-full bg-white border-black">
                            {budget.fileName.slice(-15)}
                        </span>
                        <Tooltip title="Descargar Archivo" className="ml-2">
                            <button
                                onClick={() =>
                                    handleDownloadFile(budget.fileName)
                                }
                            >
                                <FaFileDownload
                                    className="mr-1 text-white bg-red-400"
                                    style={{
                                        fontSize: '1.3rem',
                                        color: '#fff !important',
                                    }}
                                />
                            </button>
                        </Tooltip>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="text-base font-semibold text-white">
                        Tamaño
                    </h3>
                    <span className="px-2 py-1 rounded-full bg-white border-black">
                        {budget.fileSize} KB
                    </span>
                </div>

                <div className="mt-4">
                    <h3 className="text-base font-semibold text-white">
                        Estado
                    </h3>
                    <ApprovalStatusComponent status={budget.approvalStatus} />
                </div>
            </Card>
        </>
    );
};

export default BudgetInfo;
