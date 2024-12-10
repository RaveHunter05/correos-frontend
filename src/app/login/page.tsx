'use client';

import Image from 'next/image';
import posImage from 'public/correos_nicaragua.jpg';

import { Formik, Field, Form } from 'formik';

import * as yup from 'yup';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import { login } from './actions';
import Cookies from 'js-cookie';
import { useTransitionRouter } from 'next-view-transitions';

interface LoginInterface {
    username: string;
    password: string;
}

const LoginSchema = yup.object({
    username: yup.string().required('Nombre de usuario es requerido'),
    password: yup.string().required('Contraseña es requerida'),
});

export default function Login() {
    const router = useTransitionRouter();
    const [loginError, setLoginError] = useState<string>();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleLogin = async ({ username, password }: LoginInterface) => {
        try {
            const response = await login(username, password);

            const role = response?.roles[0];

            Cookies.set('role', role, {
                expires: 1,
                sameSite: 'Strict',
            });

            Cookies.set('username', username, {
                expires: 1,
                sameSite: 'Strict',
            });

            toast.success('Logeado exitosamente', { position: 'top-right' });
            router.push('/admin/dashboard');
            return;
        } catch (error) {
            if (typeof error === 'string') {
                console.error(error);
                setLoginError('Error de autenticación');
            }
            if (error instanceof Error) {
                console.error(error);
                setLoginError('Error de autenticación');
            }
        }
    };
    return (
        <div className="">
            <Toaster />
            <div className="flex flex-row w-screen h-screen">
                <div className="w-2/5 bg-sky-400 h-100 flex justify-center items-center flex flex-col space-y-4">
                    <h2 className="text-white text-3xl">
                        Correos de Nicaragua
                    </h2>
                    <Image
                        src={posImage}
                        alt="POS Image"
                        width="250"
                        height="250"
                    />
                </div>

                <div className="w-3/5 bg-neutral-300 flex flex-col justify-center items-center ">
                    <div className="text-left">
                        <h5 className="text-orange-400 text-xs font-bold">
                            Sistema de Gestión Presupuestaria
                        </h5>
                        <h2 className="text-2xl font-bold">Ingresar</h2>
                        <Formik
                            initialValues={{
                                username: 'harrypopote',
                                password: 'Paulsotelo953131@',
                            }}
                            onSubmit={handleLogin}
                            validationSchema={LoginSchema}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <div className="space-y-2 my-2 flex flex-col">
                                        <article className="flex items-center">
                                            <Field
                                                type="text"
                                                placeholder="Nombre de usuario"
                                                className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                name="username"
                                            />
                                            {errors.username &&
                                                touched.username && (
                                                    <span className="text-red-500 text-xs font-bold">
                                                        {errors.username}
                                                    </span>
                                                )}
                                        </article>

                                        <article className="flex items-center">
                                            <Field
                                                name="password"
                                                placeholder="Contraseña"
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            ></Field>
                                            {showPassword ? (
                                                <FaRegEye
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                    className="cursor-pointer ml-2"
                                                />
                                            ) : (
                                                <FaRegEyeSlash
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                    className="cursor-pointer ml-2"
                                                />
                                            )}
                                        </article>
                                        {errors.password &&
                                            touched.password && (
                                                <span className="text-red-500 text-xs font-bold">
                                                    {errors.password}
                                                </span>
                                            )}

                                        {loginError && (
                                            <span className="text-red-500 text-xs font-bold">
                                                {loginError}
                                            </span>
                                        )}

                                        <div className="space-y-2 my-2">
                                            <p className="text-sky-400 hover:text-sky-600 text-xs font-bold cursor-pointer">
                                                ¡Bienvenido una vez mas!
                                            </p>
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                Ingresar
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}
