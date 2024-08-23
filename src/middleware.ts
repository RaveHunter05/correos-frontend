import { NextRequest } from 'next/server';
import { updateSession } from '@/lib/cookies';

export async function middleware(req: NextRequest) {
    return await updateSession(req);
}
