'use server';

import { cookies } from 'next/headers';

import { SignJWT, jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import apiClient from '@/utils/apiClient';

const secretKey = 'secret';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('10 sec from now')
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256'],
    });

    return payload;
}

export async function login(username: string, password: string) {
    try {
        const result = await apiClient.post(
            'login',
            {
                username,
                password,
            },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );

        if (!result.data.token) {
            throw new Error('No token found');
        }
        const expires = new Date(Date.now() + 10 * 1000);

        const session = await encrypt({ username, expires });

        cookies().set('session', session, { expires, httpOnly: true });

        cookies().set('access-token', result.data.token, {
            expires,
            httpOnly: true,
        });

        return result.data;
    } catch (error) {
        if (typeof error === 'string') {
            throw new Error(error);
        }
        if (error instanceof Error) {
            throw error;
        }
    }
}

export async function logout() {
    cookies().set('session', '', { expires: new Date(0) });
    cookies().delete('session');

    cookies().set('access-token', '', { expires: new Date(0) });
    cookies().delete('access-token');
}

export async function getSession() {
    const session = cookies().get('session')?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function checkSession() {
    const session = await getSession();
    if (!session) {
        return false;
    }
    if (new Date(session.expires) < new Date()) {
        return false;
    }
    return true;
}

export async function updateSession(req: NextRequest) {
    const session = req.cookies.get('session')?.value;
    if (!session) return;

    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        expires: parsed.expires,
        httpOnly: true,
    });

    return res;
}
