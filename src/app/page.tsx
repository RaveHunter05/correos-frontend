'use client';

import type { RootState } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NAME } from '../redux/reducers/profileSlice';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '~/lib/cookies';

export default function Page() {
    const name = useSelector((state: RootState) => state.profile.name);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(SET_NAME(e.target.value));
    };

    useEffect(() => {
        const redirectByToken = (): void => {
            const session = getSession();
            if (!!session) {
                router.push('/login');
            }
        };
        redirectByToken();
    }, []);
    return (
        <div>
            <h2 className="text-blue">
                This is the main page for the $quotcorreos de Nicaragua$quot
                system
            </h2>

            <input onChange={handleNameChange} type="text" value={name} />
        </div>
    );
}
