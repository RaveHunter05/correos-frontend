import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { FiRefreshCcw } from 'react-icons/fi';

import { Empty, Input, Skeleton, Tooltip } from 'antd';

import Cookies from 'js-cookie';

import useModal from '~/hooks/useModal';

import useBudgetsData from '~/hooks/useBudgetsData';
import BudgetsTable from '../Shared/BudgetsTable';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux';
import { toast } from 'react-hot-toast';
import CreateBudgetForm from '../Budget/CreateBudgetForm';
import { IoMdAdd } from 'react-icons/io';

const PersonalBudgetComponent = () => {
    // get userId cookie
    const [userId] = useState<string | undefined>(Cookies.get('userId'));

    const {
        data,
        loading: tableLoading,
        handleSearch,
        refreshData,
    } = useBudgetsData(userId);

    const { ModalWrapper, closeModal, openModal } = useModal();

    const dataChanged = useSelector(
        (state: RootState) => state.data.dataChanged
    );

    const handleManualRefresh = () => {
        toast.success('Refrescando presupuestos...');

        refreshData();
    };

    useEffect(() => {
        refreshData();
    }, [dataChanged]);

    return (
        <>
            <div>
                <ModalWrapper title="Enviar Presupuesto A Revision">
                    <CreateBudgetForm closeModal={closeModal} />
                </ModalWrapper>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-10">
                    <h1 className="text-3xl font-bold dark:text-white mb-4 underline">
                        <Tooltip title="Presupuestos enviados por el manager">
                            Mis Presupuestos (Manager)
                        </Tooltip>
                    </h1>
                    <div className="flex items-center justify-between py-4 bg-white dark:bg-gray-800">
                        <div>
                            <button
                                id="dropdownActionButton"
                                data-dropdown-toggle="dropdownAction"
                                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                type="button"
                            >
                                <span className="sr-only">Action button</span>
                                Acción
                                <MdOutlineKeyboardArrowDown />
                            </button>
                        </div>

                        <div className="flex justify-center items-center">
                            <button
                                onClick={handleManualRefresh}
                                className="bg-yellow-300 p-2 text-white mr-3 rounded"
                            >
                                <FiRefreshCcw />
                            </button>

                            <button
                                onClick={openModal}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 flex items-center"
                            >
                                <IoMdAdd
                                    className="mr-1"
                                    style={{ fontSize: '1.2rem' }}
                                />
                                Enviar Presupuesto
                            </button>

                            <div className="relative ml-4">
                                <Input
                                    type="text"
                                    id="table-search-users"
                                    className="blok p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Buscar por título de presupuesto"
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        {tableLoading ?? <Skeleton />}
                        {!data ? <Empty /> : <BudgetsTable data={data} />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PersonalBudgetComponent;
