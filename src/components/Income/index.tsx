import { Empty, Input, Skeleton } from 'antd';

import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import useIncomeData from '~/hooks/useIncomeData';
import IncomesTable from '../Shared/IncomesTable';

import useModal from '~/hooks/useModal';
import CreateIncomeForm from './CreateIncomeForm';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux';
import { useEffect } from 'react';

import BulkUploadModal from '../Shared/Modals/BulkUploadModal';

const IncomeComponent = () => {
    const {
        incomeData,
        loading: tableLoading,
        handleSearch,
        refreshData,
    } = useIncomeData();

    const { openModal, ModalWrapper, closeModal } = useModal();

    const {
        openModal: openBulkModal,
        ModalWrapper: BulkModalWrapper,
        closeModal: bulkCloseModal,
    } = useModal();

    const dataChanged = useSelector(
        (state: RootState) => state.data.dataChanged
    );

    useEffect(() => {
        refreshData();
    }, [dataChanged]);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-10">
            <ModalWrapper title="Agregar Ingresos">
                <CreateIncomeForm closeModal={closeModal} />
            </ModalWrapper>

            <BulkModalWrapper title="Agregar Ingresos Bulk">
                <BulkUploadModal closeModal={bulkCloseModal} />
            </BulkModalWrapper>
            {/* Title */}
            <h1 className="text-3xl font-bold dark:text-white mb-4 underline">
                Ingresos
            </h1>
            {/* Dropdown */}
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
                    <div
                        id="dropdownAction"
                        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                    >
                        <ul
                            className="py-1 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownActionButton"
                        >
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Reward
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Promote
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Activate account
                                </a>
                            </li>
                        </ul>
                        <div className="py-1">
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Delete User
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <button
                        type="button"
                        className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded mr-2 flex items-center"
                        onClick={openBulkModal}
                    >
                        <IoMdAdd
                            className="mr-1"
                            style={{ fontSize: '1.2rem' }}
                        />
                        Bulk
                    </button>

                    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 flex items-center"
                        onClick={openModal}
                    >
                        <IoMdAdd
                            className="mr-1"
                            style={{ fontSize: '1.2rem' }}
                        />
                        Agregar
                    </button>

                    <div className="relative ml-4">
                        <Input
                            type="text"
                            id="table-search-users"
                            className="blok p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Buscar por nombre de servicio"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div>
                {tableLoading ?? <Skeleton />}
                {!incomeData ? <Empty /> : <IncomesTable data={incomeData} />}
            </div>
        </div>
    );
};

export default IncomeComponent;
