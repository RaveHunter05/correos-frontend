import { LuFileInput, LuFileOutput, LuLogOut } from 'react-icons/lu';
import { RiAdminLine } from 'react-icons/ri';
import { AiFillPrinter } from 'react-icons/ai';
import { BiSolidDashboard } from 'react-icons/bi';

import { Link } from 'next-view-transitions';
import { ReactNode, useState } from 'react';
import { FaTableList } from 'react-icons/fa6';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import { logout } from '~/app/login/actions';
import { useTransitionRouter } from 'next-view-transitions';

interface Props {
    children?: ReactNode;
}

export default function SidebarComponent({ children }: Props) {
    const router = useTransitionRouter();

    const handleLogout = () => {
        toast.success('Sesión cerrada', { position: 'top-right' });
        logout();
        router.replace('/');
    };

    const [userRole] = useState<string | undefined>(Cookies.get('role'));

    const [openSideAuxiliary, setOpenSideAuxiliary] = useState<boolean>(false);
    return (
        <div>
            <aside
                id="default-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium flex flex-col h-full">
                        <li>
                            <Link
                                href="dashboard"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <BiSolidDashboard />
                                <span className="ml-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="income"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <LuFileInput />
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Ingresos
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="outcome"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <LuFileOutput />
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Egresos
                                </span>
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() =>
                                    setOpenSideAuxiliary(!openSideAuxiliary)
                                }
                                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            >
                                <FaTableList />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                    Tablas Auxiliares
                                </span>
                                {openSideAuxiliary ? (
                                    <IoIosArrowUp />
                                ) : (
                                    <IoIosArrowDown />
                                )}
                            </button>
                            <ul
                                style={{
                                    display: openSideAuxiliary
                                        ? 'block'
                                        : 'none',
                                }}
                            >
                                <li>
                                    <Link
                                        href="services"
                                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        <span>Servicios</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="costcenters"
                                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        <span>Centro de Costos</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="spents"
                                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        <span>Rubros</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        {userRole === 'Admin' ||
                            (userRole === 'Boss' && (
                                <li>
                                    <Link
                                        href="management"
                                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                    >
                                        <RiAdminLine />
                                        <span className="flex-1 ml-3 whitespace-nowrap">
                                            Gestionar Usuarios
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        <li>
                            <a
                                href="execution"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <AiFillPrinter />
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Ejecución
                                </span>
                            </a>
                        </li>
                        <li className="bottom-3" style={{ marginTop: 'auto' }}>
                            <button
                                onClick={handleLogout}
                                className="flex items-center  p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"
                            >
                                <LuLogOut />
                                <span className="ml-3 whitespace-nowrap">
                                    Logout
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="p-4 sm:ml-64">{children}</div>
        </div>
    );
}
