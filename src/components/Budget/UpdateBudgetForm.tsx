import React from 'react';
import { Field, Formik, Form } from 'formik';
import * as yup from 'yup';

import { Budgets } from '~/types/types';
import { Typography } from 'antd';
import { approvalStatusMap } from '~/constants/constants';
import { createComment, updateBudget } from '~/app/admin/budgets/actions';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { changeData } from '~/redux/reducers/data/dataSlice';

interface Interface {
    budget: Budgets;
    closeModal: () => void;
}

interface UpdateBudgetInterface extends Budgets {
    comment: string;
}

const UpdateBudgetForm: React.FC<Interface> = ({ budget, closeModal }) => {
    const dispatch = useDispatch();

    const initialValues: UpdateBudgetInterface = { ...budget, comment: '' };

    const handleSubmit = ({
        approvalStatus,
        comment,
    }: UpdateBudgetInterface) => {
        try {
            const updateObject: Partial<Budgets> = {
                ...budget,
                budgetId: budget.budgetId,
                approvalStatus: approvalStatus,
            };

            const commentInfo = {
                budgetId: budget.budgetId,
                commentText: comment,
                reason: approvalStatusMap[approvalStatus],
            };

            toast.promise(createComment(commentInfo), {
                loading: 'Creando comentario...',
                success: 'Comentario creado correctamente',
                error: 'Error al crear comentario',
            });

            toast.promise(updateBudget({ ...updateObject }), {
                loading: 'Actualizando presupuesto...',
                success: 'Presupuesto actualizado correctamente',
                error: 'Error al actualizar presupuesto',
            });
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(changeData());
            closeModal();
        }
    };

    const validationSchema = yup.object().shape({
        approvalStatus: yup.string().required('Campo requerido'),
        comment: yup
            .string()
            .required('Es requerido un comentario para evaluar el presupuesto'),
    });
    return (
        <>
            <div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({ values, errors, touched }) => (
                        <Form>
                            <div className="space-y-4 my-2 flex flex-col mt-4">
                                <section className="flex flex-col">
                                    <Typography.Text className="font-bold text-blue-500">
                                        Evaluar Presupuesto
                                    </Typography.Text>
                                    <Field
                                        as="select"
                                        placeholder="Status de aprobación"
                                        className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        name="approvalStatus"
                                    >
                                        {Object.keys(approvalStatusMap).map(
                                            (key) => (
                                                <option key={key} value={key}>
                                                    {approvalStatusMap[key]}
                                                </option>
                                            )
                                        )}
                                    </Field>
                                    {errors.approvalStatus &&
                                        touched.approvalStatus && (
                                            <div>
                                                <span className="text-red-500 text-xs font-bold">
                                                    {errors.approvalStatus}
                                                </span>
                                            </div>
                                        )}
                                </section>

                                <section className="flex flex-col">
                                    <Typography.Text className="font-bold text-blue-500">
                                        Dejar Comentario
                                    </Typography.Text>

                                    <Field
                                        as="textarea"
                                        name="comment"
                                        placeholder="Comentario"
                                        className="shadow appearance-none border rounded w-60 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {errors.comment && touched.comment && (
                                        <div>
                                            <span className="text-red-500 text-xs font-bold">
                                                {errors.comment}
                                            </span>
                                        </div>
                                    )}
                                </section>

                                <div className="space-y-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                        type="submit"
                                    >
                                        Enviar Evaluación
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default UpdateBudgetForm;
