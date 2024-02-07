import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { Toaster, toast } from 'react-hot-toast';
import * as yup from 'yup';
import { Expenses } from '../Shared/ExpensesTable';
import { Typography } from 'antd';
const CreateExpensesForm = (): React.ReactElement => {
    const handleSubmit = async ({
        costCenter,
        category,
        projectedAmount,
        executedAmount,
    }: Partial<Expenses>) => {
        try {
            await axios.post('/api/expenses', {
                costCenter,
                category,
                projectedAmount,
                executedAmount,
            });

            toast.success('Ingreso creado exitosamente', {
                position: 'top-right',
            });
        } catch (error) {
            console.log(error);
        }
    };
    const expensesSchema = yup.object({
        costCenter: yup.string().required('El código es requerido'),
        category: yup.string().required('El servicio es requerido'),
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
                initialValues={{
                    costCenter: 'Siuna',
                    category: 'asdfasdf',
                    projectedAmount: 12399,
                    executedAmount: 12,
                }}
                onSubmit={handleSubmit}
                validationSchema={expensesSchema}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Toaster />
                        <div className="space-y-4 my-2 flex flex-col justify-center items-center mt-4">
                            <section>
                                <Typography.Text className="font-bold text-blue-500">
                                    Céntro de cobro
                                </Typography.Text>
                                <Field
                                    type="text"
                                    placeholder="Centro de Cobro"
                                    className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="costCenter"
                                />
                                {errors.costCenter && touched.costCenter && (
                                    <div>
                                        <span className="text-red-500 text-xs font-bold">
                                            {errors.costCenter}
                                        </span>
                                    </div>
                                )}
                            </section>
                            <section>
                                <Typography.Text className="font-bold text-blue-500 mt-4">
                                    Categoría
                                </Typography.Text>
                                <Field
                                    type="text"
                                    placeholder="Categoría"
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
                                    Agregar Ingreso
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateExpensesForm;
