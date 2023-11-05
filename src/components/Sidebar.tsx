import { LuFileInput, LuFileOutput, LuLogOut } from 'react-icons/lu';
import { AiFillPrinter } from 'react-icons/ai';
import { BiSolidDashboard } from 'react-icons/bi';
import { useAppDispatch } from '~/src/redux';
import { useRouter } from 'next/router';
import { userLogout } from '~/src/redux/reducers/auth/authSlice';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

export default function SidebarComponent({ children }: Props) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(userLogout());
        router.replace('/');
    };
    return (
        <div>
            <aside
                id="default-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800"> <ul className="space-y-2 font-medium"> <li> <Link
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
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <AiFillPrinter />
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Ejecución
                                </span>
                            </a>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <LuLogOut />
                                <span className="flex-1 ml-3 whitespace-nowrap">
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
