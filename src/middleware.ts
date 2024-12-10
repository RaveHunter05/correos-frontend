import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('access-token')?.value;

    if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}
