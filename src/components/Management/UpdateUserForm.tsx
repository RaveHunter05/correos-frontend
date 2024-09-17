import { Skeleton, Typography } from 'antd';

import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { Roles, Users } from '~/types/types';
import { useLayoutEffect, useState } from 'react';
import { getRoles, updateUser } from './actions';

import { useDispatch } from 'react-redux';
import { changeData } from '~/redux/reducers/data/dataSlice';
import { toast } from 'react-hot-toast';

interface Interface {
    data: Partial<Users>;
    closeModal: () => void;
}

const UserSchema = yup.object().shape({
    email: yup
        .string()
        .email('Email invalido')
        .required('El email es requerido'),

    userName: yup.string().required('El nombre es requerido'),
    role: yup.string().required('El rol es requerido'),
});

const UpdateUserForm: React.FC<Interface> = ({
    data,
    closeModal,
}): React.ReactElement => {
    const [initialValues, setInitialValues] = useState<Partial<Users>>({
        id: data.id,
        userName: data.userName,
        email: data.email,
        role: data.role,
    });

    const dispatch = useDispatch();

    const [updateUserError, setUpdateUserError] = useState<string | null>(null);

    const [roles, setRoles] = useState<Roles[]>([]);

    const handleUpdateUser = async (values: Partial<Users>) => {
        try {
            if (!values.id)
                throw new Error('No se ha encontrado el id del usuario');

            const dataToSend: Partial<Users> = {};
            if (values.email) dataToSend.email = values.email;
            if (values.userName) dataToSend.userName = values.userName;
            if (values.role) dataToSend.role = values.role;
            toast.promise(updateUser(values), {
                loading: 'Actualizando usuario...',
                success: 'Usuario actualizado correctamente',
                error: 'Error al actualizar el Usuario',
            });

            return;
        } catch (error) {
            console.error({ error });
            if (error instanceof Error) {
                setUpdateUserError(error.message);
            } else if (typeof error === 'string') {
                setUpdateUserError(error.toUpperCase());
            }
            alert('Error al actualizar el usuario');
        } finally {
            setInitialValues({ id: '', userName: '', email: '', role: '' });
            dispatch(changeData());
            closeModal();
        }
    };

    useLayoutEffect(() => {
        const fetchRoles = async () => {
            const response = await getRoles();
            setRoles(response);
        };

        const fetchInitialValues = () => {
            setInitialValues({
                id: data.id,
                userName: data.userName,
                email: data.email,
                role: data.role,
            });
        };

        fetchRoles();
        fetchInitialValues();
    }, [data]);

    const handleSubmit = async (values: Partial<Users>) => {
        await handleUpdateUser(values);
    };

    return (
        <>
            {roles.length === 0 && <Skeleton />}

            {updateUserError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    {updateUserError}
                </div>
            )}

            {roles.length > 0 && (
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
                                        placeholder="Email"
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
                                        Nombre
                                    </Typography.Text>
                                    <Field
                                        name="userName"
                                        as="input"
                                        placeholder="Nombre"
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
                                        Role
                                    </Typography.Text>
                                    <Field
                                        placeholder="Roles"
                                        className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        as="select"
                                        name="role"
                                    >
                                        {roles.map((x) => (
                                            <option value={x.name} key={x.name}>
                                                {x.name}
                                            </option>
                                        ))}
                                    </Field>
                                    {errors.email && touched.email && (
                                        <div>
                                            <span className="text-red-500 text-xs font-bold">
                                                {errors.email}
                                            </span>
                                        </div>
                                    )}
                                </section>

                                <div className="space-y-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                                        type="submit"
                                    >
                                        Actualizar Usuario
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}
        </>
    );
};

export default UpdateUserForm;
