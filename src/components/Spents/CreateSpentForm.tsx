import { Typography } from 'antd';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeData } from '~/redux/reducers/data/dataSlice';
import { Spents } from '~/types/types';
import dayjs from 'dayjs';
import { createSpent, updateSpent } from '~/app/admin/spents/actions';
import { toast } from 'react-hot-toast';

interface Interface {
    toEditValues?: Partial<Spents> | null;
    closeModal: () => void;
}

const CreateSpentForm: React.FC<Interface> = ({
    toEditValues,
    closeModal,
}): React.ReactElement => {
    const [initialValues, setInitialValues] = useState<Partial<Spents>>({
        spentId: '2',
        category: '1231',
        denomination: 'service 123',
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (toEditValues) setInitialValues(toEditValues);
    }, [toEditValues, initialValues]);

    const handleCreateSpent = async ({
        category,
        denomination,
    }: Partial<Spents>) => {
        const date = dayjs().format('YYYY-MM-DD');

        const response = await createSpent({
            category,
            denomination,
            date,
        });

        toast.success('Rubro Creado');

        return response.data;
    };

    const handleUpdateSpent = async ({
        spentId,
        category,
        denomination,
    }: Partial<Spents>) => {
        const date = dayjs().format('YYYY-MM-DD');

        const response = await updateSpent({
            spentId,
            category,
            denomination,
            date,
        });

        toast.success('Rubro Actualizado');

        return response.data;
    };

    const handleSubmit = async ({
        spentId,
        category,
        denomination,
    }: Partial<Spents>) => {
        try {
            if (!toEditValues) {
                handleCreateSpent({
                    category,
                    denomination,
                });
                return;
            }

            handleUpdateSpent({
                spentId,
                category,
                denomination,
            });
            return;
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(changeData());
            closeModal();
        }
    };
    const SpentsSchema = yup.object({
        category: yup.string().required('El rubro es requerido'),
        denomination: yup
            .string()
            .required('La denominación de rubro es requerida'),
    });
    return (
        <>
            <Formik
                initialValues={toEditValues ? toEditValues : initialValues}
                onSubmit={handleSubmit}
                validationSchema={SpentsSchema}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="space-y-4 my-2 flex flex-col justify-center items-center mt-4">
                            <section>
                                <Typography.Text className="font-bold text-blue-500">
                                    Categoría
                                </Typography.Text>
                                <Field
                                    type="text"
                                    placeholder="Category"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="category"
                                />
                                {errors.category && touched.category && (
                                    <div>
                                        <span className="text-red-500 text-xs font-bold">
                                            {errors.category}
                                        </span>
                                    </div>
                                )}
                            </section>

                            <section>
                                <Typography.Text className="font-bold text-blue-500">
                                    Denominación
                                </Typography.Text>
                                <Field
                                    type="text"
                                    placeholder="Denominación"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="denomination"
                                />
                                {errors.denomination &&
                                    touched.denomination && (
                                        <div>
                                            <span className="text-red-500 text-xs font-bold">
                                                {errors.denomination}
                                            </span>
                                        </div>
                                    )}
                            </section>

                            <div className="space-y-2">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                                    {toEditValues
                                        ? 'Editar Rubro'
                                        : 'Agregar Rubro'}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateSpentForm;
