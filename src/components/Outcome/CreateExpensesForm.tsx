import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import { Skeleton, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { changeData } from '~/redux/reducers/data/dataSlice';
import { CostCenters, Expenses, Spents, UploadExpenses } from '~/types/types';
import dayjs from 'dayjs';
import { getSpents } from '~/app/admin/spents/actions';
import { getCostCenters } from '~/app/admin/costcenters/actions';
import { createExpense, updateExpense } from '~/app/admin/outcome/actions';

interface Interface {
    toEditValues?: Partial<Expenses> | null;
    closeModal: () => void;
}

const CreateExpensesForm: React.FC<Interface> = ({
    toEditValues,
    closeModal,
}): React.ReactElement => {
    const [initialValues, setInitialValues] = useState<Partial<UploadExpenses>>(
        {
            costCenterId: '2',
            spentId: '2',
            projectedAmount: 200,
            executedAmount: 300,
        }
    );

    const dispatch = useDispatch();

    const [spents, setSpents] = useState<Spents[]>([]);

    const [costCenters, setCostCenters] = useState<CostCenters[]>([]);

    useEffect(() => {
        if (toEditValues) setInitialValues(toEditValues);
    }, [toEditValues, initialValues]);

    useEffect(() => {
        const assignSpents = async () => {
            try {
                const response = await getSpents();
                setSpents(response);
            } catch (error) {
                console.error(error);
            }
        };

        const assignCostCenters = async () => {
            try {
                const response = await getCostCenters();
                setCostCenters(response);
            } catch (error) {
                console.error(error);
            }
        };

        assignSpents();
        assignCostCenters();
    }, []);

    const handleCreateExpense = async ({
        costCenterId,
        spentId,
        projectedAmount,
        executedAmount,
    }: Partial<UploadExpenses>) => {
        const date = dayjs().format('YYYY-MM-DD');
        const response = await createExpense({
            costCenterId,
            spentId,
            projectedAmount,
            executedAmount,
            date,
        });

        return response.data;
    };

    const handleUpdateExpense = async ({
        expenseId,
        costCenterId,
        spentId,
        projectedAmount,
        executedAmount,
    }: Partial<UploadExpenses>) => {
        const date = dayjs().format('YYYY-MM-DD');

        const response = await updateExpense({
            expenseId,
            costCenterId,
            spentId,
            projectedAmount,
            executedAmount,
            date,
        });

        alert('Egreso actualizado exitosamente');

        return response.data;
    };

    const handleSubmit = async ({
        expenseId,
        costCenterId,
        spentId,
        projectedAmount,
        executedAmount,
    }: Partial<UploadExpenses>) => {
        try {
            if (!toEditValues) {
                handleCreateExpense({
                    costCenterId,
                    spentId,
                    projectedAmount,
                    executedAmount,
                });
                return;
            }

            handleUpdateExpense({
                expenseId,
                costCenterId,
                spentId,
                projectedAmount,
                executedAmount,
            });
            return;
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(changeData());
            closeModal();
        }
    };
    const expensesSchema = yup.object({
        costCenterId: yup.number().required('El centro de costos es requerido'),
        spentId: yup.number().required('El servicio es requerido'),
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
            {costCenters.length === 0 || spents.length === 0 ? (
                <Skeleton />
            ) : (
                <Formik
                    initialValues={toEditValues ? toEditValues : initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={expensesSchema}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="space-y-4 my-2 flex flex-col mt-4">
                                <section className="flex flex-col">
                                    <Typography.Text className="font-bold text-blue-500">
                                        Centro de cobro
                                    </Typography.Text>
                                    <Field
                                        placeholder="Centro de Costo"
                                        className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        as="select"
                                        name="costCenterId"
                                    >
                                        {costCenters.map((x) => (
                                            <option
                                                value={x.costCenterId}
                                                key={x.costCenterId}
                                            >
                                                {x.name}
                                            </option>
                                        ))}
                                    </Field>
                                    {errors.costCenterId &&
                                        touched.costCenterId && (
                                            <div>
                                                <span className="text-red-500 text-xs font-bold">
                                                    {errors.costCenterId}
                                                </span>
                                            </div>
                                        )}
                                </section>
                                <section className="flex flex-col">
                                    <Typography.Text className="font-bold text-blue-500">
                                        Rubro
                                    </Typography.Text>
                                    <Field
                                        placeholder="Categoría"
                                        className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        as="select"
                                        name="spentId"
                                    >
                                        {spents.map((x) => (
                                            <option
                                                value={x.spentId}
                                                key={x.spentId}
                                            >
                                                {x.denomination}
                                            </option>
                                        ))}
                                    </Field>
                                    {errors.spentId && touched.spentId && (
                                        <div>
                                            <span className="text-red-500 text-xs font-bold">
                                                {errors.spentId}
                                            </span>
                                        </div>
                                    )}
                                </section>
                                <section className="flex flex-col">
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
                                <section className="flex flex-col">
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
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                                    >
                                        {toEditValues
                                            ? 'Editar Egreso'
                                            : 'Agregar Egreso'}
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

export default CreateExpensesForm;
