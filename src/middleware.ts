import { NextRequest } from 'next/server';
import { updateSession } from './app/login/actions';

export async function middleware(req: NextRequest) {
    return await updateSession(req);
}
