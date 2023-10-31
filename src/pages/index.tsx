import type { RootState } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import { SET_NAME } from '../redux/reducers/profileSlice';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const name = useSelector((state: RootState) => state.profile.name);
    const userToken = useSelector((state: RootState) => state.auth.userToken);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(SET_NAME(e.target.value));
    };
    useEffect(() => {
        if (userToken === null) {
            router.push('/login');
        }
        router.push('/admin/dashboard');
    }, []);
    return (
        <div>
            <h2 className="text-blue">
                This is the main page for the "correos de Nicaragua" system
            </h2>

            <input onChange={handleNameChange} type="text" value={name} />
        </div>
    );
}
