import Image from 'next/image';
import posImage from 'public/pos_image.png';

import { Formik, Field, Form } from 'formik';

import * as yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

import { useRouter } from 'next/router';

interface LoginInterface {
    email: string;
    password: string;
}

const LoginSchema = yup.object({
    email: yup
        .string()
        .email('Correo inválido')
        .required('El correo es requerido'),
    password: yup.string().required('Contraseña es requerida'),
});

export default function Login() {
    const router = useRouter();
    const [loginError, setLoginError] = useState<string>();
    const handleLogin = async ({ email, password }: LoginInterface) => {
        try {
            const result = await axios.post('/api/login', {
                username: email,
                password,
                email,
            });

	    localStorage.setItem('auth-token', result.data.token)

            toast.success('Logeado exitosamente', { position: 'top-right' });
            router.push('/admin/dashboard');

            return result;
        } catch (error) {
            if (typeof error === 'string') {
                setLoginError(error);
            }
            if (error instanceof Error) {
                setLoginError(error.message);
            }
        }
    };
    return (
        <div className="">
            <div className="flex flex-row w-screen h-screen">
                <Toaster />
                <div className="w-2/5 bg-sky-400 h-100 flex justify-center items-center flex flex-col space-y-4">
                    <h2 className="text-white text-3xl">
                        Correos de Nicaragua
                    </h2>
                    <Image
                        src={posImage}
                        alt="POS Image"
                        width="180"
                        height="180"
                    />
                </div>

                <div className="w-3/5 bg-neutral-300 flex flex-col justify-center items-center ">
                    <div className="text-left">
                        <h5 className="text-orange-400 text-xs font-bold">
                            Sistema de Gestión de Inventario
                        </h5>
                        <h2 className="text-2xl font-bold">Ingresar</h2>
                        <Formik
                            initialValues={{
                                email: 'harrypopote4@gmail.com',
                                password: 'Paulsotelo951@',
                            }}
                            onSubmit={handleLogin}
                            validationSchema={LoginSchema}
                        >
                            {({ errors, touched, isValidating }) => (
                                <Form>
                                    <div className="space-y-2 my-2 flex flex-col">
                                        <Field
                                            type="text"
                                            placeholder="Correo Electrónico"
                                            className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="email"
                                        />
                                        {errors.email && touched.email && (
                                            <span className="text-red-500 text-xs font-bold">
                                                {errors.email}
                                            </span>
                                        )}
                                        <Field
                                            type="password"
                                            placeholder="Contraseña"
                                            name="password"
                                            className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
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
                                            <p className="text-gray-400 hover:text-gray-600 text-xs font-bold cursor-pointer">
                                                ¿No tienes una cuenta?
                                                Registrate
                                            </p>
                                            <p className="text-sky-400 hover:text-sky-600 text-xs font-bold cursor-pointer">
                                                ¿Olvidaste tu contraseña?
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
