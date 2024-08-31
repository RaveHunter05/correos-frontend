import { Typography } from 'antd';

import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { UserRegister } from '~/types/types';
import { useState } from 'react';
import { createUser } from './actions';

import { useDispatch } from 'react-redux';
import { changeData } from '~/redux/reducers/data/dataSlice';

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

interface Interface {
    closeModal: () => void;
}

const UserSchema = yup.object().shape({
    email: yup
        .string()
        .email('Email invalido')
        .required('El email es requerido'),
    password: yup.string().required('La contraseña es requerida'),
});

const CreateUserForm: React.FC<Interface> = ({
    closeModal,
}): React.ReactElement => {
    const [initialValues, setInitialValues] = useState<Partial<UserRegister>>({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();

    const [createUserError, setCreateUserError] = useState<string | null>(null);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleCreateUser = async (data: Partial<UserRegister>) => {
        try {
            toast.promise(createUser(data), {
                loading: 'Creando usuario...',
                success: 'Usuario creado correctamente',
                error: 'Error al crear el usuario',
            });

            return;
        } catch (error) {
            console.log({ error });
            if (error instanceof Error) {
                setCreateUserError(error.message);
            } else if (typeof error === 'string') {
                setCreateUserError(error.toUpperCase());
            }
            alert('Error al crear el usuario');
        } finally {
            setInitialValues({ email: '', password: '' });
            dispatch(changeData());
            closeModal();
        }
    };

    const handleSubmit = async (values: Partial<UserRegister>) => {
        await handleCreateUser(values);
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={UserSchema}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="space-y-4 my-2 flex flex-col justify-center items-center mt-4">
                            <section>
                                <Typography.Text className="font-bold text-blue-500">
                                    Email
                                </Typography.Text>
                                <Field
                                    name="email"
                                    as="input"
                                    placeholder="Correo"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                ></Field>
                                {errors.email && touched.email && (
                                    <div>
                                        <span className="text-red-500 text-xs font-bold">
                                            {errors.email}
                                        </span>
                                    </div>
                                )}
                            </section>
                            <section>
                                <Typography.Text className="font-bold text-blue-500">
                                    Contraseña
                                </Typography.Text>
                                <article className="flex items-center">
                                    <Field
                                        name="password"
                                        placeholder="Contraseña"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    ></Field>
                                    {showPassword ? (
                                        <FaRegEye
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="cursor-pointer ml-2"
                                        />
                                    ) : (
                                        <FaRegEyeSlash
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="cursor-pointer ml-2"
                                        />
                                    )}
                                </article>
                                {errors.password && touched.password && (
                                    <div>
                                        <span className="text-red-500 text-xs font-bold">
                                            {errors.password}
                                        </span>
                                    </div>
                                )}

                                {createUserError && (
                                    <div>
                                        <span className="text-red-500 text-xs font-bold">
                                            {createUserError}
                                        </span>
                                    </div>
                                )}
                            </section>

                            <div className="space-y-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                                    type="submit"
                                >
                                    Crear Usuario
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateUserForm;
