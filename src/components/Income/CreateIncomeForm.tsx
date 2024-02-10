import { Typography } from 'antd';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { Toaster, toast } from 'react-hot-toast';
import * as yup from 'yup';
import { IncomeInterface } from '../Shared/IncomesTable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeData } from '~/redux/reducers/data/dataSlice';

interface Interface {
    toEditValues?: Partial<IncomeInterface> | null;
    closeModal: () => void;
}

const CreateIncomeForm: React.FC<Interface> = ({
    toEditValues,
    closeModal,
}): React.ReactElement => {
    const [initialValues, setInitialValues] = useState<
        Partial<IncomeInterface>
    >({
        code: 121231,
        service: 'asdfasdf',
        projectedAmount: 200,
        executedAmount: 300,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (toEditValues) setInitialValues(toEditValues);
    }, [toEditValues, initialValues]);

    const createIncome = async ({
        code,
        service,
        projectedAmount,
        executedAmount,
    }: Partial<IncomeInterface>) => {
        await axios.post('/api/incomes', {
            code,
            service,
            projectedAmount,
            executedAmount,
        });

        toast.success('Ingreso creado exitosamente', {
            position: 'top-right',
        });
    };

    const updateIncome = async ({
        incomeId,
        code,
        service,
        projectedAmount,
        executedAmount,
    }: Partial<IncomeInterface>) => {
        await axios.put('/api/incomes', {
            incomeId,
            code,
            service,
            projectedAmount,
            executedAmount,
        });

        toast.success('Ingreso actualizado exitosamente', {
            position: 'top-right',
        });
    };

    const handleSubmit = async ({
        incomeId,
        code,
        service,
        projectedAmount,
        executedAmount,
    }: Partial<IncomeInterface>) => {
        try {
            if (!toEditValues) {
                createIncome({
                    code,
                    service,
                    projectedAmount,
                    executedAmount,
                });
                return;
            }

            updateIncome({
                incomeId,
                code,
                service,
                projectedAmount,
                executedAmount,
            });
            return;
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(changeData());
            closeModal();
        }
    };
    const IncomeSchema = yup.object({
        code: yup.string().required('El código es requerido'),
        service: yup.string().required('El servicio es requerido'),
        projectedAmount: yup
            .number()
            .min(0, 'Cantidad proyectada debe ser mayor a 0')
            .required('Cantidad proyectada  es requerida'),
        executedAmount: yup
            .number()
            .min(0, 'Cantidad ejecutada ser mayor a 0')
            .required('Cantidad ejecutada es requerida'),
    });
    return (
        <>
            <Formik
                initialValues={toEditValues ? toEditValues : initialValues}
                onSubmit={handleSubmit}
                validationSchema={IncomeSchema}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Toaster />
                        <div className="space-y-4 my-2 flex flex-col justify-center items-center mt-4">
                            <section>
                                <Typography.Text className="font-bold text-blue-500">
                                    Código
                                </Typography.Text>
                                <Field
                                    type="text"
                                    placeholder="Código"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="code"
                                />
                                {errors.code && touched.code && (
                                    <div>
                                        <span className="text-red-500 text-xs font-bold">
                                            {errors.code}
                                        </span>
                                    </div>
                                )}
                            </section>
                            <section>
                                <Typography.Text className="font-bold text-blue-500">
                                    Servicio
                                </Typography.Text>
                                <Field
                                    type="text"
                                    placeholder="Servicio"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="service"
                                />
                                {errors.service && touched.service && (
                                    <div>
                                        <span className="text-red-500 text-xs font-bold">
                                            {errors.service}
                                        </span>
                                    </div>
                                )}
                            </section>
                            <section>
                                <Typography.Text className="font-bold text-blue-500">
                                    Cantidad proyectada
                                </Typography.Text>
                                <Field
                                    type="text"
                                    placeholder="Candidad Proyectada"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="projectedAmount"
                                />
                                {errors.projectedAmount &&
                                    touched.projectedAmount && (
                                        <div>
                                            <span className="text-red-500 text-xs font-bold">
                                                {errors.projectedAmount}
                                            </span>
                                        </div>
                                    )}
                            </section>
                            <section>
                                <Typography.Text className="font-bold text-blue-500">
                                    Cantidad ejecutada
                                </Typography.Text>
                                <Field
                                    type="text"
                                    placeholder="Candidad Ejecutada"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="executedAmount"
                                />
                                {errors.executedAmount &&
                                    touched.executedAmount && (
                                        <div>
                                            <span className="text-red-500 text-xs font-bold">
                                                {errors.executedAmount}
                                            </span>
                                        </div>
                                    )}
                            </section>
                            <div className="space-y-2">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                                    {toEditValues
                                        ? 'Editar Ingreso'
                                        : 'Agregar Ingreso'}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateIncomeForm;
